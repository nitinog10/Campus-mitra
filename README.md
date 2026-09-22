# Campus-mitra - Documentation

## Project Overview

The `repo_a6308e84db08` repository is a comprehensive project that integrates an AI-driven document processing and chat system. The project is divided into several key components: `ai_pipeline`, `backend`, `chatbot-rag-langchain-main`, and `frontend`. 

The `ai_pipeline` folder contains a FastAPI-based application that processes documents, extracts text, creates embeddings, and stores them in a vector database. It includes services for caching, handling user queries, and processing documents. The `backend` folder is an Express.js application that manages user authentication, chat operations, and document management. It uses MongoDB for data storage and includes middleware for authentication, rate limiting, and file uploads.

The `chatbot-rag-langchain-main` folder likely contains a standalone chatbot application, though specific details are not provided. The `frontend` folder includes a React application that provides the user interface for interacting with the backend services. It includes components for document management, chat functionality, and UI elements.

This project uses a tech stack that includes Python for the AI pipeline, Node.js with Express for the backend, and React for the frontend. The components communicate through REST APIs, with the frontend sending requests to the backend, which in turn interacts with the AI pipeline for document processing and chat responses. The intended users of this project are likely developers and end-users who need a robust document management and AI-driven chat system.

## Architecture

## Architecture Overview

### Code Organization

The codebase is organized into several key directories, each serving a distinct purpose:

- **`ai_pipeline/`**: Contains the AI-related logic, including document processing, chat handling, and model management.
- **`backend/`**: Houses the backend server logic, including authentication, chat management, and document handling.
- **`chatbot-rag-langchain-main/`**: Contains the main chatbot logic using LangChain.
- **`frontend/`**: Contains the frontend application, including components, utilities, and views.

### Data Flow

1. **Frontend**: Users interact with the application through the frontend, which sends requests to the backend.
2. **Backend**: The backend handles these requests, processes them, and interacts with the AI pipeline as needed.
3. **AI Pipeline**: The AI pipeline processes documents, handles chat queries, and generates responses.
4. **Database**: Both the backend and AI pipeline interact with the database to store and retrieve data.

### Key Design Patterns

- **MVC (Model-View-Controller)**: Used in the backend to separate concerns. Controllers handle requests, models manage data, and views (in the frontend) display data.
- **Service Layer**: Both the backend and AI pipeline use a service layer to encapsulate business logic.
- **Middleware**: The backend uses middleware for authentication, rate limiting, and file uploads.

### Main Entry Points

- **Frontend**: `index.html` and `main.jsx` are the entry points for the frontend application.
- **Backend**: `index.js` initializes the Express server.
- **AI Pipeline**: `main.py` serves as the entry point for the FastAPI-based AI pipeline.

### Practical Notes

- **Configuration**: Configuration settings are stored in `settings.py` for the AI pipeline and `database.js` for the backend.
- **Dependencies**: Dependencies are managed through `package.json` files in both the AI pipeline and backend directories.
- **Models**: Data models are defined in `request_models.py` and `response_models.py` for the AI pipeline, and in the `models/` directory for the backend.
- **Services**: Business logic is encapsulated in service files such as `chat_service.py` and `aiProxyService.js`.
- **Utilities**: Utility functions are provided in files like `pdf_utils.py` and `jwtUtils.js`.

## Directory Structure

```
├── Namespace.md
├── README.md
├── package.json
├── ai_pipeline/
│   ├── README.md
│   ├── main.py
│   ├── package.json
│   ├── requirements.txt
│   ├── config/
│   │   └── settings.py
│   ├── models/
│   │   ├── request_models.py
│   │   └── response_models.py
│   ├── services/
│   │   ├── cache_service.py
│   │   ├── chat_service.py
│   │   └── document_processor.py
│   └── utils/
│       └── pdf_utils.py
├── backend/
│   ├── index.js
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── chatController.js
│       │   └── documentController.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── rateLimiter.js
│       │   └── upload.js
│       ├── models/
│       │   ├── AdminUser.js
│       │   ├── Conversation.js
│       │   ├── Document.js
│       │   └── index.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── chatRoutes.js
│       │   ├── documentRoutes.js
│       │   ├── index.js
│       │   └── telegramRoutes.js
│       ├── services/
│       │   ├── aiProxyService.js
│       │   └── authService.js
│       └── utils/
│           └── jwtUtils.js
├── chatbot-rag-langchain-main/
│   ├── README.md
│   ├── app.py
│   ├── brain.py
│   └── requirements.txt
├── frontend/
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   ├── client.js
│       │   └── index.js
│       ├── assets/
│       │   ├── Campusmitra_logo.svg
│       │   └── Campusmitra_text.svg
│       ├── components/
│       │   ├── DocumentList.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── index.js
│       │   ├── chat/
│       │   │   ├── ChatArea.jsx
│       │   │   ├── ChatHeader.jsx
│       │   │   ├── ChatTranscripts.jsx
│       │   │   ├── MessageBubble.jsx
│       │   │   ├── MessageInput.jsx
│       │   │   ├── MessageList.jsx
│       │   │   ├── SourceSuggestions.jsx
│       │   │   └── ChatWidget/
│       │   │       ├── ChatWidget.jsx
│       │   │       └── index.js
│       │   ├── document/
│       │   │   ├── DocumentList.jsx
│       │   │   ├── DocumentManager.jsx
│       │   │   ├── DocumentUploader.jsx
│       │   │   └── DocumentViewer.jsx
│       │   ├── layout/
│       │   │   └── ChatLayout.jsx
│       │   └── ui/
│       │       ├── avatar.jsx
│       │       ├── badge.jsx
│       │       ├── button.jsx
│       │       ├── card.jsx
│       │       ├── dialog.jsx
│       │       ├── input.jsx
│       │       ├── scroll-area.jsx
│       │       ├── sheet.jsx
│       │       └── textarea.jsx
│       ├── constants/
│       │   └── appConstants.js
│       ├── hooks/
│       │   └── useChat.js
│       ├── lib/
│       │   └── utils.js
│       ├── utils/
│       │   └── toast.js
│       └── views/
│           ├── AdminDashboard.jsx
│           ├── ChatbotView.jsx
│           └── LoginPage.jsx
├── scripts/
│   └── start-dev.js
└── telegram-bot/
    ├── README.md
    ├── index.js
    ├── package.json
    └── src/
        ├── handlers/
        │   ├── CommandHandler.js
        │   └── MessageHandler.js
        ├── services/
        │   ├── ApiClient.js
        │   └── BotService.js
        └── utils/
            ├── logger.js
            └── rateLimiter.js
```

## Dependencies

## Dependencies

### Major Libraries

#### Vite
- **Purpose**: Vite is a build tool that significantly improves the frontend development experience. It leverages native ES modules in the browser to serve modules over ES module imports during development.
- **Version Constraint**: `^7.1.4`
- **Type**: Production Dependency

#### Concurrently
- **Purpose**: Concurrently is a utility to run multiple commands concurrently. It is used in this project to start multiple workspaces simultaneously during development.
- **Version Constraint**: `^9.0.0`
- **Type**: Development Dependency

### Dependency Management

- **Production Dependencies**:
  - `vite`: Used for building and serving the frontend application.

- **Development Dependencies**:
  - `concurrently`: Used to run multiple development scripts concurrently for different workspaces.

## File Reference

This section contains detailed documentation for each source file in the repository.

### `Namespace.md`
**Language:** Md

Empty file.

---

### `README.md`
**Language:** Md

File too large for inline documentation.

---

### `package.json`
**Language:** Json

#### Module Overview

The `package.json` file is the backbone of our project's configuration. It specifies the project's name, sets it as private, and defines workspaces for different parts of the application. It also includes scripts for running various parts of the application in development mode, leveraging tools like `concurrently` to manage multiple processes.

#### Dependencies

| Package | Purpose | Version |
| --- | --- | --- |
| concurrently | Runs multiple commands concurrently | ^9.0.0 |
| vite | Build tool for faster development | ^7.1.4 |

#### Functions

There are no standalone functions defined in this file. All operations are managed through scripts.

#### Configuration

| Field | Purpose |
| --- | --- |
| workspaces | Defines the different parts of the project that are treated as separate workspaces |
| scripts | Defines various commands to run different parts of the application in development mode |

#### Notes

- The `dev` script runs a script that starts the development environment for the entire project.
- The `dev:all` script runs the development environment for all workspaces: frontend, backend, AI pipeline, and Telegram bot.
- The `dev:legacy` script runs the development environment for the frontend, backend, and AI pipeline only.
- The `telegram-bot` script runs the Telegram bot in production mode.
- The `telegram-bot:dev` script runs the Telegram bot in development mode.

---

### `ai_pipeline/README.md`
**Language:** Md

#### Module Overview

The `ai_pipeline` module is the backbone of Project campusmitra's AI capabilities. It integrates FastAPI for API management, LangChain for advanced language processing, OCR for text extraction from images, and a vector database for efficient data retrieval. This module orchestrates the entire AI workflow, from data ingestion to model inference and storage of results.

#### Dependencies

