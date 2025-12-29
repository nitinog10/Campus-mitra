import re
import os
import pickle
import hashlib
import shutil
from io import BytesIO
from typing import List, Tuple
import uuid

from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from pypdf import PdfReader

from config.settings import settings
from services.cache_service import cache_service

class DocumentProcessor:
    def __init__(self):
        if not settings.openai_api_key or settings.openai_api_key == "your_openai_api_key_here":
            self.api_key_available = False
            self.embeddings = None
        else:
            self.api_key_available = True
            self.embeddings = OpenAIEmbeddings(
                openai_api_key=settings.openai_api_key
            )
        
    def _parse_pdf(self, file_content: bytes, filename: str) -> Tuple[List[str], str]:
        """Parse PDF content and extract text"""
        try:
            pdf = PdfReader(BytesIO(file_content))
            output = []
            
            if not pdf.pages:
                raise Exception("PDF file appears to be empty or corrupted")
            
            for i, page in enumerate(pdf.pages):
                try:
                    text = page.extract_text()
                    if text:  # Only process if text was extracted
                        text = re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)
                        text = re.sub(r"(?<!\n\s)\n(?!\s\n)", " ", text.strip())
                        text = re.sub(r"\n\s*\n", "\n\n", text)
                        output.append(text)
                    else:
                        # Add placeholder for empty pages
                        output.append(f"[Page {i+1} - No extractable text]")
                except Exception as page_error:
                    print(f"Error processing page {i+1}: {str(page_error)}")
                    output.append(f"[Page {i+1} - Error extracting text: {str(page_error)}]")
            
            if not output:
                raise Exception("No text could be extracted from the PDF")
                
            return output, filename
        except Exception as e:
            raise Exception(f"PDF parsing failed: {str(e)}")

    def _text_to_docs(self, text: List[str], filename: str) -> List[Document]:
        """Convert text to document chunks"""
        if isinstance(text, str):
            text = [text]
        
        if not text:
            raise Exception("No text provided for document processing")
        
        # Filter out empty pages
        valid_pages = [page for page in text if page.strip()]
        if not valid_pages:
            raise Exception("All pages appear to be empty")
        
        page_docs = [Document(page_content=page) for page in valid_pages]
        for i, doc in enumerate(page_docs):
            doc.metadata["page"] = i + 1

        doc_chunks = []
        for doc in page_docs:
            try:
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=settings.chunk_size,
                    separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""],
                    chunk_overlap=settings.chunk_overlap,
                )
                chunks = text_splitter.split_text(doc.page_content)
                
                if not chunks:
                    # If no chunks created, use the whole page content
                    chunks = [doc.page_content]
                
                for i, chunk in enumerate(chunks):
                    if chunk.strip():  # Only add non-empty chunks
                        chunk_doc = Document(
                            page_content=chunk, 
                            metadata={
                                "page": doc.metadata["page"], 
                                "chunk": i,
                                "filename": filename
                            }
                        )
                        chunk_doc.metadata["source"] = f"{chunk_doc.metadata['page']}-{chunk_doc.metadata['chunk']}"
                        doc_chunks.append(chunk_doc)
            except Exception as chunk_error:
                print(f"Error processing page {doc.metadata['page']}: {str(chunk_error)}")
                # Add the page as a single chunk if chunking fails
                chunk_doc = Document(
                    page_content=doc.page_content, 
                    metadata={
                        "page": doc.metadata["page"], 
                        "chunk": 0,
                        "filename": filename
                    }
                )
                chunk_doc.metadata["source"] = f"{chunk_doc.metadata['page']}-0"
                doc_chunks.append(chunk_doc)
        
        if not doc_chunks:
            raise Exception("No valid document chunks could be created")
            
        return doc_chunks

    def _create_vector_store(self, documents: List[Document]) -> FAISS:
        """Create FAISS vector store from documents"""
        if not self.api_key_available:
            raise Exception("Cannot create vector store without OpenAI API key")
        return FAISS.from_documents(documents, self.embeddings)

    async def process_document(self, file_content: bytes, filename: str) -> str:
        """Process document and store in vector database"""
        if not self.api_key_available:
            raise Exception("OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.")
        
        try:
            # Generate unique document ID
            doc_id = str(uuid.uuid4())
            
            # Parse PDF
            text_pages, _ = self._parse_pdf(file_content, filename)
            
            # Convert to document chunks
            documents = self._text_to_docs(text_pages, filename)
            
            # Create vector store
            vector_store = self._create_vector_store(documents)
            
            # Save vector store to disk using FAISS native save method
            vector_store_path = os.path.join(settings.vector_store_path, doc_id)
            os.makedirs(settings.vector_store_path, exist_ok=True)
            
            # Save FAISS index and docstore separately
            vector_store.save_local(vector_store_path)
            
            # Save metadata to disk for persistence
            metadata = {
                "filename": filename,
                "doc_id": doc_id,
                "status": "processed",
                "chunks": len(documents),
                "created_at": str(uuid.uuid4().hex[:8])  # Simple timestamp
            }
            
            metadata_file = os.path.join(vector_store_path, "metadata.json")
            with open(metadata_file, 'w') as f:
                import json
                json.dump(metadata, f, indent=2)

            # Cache document info
            cache_service.set(f"doc_info_{doc_id}", {
                "filename": filename,
                "status": "processed",
                "chunks": len(documents),
                "path": vector_store_path
            })
            
            return doc_id
            
        except Exception as e:
            raise Exception(f"Document processing failed: {str(e)}")

    def get_vector_store(self, doc_id: str) -> FAISS:
        """Load vector store for a document"""
        if not self.api_key_available:
            raise Exception("Cannot load vector store without OpenAI API key")
            
        doc_info = cache_service.get(f"doc_info_{doc_id}")
        if doc_info:
            vector_store_path = doc_info["path"]
        else:
            # Try to find document on disk even if not in cache
            vector_store_path = os.path.join(settings.vector_store_path, doc_id)
            if os.path.exists(vector_store_path):
                # Try to load metadata and rebuild cache entry
                metadata_file = os.path.join(vector_store_path, "metadata.json")
                if os.path.exists(metadata_file):
                    try:
                        import json
                        with open(metadata_file, 'r') as f:
                            metadata = json.load(f)
                        # Rebuild cache entry
                        cache_service.set(f"doc_info_{doc_id}", {
                            "filename": metadata.get("filename", "Unknown Document"),
                            "status": "processed",
                            "chunks": metadata.get("chunks", 0),
                            "path": vector_store_path
                        })
                        print(f"Rebuilt cache entry for document {doc_id}")
                    except Exception as e:
                        print(f"Error loading metadata for {doc_id}: {e}")
            else:
                raise Exception(f"Document {doc_id} not found")

        if not os.path.exists(vector_store_path):
            raise Exception(f"Vector store directory not found: {vector_store_path}")
        
        # Load FAISS index using native method
        return FAISS.load_local(vector_store_path, self.embeddings, allow_dangerous_deserialization=True)

    def get_document_status(self, doc_id: str) -> str:
        """Get processing status of a document"""
        doc_info = cache_service.get(f"doc_info_{doc_id}")
        if not doc_info:
            return "not_found"
        return doc_info["status"]

    def list_documents(self):
        """List all available documents"""
        documents = []
        
        # Get documents from cache
        for key in list(cache_service.cache.keys()):
            if key.startswith("doc_info_"):
                doc_id = key.replace("doc_info_", "")
                doc_info = cache_service.get(key)
                if doc_info:
                    documents.append({
                        "doc_id": doc_id,
                        "filename": doc_info.get("filename", "Unknown"),
                        "status": doc_info.get("status", "unknown"),
                        "chunks": doc_info.get("chunks", 0),
                        "path": doc_info.get("path", "")
                    })
        
        return documents

    async def delete_document(self, doc_id: str):
        """Delete document and its vector store"""
        doc_info = cache_service.get(f"doc_info_{doc_id}")
        
        # Check if document exists in cache
        if doc_info:
            vector_store_path = doc_info["path"]
        else:
            # Try to find document on disk even if not in cache
            vector_store_path = os.path.join(settings.vector_store_path, doc_id)
            
        # Check if vector store directory exists
        if os.path.exists(vector_store_path):
            try:
                shutil.rmtree(vector_store_path)
                print(f"Deleted vector store directory: {vector_store_path}")
            except Exception as e:
                raise Exception(f"Error deleting vector store directory: {str(e)}")
        else:
            # Document doesn't exist on disk
            raise Exception(f"Document {doc_id} not found")
            
        # Remove from cache if it exists
        if doc_info:
            cache_service.delete(f"doc_info_{doc_id}")
            print(f"Removed document {doc_id} from cache")
