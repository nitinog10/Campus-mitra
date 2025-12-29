import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")  # Using same var name as requested
        self.vector_store_path = "vector_stores"
        self.temp_uploads_path = "temp_uploads"
        self.max_file_size = 20 * 1024 * 1024  # 20MB
        self.chunk_size = 4000
        self.chunk_overlap = 100  # Reduced overlap for faster processing
        self.similarity_search_k = 2  # Reduced from 3 to 2 for faster retrieval
        self.enable_response_cache = True  # Add caching flag

settings = Settings()