- **FastAPI**: Provides the web framework for building and running APIs.
- **LangChain**: Facilitates complex language processing tasks.
- **OCR**: Optical Character Recognition for extracting text from images.
- **Vector Database**: Stores and retrieves vector embeddings for efficient similarity searches.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Pipeline | Manages the entire AI workflow | `run()`, `initialize()`, `shutdown()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| preprocess_data | `data` | Processed data | Preprocesses input data for the AI pipeline |
| extract_text | `image` | Text string | Uses OCR to extract text from an image |
| infer_model | `input_vector` | Prediction result | Runs the machine learning model on the input vector |

#### Configuration

- **API_URL**: Base URL for the FastAPI server.
- **DB_CONNECTION_STRING**: Connection string for the vector database.

#### Notes

- Ensure Python virtual environments are used to avoid dependency conflicts.
- Always validate inputs before processing to avoid errors in the pipeline.
- Monitor API endpoints for performance and latency issues.

---

### `ai_pipeline/main.py`
**Language:** Python

#### Module Overview

The `ai_pipeline/main.py` file is the core of our AI pipeline, orchestrating the interaction between the user and the AI services. It sets up the FastAPI application, integrates necessary services, and defines the API endpoints for document processing and chat functionalities. This file is where the application starts, and it manages the initialization of services, directory creation, and the main API routes.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `FastAPI`, `File`, `UploadFile`, `HTTPException` | Core FastAPI functionalities for building and managing the API. |
| `CORSMiddleware` | Middleware to handle Cross-Origin Resource Sharing for the API. |
| `uvicorn` | ASGI server to run the FastAPI application. |
| `os`, `Path` | Utilities for handling file paths and directory operations. |
| `create_directories` | Custom utility to create necessary directories for the application. |
| `DocumentProcessor`, `ChatService` | Services for document processing and chat functionalities. |
| `ChatRequest`, `MultiDocumentChatRequest`, `DocumentResponse`, `ChatResponse`, `StatusResponse` | Models for request and response handling. |
| `settings` | Configuration settings for the application. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `read_root` | None | JSON | Returns a welcome message when the root URL is accessed. |
| `health_check` | None | JSON | Returns the health status of the service. |
| `process_document` | `file: UploadFile` | JSON | Processes an uploaded PDF document and returns the document ID. |
| `chat_query` | `request: ChatRequest` | JSON | Processes a chat query using the RAG pipeline and returns the response. |
| `search_multiple_documents` | `request: MultiDocumentChatRequest` | JSON | Searches across multiple documents and returns the best results. |
| `list_documents` | None | JSON | Lists all available documents. |
| `get_document_status` | `doc_id: str` | JSON | Returns the processing status of a document. |
| `delete_document` | `doc_id: str` | JSON | Deletes a document from the vector store. |

#### Configuration

The application uses settings from the `config.settings` module to configure various aspects of the API, such as allowed origins for CORS.

#### Notes

- The application initializes necessary directories and cache on startup.
- All endpoints handle exceptions and return appropriate HTTP status codes and messages.
- The application is designed to run on `0.0.0.0:8001` by default.

---

### `ai_pipeline/package.json`
**Language:** Json

#### Module Overview

The `ai_pipeline/package.json` file serves as the configuration backbone for our AI pipeline project. It specifies the project's name, version, main entry point, and the scripts required to run the application in both development and production environments. This JSON file is crucial for managing dependencies and automating tasks within the project.

#### Dependencies

This file does not directly list dependencies but relies on a separate `package-lock.json` or `yarn.lock` file for dependency management. The scripts provided are used to run the project's main Python file using Uvicorn.

#### Scripts

| Script | Purpose |
| --- | --- |
| `dev` | Starts the application in development mode with hot reload enabled. |
| `start` | Starts the application in production mode without hot reload. |

#### Notes

- Ensure you have the necessary Python environment set up before running the scripts.
- The `main.py` file is the entry point for the application and should be updated to include the main logic of the AI pipeline.
- The port and host configurations are set to `0.0.0.0` and `8001` respectively, which allows the application to be accessible from any network interface. Adjust these settings as needed for your environment.

---

### `ai_pipeline/requirements.txt`
**Language:** Txt

#### Module Overview

The `ai_pipeline/requirements.txt` file contains a list of Python packages essential for the operation of the AI pipeline. It ensures that all necessary libraries are installed and up-to-date, facilitating smooth development and deployment of the AI pipeline components. This file is crucial for maintaining consistency across different development environments.

#### Dependencies

| Package | Purpose | Description |
| --- | --- | --- |
| fastapi | Web framework | Provides a fast and efficient web framework for building APIs. |
| uvicorn | ASGI server | Serves ASGI applications, including FastAPI. |
| python-multipart | Parsing multipart/form-data | Handles multipart form data parsing. |
| pydantic | Data validation | Used for data validation and settings management. |
| python-dotenv | Environment variables | Loads environment variables from a `.env` file. |
| openai | Interface to the OpenAPI | Provides an interface to the OpenAPI service. |
| langchain | Language model framework | Framework for building applications with language models. |
| langchain-core | Core components | Core components for the LangChain framework. |
| langchain-community | Community extensions | Community-contributed extensions for LangChain. |
| langchain-openai | Integration with OpenAPI | Integration layer for OpenAPI with LangChain. |
| faiss-cpu | Approximate nearest neighbors | Provides CPU-based implementations of the FAISS library. |
| pypdf | PDF processing | Library for reading and writing PDF files. |
| cachetools | Caching library | Provides caching utilities to improve performance. |

#### Notes

- Ensure all dependencies are compatible with the current Python version used in the project.
- Regularly update the `requirements.txt` file to include any new dependencies or to pin versions to avoid breaking changes.
- Use a virtual environment to manage dependencies and avoid conflicts with other projects.

---

### `ai_pipeline/config/settings.py`
**Language:** Python

#### Module Overview

This file, `settings.py`, contains the configuration settings for the AI pipeline. It initializes a `Settings` class that loads environment variables and sets default values for various parameters used throughout the pipeline. These settings include API keys, file paths, and processing parameters like chunk size and overlap.

#### Dependencies

- `os`: Provides a way of using operating system dependent functionality like reading or writing to the file system.
- `dotenv`: A zero dependency Python library for loading environment variables from a `.env` file into `os.environ`.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Settings | Manages configuration settings for the AI pipeline | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| None | None | None | No functions are defined in this file |

#### Configuration

This file uses environment variables to configure the following settings:

- `OPENAI_API_KEY`: API key for accessing the OpenAPI service.
- `VECTOR_STORE_PATH`: Default path for vector stores.
- `TEMP_UPLOADS_PATH`: Default path for temporary uploads.

#### Constants

- `MAX_FILE_SIZE`: Maximum file size allowed for uploads, set to 20MB.
- `CHUNK_SIZE`: Size of chunks for processing, set to 4000.
- `CHUNK_OVERLAP`: Overlap between chunks, set to 100.
- `SIMILARITY_SEARCH_K`: Number of top documents to retrieve for similarity search, set to 2.
- `ENABLE_RESPONSE_CACHE`: Flag to enable response caching, set to `True`.

#### Notes

- Environment variables must be set in a `.env` file located in the root directory of the project.
- The `chunk_overlap` and `similarity_search_k` values are reduced for faster processing but can be adjusted as needed.
- Ensure that the `VECTOR_STORE_PATH` and `TEMP_UPLOADS_PATH` directories exist or are created before running the pipeline.

---

### `ai_pipeline/models/request_models.py`
**Language:** Python

#### Module Overview

This file defines the request models used in the AI pipeline. It leverages Pydantic to create data validation classes that ensure the incoming requests are correctly structured and contain the necessary data. These models are crucial for maintaining data integrity and consistency throughout the pipeline.

#### Dependencies

- `pydantic`: A library used for data validation and settings management in Python. It helps enforce data types and validates the structure of the incoming data.
- `typing`: Provides runtime type hint support, which helps with better code readability and error checking.

#### Classes

| Class               | Purpose                                                                                     | Key Methods |
|---------------------|---------------------------------------------------------------------------------------------|------------|
| `ChatRequest`       | Represents a request for a single document chat query.                                        | N/A        |
| `MultiDocumentChatRequest` | Represents a request for a chat query across multiple documents.                              | N/A        |
| `DocumentUploadRequest` | Represents a request to upload a new document, including its filename and content.           | N/A        |

#### Functions

There are no functions defined in this file.

#### Configuration

- `model_config`: Configuration dictionary used to provide extra JSON schema information for validation purposes.

#### Notes

- The `ChatRequest` and `MultiDocumentChatRequest` classes use `Optional` and `List` types respectively to handle optional fields and collections of document IDs.
- The `DocumentUploadRequest` class expects `filename` as a string and `content` as bytes, ensuring that document uploads are handled correctly.

---

### `ai_pipeline/models/response_models.py`
**Language:** Python

#### Module Overview

This file defines Pydantic models for various response types in the AI pipeline. These models ensure that the responses from different parts of the pipeline are structured and validated correctly. They are used to encapsulate the success status, relevant data, and any additional information needed by the client.

#### Dependencies

- `pydantic`: A library for data validation using Python type annotations.
- `typing`: Provides runtime support for type hints.

#### Classes

| Class       | Purpose                  | Key Methods |
|-------------|---------------------------|-------------|
| `DocumentResponse` | Represents a response for document processing. | N/A |
| `ChatResponse` | Represents a response for chat-based interactions. | N/A |
| `StatusResponse` | Represents a generic status response. | N/A |

### Classes

#### `DocumentResponse`

```python
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
```

#### `ChatResponse`

```python
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
```

#### `StatusResponse`

```python
class StatusResponse(BaseModel):
    success: bool
    message: str
```

#### Notes

- All response models use `BaseModel` from `pydantic` to ensure data validation and serialization.
- `DocumentResponse` includes fields for success status, document ID, and a message.
- `ChatResponse` includes fields for success status, the response text, content type, and optional sources.
- `StatusResponse` is a simple model for generic status updates.

---

### `ai_pipeline/services/cache_service.py`
**Language:** Python

#### Module Overview

The `ai_pipeline/services/cache_service.py` file implements the `CacheService` class, which provides an in-memory cache with time-to-live (TTL) functionality and persistent storage on disk. This service is designed to cache document information, ensuring that frequently accessed data remains readily available while also being saved to disk for durability. The cache is automatically loaded from disk on startup and rebuilt if necessary, with changes saved back to disk to prevent data loss.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `TTLCache` from `cachetools` | Provides an in-memory cache with TTL functionality |
| `time` | Provides time-related functions |
| `json` | Handles JSON serialization and deserialization |
| `os` | Provides a way of using operating system-dependent functionality |
| `Path` from `pathlib` | Offers an object-oriented interface for filesystem paths |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `CacheService` | Manages an in-memory cache with persistent storage | `__init__`, `load_persistent_cache`, `rebuild_cache_from_disk`, `save_persistent_cache`, `get`, `set`, `delete`, `clear` |

#### Functions

There are no standalone functions in this file.

#### Notes

- The cache uses a JSON file for persistent storage, located at `cache_data.json`.
- The cache is automatically loaded from disk when the `CacheService` instance is created.
- The cache is rebuilt from disk if it is not already loaded or if the disk contents have changed.
- Only document information is saved to the persistent cache; temporary data is not stored.
- The cache uses atomic file operations to prevent data corruption during writes.

---

### `ai_pipeline/services/chat_service.py`
**Language:** Python

#### Module Overview

The `chat_service.py` file defines the `ChatService` class, which is responsible for processing user queries, retrieving relevant context from documents, and generating AI-driven responses using the RAG (Retrieval-Augmented Generation) approach. It integrates with the `OpenAI` API for response generation, utilizes a `DocumentProcessor` for context retrieval, and maintains a simple in-memory cache and conversation history to improve efficiency and context awareness.

#### Dependencies

- `OpenAI`: For interacting with the OpenAI API to generate responses.
- `DocumentProcessor`: For retrieving relevant document context based on user queries.
- `cache_service`: For caching responses to reduce redundant API calls.
- `settings`: For configuration, including the OpenAI API key and other settings.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatService` | Manages the entire chat process, from query handling to response generation. | `__init__`, `_cleanup_cache`, `_get_conversation_history`, `_update_conversation_memory`, `get_response` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `_cleanup_cache` | None | None | Cleans up old cache entries to prevent memory bloat. |
| `_get_conversation_history` | `session_id: str`, `max_turns: int = 3` | `str` | Retrieves recent conversation history for a given session. |
| `_update_conversation_memory` | `session_id: str`, `question: str`, `response: str` | None | Updates the conversation memory with the latest question and response. |
| `get_response` | `query: str`, `document_id: Optional[str] = None`, `session_id: Optional[str] = None` | `Dict[str, Any]` | Generates a response for the user query, optionally using document context and conversation history. |

#### Configuration

- `settings.openai_api_key`: Required for initializing the `OpenAI` client.
- `settings.similarity_search_k`: Determines the number of similar documents to retrieve for context.

#### Constants

- `self.prompt_template`: A predefined template for generating prompts that guide the AI in responding to user queries.

