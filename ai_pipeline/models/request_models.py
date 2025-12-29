from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class ChatRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "query": "What is the main topic of this document?",
                "document_id": "123e4567-e89b-12d3-a456-426614174000"
            }
        }
    )
    
    query: str
    document_id: Optional[str] = None

class MultiDocumentChatRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "query": "What are the key topics across all documents?",
                "document_ids": ["123e4567-e89b-12d3-a456-426614174000", "456e7890-e12b-34d5-a789-123456789abc"]
            }
        }
    )
    
    query: str
    document_ids: List[str]
    
class DocumentUploadRequest(BaseModel):
    filename: str
    content: bytes
