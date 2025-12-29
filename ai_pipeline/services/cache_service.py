from cachetools import TTLCache
import time
import json
import os
from pathlib import Path


class CacheService:
    def __init__(self, maxsize=100, ttl=3600):  # 1 hour TTL
        self.cache = TTLCache(maxsize=maxsize, ttl=ttl)
        self.cache_file = "cache_data.json"
        self.load_persistent_cache()
        
    def load_persistent_cache(self):
        """Load cache data from disk on startup"""
        loaded_from_file = False
        try:
            if os.path.exists(self.cache_file):
                with open(self.cache_file, 'r') as f:
                    data = json.load(f)
                    for key, value in data.items():
                        self.cache[key] = value
                print(f"Loaded {len(data)} items from persistent cache")
                loaded_from_file = True
        except Exception as e:
            print(f"Error loading persistent cache file: {e}")
        
        # Always scan disk to ensure we have the most up-to-date data
        # This will catch any documents that might have been added outside the cache
        self.rebuild_cache_from_disk(loaded_from_file)
    
    def rebuild_cache_from_disk(self, already_loaded=False):
        """Rebuild cache by scanning existing vector store directories"""
        try:
            vector_stores_dir = Path("vector_stores")
            if not vector_stores_dir.exists():
                print("No vector_stores directory found - starting with empty cache")
                return
                
            rebuilt_count = 0
            for doc_dir in vector_stores_dir.iterdir():
                if doc_dir.is_dir():
                    doc_id = doc_dir.name
                    # Check if this is a valid vector store directory
                    if (doc_dir / "index.faiss").exists() and (doc_dir / "index.pkl").exists():
                        # Try to extract filename from metadata if available
                        metadata_file = doc_dir / "metadata.json"
                        if metadata_file.exists():
                            try:
                                with open(metadata_file, 'r') as f:
                                    metadata = json.load(f)
                                    filename = metadata.get('filename', 'Unknown Document')
                                    chunks = metadata.get('chunks', 0)
                            except:
                                filename = 'Unknown Document'
                                chunks = 0
                        else:
                            filename = 'Unknown Document'
                            chunks = 0
                        
                        # Check if we already have this document in cache
                        cache_key = f"doc_info_{doc_id}"
                        if not already_loaded or cache_key not in self.cache:
                            # Reconstruct document info
                            doc_info = {
                                "filename": filename,
                                "status": "processed",
                                "chunks": chunks,
                                "path": str(doc_dir)
                            }
                            self.cache[cache_key] = doc_info
                            rebuilt_count += 1
                            print(f"Loaded document: {filename} ({chunks} chunks)")
                        
            if rebuilt_count > 0:
                print(f"Successfully loaded {rebuilt_count} documents from disk")
                self.save_persistent_cache()
            elif not already_loaded:
                print("No valid documents found in vector_stores directory")
                
        except Exception as e:
            print(f"Error rebuilding cache from disk: {e}")
    
    def save_persistent_cache(self):
        """Save cache data to disk"""
        try:
            cache_data = {}
            for key, value in self.cache.items():
                # Only save document info, not temporary data
                if key.startswith("doc_info_"):
                    cache_data[key] = value
            
            # First write to a temporary file, then rename
            temp_file = f"{self.cache_file}.tmp"
            with open(temp_file, 'w') as f:
                json.dump(cache_data, f, indent=2)
            
            # Use os.replace for atomic operation to prevent corruption
            import os
            os.replace(temp_file, self.cache_file)
            
            print(f"Saved {len(cache_data)} document entries to cache file")
        except Exception as e:
            print(f"Error saving persistent cache: {e}")

        
    def get(self, key):
        return self.cache.get(key)
    
    def set(self, key, value):
        self.cache[key] = value
        # Save to disk if it's document info
        if key.startswith("doc_info_"):
            self.save_persistent_cache()

    
    def delete(self, key):
        if key in self.cache:
            del self.cache[key]
            # Save to disk if it's document info
            if key.startswith("doc_info_"):
                self.save_persistent_cache()
    
    def clear(self):
        self.cache.clear()
        # Clear persistent cache file
        try:
            if os.path.exists(self.cache_file):
                os.remove(self.cache_file)
        except Exception as e:
            print(f"Error clearing persistent cache file: {e}")


# Global cache instance
cache_service = CacheService()
