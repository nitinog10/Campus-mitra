from openai import OpenAI
from typing import Optional, List, Dict, Any
import re

from config.settings import settings
from services.document_processor import DocumentProcessor
from services.cache_service import cache_service

class ChatService:
    def __init__(self):
        if not settings.openai_api_key or settings.openai_api_key == "your_openai_api_key_here":
            self.api_key_available = False
            self.client = None
        else:
            self.api_key_available = True
            self.client = OpenAI(api_key=settings.openai_api_key)
        
        self.document_processor = DocumentProcessor()
        
        # Add response cache to prevent repeated API calls for the same query
        self.response_cache = {}
        
        # Simple conversation memory storage (in production, use Redis or database)
        self.conversation_memory = {}
        
        # Define the RAG prompt template
        self.prompt_template = """
        You are 'Campusmitra', a helpful and concise AI assistant for our college campus.
        
        INSTRUCTIONS:
        1. Answer the user's question accurately based ONLY on the provided context (PDF CONTENT).
        2. Format your answer clearly using markdown formatting:
           - Use **bold** for important information
           - Use bullet points (- ) for lists
           - Use short paragraphs for explanations
           - Be direct and to the point
        3. You MUST cite your sources clearly after your answer. For each piece of information, reference the source in this exact format: `(Source: [filename], Page: [page])`. If using multiple sources, list them all.
        4. If the provided PDF CONTENT is empty, irrelevant to the user's question, or does not contain the answer, you MUST respond with: "I couldn't find a specific answer to your question in the available documents. For further assistance, you may need to contact the relevant department directly." Do not invent an answer.

        CONVERSATION CONTEXT:
        {conversation_history}

        PDF CONTENT:
        {pdf_extract}

        USER QUESTION:
        {question}

        Please provide your response using proper markdown formatting, followed by source citations. After your complete response, provide exactly 3 relevant follow-up questions in this format:

        ### SUGGESTED QUESTIONS ###
        1. [First relevant question]
        2. [Second relevant question] 
        3. [Third relevant question]
        """
        
        # Add periodic cache cleanup
        self._cleanup_cache()
    
    def _cleanup_cache(self):
        """Clean up old cache entries to prevent memory bloat"""
        if len(self.response_cache) > 100:  # Arbitrary threshold
            print(f"Cleaning up response cache ({len(self.response_cache)} entries)")
            # Just reset the cache completely for simplicity
            self.response_cache = {}

    def _get_conversation_history(self, session_id: str, max_turns: int = 3) -> str:
        """Get recent conversation history for context"""
        if session_id not in self.conversation_memory:
            return "No previous conversation context."
        
        history = self.conversation_memory[session_id]
        recent_history = history[-max_turns*2:]  # Last few Q&A pairs
        
        if not recent_history:
            return "No previous conversation context."
        
        formatted_history = []
        for i in range(0, len(recent_history), 2):
            if i + 1 < len(recent_history):
                formatted_history.append(f"Previous Question: {recent_history[i]}")
                formatted_history.append(f"Previous Answer: {recent_history[i+1]}")
        
        return "\n".join(formatted_history) if formatted_history else "No previous conversation context."
    
    def _update_conversation_memory(self, session_id: str, question: str, response: str):
        """Update conversation memory with latest Q&A"""
        if session_id not in self.conversation_memory:
            self.conversation_memory[session_id] = []
        
        # Add question and response
        self.conversation_memory[session_id].extend([question, response])
        
        # Keep only last 10 exchanges (20 items) to prevent memory overflow
        if len(self.conversation_memory[session_id]) > 20:
            self.conversation_memory[session_id] = self.conversation_memory[session_id][-20:]

    async def get_response(self, query: str, document_id: Optional[str] = None, session_id: Optional[str] = None) -> Dict[str, Any]:
        """Get RAG-based response for user query with conversation context"""

        if not self.api_key_available:
            return {
                "success": False,
                "response": "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.",
                "content_type": "markdown",
                "sources": None
            }
        
        try:
            # Get conversation history for context
            conversation_history = ""
            if session_id:
                conversation_history = self._get_conversation_history(session_id)
            
            if not document_id:
                # If no document ID provided, give a general response with conversation context
                messages = [{"role": "user", "content": query}]
                
                # Add conversation context if available
                if conversation_history and conversation_history != "No previous conversation context.":
                    context_prompt = f"Previous conversation context:\n{conversation_history}\n\nCurrent question: {query}"
                    messages = [{"role": "user", "content": context_prompt}]
                
                # Check response cache first (only for simple queries without context)
                cache_key = f"simple_response_{query}"
                if not conversation_history and cache_key in self.response_cache:
                    print(f"Using cached response for query: {query[:30]}...")
                    response_text = self.response_cache[cache_key]
                else:
                    # Call OpenAI API - use a smaller, faster model by default
                    response = self.client.chat.completions.create(
                        model="gpt-3.5-turbo",  # Faster and cheaper model for simple queries
                        messages=messages,
                        max_tokens=1024,  # Limit tokens to improve response time
                    )
                    
                    response_text = response.choices[0].message.content
                    
                    # Cache the response if it's a simple query
                    if not conversation_history:
                        self.response_cache[cache_key] = response_text
                
                # Update conversation memory
                if session_id:
                    self._update_conversation_memory(session_id, query, response_text)
                
                return {
                    "success": True,
                    "response": response_text,
                    "content_type": "markdown",
                    "sources": None
                }
            
            # Load vector store for the document
            vector_store = self.document_processor.get_vector_store(document_id)
            
            # Perform similarity search
            search_results = vector_store.similarity_search(query, k=settings.similarity_search_k)
            
            # Extract relevant text and metadata
            pdf_extract = "\n".join([result.page_content for result in search_results])
            sources = []
            
            for idx, result in enumerate(search_results):
                # Calculate relevance score based on position in search results (higher = more relevant)
                relevance_score = 1.0 - (idx * 0.1)  # First result gets 1.0, second gets 0.9, etc.
                
                sources.append({
                    "filename": result.metadata.get("filename", "unknown"),
                    "page": result.metadata.get("page", 0),
                    "chunk": result.metadata.get("chunk", 0),
                    "content_preview": result.page_content[:100] + "..." if len(result.page_content) > 100 else result.page_content,
                    "relevance_score": relevance_score,
                    "title": f"{result.metadata.get('filename', 'Document')} - Page {result.metadata.get('page', 0)}"
                })
            
            # Create prompt with context and conversation history
            full_prompt = self.prompt_template.format(
                conversation_history=conversation_history,

                pdf_extract=pdf_extract,
                question=query
            )
            
            # Generate a cache key for this specific query and document
            cache_key = f"rag_response_{document_id}_{hash(query)}"
            
            # Check if we have a cached response
            if cache_key in self.response_cache:
                print(f"Using cached RAG response for document {document_id}")
                cached_response = self.response_cache[cache_key]
                return {
                    "success": True,
                    "response": cached_response["response"],
                    "content_type": "markdown",
                    "sources": cached_response["sources"],
                    "top_source_suggestions": cached_response.get("top_source_suggestions", [])
                }
            
            # Generate response using OpenAI - use gpt-4o-mini for better reasoning with documents
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that can maintain conversation context and search documents."},
                    {"role": "user", "content": full_prompt}
                ],
                max_tokens=1500  # Limit token count for faster responses
            )
            
            response_text = response.choices[0].message.content
            
            # Extract suggestions from the AI response and clean the main response
            suggestions = []
            main_response = response_text
            
            # First, clean any unwanted section headers from the response
            unwanted_headers = [
                "### YOUR RESPONSE ###",
                "### INSTRUCTIONS FOR THE ASSISTANT ###", 
                "### CONVERSATION CONTEXT ###",
                "### PDF CONTENT ###",
                "### USER QUESTION ###"
            ]
            
            # Remove unwanted headers and clean the response
            for header in unwanted_headers:
                main_response = main_response.replace(header, "")
            
            # Look for suggestions in multiple formats and extract them
            suggestion_markers = [
                "### SUGGESTED QUESTIONS ###",
                "SUGGESTED QUESTIONS:",
                "### Suggested Questions", 
                "##Suggested Questions", 
                "Suggested Questions",
                "[Title: SUGGESTED QUESTIONS:]"
            ]
            
            for marker in suggestion_markers:
                if marker in main_response:
                    parts = main_response.split(marker)
                    main_response = parts[0].strip()
                    if len(parts) > 1:
                        suggestion_lines = parts[1].strip().split('\n')
                        for line in suggestion_lines:
                            line = line.strip()
                            # Extract numbered questions (1., 2., 3.)
                            if line and (line.startswith('1.') or line.startswith('2.') or line.startswith('3.')):
                                suggestion = line[2:].strip()  # Remove "1. " or "2. " etc.
                                if suggestion and not suggestion.startswith('[') and not suggestion.startswith('#'):
                                    suggestions.append(suggestion)
                    break  # Found suggestions, stop looking
            
            # Final cleanup of main response - remove any remaining ### symbols and empty lines
            main_response = main_response.replace("###", "").strip()
            
            # Remove multiple consecutive newlines and clean up spacing
            main_response = re.sub(r'\n\s*\n\s*\n', '\n\n', main_response)
            main_response = main_response.strip()
            
            # Update conversation memory
            if session_id:
                self._update_conversation_memory(session_id, query, main_response)
            
            # Cache the final response
            result = {
                "success": True,
                "response": main_response,
                "content_type": "markdown",
                "sources": sources,
                "top_source_suggestions": suggestions
            }
            self.response_cache[cache_key] = result
            
            return result
            
        except Exception as e:
            return {
                "success": False,
                "response": f"Error generating response: {str(e)}",
                "content_type": "markdown",
                "sources": None
            }

    async def search_multiple_documents(self, query: str, document_ids: List[str], session_id: Optional[str] = None) -> Dict[str, Any]:
        """Search across multiple documents and return combined results"""
        if not self.api_key_available:
            return {
                "success": False,
                "response": "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.",
                "content_type": "markdown",
                "sources": None
            }
        
        try:
            all_sources = []
            all_extracts = []
            
            # Search each document and collect results
            for doc_id in document_ids:
                try:
                    # Load vector store for the document
                    vector_store = self.document_processor.get_vector_store(doc_id)
                    
                    # Perform similarity search
                    search_results = vector_store.similarity_search(query, k=settings.similarity_search_k)
                    
                    # Add results to combined collection with relevance scoring
                    for idx, result in enumerate(search_results):
                        # Calculate relevance score based on position in search results
                        relevance_score = 1.0 - (idx * 0.1)
                        
                        all_extracts.append(result.page_content)
                        all_sources.append({
                            "filename": result.metadata.get("filename", "unknown"),
                            "page": result.metadata.get("page", 0),
                            "chunk": result.metadata.get("chunk", 0),
                            "content_preview": result.page_content[:100] + "..." if len(result.page_content) > 100 else result.page_content,
                            "document_id": doc_id,
                            "relevance_score": relevance_score,
                            "title": f"{result.metadata.get('filename', 'Document')} - Page {result.metadata.get('page', 0)}"
                        })
                        
                except Exception as doc_error:
                    print(f"Error searching document {doc_id}: {str(doc_error)}")
                    continue
            
            if not all_extracts:
                return {
                    "success": False,
                    "response": "No content found in any of the documents for your query.",
                    "content_type": "markdown",
                    "sources": [],
                    "top_source_suggestions": []
                }
            
            # Sort sources by relevance score for display only
            all_sources.sort(key=lambda x: x['relevance_score'], reverse=True)

            # Get conversation history for context
            conversation_history = ""
            if session_id:
                conversation_history = self._get_conversation_history(session_id)
            

            # Combine all extracts (limit to prevent token overflow)
            max_extracts = 10  # Limit to top results
            combined_extract = "\n".join(all_extracts[:max_extracts])
            
            # Create prompt with combined context and conversation history
            full_prompt = self.prompt_template.format(
                conversation_history=conversation_history,
                pdf_extract=combined_extract,
                question=query
            )
            
            # Generate a cache key for this specific multi-document query
            # Sort document IDs to ensure consistent cache key regardless of order
            sorted_doc_ids = sorted(document_ids)
            cache_key = f"multi_doc_response_{'_'.join(sorted_doc_ids)}_{hash(query)}"
            
            # Check if we have a cached response
            if cache_key in self.response_cache:
                print(f"Using cached multi-document response")
                cached_response = self.response_cache[cache_key]
                return {
                    "success": True,
                    "response": cached_response["response"],
                    "content_type": "markdown",
                    "sources": cached_response["sources"],
                    "top_source_suggestions": cached_response.get("top_source_suggestions", [])
                }
            
            # Generate response using OpenAI
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that can search across multiple documents and maintain conversation context."},
                    {"role": "user", "content": full_prompt}
                ],
                max_tokens=1500  # Limit token count for faster responses
            )
            
            response_text = response.choices[0].message.content
            
            # Extract suggestions from the AI response and clean the main response
            suggestions = []
            main_response = response_text
            
            # First, clean any unwanted section headers from the response
            unwanted_headers = [
                "### YOUR RESPONSE ###",
                "### INSTRUCTIONS FOR THE ASSISTANT ###", 
                "### CONVERSATION CONTEXT ###",
                "### PDF CONTENT ###",
                "### USER QUESTION ###"
            ]
            
            # Remove unwanted headers and clean the response
            for header in unwanted_headers:
                main_response = main_response.replace(header, "")
            
            # Look for suggestions in multiple formats and extract them
            suggestion_markers = [
                "### SUGGESTED QUESTIONS ###",
                "SUGGESTED QUESTIONS:",
                "### Suggested Questions", 
                "##Suggested Questions", 
                "Suggested Questions",
                "[Title: SUGGESTED QUESTIONS:]"
            ]
            
            for marker in suggestion_markers:
                if marker in main_response:
                    parts = main_response.split(marker)
                    main_response = parts[0].strip()
                    if len(parts) > 1:
                        suggestion_lines = parts[1].strip().split('\n')
                        for line in suggestion_lines:
                            line = line.strip()
                            # Extract numbered questions (1., 2., 3.)
                            if line and (line.startswith('1.') or line.startswith('2.') or line.startswith('3.')):
                                suggestion = line[2:].strip()  # Remove "1. " or "2. " etc.
                                if suggestion and not suggestion.startswith('[') and not suggestion.startswith('#'):
                                    suggestions.append(suggestion)
                    break  # Found suggestions, stop looking
            
            # Final cleanup of main response - remove any remaining ### symbols and empty lines
            main_response = main_response.replace("###", "").strip()
            
            # Remove multiple consecutive newlines and clean up spacing
            main_response = re.sub(r'\n\s*\n\s*\n', '\n\n', main_response)
            main_response = main_response.strip()
            
            # Update conversation memory
            if session_id:
                self._update_conversation_memory(session_id, query, main_response)
                
            # Cache the final response
            result = {
                "success": True,
                "response": main_response,
                "content_type": "markdown",
                "sources": all_sources[:max_extracts],
                "top_source_suggestions": suggestions
            }
            self.response_cache[cache_key] = result

            return result
            
        except Exception as e:
            return {
                "success": False,
                "response": f"Error searching multiple documents: {str(e)}",
                "content_type": "markdown",
                "sources": None,
                "top_source_suggestions": []
            }