#### Notes

- The conversation memory and response cache are currently implemented using simple in-memory storage. For production use, consider using a more robust storage solution like Redis or a database.
- The cache cleanup mechanism is simplistic and resets the entire cache when it exceeds 100 entries. This may need refinement for better performance and memory management.
- The response generation uses different OpenAI models (`gpt-3.5-turbo` for simple queries and `gpt-4o-mini` for document-based queries) to balance cost and performance.

---

### `ai_pipeline/services/document_processor.py`
**Language:** Python

#### Module Overview

This module contains the `DocumentProcessor` class, which handles the end-to-end processing of documents. It extracts text from PDFs, splits the text into manageable chunks, creates embeddings using OpenAI, and stores the resulting vector data in a FAISS index. The class also manages document metadata and caching for quick access.

#### Dependencies

- `re`, `os`, `pickle`, `hashlib`, `shutil`, `uuid`: Standard library modules for regex, OS operations, serialization, hashing, and UUID generation.
- `BytesIO` from `io`: For handling byte streams.
- `List`, `Tuple` from `typing`: For type annotations.
- `Document` from `langchain_core.documents`: Represents a document chunk.
- `OpenAIEmbeddings` from `langchain_openai`: For generating embeddings.
- `RecursiveCharacterTextSplitter` from `langchain_text_splitters`: For splitting text into chunks.
- `FAISS` from `langchain_community.vectorstores`: For creating and managing vector stores.
- `PdfReader` from `pypdf`: For parsing PDF files.
- `settings` from `config.settings`: For configuration values.
- `cache_service` from `services.cache_service`: For caching document information.

#### Classes

| Class             | Purpose                                                                                           | Key Methods                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `DocumentProcessor` | Handles document processing, including text extraction, chunking, embedding, and vector storage. | `_parse_pdf`, `_text_to_docs`, `_create_vector_store`, `process_document`, `get_vector_store`, `get_document_status`, `list_documents`, `delete_document` |

#### Functions

| Function              | Parameters                  | Returns                 | Description                                                                                       |
|-----------------------|-----------------------------|-------------------------|---------------------------------------------------------------------------------------------------|
| `_parse_pdf`          | `file_content: bytes`, `filename: str` | `Tuple[List[str], str]` | Parses PDF content and extracts text.                                                             |
| `_text_to_docs`       | `text: List[str]`, `filename: str` | `List[Document]`        | Converts text into document chunks.                                                               |
| `_create_vector_store` | `documents: List[Document]` | `FAISS`                 | Creates a FAISS vector store from documents.                                                      |
| `process_document`    | `file_content: bytes`, `filename: str` | `str`                   | Processes a document, extracts text, creates embeddings, and stores in vector database.            |
| `get_vector_store`    | `doc_id: str`               | `FAISS`                 | Loads the vector store for a given document ID.                                                   |
| `get_document_status` | `doc_id: str`               | `str`                   | Retrieves the processing status of a document.                                                     |
| `list_documents`      | None                        | `List[Dict]`            | Lists all available documents with their metadata.                                                |
| `delete_document`     | `doc_id: str`               | None                    | Deletes a document and its associated vector store.                                                |

#### Configuration

- `settings.openai_api_key`: Required for creating embeddings.
- `settings.chunk_size`, `settings.chunk_overlap`: Used for text splitting.
- `settings.vector_store_path`: Directory where vector stores are saved.

#### Constants

None

#### Notes

- Ensure `settings.openai_api_key` is correctly configured; otherwise, embedding and vector store creation will fail.
- Text extraction and chunking are critical steps; any issues here will affect the quality of the resulting vector store.
- The module relies heavily on caching for quick access to document metadata.

---

### `ai_pipeline/utils/pdf_utils.py`
**Language:** Python

#### Module Overview

This module contains utility functions that assist in processing PDF files within the AI pipeline. It includes methods to calculate SHA256 hashes of file contents, validate PDF files based on their extensions, and format file sizes into a human-readable format. These utilities are integral for ensuring data integrity and providing clear file information.

#### Dependencies

- `hashlib`: Used for calculating SHA256 hashes.
- `typing`: Provides type hints for function parameters and return types.

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `calculate_file_hash` | `file_content: bytes` | `str` | Calculates the SHA256 hash of the provided file content. |
| `validate_pdf_file` | `filename: str` | `bool` | Validates if the given filename ends with a `.pdf` extension. |
| `format_file_size` | `size_bytes: int` | `str` | Formats the file size into a human-readable string. |

#### Notes

- `calculate_file_hash` expects the file content as a byte stream.
- `validate_pdf_file` only checks the file extension and does not verify the file's internal structure.
- `format_file_size` handles sizes starting from 0 bytes and scales up to gigabytes.

---

### `backend/index.js`
**Language:** Javascript

#### Module Overview

The `backend/index.js` file serves as the entry point for our Express application. It initializes the server, connects to the database, sets up security and CORS configurations, and defines the routes and middleware used by the application. This file is crucial for ensuring that the backend is properly configured and ready to handle incoming requests.

### Dependencies

| Import | Purpose |
| ------ | ------- |
| `express` | Framework for building web applications. |
| `cors` | Middleware to enable Cross-Origin Resource Sharing. |
| `helmet` | Middleware to secure Express apps by setting various HTTP headers. |
| `dotenv` | Module to load environment variables from a `.env` file. |
| `./src/config/database.js` | Module to connect to the database. |
| `./src/routes/index.js` | File containing API routes. |
| `./src/middleware/rateLimiter.js` | Middleware to limit the rate of requests. |

### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `app.get("/")` | `(req, res)` | JSON response | Root endpoint to check server status and list available endpoints. |

### Notes

- Ensure the `.env` file is properly configured with the necessary environment variables.
- The `apiLimiter` middleware is applied to all routes under `/api` to prevent abuse.
- The server listens on the port specified in the environment variable `PORT`, defaulting to `3001`.

---

### `backend/package.json`
**Language:** Json

#### Module Overview

The `backend/package.json` file is the central configuration file for our backend project. It specifies the project's dependencies, which are crucial libraries and frameworks that our backend relies on to function correctly. It also outlines the scripts that are used to run the application in both development and production environments.

#### Dependencies

This file lists the key dependencies required for the backend project and their purposes:

| Library | Purpose | Version |
| --- | --- | --- |
| bcrypt | Used for hashing passwords securely. | ^6.0.0 |
| cors | Enables Cross-Origin Resource Sharing for handling requests from different origins. | ^2.8.5 |
| dotenv | Loads environment variables from a `.env` file into `process.env`. | ^17.2.2 |
| express | A minimal and flexible Node.js web application framework. | ^5.1.0 |
| express-rate-limit | Adds rate limiting middleware to Express. | ^8.1.0 |
| express-validator | Provides middleware for validation of request data. | ^7.2.1 |
| helmet | Helps to secure Express apps by setting various HTTP headers. | ^8.1.0 |
| jsonwebtoken | Used for creating, verifying, and decoding JSON Web Tokens. | ^9.0.2 |
| mongoose | Object Data Modeling (ODM) library for MongoDB and Node.js. | ^8.18.0 |
| multer | Used for handling `multipart/form-data`, which is primarily used for uploading files. | ^2.0.2 |

#### Scripts

The `scripts` section defines the commands that can be run to start the backend application in different environments:

| Script | Description |
| --- | --- |
| `dev` | Runs the application in development mode using `node index.js`. |
| `start` | Starts the application in production mode using `node index.js`. |

#### Notes

- Ensure that the `.env` file is properly configured with necessary environment variables before running the application.
- The `bcrypt` library is essential for password security and should be used whenever password hashing is required.
- The `helmet` middleware is crucial for securing the Express application by setting various HTTP headers.

---

### `backend/src/config/database.js`
**Language:** Javascript

#### Module Overview

This file is responsible for connecting to the MongoDB database using Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. It sets up event listeners for connection errors and disconnections, and ensures a graceful shutdown when the application is terminated.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `mongoose` | MongoDB ODM (Object Data Modeling) library for MongoDB and Node.js |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `connectDB` | None | Promise | Connects to the MongoDB database and handles connection events |

#### Configuration

None

#### Notes

- The database URL is fetched from the `DB_URL` environment variable.
- Connection errors are logged to the console.
- Disconnection events are silently handled.
- Graceful shutdown is ensured by closing the database connection when the application receives a SIGINT signal.

---

### `backend/src/controllers/authController.js`
**Language:** Javascript

#### Module Overview

The `authController.js` file is a crucial part of our backend, managing the authentication process for users. It validates login requests and checks credentials against our authentication service. If the login is successful, it returns a token and user information; otherwise, it returns appropriate error messages.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `authenticateAdmin` from `../services/authService.js` | Service function to authenticate admin users. |
| `body`, `validationResult` from `express-validator` | Middleware to validate request bodies and check for validation errors. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateLogin` | N/A | Array of validation middleware | Defines validation rules for the login request. |
| `login` | `req`, `res` | JSON response | Handles the login process, validates input, authenticates the user, and sends a response. |

#### Notes

- The `validateLogin` function is used as middleware in routes to ensure the login request meets the specified criteria before reaching the `login` function.
- The `login` function catches and logs any errors during the authentication process, ensuring the server can handle unexpected issues gracefully.

---

### `backend/src/controllers/chatController.js`
**Language:** Javascript

#### Module Overview

This file defines the `chatController.js` module, which is responsible for managing chat interactions within our application. It interfaces with our AI service to process questions, maintains conversation state, and provides administrative endpoints for conversation management. The module ensures that chat requests are validated, processed, and responded to in a structured manner, while also offering functionality to retrieve and delete conversations for administrative purposes.

#### Dependencies

- `aiProxyService.js`: Provides methods to interact with the AI service for question processing.
- `models/index.js`: Imports `Conversation` and `Document` models for database operations.
- `express-validator`: Used for validating incoming request data.
- `requestUtils.js`: Utility functions for generating session IDs and extracting request metadata.

#### Functions

| Function               | Parameters           | Returns         | Description                                                                                       |
|------------------------|----------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `validateQuestion`     | -                    | Validation rules| Express validator middleware to ensure the question is properly formatted and within length limits.|
| `ask`                  | `req`, `res`         | Response object | Processes a chat question, optionally within a conversation, and returns the AI-generated response.|
| `askAboutDocument`     | `req`, `res`         | Response object | Processes a question about a specific document and returns the AI-generated response.             |
| `getConversations`     | `req`, `res`         | Response object | Retrieves a paginated list of active conversations for administrative review.                     |
| `getConversation`      | `req`, `res`         | Response object | Fetches details of a specific conversation by ID for administrative purposes.                     |
| `deleteConversation`   | `req`, `res`         | Response object | Deletes a conversation by ID, used for administrative cleanup.                                    |

#### Notes

- Error handling is robust, with specific responses for validation errors, not found errors, and server errors.
- Administrative endpoints (`getConversations`, `getConversation`, `deleteConversation`) are intended for use by authorized users only.
- The `ask` function attempts a multi-document search before falling back to a general chat query if the initial attempt fails.

---

### `backend/src/controllers/documentController.js`
**Language:** Javascript

#### Module Overview

The `documentController.js` file is a crucial part of our backend, managing all document-related operations. It interacts with the AI service to upload, retrieve, and delete documents, ensuring seamless document management within our application. This controller also handles validation for document uploads and serves document files directly to clients.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `uploadDocumentToAI`, `getIndexedDocuments`, `updateDocumentStatus`, `checkDocumentStatus`, `deleteDocumentFromAI` | Functions from `aiProxyService.js` to interact with the AI service. |
| `Document` | Mongoose model for document data. |
| `body`, `validationResult` | Express middleware for request validation. |
| `fs`, `path` | Node.js modules for file system operations and path handling. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateUpload` | N/A | Array of validation middleware | Provides validation rules for document uploads. |
| `uploadDocument` | `req`, `res` | JSON response | Handles document upload, validates input, and interacts with the AI service. |
| `getAnnouncements` | `req`, `res` | JSON response | Fetches and returns all indexed documents from the AI service. |
| `updateDocumentStatusWebhook` | `req`, `res` | JSON response | Updates the document status based on webhook data from the AI pipeline. |
| `viewDocument` | `req`, `res` | Stream | Serves the requested document file to the client. |
| `getDocumentStatus` | `req`, `res` | JSON response | Retrieves and returns the status of a specific document. |
| `deleteDocument` | `req`, `res` | JSON response | Deletes a document from the AI service. |

