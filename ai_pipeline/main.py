# Entry point for FastAPI AI pipeline
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from pathlib import Path

from services.document_processor import DocumentProcessor
from services.chat_service import ChatService
from models.request_models import ChatRequest, MultiDocumentChatRequest
from models.response_models import DocumentResponse, ChatResponse, StatusResponse
from config.settings import settings

# Create FastAPI app
app = FastAPI(
    title="AI Pipeline API",
    description="RAG-based document processing and chat API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
document_processor = DocumentProcessor()
chat_service = ChatService()

# Create necessary directories
os.makedirs("temp_uploads", exist_ok=True)
os.makedirs("vector_stores", exist_ok=True)

@app.on_event("startup")
async def startup_event():
    """Initialize cache and load existing documents on startup"""
    try:
        from services.cache_service import cache_service
        print("Loading document cache from disk...")
        cache_service.rebuild_cache_from_disk()
        print("Cache initialization completed.")
    except Exception as e:
        print(f"Warning: Cache initialization failed: {e}")

@app.get("/")
def read_root():
    return {"message": "Sarathi AI Pipeline is running!"}

@app.get("/health")
async def health_check():
    return {"success": True, "message": "Service is healthy"}

@app.post("/api/documents/process")
async def process_document(file: UploadFile = File(...)):
    """Process uploaded PDF document and create vector embeddings"""
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
        # Validate file size (20MB limit)
        file_content = await file.read()
        if len(file_content) > 20 * 1024 * 1024:  # 20MB in bytes
            raise HTTPException(status_code=400, detail="File size exceeds 20MB limit")
        
        # Process document
        doc_id = await document_processor.process_document(file_content, file.filename)
        
        return {
            "success": True,
            "document_id": doc_id,
            "message": f"Document {file.filename} processed successfully"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@app.post("/api/chat/query")
async def chat_query(request: ChatRequest):
    """Process chat query using RAG pipeline"""
    try:
        response = await chat_service.get_response(request.query, request.document_id)
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat query: {str(e)}")

@app.post("/api/chat/search-multiple")
async def search_multiple_documents(request: MultiDocumentChatRequest):
    """Search across multiple documents and return the best results"""
    try:
        response = await chat_service.search_multiple_documents(request.query, request.document_ids)
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching multiple documents: {str(e)}")

@app.get("/api/documents/list")
async def list_documents():
    """List all available documents"""
    try:
        documents = document_processor.list_documents()
        
        # If no documents found, provide helpful message
        if not documents:
            return {
                "success": True,
                "documents": [],
                "message": "No documents found. Upload a PDF to get started."
            }
        
        return {
            "success": True,
            "documents": documents,
            "count": len(documents)
        }
    
    except Exception as e:
        return {
            "success": False,
            "documents": [],
            "message": f"Error retrieving documents: {str(e)}"
        }


@app.get("/api/documents/status/{doc_id}")
async def get_document_status(doc_id: str):
    """Get processing status of a document"""
    try:
        status = document_processor.get_document_status(doc_id)
        return {"success": True, "message": f"Document {doc_id} status: {status}"}
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Document not found: {str(e)}")

@app.delete("/api/documents/{doc_id}")
async def delete_document(doc_id: str):
    """Remove document from vector store"""
    try:
        await document_processor.delete_document(doc_id)
        return {"success": True, "message": f"Document {doc_id} deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting document: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
