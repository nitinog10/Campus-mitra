from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any

class DocumentResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "document_id": "123e4567-e89b-12d3-a456-426614174000",
                "message": "Document processed successfully"
            }
        }
    )
    
    success: bool
    document_id: str
    message: str

class ChatResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "response": "The document discusses...",
                "content_type": "markdown",
                "sources": [{"filename": "doc.pdf", "page": 1, "chunk": 0}]
            }
        }
    )
    
    success: bool
    response: str
    content_type: str = "markdown"  # Default to markdown
    sources: Optional[List[Dict[str, Any]]] = None
    
class StatusResponse(BaseModel):
    success: bool
    message: str