#### Notes

- The `validateUpload` function is used as middleware in routes to validate document upload requests.
- The `uploadDocument` function assumes the presence of a file in `req.file` and a user ID in `req.user?.id`.
- The `viewDocument` function streams the document file directly to the client, setting appropriate headers for content type and disposition.
- Error handling in all functions ensures that appropriate HTTP status codes and messages are returned to the client.

---

### `backend/src/middleware/auth.js`
**Language:** Javascript

#### Module Overview

The `backend/src/middleware/auth.js` file defines two middleware functions to handle authentication in the backend. The `authenticateAdmin` middleware ensures that only authenticated admin users can access certain routes, while the `optionalAuth` middleware allows for optional authentication on public endpoints. These middleware functions are essential for securing routes that require user authentication and for providing user context where needed.

### Dependencies

| Import | Purpose |
| --- | --- |
| `validateToken` from `../services/authService.js` | Validates the JWT token and returns user information if valid. |

### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `authenticateAdmin` | `req`, `res`, `next` | None | Middleware to authenticate admin requests. It checks for a valid JWT token in the Authorization header. If valid, it attaches the user info to the request object and calls the next middleware. If invalid or missing, it returns a 401 status with an appropriate message. |
| `optionalAuth` | `req`, `res`, `next` | None | Middleware for optional authentication on public endpoints. It checks for a valid JWT token in the Authorization header. If valid, it attaches the user info to the request object. If invalid or missing, it simply calls the next middleware without failing the request. |

### Notes

- The `authenticateAdmin` middleware is designed to be used on routes that require admin access. It ensures that only authenticated admin users can proceed.
- The `optionalAuth` middleware is useful for public endpoints that might benefit from having user context. It does not block the request if the token is missing or invalid.
- Always ensure that these middleware functions are used appropriately to maintain the security and integrity of your application.

---

### `backend/src/middleware/rateLimiter.js`
**Language:** Javascript

#### Module Overview

This file defines several rate limiting middlewares using the `express-rate-limit` package. These middlewares are designed to prevent Distributed Denial of Service (DDoS) attacks by limiting the number of requests that can be made from a single IP address within a specified time window. This helps to ensure the stability and availability of our backend services.

#### Dependencies

| Package | Purpose |
| --- | --- |
| `express-rate-limit` | Provides rate limiting functionality for Express.js applications. |

#### Classes

There are no classes defined in this file.

#### Functions

There are no functions defined in this file. Instead, we have rate limiter configurations.

#### Configuration

| Middleware | Window | Max Requests | Purpose |
| --- | --- | --- | --- |
| `apiLimiter` | 15 minutes | 100 | General rate limiting for API endpoints. |
| `authLimiter` | 15 minutes | 5 | Rate limiting specifically for authentication endpoints. |
| `chatLimiter` | 1 minute | 10 | Rate limiting for chat/ask endpoints. |

#### Notes

- Each rate limiter configuration includes a custom error message and retry-after period.
- The `standardHeaders` option is set to `true` to include rate limit information in the `RateLimit-*` headers.
- The `legacyHeaders` option is set to `false` to avoid using the `X-RateLimit-*` headers.

---

### `backend/src/middleware/upload.js`
**Language:** Javascript

#### Module Overview

The `upload.js` file provides middleware for managing file uploads in the backend. It uses the `multer` library to handle file uploads, including setting file size limits and filtering file types. Additionally, it includes an error handling middleware to manage and respond to errors that occur during the upload process.

**Dependencies**

| Import | Purpose |
| :----- | :------ |
| multer | Handles multipart/form-data, used for uploading files. |
| path | Provides utilities for working with file and directory paths. |

**Functions**

| Function | Parameters | Returns | Description |
| :------- | :-------- | :------ | :---------- |
| upload | N/A | multer instance | Configures multer for file uploads with memory storage, file size limits, and file type filtering. |
| handleUploadError | error, req, res, next | N/A | Handles errors that occur during file uploads, providing appropriate responses. |

**Configuration**

| Variable | Default Value | Description |
| :------- | :------------ | :---------- |
| MAX_FILE_SIZE_MB | 20 | Maximum file size in megabytes, configurable via environment variables. |
| ALLOWED_FILE_TYPES | ["pdf"] | Array of allowed file types, configurable via environment variables. |

**Notes**

- The `fileFilter` function ensures that only files of specified types are allowed.
- The `upload` middleware is exported and can be used in routes to handle file uploads.
- The `handleUploadError` middleware is designed to catch and handle errors thrown by `multer`.

---

### `backend/src/models/AdminUser.js`
**Language:** Javascript

#### Overview

This file defines the Mongoose schema and model for an admin user, including password hashing and comparison methods.

#### Module Overview

This file is a crucial part of our backend, defining the structure and behavior of an admin user in our application. It uses Mongoose to create a schema for storing admin user data in MongoDB, including methods for hashing passwords and comparing them during login attempts. The model also ensures that sensitive information like passwords is not exposed in JSON responses.

**Dependencies**

| Import | Purpose |
| --- | --- |
| `mongoose` | Provides schema and model functionality for MongoDB. |
| `bcrypt` | Used for hashing and verifying passwords. |

**Classes**

| Class | Purpose |
| --- | --- |
| `AdminUser` | Represents an admin user in the database, including methods for password management. |

**Functions**

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `comparePassword` | `candidatePassword` (String) | Boolean | Compares a candidate password with the hashed password stored in the database. |

**Notes**

- The `comparePassword` method is essential for authentication. It should be used whenever a user attempts to log in.
- The `toJSON` method is crucial for security, ensuring that the password field is not included in any JSON responses.
- The `pre` hook for the `save` event ensures that passwords are always hashed before being saved to the database.

---

### `backend/src/models/Conversation.js`
**Language:** Javascript

#### Module Overview

This file is a crucial part of our backend, defining how conversation data is structured, stored, and manipulated in our MongoDB database. It uses Mongoose to create a schema for conversations, which includes details like the session ID, messages, and metadata such as timestamps and user information. This model is essential for maintaining the integrity and accessibility of conversation data across our application.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| mongoose | Provides a schema-based solution to model application data and includes built-in typecasting, validation, query building, and business logic hooks. |

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| Conversation | Represents a conversation in the database, including its messages and metadata. | `addMessage` |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `addMessage` | `messageData` | `Promise<Conversation>` | Adds a new message to a conversation and updates the last activity timestamp. |

#### Notes

- The `addMessage` method automatically updates the `lastActivity` timestamp to the current date and time whenever a new message is added.
- The schema includes indexes on `startTime` and a compound index on `isActive` and `lastActivity` to optimize query performance.
- The `messageSchema` is embedded within the `conversationSchema` to maintain a one-to-many relationship between conversations and messages.

---

### `backend/src/models/Document.js`
**Language:** Javascript

#### Module Overview

This file defines the schema and model for documents within our application using Mongoose. It specifies the structure of document data, including validation rules and default values. The schema is designed to ensure data integrity and facilitate efficient querying of document records.

**Dependencies**

| Import | Purpose |
| --- | --- |
| `mongoose` | Provides schema definition and model creation for MongoDB. |

**Classes**

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `Document` | Represents a document in the database. | N/A |

**Configuration**

- Schema validation ensures fields like `title`, `filename`, and `size` meet specific criteria.
- Indexes are created for `status`, `uploadDate`, and `uploadedBy` to optimize query performance.

**Notes**

- The `uploadDate` field defaults to the current date and time when a document is created.
- The `status` field has predefined values to track the document's processing state.
- The `uploadedBy` field references the `AdminUser` model, linking documents to the user who uploaded them.

---

### `backend/src/models/index.js`
**Language:** Javascript

#### Module Overview

The `backend/src/models/index.js` file serves as the entry point for all model definitions in the backend application. It imports and exports key models such as `AdminUser`, `Document`, and `Conversation`, which are essential for representing different entities within the application's data layer. These models are used throughout the backend to interact with the database and manage data operations.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `AdminUser` | Represents the admin user model. |
| `Document` | Represents the document model. |
| `Conversation` | Represents the conversation model. |
| `utilityFunction1`, `utilityFunction2` | Utility functions from the `utilities.js` module. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `AdminUser` | Manages admin user data. | N/A |
| `Document` | Manages document data. | N/A |
| `Conversation` | Manages conversation data. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `utilityFunction1` | Varies | Varies | Utility function 1 from `utilities.js`. |
| `utilityFunction2` | Varies | Varies | Utility function 2 from `utilities.js`. |

#### Notes

- The file includes commented-out code for running regression tests, which can be enabled by uncommenting the respective lines.
- Ensure that all model definitions are correctly imported and exported to maintain the integrity of the data layer.

---

### `backend/src/routes/authRoutes.js`
**Language:** Javascript

#### Module Overview

The `authRoutes.js` file sets up the Express routes for handling authentication-related requests. It defines a single route for admin login, which includes middleware for rate limiting and validation before the actual login logic is executed. This file ensures that all authentication requests are routed correctly and handled securely.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | Provides the router instance for defining routes. |
| `login` | Controller function to handle the actual login logic. |
| `validateLogin` | Controller function to validate login credentials. |
| `authLimiter` | Middleware to limit the rate of login attempts to prevent brute force attacks. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.post('/login', authLimiter, validateLogin, login)` | `req, res` objects from Express | `res` object with user session or error message | Defines the POST route for admin login, applying rate limiting and validation middleware before executing the login logic. |

#### Notes

- The `authLimiter` middleware helps prevent brute force attacks by limiting the number of login attempts from a single IP address.
- The `validateLogin` function ensures that the provided credentials are correct before proceeding to the `login` function.
- The `login` function handles the final step of creating a user session upon successful validation.

---

### `backend/src/routes/chatRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the route handlers for chat-related API endpoints in our backend. It defines several endpoints for interacting with chat functionalities, including asking questions to the AI, managing conversations, and deleting conversations. These routes are protected with various middleware to ensure proper validation, rate limiting, and admin authentication.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | Framework for handling HTTP requests |
| `ask`, `validateQuestion`, `getConversations`, `getConversation`, `deleteConversation`, `askAboutDocument` | Chat-related controller functions |
| `authenticateAdmin` | Middleware to authenticate admin users |
| `chatLimiter`, `apiLimiter` | Middleware to apply rate limiting |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.post("/ask", chatLimiter, validateQuestion, ask)` | `req`, `res` | `res` | Handles POST requests to ask a question to the AI |
| `router.post("/ask-document", chatLimiter, validateQuestion, askAboutDocument)` | `req`, `res` | `res` | Handles POST requests to ask a question about a specific document |
| `router.get("/conversations", apiLimiter, authenticateAdmin, getConversations)` | `req`, `res` | `res` | Handles GET requests to get all conversations (admin only) |
| `router.get("/conversations/:id", apiLimiter, authenticateAdmin, getConversation)` | `req`, `res` | `res` | Handles GET requests to get a specific conversation (admin only) |
| `router.delete("/conversations/:id", apiLimiter, authenticateAdmin, deleteConversation)` | `req`, `res` | `res` | Handles DELETE requests to delete a specific conversation (admin only) |

#### Notes

- All admin-only routes are protected by the `authenticateAdmin` middleware.
- Rate limiting is applied to all chat-related POST requests to prevent abuse.
- The `validateQuestion` middleware ensures that incoming questions are valid before they are processed by the `ask` or `askAboutDocument` functions.

---

### `backend/src/routes/documentRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the Express routes for handling document-related operations. It includes endpoints for uploading, viewing, deleting, and managing the status of documents, all of which are restricted to admin users. The routes leverage various middleware functions to enforce rate limits, authentication, and error handling.

#### Dependencies

- `express`: The web framework for routing.
- `../controllers/documentController.js`: Contains the controllers for document operations.
- `../middleware/auth.js`: Provides middleware for admin authentication.
- `../middleware/upload.js`: Contains middleware for handling file uploads and errors.
- `../middleware/rateLimiter.js`: Middleware to limit the number of requests.

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getAnnouncements` | None | Array of documents | Retrieves all uploaded documents. |
| `uploadDocument` | `req`, `res` | None | Handles the upload of a new document. |
| `validateUpload` | `req`, `res`, `next` | None | Validates the uploaded document. |
| `updateDocumentStatusWebhook` | `req`, `res` | None | Updates document status based on webhook data. |
| `viewDocument` | `req`, `res` | Document content | Retrieves the content of a specific document. |
| `deleteDocument` | `req`, `res` | None | Deletes a specific document. |
| `getDocumentStatus` | `req`, `res` | Document status | Retrieves the processing status of a document. |

#### Configuration

- `apiLimiter`: Middleware to limit the number of requests to the endpoints.

#### Notes

- All document-related routes are protected by admin authentication middleware.
- The `upload` middleware handles file uploads and expects a single file named `document`.
- Error handling for file uploads is managed by `handleUploadError` middleware.
- The `updateDocumentStatusWebhook` function is designed to handle webhook notifications for document processing status updates.

---

### `backend/src/routes/index.js`
**Language:** Javascript

#### Module Overview

This file defines the main routing structure for our backend API. It imports and mounts several route modules, each handling different aspects of our application, such as authentication, document management, chat functionality, and Telegram integration. Additionally, it includes a simple health check endpoint to verify the API's operational status.

#### Dependencies

- `express`: A web framework for Node.js, used to create the router and handle HTTP requests.
- `authRoutes.js`: Routes for authentication-related endpoints.
- `documentRoutes.js`: Routes for document management.
- `chatRoutes.js`: Routes for chat-related functionality.
- `telegramRoutes.js`: Routes for Telegram integration.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `Router` | Express router instance used to define and manage routes. | `use()`, `get()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.use("/auth", authRoutes)` | `path`, `handler` | None | Mounts the authentication routes. |
| `router.use("/documents", documentRoutes)` | `path`, `handler` | None | Mounts the document management routes. |
| `router.use("/chat", chatRoutes)` | `path`, `handler` | None | Mounts the chat routes. |
| `router.use("/telegram", telegramRoutes)` | `path`, `handler` | None | Mounts the Telegram integration routes. |
| `router.get("/health",...)` | `req`, `res` | JSON response | Returns a health check status. |

#### Notes

- The `/health` endpoint provides a simple way to check if the API is running correctly.
- Each route module is mounted under a specific path, which helps in organizing and managing the routes efficiently.
- This setup allows for easy addition or removal of route modules without altering the main routing logic.

---

### `backend/src/routes/telegramRoutes.js`
**Language:** Javascript

#### Module Overview

This file defines the routes for the Telegram bot, handling user questions, document-specific queries, and health checks. It integrates with the `aiProxyService` to process questions and applies rate limiting to prevent abuse.

#### Dependencies

- `express`: Core framework for defining routes.
- `express-validator`: For validating incoming request data.
- `aiProxyService`: Service module for processing questions and conversations.
- `express-rate-limit`: For applying rate limiting to Telegram routes.

#### Functions

| Function                  | Parameters                  | Returns   | Description                                                                                           |
|---------------------------|-----------------------------|-----------|-------------------------------------------------------------------------------------------------------|
| `validateTelegramRequest` | -                           | Middleware| Validation rules for Telegram bot requests.                                                           |
| `telegramAsk`             | `req`, `res`                | -         | Handles asking a question via Telegram bot.                                                           |
| `telegramAskDocument`     | `req`, `res`                | -         | Handles asking a question about a specific document via Telegram bot.                                |
| `telegramHealthCheck`     | `req`, `res`                | -         | Provides a health check endpoint for the Telegram bot.                                               |

#### Configuration

- `telegramRateLimit`: Rate limiting configuration for Telegram bot requests.

#### Notes

- Rate limiting is applied to all Telegram routes to prevent abuse.
- Validation errors result in a 400 response with detailed error messages.
- Health check endpoint provides basic system status and uptime.

---

### `backend/src/services/aiProxyService.js`
**Language:** Javascript

#### Module Overview

This module serves as a bridge between our application and the AI pipeline. It handles the upload of documents to the AI system, manages the conversation state, and integrates with the AI pipeline for question answering. It ensures that documents are processed and stored correctly, and that user questions are handled efficiently, either through mock responses in development or real AI interactions in production.

#### Dependencies

- `Document` and `Conversation` models: For database interactions related to documents and conversations.
- `axios`: For making HTTP requests to the AI pipeline.
- `fs` and `path`: For file system operations, specifically saving uploaded documents locally.
- Utility functions `truncateMessage` and `ensureUploadsDir`: For message truncation and ensuring the uploads directory exists.

#### Configuration

- `AI_PIPELINE_URL`: The base URL of the AI pipeline service. Defaults to `http://localhost:8001` if not set.
- `MOCK_MODE`: A boolean indicating whether to use mock responses for development purposes. Activated if `MOCK_AI_PIPELINE` environment variable is set to "true".

#### Functions

| Function                        | Parameters                                                  | Returns                                                                                           | Description                                                                                       |
|---------------------------------|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `uploadDocumentToAI`            | `file`, `title`, `uploadedBy`                               | `{ success: boolean, message: string, document: object }`                                         | Uploads a document to the AI pipeline, saves it to the database, and updates its status.         |
| `getIndexedDocuments`           | None                                                        | `{ success: boolean, documents: array }`                                                           | Retrieves all indexed documents from the database, including user information.                   |
| `askQuestion`                   | `question`, `sessionId`, `userIp`, `userAgent`              | `{ success: boolean, response: string, content_type: string, sources: array, conversationId: string }` | Processes a user question, interacts with the AI pipeline, and saves the conversation.           |
| `addMessageToConversation`      | `conversationId`, `message`, `sessionId`                     | `{ success: boolean, response: string, content_type: string, sources: array, conversationId: string }` | Adds a message to an existing conversation or starts a new one if the conversation is not found. |

#### Notes

- In mock mode, document processing and AI responses are simulated to facilitate development and testing without relying on the actual AI pipeline.
- Error handling is implemented to manage issues with the AI pipeline, including specific checks for OpenAI API key configuration errors.
- Conversations are designed to be stateful, maintaining a history of messages to provide context for the AI's responses.

---

### `backend/src/services/authService.js`
**Language:** Javascript

#### Module Overview

The `authService.js` file provides essential authentication services for the admin user. It includes functions to create a default admin user, authenticate an admin user, validate JWT tokens, and retrieve a user by ID. This module ensures secure and efficient handling of admin authentication within the application.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `AdminUser` | Mongoose model for admin users. |
| `generateToken` | Utility function to create JWT tokens. |
| `verifyToken` | Utility function to verify JWT tokens. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `createDefaultAdmin` | None | None | Creates a default admin user if it doesn't exist. |
| `authenticateAdmin` | `username`, `password` | `{ success: boolean, message: string, user: object, token: string }` | Authenticates an admin user and returns a JWT token if successful. |
| `validateToken` | `token` | `{ success: boolean, message: string, user: object }` | Validates a JWT token and returns user information if valid. |
| `getUserById` | `userId` | `AdminUser` or throws error | Retrieves an admin user by their ID. |

#### Notes

- The `createDefaultAdmin` function ensures that a default admin user is created only if it doesn't already exist.
- The `authenticateAdmin` function checks the username and password, and if valid, generates a JWT token.
- The `validateToken` function verifies the JWT token and checks if the user still exists in the database.
- The `getUserById` function retrieves a user by their ID and throws an error if the user is not found.

---

### `backend/src/utils/jwtUtils.js`
**Language:** Javascript

#### Module Overview

This file, `jwtUtils.js`, provides essential functions for creating, verifying, and decoding JSON Web Tokens (JWT). It uses the `jsonwebtoken` library to manage JWT operations, which are crucial for securing API endpoints and maintaining user sessions. The utilities here ensure that tokens are generated securely, verified against specified criteria, and decoded for extracting payload information.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `jsonwebtoken` | A library for encoding and decoding JWTs, and for verifying the signature. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `generateToken` | `payload` | `string` | Generates a JWT with the provided payload and returns it. |
| `verifyToken` | `token` | `object` or `Error` | Verifies the provided JWT and returns the decoded payload if valid. Throws an error if the token is invalid or expired. |
| `decodeToken` | `token` | `object` or `Error` | Decodes the JWT to retrieve its payload without verification. Throws an error if decoding fails. |

#### Configuration

| Constant | Purpose |
| --- | --- |
| `JWT_SECRET` | The secret key used for signing the JWT. Should be a secure, long, random string in production. |
| `JWT_EXPIRES_IN` | The expiration time for the JWT, defaulting to 7 days if not specified in the environment variables. |

#### Notes

- Always use a secure, long, random string for `JWT_SECRET` in production environments.
- The `JWT_EXPIRES_IN` constant can be overridden via environment variables for flexibility in different deployment scenarios.
- Error handling in `verifyToken` distinguishes between expired and invalid tokens to provide specific error messages.
- The `decodeToken` function does not verify the token's signature or issuer/audience claims, only decodes it. Use it cautiously.

---

### `chatbot-rag-langchain-main/README.md`
**Language:** Md

#### Module Overview

This README file serves as the primary documentation for the chatbot application. It outlines the project's features, tech stack, and provides step-by-step instructions for getting started. The application leverages Retrieval-Augmented Generation (RAG) and LangChain to enable natural language queries on uploaded PDF documents, delivering metadata-rich answers.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| Streamlit | UI framework for the chatbot |
| LangChain | PDF parsing and chunking |
| FAISS | Vector search backend |
| PyPDF2 | PDF parsing |
| openai | LLM-based answer generation |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| parse_pdf | PDF file | List of text chunks | Extracts text from each page of the PDF |
| text_to_docs | Text chunks | List of Document objects | Splits text into chunks and attaches metadata |
| docs_to_index | List of Document objects | FAISS index | Creates a FAISS index with embedded documents |
| get_index_for_pdf | List of PDF files, filenames | FAISS index | Orchestrates PDF parsing, chunking, embedding, and indexing |

#### Notes

- Ensure your `OPENAI_API_KEY` is securely stored in `.streamlit/secrets.toml` or as an environment variable.
- Uploaded PDFs are stored in-memory and are not persisted to disk.
- The FAISS index is also stored in-memory unless optional persistence is implemented.
- For persistent storage of the FAISS index, refer to the optional persistence section in the README.

---

### `chatbot-rag-langchain-main/app.py`
**Language:** Python

#### Module Overview

This file orchestrates the main functionality of a chatbot application built using Streamlit, LangChain, and RAG (Retrieval-Augmented Generation) techniques. It allows users to upload PDF files, creates a vector database from the uploaded content, and answers user questions based on the indexed PDFs. The chatbot leverages the `openai` library to generate responses using the GPT model.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `streamlit` | Provides the web app framework and UI components. |
| `openai` | Interfaces with the GPT model for generating responses. |
| `brain` | Contains the function to create a vector database from PDF files. |
| `os` | Used for environment variable access. |
| `utils` | Contains utility functions, including loading the API key. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `create_vectordb` | `files`, `filenames` | `vectordb` | Creates a vector database from the provided PDF files and filenames. |

#### Notes

- Ensure the `OPENAI_API_KEY` is set either in `.streamlit/secrets.toml` or as an environment variable.
- The `st.cache_resource` decorator is used to cache the vector database creation process, improving performance.
- The chatbot uses a prompt template to format the user's question and the relevant PDF content for the GPT model.

---

### `chatbot-rag-langchain-main/brain.py`
**Language:** Python

#### Module Overview

The `brain.py` file is a core component of the chatbot system, focusing on the ingestion and indexing of PDF documents. It handles the extraction of text from PDFs, splits the text into manageable chunks, and creates a searchable index using FAISS and embeddings from the `langchain` library. This module is crucial for enabling the chatbot to retrieve relevant information from the ingested documents.

#### Dependencies

- **`re`**: For regular expression operations to clean up text.
- **`io.BytesIO`**: To handle binary data of PDF files.
- **`typing`**: For type hints to ensure type safety.
- **`pickle`**: For serializing and deserializing Python object structures.
- **`langchain_core.documents.Document`**: To create document objects.
- **`langchain_openai.OpenAIEmbeddings`**: To generate embeddings using the `langchain` library.
- **`langchain_text_splitters.RecursiveCharacterTextSplitter`**: To split text into chunks.
- **`langchain_community.vectorstores.FAISS`**: To create a vector index.
- **`pypdf.PdfReader`**: To read and extract text from PDF files.
- **`faiss`**: A library for efficient similarity search and clustering of dense vectors.

#### Functions

| Function | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `parse_pdf` | `file: BytesIO`, `filename: str` | `Tuple[List[str], str]` | Extracts text from a PDF file and returns a list of page texts and the filename. |
| `text_to_docs` | `text: List[str]`, `filename: str` | `List[Document]` | Converts a list of text pages into a list of `Document` objects, each representing a chunk of text. |
| `docs_to_index` | `docs`, `openai_api_key` | `FAISS` | Creates a searchable index from a list of `Document` objects using embeddings. |
| `get_index_for_pdf` | `pdf_files`, `pdf_names`, `openai_api_key` | `FAISS` | Processes a list of PDF files, converts them into documents, and creates a searchable index. |

#### Notes

- Ensure the `openai_api_key` is correctly set up to use the `OpenAIEmbeddings`.
- The `parse_pdf` function uses regular expressions to clean up the extracted text, which might need adjustments based on the PDF content.
- The `text_to_docs` function splits text into chunks based on specific separators, which can be customized as needed.
- The `docs_to_index` function relies on the `langchain` library for embeddings, which requires an active API key.

---

### `chatbot-rag-langchain-main/requirements.txt`
**Language:** Txt

#### Module Overview

The `requirements.txt` file is a manifest of all the Python libraries and packages necessary to run the chatbot application built with LangChain and OpenAPI integrations. It ensures that all team members have the same environment setup, facilitating smooth development and deployment processes. This file includes essential libraries for natural language processing, API interactions, and data handling.

#### Dependencies

| Package | Purpose | Description |
| --- | --- | --- |
| `openai` | API Integration | Provides access to the OpenAPI for generating responses. |
| `streamlit` | Web Framework | Used to create the user interface for the chatbot. |
| `langchain` | Framework | Core library for building language model applications. |
| `langchain-core` | Core Components | Essential components for LangChain functionality. |
| `langchain-community` | Community Extensions | Additional community-contributed modules for LangChain. |
| `langchain-openai` | OpenAPI Integration | Specific LangChain module for integrating with OpenAPI. |
| `faiss-cpu` | Search Engine | Used for efficient similarity search in large datasets. |
| `pypdf` | PDF Handling | Facilitates reading and processing PDF documents. |
| `tiktoken` | Tokenization | Helps in tokenizing text for processing by language models. |

#### Notes

- Ensure all dependencies are installed using `pip install -r requirements.txt`.
- Some packages may have specific version requirements; check the project documentation for details.
- Regularly update the `requirements.txt` file to include new dependencies as the project evolves.

---

### `frontend/README.md`
**Language:** Md

#### Module Overview

This file details the setup for a React application using Vite, including Hot Module Replacement (HMR) and ESLint configurations. It outlines the available plugins for React integration and provides guidance on extending the ESLint configuration for production-ready TypeScript projects.

#### Dependencies

- **@vitejs/plugin-react**: Uses Babel for Fast Refresh.
- **@vitejs/plugin-react-swc**: Uses SWC for Fast Refresh.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration

### ESLint

For production applications, it is recommended to use TypeScript with type-aware lint rules enabled. The TS template provides information on integrating TypeScript and `typescript-eslint` into your project.

#### Notes

- The choice between `@vitejs/plugin-react` and `@vitejs/plugin-react-swc` depends on your preference for Babel or SWC for Fast Refresh.
- Ensure that your project setup aligns with the recommended configurations for production readiness, especially when using TypeScript.

---

### `frontend/components.json`
**Language:** Json

#### Module Overview

The `frontend/components.json` file holds configuration settings for the frontend components used in the project. It specifies the styling, libraries, and aliases for easier component imports. This file ensures that all components adhere to a consistent style and utilize the necessary libraries for functionality.

#### Dependencies

- **$schema**: Defines the JSON schema for validation.
- **style**: Specifies the UI style theme.
- **rsc**: Boolean indicating if React Server Components are used.
- **tsx**: Boolean indicating if TypeScript with JSX is used.
- **tailwind**: Configuration for Tailwind CSS.
- **iconLibrary**: Specifies the icon library used.
- **aliases**: Provides shortcuts for frequently used paths.
- **registries**: Holds component registries (currently empty).

#### Configuration

| Key               | Value                  | Description                  |
|-------------------|------------------------|------------------------------|
| `$schema`         | `https://ui.shadcn.com/schema.json` | JSON schema URL for validation |
| `style`           | `new-york`             | UI style theme              |
| `rsc`             | `false`                | React Server Components flag |
| `tsx`             | `false`                | TypeScript with JSX flag     |
| `tailwind.config` | `""`                   | Tailwind CSS configuration  |
| `tailwind.css`    | `src/index.css`        | Tailwind CSS file path     |
| `tailwind.baseColor` | `neutral` | Base color for Tailwind CSS |
| `tailwind.cssVariables` | `true` | Enable CSS variables for Tailwind |
| `tailwind.prefix` | `""` | Prefix for Tailwind classes |
| `iconLibrary`     | `lucide`               | Icon library used           |
| `aliases`         | `{"components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks"}` | Path aliases for easier imports |
| `registries`      | `{}`                   | Component registries        |

#### Notes

- The `style` setting determines the visual theme of the UI components.
- The `tailwind` configuration includes settings for Tailwind CSS, including the base color and whether to use CSS variables.
- The `iconLibrary` specifies the icon set used in the project, in this case, `lucide`.
- The `aliases` section provides shortcuts for frequently used directories, making imports cleaner and more manageable.
- The `registries` section is currently empty and can be used to define component registries if needed in the future.

---

### `frontend/eslint.config.js`
**Language:** Javascript

#### Module Overview

This file sets up ESLint, a static code analysis tool, to enforce coding standards and best practices for JavaScript and JSX files in the frontend. It integrates various plugins and configurations to ensure consistent code quality and adherence to modern JavaScript standards.

#### Dependencies

- `@eslint/js`: Provides ESLint configuration for JavaScript.
- `globals`: Provides global variables definitions for different environments.
- `eslint-plugin-react-hooks`: Enforces rules for React hooks.
- `eslint-plugin-react-refresh`: Adds rules specific to React Refresh.
- `eslint/config`: Provides utilities to define and configure ESLint.

#### Configuration

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `defineConfig` | `configArray` | `ESLintConfig` | Combines multiple configurations into a single ESLint configuration. |

#### Notes

- The `globalIgnores` function excludes the `dist` directory from linting.
- The `extends` array includes recommended configurations from `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- The `languageOptions` specify the ECMAScript version and parser options, including JSX support.
- The `rules` section enforces the rule to disallow unused variables, ignoring variables that start with an uppercase letter or underscore.

---

### `frontend/index.html`
**Language:** Html

#### Module Overview

The `frontend/index.html` file is the foundational HTML document that initializes the frontend application. It sets up the basic structure, including the viewport settings and links essential assets like the favicon. The `<div id="root"></div>` element is where the React application will be mounted, and the script tag loads the main JavaScript entry point for rendering the React components.

#### Dependencies

- **Favicon**: `./src/assets/Campusmitra_logo.svg` - The application's favicon, used as the tab icon.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration

- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` - Ensures the app is responsive and scales correctly on different devices.

#### Constants

- **Charset**: `<meta charset="UTF-8" />` - Sets the character encoding for the document to UTF-8.

#### Notes

- The `<div id="root"></div>` element is critical as it is the mounting point for the React application.
- The script tag `<script type="module" src="/src/main.jsx"></script>` is responsible for loading the main JavaScript entry point for the React application. Ensure this path is correct and accessible.

---

### `frontend/jsconfig.json`
**Language:** Json

#### Module Overview

The `frontend/jsconfig.json` file defines how the TypeScript compiler resolves module imports in the frontend project. It sets up the base URL and aliases for easier navigation through the project's source files, allowing developers to use convenient aliases instead of relative paths.

#### Dependencies

This file does not directly import any modules but relies on TypeScript's configuration to manage module resolution.

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| `baseUrl`     | Sets the base directory from which all `paths` are resolved. |
| `paths`       | Maps aliases to directories, allowing for cleaner import statements. |

#### Notes

- The `@/*` alias maps to `./src/*`, meaning any import starting with `@` will be resolved to the `src` directory.
- This configuration simplifies imports and makes the codebase easier to navigate.

---

### `frontend/package.json`
**Language:** Json

#### Module Overview

This `package.json` file is the heart of our frontend module's configuration. It outlines the dependencies required to build, develop, and lint our React-based application. The file also includes scripts that automate common tasks like starting the development server, building the project for production, and running lint checks.

#### Dependencies

This section lists the libraries and frameworks that our frontend module relies on to function correctly.

| Package | Purpose |
| --- | --- |
| @radix-ui/react-avatar | UI component for displaying avatars. |
| @radix-ui/react-dialog | UI component for dialogs and modals. |
| @radix-ui/react-scroll-area | UI component for scroll areas. |
| @radix-ui/react-slot | Utility for slotting components. |
| @tailwindcss/typography | Tailwind CSS plugin for typography. |
| @tailwindcss/vite | Tailwind CSS plugin for Vite. |
| axios | HTTP client for making API requests. |
| class-variance-authority | Utility for managing component variants. |
| clsx | Utility for constructing className strings. |
| lucide-react | Icon library for React. |
| react | Core React library. |
| react-dom | DOM-specific methods for React. |
| react-markdown | Component for rendering Markdown. |
| react-router-dom | Routing for single-page applications. |
| rehype-raw | Rehype plugin to keep raw HTML. |
| remark-gfm | Remark plugin to support GitHub Flavored Markdown. |
| sweetalert2 | Library for creating beautiful alerts and modals. |
| tailwind-merge | Utility to merge Tailwind CSS classes. |
| tailwindcss | Utility-first CSS framework. |

#### DevDependencies

This section lists the development tools and type definitions required for building and maintaining the frontend module.

| Package | Purpose |
| --- | --- |
| @eslint/js | JavaScript linting. |
| @types/react | TypeScript definitions for React. |
| @types/react-dom | TypeScript definitions for ReactDOM. |
| @vitejs/plugin-react | Vite plugin for React. |
| eslint | JavaScript linter. |
| eslint-plugin-react-hooks | ESLint plugin for React hooks. |
| eslint-plugin-react-refresh | ESLint plugin for React Refresh. |
| globals | Global type definitions. |
| tw-animate-css | Tailwind CSS plugin for animate.css. |
| vite | Module bundler for the project. |

#### Notes

- Ensure to run `npm install` to install all dependencies listed in this file.
- Use `npm run dev` to start the development server.
- Use `npm run build` to build the project for production.
- Lint the project with `npm run lint`.

---

### `frontend/vite.config.js`
**Language:** Javascript

#### Module Overview

This file, `frontend/vite.config.js`, sets up the configuration for the Vite build tool, which is used to bundle and serve our frontend application. It includes plugins for React and Tailwind CSS, and sets up aliases for easier imports, as well as options for the development and preview servers.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `defineConfig` | Function from Vite to define the configuration object. |
| `react` | Plugin to integrate React with Vite. |
| `tailwindcss` | Plugin to integrate Tailwind CSS with Vite. |
| `path` | Node module to handle and transform file paths. |

#### Configuration

| Key | Value | Description |
| --- | --- | --- |
| `plugins` | `[react(), tailwindcss()]` | Array of plugins used in the build process. |
| `resolve.alias` | `{ "@": path.resolve(__dirname, "./src") }` | Sets up an alias for the `@` symbol to point to the `src` directory. |
| `server.historyApiFallback` | `true` | Enables HTML5 history mode fallback for client-side routing. |
| `preview.historyApiFallback` | `true` | Enables HTML5 history mode fallback for preview server. |

#### Notes

- The `historyApiFallback` option is crucial for single-page applications to handle routing without refreshing the page.
- Always ensure that the `src` directory path in the `resolve.alias` is correct to avoid import errors.
- The configuration is designed to work seamlessly with React and Tailwind CSS, providing a smooth development experience.

---

### `frontend/src/App.css`
**Language:** Css

Empty file.

---

### `frontend/src/App.jsx`
**Language:** Javascript

#### Module Overview

The `App.jsx` file is the core component of our React application, orchestrating the routing and authentication logic. It uses React hooks to manage the application state and React Router for navigation. The component checks for user authentication status and conditionally renders different views based on whether the user is logged in or not.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React, { useState, useEffect }` | React core library with hooks for state and lifecycle management. |
| `Routes, Route, Navigate` | Components from `react-router-dom` for defining and navigating routes. |
| `ChatbotView` | The main chatbot interface view. |
| `LoginPage` | The login page view. |
| `AdminDashboard` | The admin dashboard view. |
| `ProtectedRoute` | A custom component to protect certain routes. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `App` | None | JSX | The main application component that renders the entire app. |

#### Notes

- The `App` component initializes the authentication state using the `useState` hook.
- It listens for changes in the browser's local storage to update the authentication status across different tabs.
- Protected routes are wrapped with the `ProtectedRoute` component to ensure only authenticated users can access them.

---

### `frontend/src/index.css`
**Language:** Css

#### Module Overview

This CSS file serves as the central stylesheet for our frontend application. It imports essential libraries like Tailwind CSS and tw-animate-css, and defines keyframe animations, utility classes for animations, and theme variables. The file ensures consistent styling and smooth animations across the application.

#### Dependencies

- `tailwindcss`: Provides utility-first CSS framework.
- `tw-animate-css`: Extends Tailwind with animation utilities.
- `@tailwindcss/typography`: Enhances prose text styles.

#### Animations

| Animation        | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `fab-to-chat`     | Scale and translate animation for FAB to chat widget.       |
| `chat-to-fab`     | Reverse animation for chat to FAB widget.                    |
| `fade-in`         | Simple fade-in animation.                                    |
| `bounce-in`       | Bounce-in animation with scaling.                            |
| `slide-up`        | Slide-up animation with opacity.                             |
| `pulse-glow`      | Pulsing glow animation with box-shadow.                      |

#### Utility Classes

| Class                 | Description                                                  |
|-----------------------|--------------------------------------------------------------|
| `.animate-fab-to-chat` | Applies `fab-to-chat` animation.                            |
| `.animate-chat-to-fab` | Applies `chat-to-fab` animation.                            |
| `.animate-fade-in`    | Applies `fade-in` animation.                                 |
| `.animate-slide-up`   | Applies `slide-up` animation.                                |
| `.animate-pulse-glow` | Applies `pulse-glow` animation.                             |
| `.animate-bounce-in`  | Applies `bounce-in` animation.                               |
| `.message-enter`      | Applies `fade-in` animation for chat messages.               |
| `.chat-widget-container` | Optimizes performance for chat widget.                      |
| `.transition-smooth`  | Applies smooth transition for interactive elements.          |

#### Theme Variables

| Variable          | Light Mode                                                   | Dark Mode                                                    |
|-------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| `--background`    | `oklch(1 0 0)`                                               | `oklch(0.145 0 0)`                                           |
| `--foreground`    | `oklch(0.145 0 0)`                                           | `oklch(0.985 0 0)`                                           |
| `--primary`       | `oklch(0.205 0 0)`                                           | `oklch(0.922 0 0)`                                           |
| `--primary-foreground` | `oklch(0.985 0 0)`                                       | `oklch(0.205 0 0)`                                           |
| `--destructive`   | `oklch(0.577 0.245 27.325)`                                  | `oklch(0.704 0.191 22.216)`                                  |
| `--border`        | `oklch(0.922 0 0)`                                           | `oklch(1 0 0 / 10%)`                                         |
| `--input`         | `oklch(0.922 0 0)`                                           | `oklch(1 0 0 / 15%)`                                         |
| `--ring`          | `oklch(0.708 0 0)`                                           | `oklch(0.556 0 0)`                                           |

#### Notes

- Ensure to use the utility classes provided for consistent animations and transitions.
- Theme variables are designed to support both light and dark modes, making the application adaptable to user preferences.

---

### `frontend/src/main.jsx`
**Language:** Javascript

#### Module Overview

The `frontend/src/main.jsx` file is the entry point for our React application. It sets up the root React component and integrates routing using React Router. This file ensures that the application is wrapped in `StrictMode` for better error detection and `BrowserRouter` for handling client-side routing.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `StrictMode` | Enables helpful warnings in development mode. |
| `createRoot` | Provides a method to create a root for rendering the React tree. |
| `BrowserRouter` | Provides routing capabilities using the HTML5 history API. |
| `App` | The main application component that contains the core logic and UI. |
| `index.css` | Global styles for the application. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `createRoot(document.getElementById("root")).render` | `StrictMode`, `BrowserRouter`, `App` | None | Renders the React application within the root DOM element. |

#### Notes

- Ensure that the `<div id="root"></div>` exists in the HTML file where this script will be loaded.
- `StrictMode` may cause additional renders, which is useful for identifying side effects but should be removed in production.
- The `BrowserRouter` relies on the HTML5 history API, so the server must be configured to handle routing correctly.

---

### `frontend/src/api/client.js`
**Language:** Javascript

#### Module Overview

This file sets up an Axios instance tailored for our application's API requests. It includes base URL configuration, default headers, request and response interceptors for handling authentication tokens and error responses. This module ensures that all API calls are made with the correct base URL and headers, and it automatically attaches the user's authentication token to requests.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `axios`    | HTTP client for making API requests |

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|------------|
| `api` | Axios instance | `get`, `post`, `put`, `delete` |

#### Functions

| Function | Parameters | Returns | Description |
|----------|-------------|----------|-------------|
| `get`    | `url`, `config` | Promise | Makes a GET request |
| `post`   | `url`, `data`, `config` | Promise | Makes a POST request |
| `put`    | `url`, `data`, `config` | Promise | Makes a PUT request |
| `delete` | `url`, `config` | Promise | Makes a DELETE request |

#### Configuration

- **Base URL**: `import.meta.env.VITE_API_URL` or `http://localhost:3001/api`
- **Timeout**: 10 seconds

#### Notes

- The request interceptor automatically adds an authorization header with the user's token if available.
- The response interceptor handles 401 errors by clearing the token and redirecting to the login page.
- Ensure environment variables are correctly set for production deployments.

---

### `frontend/src/api/index.js`
**Language:** Javascript

#### Module Overview

This file serves as a centralized point for all API interactions within the frontend application. It encapsulates functions for user authentication, document operations, and chat functionalities, providing a clean and organized way to interact with the backend services. Each API function handles specific tasks, such as logging in, fetching documents, uploading new documents, and managing chat conversations.

#### Dependencies

- **api**: The main API client used to make HTTP requests.
- **generateSessionId**: Utility function to generate a unique session ID.
- **handleApiError**: Utility function to handle and throw API errors with a custom message.

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `login` | `credentials` | `response.data` | Authenticates an admin user and returns the response data. |
| `getAnnouncements` | None | `response.data` | Fetches all announcements/documents and returns the response data. |
| `uploadDocument` | `formData` | `response.data` | Uploads a new document and returns the response data. |
| `viewDocument` | `id` | `response` | Fetches and returns the document for viewing. |
| `deleteDocument` | `id` | `response.data` | Deletes a document and returns the response data. |
| `getDocumentStatus` | `id` | `response.data` | Fetches the status of a document and returns the response data. |
| `askQuestion` | `question`, `conversationId` | `response.data` | Asks a question with conversation tracking and returns the response data. |
| `askAboutDocument` | `question`, `documentId`, `conversationId` | `response.data` | Asks a question about a specific document and returns the response data. |
| `getConversations` | `page`, `limit` | `response.data` | Fetches all conversations and returns the response data. |
| `getConversation` | `id` | `response.data` | Fetches a specific conversation and returns the response data. |
| `deleteConversation` | `id` | `response.data` | Deletes a conversation and returns the response data. |

#### Notes

- All API functions use `try-catch` blocks to handle errors and throw a custom error message using `handleApiError`.
- The `askQuestion` function generates a session ID for each request to track conversations.
- The `viewDocument` function expects a `blob` response type for document viewing.

---

### `frontend/src/components/DocumentList.jsx`
**Language:** Javascript

Empty file.

---

### `frontend/src/components/ProtectedRoute.jsx`
**Language:** Javascript

#### Module Overview

The `ProtectedRoute` component ensures that only authenticated users can access certain routes. It checks for the presence of an `authToken` and `user` in the local storage. If neither is found, it redirects the user to the login page with the original destination URL passed as state. This component is crucial for maintaining the security of private routes in the application.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React` | Core library for building UI components. |
| `Navigate, useLocation` | From `react-router-dom` to handle navigation and location state. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ProtectedRoute` | Protects routes by checking for authentication. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `isAuthenticated` | `token`, `user` | Boolean | Checks if the user is authenticated based on the presence of `authToken` and `user`. |

#### Notes

- The `ProtectedRoute` component uses `localStorage` to store and check authentication tokens and user information.
- If the user is not authenticated, they are redirected to the `/login` page with the original URL passed as state to navigate back after login.
- This component should be used as a wrapper around routes that need to be protected.

---

### `frontend/src/components/index.js`
**Language:** Javascript

#### Module Overview

This file serves as the entry point for importing and exporting various components used throughout the frontend application. It organizes and consolidates imports from different directories, making it easier to manage and import these components in other parts of the application.

#### Dependencies

This module relies on several key components from different directories, each serving a specific purpose in the user interface.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| MessageInput | Input component for sending messages | `sendMessage()` |
| MessageBubble | Displays individual messages | `renderMessage()` |
| MessageList | Lists all messages | `renderMessages()` |
| ChatHeader | Header component for chat area | `renderHeader()` |
| ChatArea | Main area for chat interactions | `updateChatArea()` |
| ChatWidget | Widget component for chat functionalities | `toggleWidget()` |
| ChatTranscripts | Displays chat transcripts | `loadTranscripts()` |
| ChatLayout | Layout component for chat interface | `setLayout()` |
| DesktopSidebar | Sidebar component for desktop view | `toggleSidebar()` |
| MobileSidebar | Sidebar component for mobile view | `collapseSidebar()` |
| DocumentUploader | Component for uploading documents | `uploadDocument()` |
| DocumentList | Lists all documents | `renderDocuments()` |
| DocumentManager | Manages document operations | `updateDocument()` |
| DocumentViewer | Viewer component for documents | `renderDocument()` |

#### Notes

- Ensure to import components correctly to avoid any `undefined` errors.
- Components are organized by their primary function, making it easier to locate and use them.
- This file does not contain any logic or state management; it purely handles the exportation of components.

---

### `frontend/src/components/chat/ChatArea.jsx`
**Language:** Javascript

#### Module Overview

The `ChatArea` component is a key part of our chat interface, responsible for displaying the chat header, message list, and input area. It integrates several subcomponents to provide a cohesive chat experience. The component receives messages and input state from its parent and passes down handlers for sending messages and toggling mobile menu.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `ChatHeader` | Renders the chat header with different configurations for mobile and desktop. |
| `MessageList` | Displays a list of messages and handles message suggestions. |
| `MessageInput` | Renders the input field for new messages and handles sending messages. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatArea` | Main chat interface component | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ChatArea` | `messages`, `inputValue`, `setInputValue`, `onSendMessage`, `onMobileMenuToggle`, `onSuggestionClick` | None | Renders the chat area with header, message list, and input field. |

#### Notes

- The `ChatHeader` component is rendered twice, once for mobile and once for desktop, though only one will be visible based on the `isMobile` prop.
- The `MessageInput` component handles both the input field and the logic for sending messages.
- The `MessageList` component is responsible for displaying messages and handling click events for message suggestions.

---

### `frontend/src/components/chat/ChatHeader.jsx`
**Language:** Javascript

#### Module Overview

The `ChatHeader` component renders the header section of a chat interface. It adapts its layout based on the device type, showing a compact version on mobile and a more detailed version on larger screens. The component uses custom avatar components to display the user's avatar and fallback text.

#### Dependencies

- `Avatar` and `AvatarFallback` from `@/components/ui/avatar`: These components are used to render the user's avatar and fallback text.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatHeader` | Renders the header for the chat interface | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ChatHeader` | `isMobile` (optional, default: `false`) | JSX element | Renders a mobile-friendly or desktop-friendly chat header |

#### Configuration

- `isMobile`: A boolean prop that determines the layout of the chat header. Defaults to `false`.

#### Notes

- The component uses conditional rendering to switch between mobile and desktop layouts.
- The mobile layout is only visible when `isMobile` is `true`.
- The desktop layout includes additional details like a subtitle for the chat guide.

---

### `frontend/src/components/chat/ChatTranscripts.jsx`
**Language:** Javascript

#### Module Overview

The `ChatTranscripts` component is a React functional component that manages and displays a list of chat conversations. It allows users to view, search, and delete conversations, as well as view detailed conversation transcripts. The component handles pagination, loading states, and user interactions such as selecting a conversation for detailed view or deleting a conversation.

#### Dependencies

- `React, { useState, useEffect }`: Core React library for building UI components and managing state.
- `lucide-react`: Icon library for displaying various icons within the component.
- `chatAPI`: Custom API module for fetching and manipulating chat data.
- `Button`, `Input`, `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`, `ScrollArea`, `Badge`: UI components for building the chat transcripts interface.
- `showSuccessToast`, `showErrorToast`, `showConfirmDialog`: Utility functions for displaying toast notifications and confirmation dialogs.

#### Functions

| Function                 | Parameters        | Returns | Description                                                                                       |
|--------------------------|-------------------|---------|---------------------------------------------------------------------------------------------------|
| `ChatTranscripts`        | None              | JSX     | Main component function that renders the chat transcripts interface.                             |
| `fetchConversations`     | `page` (optional) | Promise | Fetches conversations from the API and updates the component state.                               |
| `fetchConversationDetail`| `id`              | Promise | Fetches detailed conversation data from the API and updates the component state.                  |
| `handleDelete`           | `id`, `event`     | Promise | Handles conversation deletion, including confirmation and API call.                               |
| `handleConversationClick`| `conv`            | None    | Handles conversation selection or deselection based on user interaction.                          |
| `formatDateTime`         | `dateString`      | String  | Formats a date string into a locale-specific date-time format.                                    |
| `formatDuration`         | `start`, `end`    | String  | Calculates and formats the duration between two date strings.                                     |

#### Notes

- The `handleDelete` function prevents the conversation from being selected when the delete button is clicked by calling `event.stopPropagation()`.
- The `formatDateTime` and `formatDuration` functions handle potential errors in date parsing gracefully by returning "Invalid Date" or "N/A" respectively.
- The component uses a combination of local state and API calls to manage the display and interaction of chat conversations.

---

### `frontend/src/components/chat/MessageBubble.jsx`
**Language:** Javascript

#### Module Overview

The `MessageBubble` component is a React functional component that renders a chat message bubble. It handles both user and bot messages, applying different styles and displaying additional information for bot messages like sources and document used. This component is part of the chat feature in the application, ensuring messages are displayed in a user-friendly manner.

#### Dependencies

| Import | Description |
| --- | --- |
| `React` | Core React library for building UI components. |
| `ReactMarkdown` | Library to render markdown content in React. |
| `remarkGfm` | Plugin for `ReactMarkdown` to support GitHub Flavored Markdown. |
| `{ Badge }` | UI component for displaying badges, imported from `../ui/badge.jsx`. |
| `{ FileText }` | Icon component from `lucide-react` for file text. |
| `SourceSuggestions` | Sub-component for displaying source suggestions, imported from `./SourceSuggestions.jsx`. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `formatTimestamp` | `timestamp` (string) | `string` | Formats a timestamp into a readable time string. |

#### Notes

- The `MessageBubble` component uses conditional rendering to display different content based on whether the message is from the user or the bot.
- Bot messages include additional information like sources, document used, and source suggestions.
- The component uses Tailwind CSS classes for styling, ensuring a consistent look and feel across the application.

---

### `frontend/src/components/chat/MessageInput.jsx`
**Language:** Javascript

#### Module Overview

The `MessageInput` component is a user interface element designed for inputting and sending messages in a chat application. It includes an input field and a send button, allowing users to type their messages and send them by pressing the "Enter" key or clicking the button. This component is part of the chat module, facilitating user interaction and message submission within the chat interface.

#### Dependencies

- **`useState`**: Hook from React to manage state within functional components.
- **`Button`**: A UI component for rendering a button.
- **`Input`**: A UI component for rendering an input field.
- **`ScrollArea`**: A UI component for rendering a scrollable area.
- **`Avatar` & `AvatarFallback`**: UI components for rendering avatars.
- **`ChevronRight`**: An icon component from `lucide-react`.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `handleKeyPress` | `e` (event) | `void` | Handles the key press event to trigger message sending when "Enter" is pressed. |

#### Configuration

- **`inputValue`**: The current value of the input field.
- **`setInputValue`**: Function to update the `inputValue`.
- **`onSendMessage`**: Function to handle the message sending action.

#### Notes

- The input field and button are disabled if the input value is empty, preventing empty messages from being sent.
- The "Enter" key triggers the `onSendMessage` function, allowing users to send messages by pressing the "Enter" key instead of only clicking the button.

---

*This documentation was automatically generated and formatted by DocuSense AI.*