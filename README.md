# Campus-mitra - Documentation

## Project Overview

The `repo_a6308e84db08` repository is a comprehensive project that integrates an AI-driven document processing and chat system. It is structured into several key components: `ai_pipeline`, `backend`, `chatbot-rag-langchain-main`, and `frontend`. 

The `ai_pipeline` folder contains the core AI functionalities, including document processing, text extraction, and generating responses to user queries. It utilizes Python with dependencies listed in `requirements.txt` and is configured via `settings.py`. The `backend` folder is built with Node.js and Express, handling API routes, middleware, and database connections. It interfaces with MongoDB for data storage and includes authentication and chat management services.

The `chatbot-rag-langchain-main` directory appears to be a separate chatbot implementation, likely using LangChain for natural language processing tasks. The `frontend` folder contains a React application for the user interface, structured with components, hooks, and utility functions to interact with the backend services.

This project is intended for users who need an efficient way to process documents and interact with an AI-driven chat system, likely for customer service, information retrieval, or automated assistance within an organization.

## Architecture

## Architecture

### Overview

The codebase is structured into several key modules, each serving a distinct purpose. The primary modules are:

- `ai_pipeline/`: Contains the AI-driven document processing and chat services.
- `backend/`: Houses the Express backend for handling API requests.
- `frontend/`: Contains the React frontend for user interactions.
- `chatbot-rag-langchain-main/`: Includes the LangChain-based chatbot implementation.

### Organization

#### Layers and Modules

1. **AI Pipeline (`ai_pipeline/`)**:
   - **Entry Point**: `main.py`
   - **Configuration**: `config/settings.py`
   - **Models**: `models/` (request and response models)
   - **Services**: `services/` (cache, chat, document processing)
   - **Utilities**: `utils/` (PDF handling)

2. **Backend (`backend/`)**:
   - **Entry Point**: `index.js`
   - **Configuration**: `src/config/database.js`
   - **Controllers**: `src/controllers/` (auth, chat, document)
   - **Middleware**: `src/middleware/` (auth, rate limiting, file upload)
   - **Models**: `src/models/` (admin user, conversation, document)
   - **Routes**: `src/routes/` (auth, chat, document, telegram)
   - **Services**: `src/services/` (AI proxy, auth)
   - **Utilities**: `src/utils/` (JWT handling)

3. **Frontend (`frontend/`)**:
   - **Entry Point**: `src/main.jsx`
   - **Components**: `src/components/` (chat, document, layout, UI elements)
   - **API**: `src/api/` (client and index)
   - **Assets**: `src/assets/` (images)
   - **Constants**: `src/constants/` (application constants)
   - **Hooks**: `src/hooks/` (custom hooks)
   - **Utilities**: `src/utils/` (toast notifications)

### Data Flow

1. **User Interaction**:
   - Users interact with the frontend, submitting queries or uploading documents.
   
2. **Backend Processing**:
   - Requests are sent to the backend API, handled by appropriate controllers (`authController.js`, `chatController.js`, `documentController.js`).
   - Middleware (`auth.js`, `rateLimiter.js`, `upload.js`) processes requests before they reach the controllers.

3. **AI Pipeline Integration**:
   - For chat-related requests, the backend interacts with the AI pipeline via `aiProxyService.js`.
   - Document uploads and processing are managed by `document_processor.py` and `chat_service.py` in the AI pipeline.

4. **Database Operations**:
   - Data is stored and retrieved from MongoDB using models defined in `src/models/`.

### Key Design Patterns

- **MVC (Model-View-Controller)**: Used in the backend to separate concerns between data (models), user interface (views in the frontend), and control flow (controllers in the backend).
- **Service Layer**: Encapsulates business logic in services (`services/` in both AI pipeline and backend).
- **Middleware**: Enhances request handling with additional processing steps (authentication, rate limiting, file upload).
- **Utility Functions**: Provides reusable functions for common tasks (JWT handling, PDF utilities).

### Main Entry Points

- **AI Pipeline**: `main.py`
- **Backend**: `index.js`
- **Frontend**: `src/main.jsx`

Understanding these entry points and the flow of data through the system will help you navigate and contribute to the codebase effectively.

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
├── nitinog10-Campus-mitra-8740119/
│   ├── Namespace.md
│   ├── README.md
│   ├── package.json
│   ├── ai_pipeline/
│   │   ├── README.md
│   │   ├── main.py
│   │   ├── package.json
│   │   ├── requirements.txt
│   │   ├── config/
│   │   │   └── settings.py
│   │   ├── models/
│   │   │   ├── request_models.py
│   │   │   └── response_models.py
│   │   ├── services/
│   │   │   ├── cache_service.py
│   │   │   ├── chat_service.py
│   │   │   └── document_processor.py
│   │   └── utils/
│   │       └── pdf_utils.py
│   ├── backend/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── src/
│   │       ├── config/
│   │       │   └── database.js
│   │       ├── controllers/
│   │       │   ├── authController.js
│   │       │   ├── chatController.js
│   │       │   └── documentController.js
│   │       ├── middleware/
│   │       │   ├── auth.js
│   │       │   ├── rateLimiter.js
│   │       │   └── upload.js
│   │       ├── models/
│   │       │   ├── AdminUser.js
│   │       │   ├── Conversation.js
│   │       │   ├── Document.js
│   │       │   └── index.js
│   │       ├── routes/
│   │       │   ├── authRoutes.js
│   │       │   ├── chatRoutes.js
│   │       │   ├── documentRoutes.js
│   │       │   ├── index.js
│   │       │   └── telegramRoutes.js
│   │       ├── services/
│   │       │   ├── aiProxyService.js
│   │       │   └── authService.js
│   │       └── utils/
│   │           └── jwtUtils.js
│   ├── chatbot-rag-langchain-main/
│   │   ├── README.md
│   │   ├── app.py
│   │   ├── brain.py
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── README.md
│   │   ├── components.json
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── jsconfig.json
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── src/
│   │       ├── App.css
│   │       ├── App.jsx
│   │       ├── index.css
│   │       ├── main.jsx
│   │       ├── api/
│   │       │   ├── client.js
│   │       │   └── index.js
│   │       ├── assets/
│   │       │   ├── Campusmitra_logo.svg
│   │       │   └── Campusmitra_text.svg
│   │       ├── components/
│   │       │   ├── DocumentList.jsx
│   │       │   ├── ProtectedRoute.jsx
│   │       │   ├── index.js
│   │       │   ├── chat/
│   │       │   │   ├── ChatArea.jsx
│   │       │   │   ├── ChatHeader.jsx
│   │       │   │   ├── ChatTranscripts.jsx
│   │       │   │   ├── MessageBubble.jsx
│   │       │   │   ├── MessageInput.jsx
│   │       │   │   ├── MessageList.jsx
│   │       │   │   ├── SourceSuggestions.jsx
│   │       │   │   └── ChatWidget/
│   │       │   │       ├── ChatWidget.jsx
│   │       │   │       └── index.js
│   │       │   ├── document/
│   │       │   │   ├── DocumentList.jsx
│   │       │   │   ├── DocumentManager.jsx
│   │       │   │   ├── DocumentUploader.jsx
│   │       │   │   └── DocumentViewer.jsx
│   │       │   ├── layout/
│   │       │   │   └── ChatLayout.jsx
│   │       │   └── ui/
│   │       │       ├── avatar.jsx
│   │       │       ├── badge.jsx
│   │       │       ├── button.jsx
│   │       │       ├── card.jsx
│   │       │       ├── dialog.jsx
│   │       │       ├── input.jsx
│   │       │       ├── scroll-area.jsx
│   │       │       ├── sheet.jsx
│   │       │       └── textarea.jsx
│   │       ├── constants/
│   │       │   └── appConstants.js
│   │       ├── hooks/
│   │       │   └── useChat.js
│   │       ├── lib/
│   │       │   └── utils.js
│   │       ├── utils/
│   │       │   └── toast.js
│   │       └── views/
│   │           ├── AdminDashboard.jsx
│   │           ├── ChatbotView.jsx
│   │           └── LoginPage.jsx
│   ├── scripts/
│   │   └── start-dev.js
│   └── telegram-bot/
│       ├── README.md
│       ├── index.js
│       ├── package.json
│       └── src/
│           ├── handlers/
│           │   ├── CommandHandler.js
│           │   └── MessageHandler.js
│           ├── services/
│           │   ├── ApiClient.js
│           │   └── BotService.js
│           └── utils/
│               ├── logger.js
│               └── rateLimiter.js
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

### Dependencies

#### Major Libraries

- **concurrently**
  - **Purpose**: To run multiple commands concurrently.
  - **Version Constraint**: `^9.0.0`
  - **Type**: Development Dependency

- **vite**
  - **Purpose**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
  - **Version Constraint**: `^7.1.4`
  - **Type**: Production Dependency

#### Version Constraints

- **Development Dependencies**:
  - `concurrently`: `^9.0.0`

- **Production Dependencies**:
  - `vite`: `^7.1.4`

#### Workspaces

The project is structured as a monorepo with the following workspaces:

- `frontend`
- `backend`
- `ai_pipeline`
- `telegram-bot`

Each workspace can be developed independently using the scripts defined in the root `package.json`.

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

The `package.json` file is the heart of our project's configuration, detailing dependencies and scripts essential for development. It specifies the project's name, private status, workspaces, and various scripts to streamline development processes. This file ensures that all team members use the same versions of dependencies and have a consistent development environment.

#### Dependencies

| Package | Purpose |
| --- | --- |
| concurrently | Allows running multiple commands concurrently. |

#### Scripts

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `dev` | None | Starts the development server. | Executes `node scripts/start-dev.js`. |
| `dev:all` | None | Starts all workspaces in development mode. | Runs development servers for frontend, backend, AI pipeline, and Telegram bot. |
| `dev:legacy` | None | Starts legacy workspaces in development mode. | Runs development servers for frontend, backend, and AI pipeline. |
| `telegram-bot` | None | Starts the Telegram bot. | Executes `yarn workspace telegram-bot run start`. |
| `telegram-bot:dev` | None | Starts the Telegram bot in development mode. | Executes `yarn workspace telegram-bot run dev`. |

#### Configuration

| Key | Value |
| --- | --- |
| `name` | "campusmitra" |
| `private` | true |
| `workspaces` | ["frontend", "backend", "ai_pipeline", "telegram-bot"] |

#### Notes

- The `private` flag ensures that the project is not published to the npm registry.
- The `workspaces` array defines the sub-projects that are part of this monorepo.
- The `devDependencies` section includes tools required for development but not for production.
- The `dependencies` section includes libraries that are essential for the project's runtime.

---

### `ai_pipeline/README.md`
**Language:** Md

#### Module Overview

The `ai_pipeline` module is the backbone of Project campusmitra's AI capabilities. It integrates FastAPI for API management, LangChain for advanced language processing, OCR for optical character recognition, and a vector database for efficient data retrieval. This module orchestrates the entire AI workflow, from data ingestion to processing and storage, ensuring seamless interaction with the rest of the project.

#### Dependencies

- **FastAPI**: Provides the framework for building the API endpoints.
- **LangChain**: Facilitates complex language processing tasks.
- **OCR**: Handles the conversion of scanned images to text.
- **Vector Database**: Manages the storage and retrieval of vectorized data.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Pipeline | Manages the entire AI pipeline workflow | `run()`, `process()`, `store()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `fetch_data` | `source` | `data` | Retrieves data from specified source |
| `preprocess` | `data` | `processed_data` | Preprocesses raw data for further processing |
| `analyze` | `processed_data` | `analysis_result` | Analyzes data using LangChain |

#### Configuration

- **API Endpoints**: Configuration for FastAPI routes.
- **OCR Settings**: Parameters for the OCR module.
- **Database Connection**: Configuration for connecting to the vector database.

#### Notes

- Always use Python virtual environments to manage dependencies.
- Ensure that the vector database is properly indexed for optimal performance.
- Be mindful of API rate limits when fetching data from external sources.

---

### `ai_pipeline/main.py`
**Language:** Python

#### Module Overview

The `ai_pipeline/main.py` file is the core of the AI Pipeline API, orchestrating the interaction between the user and the AI services. It sets up the FastAPI application, integrates CORS middleware, and defines endpoints for document processing and chat queries. This file ties together the document processing and chat services, ensuring a seamless user experience.

#### Dependencies

| Module | Purpose |
| --- | --- |
| `fastapi` | Framework for building the API |
| `uvicorn` | ASGI server to run the FastAPI app |
| `os`, `pathlib` | Utilities for file and directory operations |
| `utilities.create_directories` | Function to create necessary directories |
| `services.document_processor` | Service for processing documents |
| `services.chat_service` | Service for handling chat queries |
| `models.request_models`, `models.response_models` | Data models for request and response handling |
| `config.settings` | Configuration settings for the API |

#### Classes

No classes are defined in this file.

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `read_root` | None | JSON | Returns a welcome message |
| `health_check` | None | JSON | Returns the health status of the service |
| `process_document` | `file: UploadFile` | JSON | Processes an uploaded PDF document |
| `chat_query` | `request: ChatRequest` | JSON | Processes a chat query |
| `search_multiple_documents` | `request: MultiDocumentChatRequest` | JSON | Searches across multiple documents |
| `list_documents` | None | JSON | Lists all available documents |
| `get_document_status` | `doc_id: str` | JSON | Returns the status of a document |
| `delete_document` | `doc_id: str` | JSON | Deletes a document from the vector store |

#### Configuration

The API uses settings from `config.settings` to configure various aspects of the application, such as allowed origins for CORS.

#### Notes

- The API supports only PDF files for document uploads.
- The maximum file size for uploads is 20MB.
- The cache service is initialized during the startup event, which may fail silently if there are issues loading the cache from disk.

---

### `ai_pipeline/package.json`
**Language:** Json

#### Module Overview

The `ai_pipeline/package.json` file serves as the configuration backbone for our AI pipeline project. It outlines the project's dependencies and defines scripts to streamline development and production workflows. This file ensures that the project can be easily set up and run with the correct environment settings.

#### Dependencies

This file does not list direct dependencies but relies on the `package.json` from the root directory for dependency management. The key scripts defined here are crucial for running the application in both development and production environments.

#### Scripts

| Script | Purpose |
| --- | --- |
| `dev` | Starts the application in development mode with hot reloading. |
| `start` | Starts the application in production mode. |

#### Notes

- Ensure `uvicorn` is installed in your environment to run the scripts.
- The `main.py` file is the entry point for the application.
- The application listens on port `8001` by default.

---

### `ai_pipeline/requirements.txt`
**Language:** Txt

#### Module Overview

The `ai_pipeline/requirements.txt` file contains a list of Python packages necessary for the operation of the AI pipeline. It ensures that all team members have the same environment setup, facilitating consistent development and deployment processes. The file includes libraries for web framework, HTTP server, data parsing, data validation, environment variable management, and various AI-related functionalities.

#### Dependencies

| Package | Purpose | Description |
| --- | --- | --- |
| `fastapi` | Web framework | Used for building APIs with the AI pipeline. |
| `uvicorn` | HTTP server | Serves the FastAPI application. |
| `python-multipart` | Multipart parsing | Handles multipart form data. |
| `pydantic` | Data validation | Ensures data integrity and validation. |
| `python-dotenv` | Environment variables | Manages environment variables. |
| `openai` | AI interactions | Interfaces with the OpenAPI for AI tasks. |
| `langchain` | Language model chains | Facilitates complex language model interactions. |
| `langchain-core` | Core components | Provides essential components for language chains. |
| `langchain-community` | Community extensions | Offers additional community-contributed components. |
| `langchain-openai` | Integration with OpenAPI | Bridges LangChain with OpenAPI. |
| `faiss-cpu` | Approximate nearest neighbors | Speeds up similarity searches. |
| `pypdf` | PDF processing | Handles PDF file operations. |
| `cachetools` | Caching utilities | Manages caching for performance optimization. |

#### Notes

- Ensure all listed packages are installed in the correct version to avoid compatibility issues.
- Regularly update the `requirements.txt` file to reflect changes in dependencies.
- Use a virtual environment to manage dependencies and avoid conflicts with other projects.

---

### `ai_pipeline/config/settings.py`
**Language:** Python

#### Module Overview

This file, `settings.py`, holds the configuration settings for the AI pipeline. It initializes a `Settings` class that loads environment variables and sets default values for various parameters used throughout the pipeline. These settings include API keys, file paths, and processing parameters.

#### Dependencies

- `os`: Provides a way of using operating system dependent functionality like reading or writing to the environment.
- `dotenv`: Loads environment variables from a `.env` file into `os.environ`.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Settings | Manages configuration settings for the AI pipeline | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| None | None | None | No functions are defined in this file |

#### Configuration

The `Settings` class initializes with the following configuration parameters:

- `openai_api_key`: Retrieves the API key for the OpenAPI service from the environment variable `OPENAI_API_KEY`.
- `vector_store_path`: Default path for vector stores.
- `temp_uploads_path`: Default path for temporary uploads.
- `max_file_size`: Maximum file size allowed for uploads, set to 20MB.
- `chunk_size`: Size of chunks for processing, set to 4000.
- `chunk_overlap`: Overlap between chunks for processing, set to 100.
- `similarity_search_k`: Number of top-k documents to retrieve for similarity search, set to 2.
- `enable_response_cache`: Flag to enable caching of responses.

#### Notes

- Ensure that the `.env` file is correctly set up with the required environment variables.
- The `chunk_overlap` and `similarity_search_k` values are tuned for faster processing at the cost of some accuracy.
- Always check the environment variables before running the pipeline to avoid missing configuration values.

---

### `ai_pipeline/models/request_models.py`
**Language:** Python

#### Module Overview

This file contains Pydantic models that define the structure of various request objects used in our AI pipeline. These models ensure that incoming requests are validated and contain the necessary data before they are processed further. The Pydantic library is used to create these models, which also provide automatic JSON serialization and validation.

#### Dependencies

- `pydantic`: A library used for data validation using Python type annotations.
- `typing`: Provides runtime support for type hints.

#### Classes

| Class               | Purpose                                                                                   | Key Methods |
|---------------------|--------------------------------------------------------------------------------------------|------------|
| `ChatRequest`       | Represents a request for a single document chat.                                            | N/A        |
| `MultiDocumentChatRequest` | Represents a request for a chat involving multiple documents.                                | N/A        |
| `DocumentUploadRequest` | Represents a request to upload a new document.                                               | N/A        |

#### Functions

| Function            | Parameters                   | Returns | Description                  |
|---------------------|-------------------------------|---------|------------------------------|
| N/A                 | N/A                           | N/A     | This file only contains classes, no functions. |

#### Configuration

- `ChatRequest`: Contains a query and an optional document ID.
- `MultiDocumentChatRequest`: Contains a query and a list of document IDs.
- `DocumentUploadRequest`: Contains a filename and content (in bytes).

#### Notes

- All fields are required unless specified as `Optional`.
- The `DocumentUploadRequest` expects the `content` to be in bytes format.
- The `model_config` in each class provides an example JSON schema for easier understanding and debugging.

---

### `ai_pipeline/models/response_models.py`
**Language:** Python

#### Module Overview

This file, `response_models.py`, is a crucial part of our AI pipeline's data handling. It defines the structure of responses from different components within the pipeline, ensuring that our data is consistently formatted and easily parsed. The models use Pydantic's `BaseModel` to enforce strict data types and validate incoming data.

#### Dependencies

- `pydantic`: A library for data validation using Python type annotations.
- `typing`: Provides type hints for Python, enabling better code readability and error checking.

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| `DocumentResponse` | Represents the response from the document processing component. | N/A |
| `ChatResponse` | Represents the response from the chat component, including the processed content and sources. | N/A |
| `StatusResponse` | Represents a simple status response indicating success or failure. | N/A |

### Classes Details

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

- Ensure that all fields in the response models are validated to avoid runtime errors.
- The `ChatResponse` class includes optional `sources` which is a list of dictionaries, each representing a source document with filename, page, and chunk information.
- The `content_type` in `ChatResponse` defaults to "markdown", but can be overridden if necessary.

---

### `ai_pipeline/services/cache_service.py`
**Language:** Python

#### Module Overview

The `cache_service.py` file defines the `CacheService` class, which handles caching of document information. It uses an in-memory cache with a time-to-live (TTL) and persists the cache to disk to ensure data is not lost between sessions. This service is crucial for maintaining a fast and efficient retrieval of document metadata.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `TTLCache` from `cachetools` | Provides an in-memory cache with TTL functionality |
| `time` | Used for time-related functions |
| `json` | For serializing and deserializing cache data |
| `os` | For interacting with the operating system, like file operations |
| `Path` from `pathlib` | For handling file paths in a more readable and object-oriented way |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `CacheService` | Manages the caching of document information with persistence and TTL | `__init__`, `load_persistent_cache`, `rebuild_cache_from_disk`, `save_persistent_cache`, `get`, `set`, `delete`, `clear` |

#### Functions

There are no standalone functions in this file. All functionality is encapsulated within the `CacheService` class.

#### Notes

- The cache service automatically loads and saves cache data to a file named `cache_data.json` in the current working directory.
- The cache service only persists document information, not temporary data.
- The `rebuild_cache_from_disk` method ensures the cache is up-to-date by scanning the `vector_stores` directory.
- The cache service uses atomic file operations to prevent data corruption during writes.

---

### `ai_pipeline/services/chat_service.py`
**Language:** Python

#### Module Overview

This module defines the `ChatService` class, which is responsible for processing user queries, fetching relevant context from documents, and generating responses using the RAG (Retrieval-Augmented Generation) approach. It integrates with the `OpenAI` API for generating responses and utilizes a local cache and conversation memory to improve efficiency and context retention.

#### Dependencies

- `OpenAI`: For interacting with the OpenAI API to generate responses.
- `DocumentProcessor`: For loading and processing document content.
- `cache_service`: For caching responses to avoid redundant API calls.
- `settings`: For configuration, including the OpenAI API key and other settings.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatService` | Manages the entire chat process, including query handling, context retrieval, and response generation. | `__init__`, `_cleanup_cache`, `_get_conversation_history`, `_update_conversation_memory`, `get_response` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `_cleanup_cache` | None | None | Cleans up old cache entries to prevent memory bloat. |
| `_get_conversation_history` | `session_id: str`, `max_turns: int = 3` | `str` | Retrieves recent conversation history for a given session. |
| `_update_conversation_memory` | `session_id: str`, `question: str`, `response: str` | None | Updates the conversation memory with the latest question and response. |
| `get_response` | `query: str`, `document_id: Optional[str] = None`, `session_id: Optional[str] = None` | `Dict[str, Any]` | Generates a response for the user query using the RAG approach, incorporating conversation context and document content. |

#### Configuration

- `settings.openai_api_key`: Required for initializing the `OpenAI` client.
- `settings.similarity_search_k`: Determines the number of similar documents to retrieve for context.

#### Constants

- `self.prompt_template`: A predefined template for generating prompts that include conversation context and document content.

#### Notes

- The `conversation_memory` is currently stored in-memory and should be replaced with a persistent storage solution (e.g., Redis or a database) in a production environment.
- The cache cleanup mechanism is simplistic and may need to be enhanced for more sophisticated cache management.
- Ensure the `openai_api_key` is properly configured in the settings to avoid issues with API calls.

---

### `ai_pipeline/services/document_processor.py`
**Language:** Python

#### Module Overview

This module provides a comprehensive service for processing documents, specifically PDFs. It extracts text, chunks it into manageable pieces, and creates a vector store using FAISS for efficient retrieval. The module integrates with external services like `OpenAIEmbeddings` for text embeddings and `cache_service` for caching document metadata. It ensures that documents are processed asynchronously and handles errors gracefully by logging them and providing fallbacks where possible.

#### Dependencies

- `re`: For regular expression operations used in text cleaning.
- `os`: For file and directory operations.
- `pickle`: Though imported, it's not used in the current implementation.
- `hashlib`: Though imported, it's not used in the current implementation.
- `shutil`: For high-level file operations like copying and removing.
- `io.BytesIO`: For handling byte streams, specifically for PDF parsing.
- `uuid`: For generating unique identifiers for documents.
- `langchain_core.documents.Document`: Represents a document chunk with metadata.
- `langchain_openai.OpenAIEmbeddings`: For generating text embeddings.
- `langchain_text_splitters.RecursiveCharacterTextSplitter`: For splitting text into chunks.
- `langchain_community.vectorstores.FAISS`: For creating and managing vector stores.
- `pypdf.PdfReader`: For reading and extracting text from PDF files.
- `config.settings.settings`: For configuration settings, including API keys and chunk sizes.
- `services.cache_service.cache_service`: For caching document metadata.

#### Classes

| Class             | Purpose                                                                                       | Key Methods                                                                                     |
|-------------------|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `DocumentProcessor` | Manages the entire document processing pipeline, from text extraction to vector store creation. | `_parse_pdf`, `_text_to_docs`, `_create_vector_store`, `process_document`, `get_vector_store`, `get_document_status`, `list_documents`, `delete_document` |

#### Functions

| Function              | Parameters                  | Returns         | Description                                                                                       |
|-----------------------|-----------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `_parse_pdf`          | `file_content: bytes`, `filename: str` | `Tuple[List[str], str]` | Parses PDF content and extracts text, returning a list of text pages and the filename. |
| `_text_to_docs`       | `text: List[str]`, `filename: str` | `List[Document]` | Converts extracted text into document chunks, each represented as a `Document` object. |
| `_create_vector_store` | `documents: List[Document]` | `FAISS`         | Creates a FAISS vector store from a list of document chunks.                                       |
| `process_document`    | `file_content: bytes`, `filename: str` | `str`           | Processes a document, creating and storing a vector store, and returns a unique document ID.       |
| `get_vector_store`    | `doc_id: str`               | `FAISS`         | Loads and returns the vector store for a given document ID.                                       |
| `get_document_status` | `doc_id: str`               | `str`           | Retrieves the processing status of a document by its ID.                                           |
| `list_documents`      | None                        | `List[dict]`    | Lists all available documents with their metadata.                                                 |
| `delete_document`     | `doc_id: str`               | None            | Deletes a document and its associated vector store.                                               |

#### Configuration

- `settings.openai_api_key`: Required for initializing `OpenAIEmbeddings`.
- `settings.chunk_size` and `settings.chunk_overlap`: Used in `RecursiveCharacterTextSplitter` for chunking text.
- `settings.vector_store_path`: Directory where vector stores are saved.

#### Constants

None

#### Notes

- Ensure `settings.openai_api_key` is properly configured; otherwise, vector store creation and loading will fail.
- The module assumes PDF files as input; other file types are not supported.
- Error handling is implemented to log issues during PDF parsing and text chunking, providing fallbacks where possible.
- Document metadata is cached for quick access and persistence.

---

### `ai_pipeline/utils/pdf_utils.py`
**Language:** Python

#### Module Overview

This module, `pdf_utils.py`, contains utility functions specifically designed to handle PDF files. It includes methods for calculating SHA256 hashes of PDF content and validating file extensions to ensure they are PDFs. These functions are integral for ensuring data integrity and proper file type identification within our AI pipeline.

#### Dependencies

- `hashlib`: Provides hashing algorithms, used here for SHA256 hash calculation.
- `typing`: Provides type hints for function parameters and return types.

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `calculate_file_hash` | `file_content: bytes` | `str` | Calculates the SHA256 hash of the provided file content. |
| `validate_pdf_file` | `filename: str` | `bool` | Validates if the given filename ends with a `.pdf` extension. |
| `format_file_size` | `size_bytes: int` | `str` | Formats the file size into a human-readable string. |

#### Notes

- `calculate_file_hash` expects the file content as a byte stream. Ensure to read the file in binary mode before passing it.
- `validate_pdf_file` only checks the file extension and does not verify the file's internal structure.
- `format_file_size` converts bytes into a readable format, useful for displaying file sizes to users.

---

### `backend/index.js`
**Language:** Javascript

#### Module Overview

The `backend/index.js` file initializes the Express application, connects to the database, and configures essential middleware for security, CORS, and rate limiting. It also defines the root endpoint and error handling for the server.

### Dependencies

| Module | Purpose |
| --- | --- |
| `express` | Web framework for building the server |
| `cors` | Middleware to enable Cross-Origin Resource Sharing |
| `helmet` | Middleware to secure the app by setting various HTTP headers |
| `dotenv` | Module to load environment variables from a `.env` file |
| `./src/config/database.js` | Database connection setup |
| `./src/routes/index.js` | API routes |
| `./src/middleware/rateLimiter.js` | Rate limiting middleware |

### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `app.get("/",...)` | `req`, `res` | JSON response | Root endpoint to check server status and list available endpoints |
| `app.use((req, res) =>...)` | `req`, `res` | JSON response | 404 handler for undefined routes |
| `app.use((error, req, res, next) =>...)` | `error`, `req`, `res`, `next` | JSON response | Global error handler for unhandled errors |

### Notes

- Ensure the `.env` file is properly configured with the necessary environment variables.
- The server listens on the port specified in `process.env.PORT` or defaults to `3001`.
- The CORS configuration allows requests only from the specified frontend URL.

---

### `backend/package.json`
**Language:** Json

#### Module Overview

The `backend/package.json` file is the heart of our Node.js backend project. It outlines the project's dependencies, which are crucial libraries and frameworks used to build and run our application. It also includes scripts that facilitate development and production workflows, such as starting the server in different environments.

#### Dependencies

This file lists key dependencies that our backend relies on to function correctly:

| Library | Purpose | Description |
|---------|---------|-------------|
| bcrypt | Security | Used for hashing passwords. |
| cors | Cross-Origin Resource Sharing | Enables cross-origin HTTP requests. |
| dotenv | Environment Variables | Loads environment variables from a `.env` file. |
| express | Web Framework | The core web framework for building APIs. |
| express-rate-limit | Rate Limiting | Limits the number of requests from a single IP. |
| express-validator | Input Validation | Validates input data. |
| helmet | Security | Adds various HTTP headers to enhance security. |
| jsonwebtoken | Authentication | Manages JSON Web Tokens for authentication. |
| mongoose | ORM | Object Relational Mapping for MongoDB. |
| multer | File Uploads | Handles multipart/form-data, used for uploading files. |

#### Scripts

The `scripts` section defines commands to run various tasks:

| Script | Purpose |
|--------|---------|
| `dev` | Starts the server in development mode. |
| `start` | Starts the server in production mode. |

#### Notes

- Ensure all dependencies are installed by running `npm install` in the project root.
- Environment variables should be stored in a `.env` file and referenced in the `scripts` section.
- Always check for updates to dependencies to maintain security and performance.

---

### `backend/src/config/database.js`
**Language:** Javascript

#### Module Overview

This file, `database.js`, handles the connection to our MongoDB database. It uses Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, to manage the database interactions. The primary function, `connectDB`, sets up the connection and handles connection events, including errors, disconnections, and graceful shutdowns.

#### Dependencies

| Dependency | Purpose |
| --- | --- |
| `mongoose` | Provides a schema-based solution to model your application data. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `connectDB` | None | None | Establishes a connection to the MongoDB database and handles connection events. |

#### Configuration

| Variable | Purpose |
| --- | --- |
| `process.env.DB_URL` | The URL for the MongoDB database connection string. |

#### Notes

- Ensure that `DB_URL` is correctly set in your environment variables.
- The file handles disconnections silently and ensures a graceful shutdown on application termination.
- Connection errors are logged to the console, and the application exits with a non-zero status if the connection fails.

---

### `backend/src/controllers/authController.js`
**Language:** Javascript

#### Module Overview

The `authController.js` file is a part of the backend controllers, specifically designed to manage user authentication. It includes validation rules for login requests and a function to handle the login process. This controller interacts with the `authService.js` to authenticate users and returns appropriate responses based on the success or failure of the authentication process.

  

**Dependencies**

| Import | Purpose |
| --- | --- |
| `authenticateAdmin` from `../services/authService.js` | Service function to authenticate admin users |
| `body`, `validationResult` from `express-validator` | Middleware for validating request bodies and checking validation results |

  

**Functions**

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateLogin` | N/A | Array of validation middleware | Defines validation rules for the login request |
| `login` | `req`, `res` | HTTP response | Handles the login process, validates input, authenticates user, and returns appropriate response |

  

**Notes**

- The `validateLogin` function uses `express-validator` to ensure that the username and password meet specific criteria.
- The `login` function first checks for validation errors. If any are found, it returns a 400 status code with the error details.
- If validation passes, it attempts to authenticate the user using the `authenticateAdmin` service function.
- Depending on the success of the authentication, it returns either a 200 status with the user details and token or a 401 status with an error message.
- Any unexpected errors during the process result in a 500 status code response.

---

### `backend/src/controllers/chatController.js`
**Language:** Javascript

#### Module Overview

This file defines the `chatController.js` module, which is responsible for managing chat-related operations in our backend. It includes controllers for asking questions, fetching conversations, and deleting conversations. The module integrates with our AI proxy service to handle question-answering logic and uses our MongoDB models to manage conversation data. It's a crucial part of our chat functionality, ensuring smooth interaction between users and our AI-driven chat system.

#### Dependencies

- `aiProxyService.js`: Provides methods for asking questions using AI, both generally and with specific documents.
- `models/index.js`: Imports `Conversation` and `Document` models for database interactions.
- `express-validator`: Used for validating incoming request data.
- `requestUtils.js`: Utility functions for generating session IDs and extracting request metadata.

#### Functions

| Function               | Parameters            | Returns              | Description                                                                                       |
|------------------------|-----------------------|----------------------|---------------------------------------------------------------------------------------------------|
| `validateQuestion`     | -                     | Validation middleware | Express middleware for validating chat questions.                                                 |
| `ask`                  | `req`, `res`          | -                    | Controller for asking a general chat question, handling conversation tracking and fallback logic. |
| `askAboutDocument`     | `req`, `res`          | -                    | Controller for asking a question about a specific document.                                       |
| `getConversations`     | `req`, `res`          | -                    | Controller for fetching a list of conversations (admin only).                                     |
| `getConversation`      | `req`, `res`          | -                    | Controller for fetching a specific conversation by ID (admin only).                               |
| `deleteConversation`   | `req`, `res`          | -                    | Controller for deleting a specific conversation by ID (admin only).                               |

#### Notes

- Error handling is robust, with specific fallbacks for document-related queries.
- Admin-only endpoints (`getConversations`, `getConversation`, `deleteConversation`) require appropriate authentication and authorization checks, which are not detailed in this file.
- The `ask` function attempts a multi-document search before falling back to a general chat query if the former fails.

---

### `backend/src/controllers/documentController.js`
**Language:** Javascript

#### Module Overview

The `documentController.js` file is a crucial part of the backend, managing document-related operations. It interfaces with the AI service to upload, retrieve, update, and delete documents. This controller ensures that document operations are handled securely and efficiently, providing necessary validation and error handling.

#### Dependencies

| Import | Description |
| --- | --- |
| `uploadDocumentToAI`, `getIndexedDocuments`, `updateDocumentStatus`, `checkDocumentStatus`, `deleteDocumentFromAI` | Functions from `aiProxyService.js` to interact with the AI service. |
| `Document` | Mongoose model for documents. |
| `body`, `validationResult` | Validation middleware from `express-validator`. |
| `fs`, `path` | Node.js modules for file system operations and path handling. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateUpload` | N/A | Validation middleware | Validates the document upload request. |
| `uploadDocument` | `req`, `res` | JSON response | Handles document upload, validates input, and processes the upload. |
| `getAnnouncements` | `req`, `res` | JSON response | Retrieves all indexed documents from the AI service. |
| `updateDocumentStatusWebhook` | `req`, `res` | JSON response | Updates the document status based on webhook data. |
| `viewDocument` | `req`, `res` | File stream | Streams the requested document file to the client. |
| `getDocumentStatus` | `req`, `res` | JSON response | Retrieves the status of a specific document. |
| `deleteDocument` | `req`, `res` | JSON response | Deletes a document from the AI service. |

#### Notes

- Ensure the file paths and MIME types are correctly set when streaming documents.
- Error handling is consistent across all functions, returning appropriate HTTP status codes and messages.
- The `validateUpload` middleware should be used in routes requiring document uploads.

---

### `backend/src/middleware/auth.js`
**Language:** Javascript

#### Module Overview

The `backend/src/middleware/auth.js` file defines two middleware functions to handle authentication for HTTP requests. The `authenticateAdmin` middleware ensures that only authenticated admin users can access certain routes, while the `optionalAuth` middleware allows optional authentication for public endpoints, providing user context if a valid token is present.

**Dependencies**

| Import | Purpose |
| --- | --- |
| `validateToken` from `../services/authService.js` | Validates JWT tokens to extract user information. |

**Functions**

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `authenticateAdmin` | `req`, `res`, `next` | None | Authenticates admin requests by validating the JWT token in the Authorization header. If the token is invalid or missing, it returns a 401 status with an appropriate message. |
| `optionalAuth` | `req`, `res`, `next` | None | Optionally authenticates requests by validating the JWT token in the Authorization header. If the token is valid, it adds user information to the request object. If the token is missing or invalid, it simply proceeds to the next middleware. |

**Notes**

- The `authenticateAdmin` middleware is designed to protect routes that require admin privileges.
- The `optionalAuth` middleware is useful for public endpoints that might benefit from user context if the user is logged in.
- Both middleware functions handle errors gracefully, logging them and returning appropriate HTTP statuses.

---

### `backend/src/middleware/rateLimiter.js`
**Language:** Javascript

#### Module Overview

This file sets up rate limiting middleware using the `express-rate-limit` package to safeguard our API endpoints from potential DDoS attacks. It defines three distinct rate limiters tailored for different parts of our application: general API access, authentication endpoints, and chat/ask endpoints. Each rate limiter has specific configurations to balance security and user experience.

#### Dependencies

| Package | Purpose |
| --- | --- |
| `express-rate-limit` | Provides rate limiting middleware for Express.js applications. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `rateLimit` | Configuration object | Middleware function | Creates a rate limiter with specified parameters. |

#### Configuration

| Rate Limiter | Window (ms) | Max Requests | Error Message | Retry After |
| --- | --- | --- | --- | --- |
| `apiLimiter` | 15 * 60 * 1000 | 100 | 'Too many requests from this IP, please try again later.' | '15 minutes' |
| `authLimiter` | 15 * 60 * 1000 | 5 | 'Too many login attempts from this IP, please try again later.' | '15 minutes' |
| `chatLimiter` | 1 * 60 * 1000 | 10 | 'Too many questions asked, please wait a moment before asking again.' | '1 minute' |

#### Notes

- The `standardHeaders` option is set to `true` to include rate limit information in the `RateLimit-*` headers.
- The `legacyHeaders` option is set to `false` to avoid using the deprecated `X-RateLimit-*` headers.
- Each rate limiter is designed to prevent excessive requests from a single IP address, thus mitigating the risk of DDoS attacks.
- Custom error messages are provided to inform users when they exceed the allowed request limits.

---

### `backend/src/middleware/upload.js`
**Language:** Javascript

#### Module Overview

The `upload.js` file sets up middleware for managing file uploads in the backend. It configures multer to handle file uploads, including setting file size limits and allowed file types. Additionally, it provides an error handling middleware to manage and respond to upload errors.

#### Dependencies

| Import | Purpose |
| ------ | ------- |
| `multer` | A Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. |
| `path` | A Node.js module for handling and transforming file and directory paths. |

#### Configuration

| Variable | Purpose |
| -------- | -------- |
| `MAX_FILE_SIZE_MB` | The maximum file size allowed for uploads, in megabytes. Defaults to 20MB if not set in environment variables. |
| `ALLOWED_FILE_TYPES` | An array of allowed file types for uploads. Defaults to `["pdf"]` if not set in environment variables. |

#### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `upload` | None | `multer` instance | Configures multer for file uploads with memory storage, file size limits, and file type filtering. |
| `handleUploadError` | `error`, `req`, `res`, `next` | None | Handles errors from multer, providing appropriate responses for different error types. |

#### Notes

- The file uses environment variables to configure the maximum file size and allowed file types, making it flexible for different environments.
- The `fileFilter` function ensures only specific file types are allowed based on MIME types.
- The error handling middleware provides clear and informative error messages to the client.

---

### `backend/src/models/AdminUser.js`
**Language:** Javascript

#### Module Overview

This file is a crucial part of our backend, defining the structure and behavior of an admin user within our application. It uses Mongoose to create a schema that enforces validation rules and includes methods for password hashing and comparison. The model is then exported for use in other parts of the application.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `mongoose` | Provides a schema definition and model for MongoDB |
| `bcrypt` | Used for hashing and comparing passwords |

#### Classes

| Class | Purpose |
|-------|---------|
| `AdminUser` | Represents an admin user in the database |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `comparePassword` | `candidatePassword` | `Promise<boolean>` | Compares a candidate password with the stored hashed password |

#### Configuration

- The schema includes timestamps for `createdAt` and `updatedAt`.

#### Notes

- The password is hashed using bcrypt with a cost factor of 12.
- The `comparePassword` method is used to authenticate users.
- The `toJSON` method ensures the password is not included in JSON representations of the user.

---

### `backend/src/models/Conversation.js`
**Language:** Javascript

#### Module Overview

This file defines the `Conversation` model using Mongoose, a MongoDB object modeling tool for Node.js. It sets up the schema for a conversation, including the structure for messages and metadata about the conversation session. This model is crucial for storing and retrieving chat data, ensuring that each conversation is uniquely identifiable and can be efficiently queried.

#### Dependencies

| Import | Purpose |
| ------ | ------- |
| `mongoose` | Provides schema definition and model creation for MongoDB. |

#### Classes

| Class | Purpose | Key Methods |
| ----- | ------- | ----------- |
| `Conversation` | Mongoose model for a conversation. | `addMessage` |

#### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `addMessage` | `messageData` | `Promise<Conversation>` | Adds a new message to the conversation and updates the last activity timestamp. |

#### Configuration

- `messageSchema`: Defines the structure for individual messages within a conversation.
- `conversationSchema`: Defines the structure for a conversation, including session metadata and an array of messages.

#### Notes

- The `addMessage` method automatically updates the `lastActivity` timestamp to the current date and time whenever a new message is added.
- The `isActive` field helps in efficiently querying active conversations.
- Indexes are created on `startTime` and a compound index on `isActive` and `lastActivity` to optimize query performance.

---

### `backend/src/models/Document.js`
**Language:** Javascript

#### Module Overview

This file defines the schema and model for document data using Mongoose. It sets up the structure for storing document information in the MongoDB database, including validation rules and default values. This model is used throughout the application to interact with document data.

#### Dependencies

| Dependency | Purpose |
| --- | --- |
| `mongoose` | Provides schema definition and model creation for MongoDB. |

#### Classes

| Class | Purpose |
| --- | --- |
| `Document` | Represents a document in the database with properties like title, filename, and status. |

#### Configuration

- **Schema Definition**: The schema includes fields for document metadata, such as title, filename, and upload details.
- **Validation**: Fields have validation rules, such as required fields, length constraints, and minimum size.
- **Indexes**: Indexes are created for efficient querying on `status`, `uploadDate`, and `uploadedBy`.

#### Notes

- Ensure that the `AdminUser` model is defined and available when using the `uploadedBy` field.
- The `uploadDate` field defaults to the current date and time.
- The `status` field has predefined values and defaults to "processing".

---

### `backend/src/models/index.js`
**Language:** Javascript

#### Module Overview

The `backend/src/models/index.js` file serves as the entry point for our application's data models. It consolidates and exports several core model classes that represent different entities in our system, such as `AdminUser`, `Document`, and `Conversation`. These models are integral for interacting with the database and managing the application's data structure.

#### Dependencies

- `AdminUser` from `./AdminUser.js`
- `Document` from `./Document.js`
- `Conversation` from `./Conversation.js`
- `utilityFunction1` and `utilityFunction2` from `../utils/utilities.js`

#### Classes

| Class      | Purpose                                      | Key Methods |
|------------|----------------------------------------------|-------------|
| AdminUser  | Represents an administrative user in the system | `create`, `update`, `delete` |
| Document   | Represents a document entity                  | `save`, `fetch`, `remove` |
| Conversation | Represents a conversation entity | `start`, `addMessage`, `end` |

#### Functions

| Function         | Parameters | Returns | Description |
|------------------|------------|---------|-------------|
| utilityFunction1 | `param1`   | `type`  | Description of function 1 |
| utilityFunction2 | `param2`   | `type`  | Description of function 2 |

#### Notes

- The file includes commented-out code for running regression tests, which can be enabled by uncommenting the relevant lines.
- Ensure to check the individual model files for detailed implementation and method functionalities.

---

### `backend/src/routes/authRoutes.js`
**Language:** Javascript

#### Module Overview

The `authRoutes.js` file sets up the Express routes for handling authentication-related requests. It includes a single route for logging in an admin user, which is protected by a rate limiter to prevent abuse. This file integrates with the `authController` for processing login logic and validation.

#### Dependencies

| Import | Source | Purpose |
| --- | --- | --- |
| `express` | `node_modules/express` | Core framework for routing HTTP requests |
| `login` | `../controllers/authController.js` | Handles the actual login logic |
| `validateLogin` | `../controllers/authController.js` | Validates the login request |
| `authLimiter` | `../middleware/rateLimiter.js` | Limits the number of login attempts to prevent abuse |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.post('/login', authLimiter, validateLogin, login)` | `req, res` | `Promise` | Handles POST requests to `/api/auth/login` and applies rate limiting, validation, and login logic |

#### Notes

- The `authLimiter` middleware is crucial for preventing brute-force attacks on the login endpoint.
- Ensure that the `authController` methods are correctly implemented to handle authentication logic.
- The route is only for admin login; ensure that appropriate permissions are checked within the `login` function.

---

### `backend/src/routes/chatRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the route handlers for all chat-related API endpoints. It includes routes for asking questions to the AI, retrieving conversations, and managing individual conversations through CRUD operations, with administrative access controls in place.

#### Dependencies

- **express**: The web framework used to create the router.
- **chatController**: Contains the logic for handling chat-related requests.
- **auth**: Middleware for authenticating admin users.
- **rateLimiter**: Middleware to limit the rate of requests to prevent abuse.

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| ask | question (string) | Response object | Handles POST requests to ask a question to the AI. |
| validateQuestion | question (string) | Validation result | Validates the question being asked. |
| getConversations | None | Array of conversations | Retrieves all conversations (admin only). |
| getConversation | id (string) | Specific conversation | Retrieves a specific conversation (admin only). |
| deleteConversation | id (string) | Deletion status | Deletes a specific conversation (admin only). |
| askAboutDocument | documentId (string), question (string) | Response object | Handles POST requests to ask a question about a specific document. |

#### Configuration

- **chatLimiter**: Rate limiter for chat-related POST requests.
- **apiLimiter**: Rate limiter for all API requests.

#### Notes

- All admin-related routes are protected by `authenticateAdmin` middleware.
- Rate limiting is applied to prevent excessive requests to the chat and API endpoints.
- The `ask` and `askAboutDocument` functions rely on validation provided by `validateQuestion` middleware.

---

### `backend/src/routes/documentRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the Express routes for managing documents, including uploading, viewing, deleting, and retrieving document statuses. It ensures that only authenticated admins can perform sensitive operations like uploading and deleting documents, while also handling the webhook for updating document statuses from the AI pipeline.

#### Dependencies

- **express**: The web framework for Node.js.
- **documentController.js**: Contains controller functions for document operations.
- **auth.js**: Provides middleware for admin authentication.
- **upload.js**: Provides middleware for handling file uploads.
- **rateLimiter.js**: Provides rate limiting middleware to protect the routes.

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `getAnnouncements` | None | Array of documents | Retrieves all uploaded documents. |
| `uploadDocument` | req, res | None | Handles the upload of a new document. |
| `validateUpload` | req, res, next | None | Validates the uploaded document. |
| `updateDocumentStatusWebhook` | req, res | None | Updates document status via webhook. |
| `viewDocument` | req, res | Document content | Retrieves the content of a specific document. |
| `deleteDocument` | req, res | None | Deletes a specific document. |
| `getDocumentStatus` | req, res | Document status | Retrieves the processing status of a document. |

#### Configuration

- **apiLimiter**: Middleware to limit the number of requests to the `/announcements` and `/upload` routes.

#### Notes

- All admin-only routes are protected by the `authenticateAdmin` middleware.
- The `upload.single("document")` middleware handles the file upload for the `/upload` route.
- The `handleUploadError` middleware is used to manage any errors that occur during file upload.

---

### `backend/src/routes/index.js`
**Language:** Javascript

#### Module Overview

This file defines the main routing structure for our backend API. It imports and mounts various route modules, each responsible for handling specific types of requests, such as authentication, document management, chat functionality, and Telegram integration. Additionally, it includes a health check endpoint to verify the API's operational status.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | The web framework used to create the router. |
| `authRoutes` | Routes for authentication-related endpoints. |
| `documentRoutes` | Routes for document management. |
| `chatRoutes` | Routes for chat-related functionality. |
| `telegramRoutes` | Routes for Telegram integration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `router` | Express Router instance used to manage API routes. | `router.use()`, `router.get()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.use("/auth", authRoutes)` | `authRoutes` | None | Mounts the authentication routes. |
| `router.use("/documents", documentRoutes)` | `documentRoutes` | None | Mounts the document management routes. |
| `router.use("/chat", chatRoutes)` | `chatRoutes` | None | Mounts the chat routes. |
| `router.use("/telegram", telegramRoutes)` | `telegramRoutes` | None | Mounts the Telegram integration routes. |
| `router.get("/health",...)` | `req, res` | JSON response | Health check endpoint returning the API status. |

#### Notes

- The `/health` endpoint is crucial for monitoring the API's operational status.
- Each route module is mounted at a specific path, ensuring organized and modular route handling.
- The `router` instance uses the `router.use()` method to mount other route modules, which allows for clean and maintainable route definitions.

---

### `backend/src/routes/telegramRoutes.js`
**Language:** Javascript

#### Module Overview

This file defines the routes and handlers for the Telegram bot within our backend. It sets up rate limiting, validation rules, and specific endpoints for asking questions, asking questions about specific documents, and performing health checks. The routes are designed to interact with our AI proxy service to provide responses.

#### Dependencies

- `express`: Core framework for defining routes and middleware.
- `express-validator`: For input validation of Telegram bot requests.
- `aiProxyService`: Contains functions for interacting with the AI service (`askQuestion`, `askQuestionWithDocument`).
- `express-rate-limit`: For applying rate limiting to Telegram routes.

#### Functions

| Function                  | Parameters            | Returns   | Description                                                                                       |
|---------------------------|-----------------------|-----------|---------------------------------------------------------------------------------------------------|
| `telegramAsk`             | `req`, `res`          | `Promise` | Handles asking a question via Telegram bot, validates input, and interacts with AI service.       |
| `telegramAskDocument`     | `req`, `res`          | `Promise` | Handles asking a question about a specific document via Telegram bot, validates input, and interacts with AI service. |
| `telegramHealthCheck`     | `req`, `res`          | `Promise` | Provides a health check endpoint for the Telegram bot, returning server status and metrics.       |

#### Configuration

- `telegramRateLimit`: Rate limiting configuration for Telegram bot requests (10 requests per minute per IP).

#### Constants

| Constant                      | Value                                                                                           | Description                                                                                       |
|-------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `validateTelegramRequest`     | Array of validation rules                                                                       | Validation rules for Telegram bot requests.                                                       |

#### Notes

- Rate limiting is applied to all Telegram routes to prevent abuse.
- Validation rules are crucial for ensuring the integrity of incoming requests.
- Error handling is implemented to provide meaningful responses in case of failures.

---

### `backend/src/services/aiProxyService.js`
**Language:** Javascript

#### Module Overview

This module serves as an intermediary between the application and the AI pipeline. It manages document uploads to the AI system, handles user questions by querying the AI, and maintains conversation state. It abstracts the complexities of interacting with the AI backend, providing a clean API for the rest of the application.

#### Dependencies

- `Document`, `Conversation`: Mongoose models for database interactions.
- `axios`: For making HTTP requests to the AI pipeline.
- `fs`, `path`: Node.js modules for file system operations.
- `truncateMessage`, `ensureUploadsDir`: Utility functions for message truncation and ensuring the uploads directory exists.

#### Configuration

- `AI_PIPELINE_URL`: URL of the AI pipeline service. Defaults to `http://localhost:8001` if not set.
- `MOCK_MODE`: Boolean indicating whether to use mock responses for testing purposes.

#### Functions

| Function                      | Parameters                                            | Returns                                                                                           | Description                                                                                       |
|-------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `uploadDocumentToAI`          | `file`, `title`, `uploadedBy`                         | `{ success: boolean, message: string, document: object }`                                          | Uploads a document to the AI pipeline, saves it to the database, and updates its status.         |
| `getIndexedDocuments`         | None                                                  | `{ success: boolean, documents: array }`                                                           | Retrieves all indexed documents from the database.                                                |
| `askQuestion`                 | `question`, `sessionId`, `userIp`, `userAgent`        | `{ success: boolean, response: string, content_type: string, sources: array, conversationId: string }` | Sends a question to the AI, retrieves the response, and saves the conversation.                   |
| `addMessageToConversation`    | `conversationId`, `message`, `sessionId`              | `{ success: boolean, response: string, content_type: string, sources: array, conversationId: string }` | Adds a message to an existing conversation or starts a new one if the conversation is not found. |

#### Notes

- In `MOCK_MODE`, the module simulates AI responses and processing delays for testing purposes.
- Error handling is robust, with specific checks for common issues like invalid API keys.
- Conversations are saved to the database, allowing for persistent chat sessions.

---

### `backend/src/services/authService.js`
**Language:** Javascript

#### Module Overview

The `authService.js` file is a part of the backend services that handles the creation and authentication of the default admin user, as well as the validation of JWT tokens. It ensures that the admin user is created if it doesn't already exist and provides methods to authenticate and validate the admin user's credentials and tokens.

### Dependencies

| Import | Description |
| --- | --- |
| `AdminUser` | Mongoose model for the admin user. |
| `generateToken` | Utility function to generate JWT tokens. |
| `verifyToken` | Utility function to verify JWT tokens. |

### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `createDefaultAdmin` | None | None | Creates a default admin user if it doesn't already exist. |
| `authenticateAdmin` | `username`, `password` | `{ success: boolean, message: string, user: object, token: string }` | Authenticates an admin user and returns a JWT token if successful. |
| `validateToken` | `token` | `{ success: boolean, message: string, user: object }` | Validates a JWT token and returns user information if valid. |
| `getUserById` | `userId` | `AdminUser` | Retrieves an admin user by their ID. |

### Notes

- The `createDefaultAdmin` function ensures that the default admin user is created only if it doesn't already exist.
- The `authenticateAdmin` function checks the provided username and password, and if valid, generates a JWT token.
- The `validateToken` function verifies the JWT token and checks if the user still exists in the database.
- The `getUserById` function retrieves an admin user by their ID, throwing an error if the user is not found.

---

### `backend/src/utils/jwtUtils.js`
**Language:** Javascript

#### Module Overview

This file, `jwtUtils.js`, contains essential functions for generating, verifying, and decoding JSON Web Tokens (JWT). It leverages the `jsonwebtoken` library to manage JWT operations, ensuring secure token-based authentication and authorization within the application. The module sets up a consistent approach to token management, which is crucial for maintaining the integrity of user sessions across the application.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `jsonwebtoken` | Provides methods for creating, verifying, and decoding JWTs. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `generateToken` | `payload` | `string` | Generates a JWT with the provided payload and returns it. |
| `verifyToken` | `token` | `object` or `Error` | Verifies the provided JWT and returns the decoded payload if valid. Throws an error if the token is invalid or expired. |
| `decodeToken` | `token` | `object` or `Error` | Decodes the provided JWT and returns the payload. Throws an error if decoding fails. |

#### Configuration

| Constant | Purpose |
| --- | --- |
| `JWT_SECRET` | Secret key used for signing and verifying JWTs. Defaults to a hardcoded value if not set in the environment. |
| `JWT_EXPIRES_IN` | Duration for which the JWT is valid. Defaults to 7 days if not set in the environment. |

#### Notes

- Always use a secure, long, and random string for `JWT_SECRET` in production.
- The `JWT_EXPIRES_IN` duration can be adjusted based on the application's session requirements.
- Error handling in `verifyToken` distinguishes between expired and invalid tokens, providing clear feedback on token issues.

---

### `chatbot-rag-langchain-main/README.md`
**Language:** Md

#### Module Overview

This README file serves as a guide for developers to set up and run a chatbot application that utilizes Retrieval-Augmented Generation (RAG) and LangChain. It explains how to upload PDFs, query them, and receive metadata-rich answers. The chatbot leverages LangChain for PDF parsing, FAISS for vector search, and the OpenAI API for generating responses.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| Streamlit | UI framework |
| LangChain | PDF parsing and retrieval |
| FAISS | Vector search backend |
| PyPDF2 | PDF parsing |
| openai | LLM-based answer generation |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `parse_pdf` | PDF file | List of text chunks | Extracts text from each page of the PDF |
| `text_to_docs` | Text chunks | List of Document objects | Splits text into chunks and attaches metadata |
| `docs_to_index` | List of Document objects | FAISS index | Creates a FAISS index with embedded documents |
| `get_index_for_pdf` | List of PDF files, filenames, API key | FAISS index | Orchestrates PDF parsing, chunking, embedding, and indexing |

#### Notes

- Ensure the `OPENAI_API_KEY` is set either in `.streamlit/secrets.toml` or as an environment variable.
- Uploaded files are stored in-memory and are not persisted to disk unless optional persistence is implemented.
- The FAISS index is stored in-memory and will be cleared on server restart or cache clear unless optional persistence is implemented.

---

### `chatbot-rag-langchain-main/app.py`
**Language:** Python

#### Module Overview

This file, `chatbot-rag-langchain-main/app.py`, is the main entry point for a Streamlit application that serves as a chatbot. It leverages the Retrieval-Augmented Generation (RAG) approach to provide answers based on the content of uploaded PDF files. The app uses the `openai` library to interact with the GPT model and `streamlit` to create the user interface. It also includes a utility function to load the API key securely.

#### Dependencies

| Import | Purpose |
| ------ | ------- |
| `streamlit` | Provides the framework for the web application. |
| `openai` | Interfaces with the GPT model for generating responses. |
| `brain` | Contains the function to create a vector database from PDF files. |
| `os` | Used for environment variable access. |
| `utils` | Includes a utility function to load the API key. |

#### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `create_vectordb` | `files`, `filenames` | `vectordb` | Creates a vector database from the provided PDF files. |

#### Configuration

- `OPENAI_API_KEY`: The API key for accessing the GPT model. It is loaded from Streamlit secrets or environment variables.

#### Notes

- Ensure the `OPENAI_API_KEY` is set either in `.streamlit/secrets.toml` or as an environment variable.
- The `create_vectordb` function is cached to avoid recreating the vector database for the same files.
- The chatbot uses a prompt template to format the context from the PDF files before querying the GPT model.

---

### `chatbot-rag-langchain-main/brain.py`
**Language:** Python

#### Module Overview

The `brain.py` file is a core component of the chatbot's retrieval-augmented generation (RAG) system. It handles the ingestion of PDF documents, processes the text to create document chunks, and builds a FAISS vector index for these chunks using embeddings from the `OpenAIEmbeddings` API. This setup allows the chatbot to efficiently retrieve relevant information from the ingested documents.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `re` | Regular expressions for text processing. |
| `BytesIO` | In-memory file-like object for handling PDF files. |
| `Document` | A class from `langchain_core.documents` to represent document chunks. |
| `OpenAIEmbeddings` | A class from `langchain_openai` to generate embeddings using the OpenAI API. |
| `RecursiveCharacterTextSplitter` | A class from `langchain_text_splitters` to split text into chunks. |
| `FAISS` | A class from `langchain_community.vectorstores` to create a vector index. |
| `PdfReader` | A class from `pypdf` to read and extract text from PDF files. |
| `faiss` | The FAISS library for efficient similarity search and clustering of dense vectors. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `parse_pdf` | `file: BytesIO`, `filename: str` | `Tuple[List[str], str]` | Extracts text from a PDF file, processes it, and returns the text and filename. |
| `text_to_docs` | `text: List[str]`, `filename: str` | `List[Document]` | Converts text into a list of `Document` objects, each representing a chunk of text. |
| `docs_to_index` | `docs`, `openai_api_key` | `FAISS` | Creates a FAISS index from a list of `Document` objects using embeddings. |
| `get_index_for_pdf` | `pdf_files`, `pdf_names`, `openai_api_key` | `FAISS` | Processes a list of PDF files, extracts text, creates document chunks, and builds a vector index. |

#### Notes

- Ensure the `openai_api_key` is correctly set up and accessible to avoid API errors.
- The `parse_pdf` function uses regular expressions to clean up the extracted text, which might need adjustments based on the specific PDF formats.
- The `text_to_docs` function assumes that the input text is a list of strings; if a single string is provided, it is converted into a list.
- The `docs_to_index` function requires the `openai_api_key` to generate embeddings, which are essential for indexing the document chunks.
- The `get_index_for_pdf` function is a higher-level function that orchestrates the entire process of PDF processing, text chunking, and indexing.

---

### `chatbot-rag-langchain-main/requirements.txt`
**Language:** Txt

#### Module Overview

The `requirements.txt` file lists the Python packages necessary for running the chatbot project that utilizes Retrieval-Augmented Generation (RAG) and LangChain. This file ensures that all team members have the same environment setup, which is crucial for consistent development and testing.

#### Dependencies

This file includes several key Python libraries:

- **openai**: Provides access to the powerful language models from OpenAPI.
- **streamlit**: A framework for quickly creating web apps for data science and machine learning.
- **langchain**: A library for building applications powered by large language models.
- **langchain-core**: Core components of the LangChain library.
- **langchain-community**: Community-contributed extensions for LangChain.
- **langchain-openai**: Integration with OpenAPI for LangChain.
- **faiss-cpu**: A library for efficient similarity search and clustering of dense vectors.
- **pypdf**: A library for reading and writing PDF files.
- **tiktoken**: A tokenizer for text encoding and decoding, useful for working with large language models.

#### Functions

There are no explicit functions listed in this file. It serves as a dependency manager.

#### Notes

- Ensure all listed packages are installed in the correct Python environment to avoid runtime errors.
- Regularly check for updates to these packages to incorporate the latest features and security patches.

---

### `frontend/README.md`
**Language:** Md

#### Module Overview

This file details the minimal setup required to get React working within a Vite environment, complete with Hot Module Replacement (HMR) and ESLint integration. It includes instructions for setting up two official plugins for React with Vite, and provides guidance on expanding the ESLint configuration for production applications.

#### Dependencies

- **@vitejs/plugin-react**: Uses Babel for Fast Refresh.
- **@vitejs/plugin-react-swc**: Uses SWC for Fast Refresh.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| ReactComponent | Represents a React component | render(), setState() |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| setupReactWithVite | None | Configuration object | Sets up React with Vite using the specified plugin |

#### Configuration

- **ESLint**: Integrated for linting React components.
- **TypeScript**: Recommended for production applications with type-aware lint rules.

#### Notes

- Ensure to choose between Babel or SWC based on your project's performance needs.
- For production-grade applications, consider integrating TypeScript and `typescript-eslint` for enhanced type safety and linting.

---

### `frontend/components.json`
**Language:** Json

#### Module Overview

This file, `frontend/components.json`, serves as the configuration hub for our frontend components. It sets up styling preferences, specifies the icon library, and defines aliases for commonly used directories and modules. This helps streamline imports and ensures consistency across the frontend codebase.

#### Dependencies

- **Tailwind CSS**: Configured for styling with a base color of neutral and CSS variables enabled.
- **Lucide**: Specified as the icon library.
- **Aliases**: Provides shortcuts for frequently used directories like `components`, `utils`, and `hooks`.

#### Configuration

| Key | Value | Description |
|-----|-------|-------------|
| "$schema" | "https://ui.shadcn.com/schema.json" | Defines the schema for the configuration file. |
| "style" | "new-york" | Specifies the styling theme. |
| "rsc" | false | Resource sharing configuration. |
| "tsx" | false | TypeScript JSX configuration. |
| "tailwind" | | Tailwind CSS configuration. |
| "iconLibrary" | "lucide" | Specifies the icon library to use. |
| "aliases" | | Defines aliases for commonly used directories. |
| "registries" | {} | Component registries. |

#### Notes

- Ensure that the `tailwind` configuration is correctly set up to avoid styling issues.
- The `iconLibrary` is set to `lucide`, so make sure this library is included in your project dependencies.
- Aliases simplify imports but can lead to confusion if not used consistently. Always refer to the `aliases` section for correct paths.

---

### `frontend/eslint.config.js`
**Language:** Javascript

#### Module Overview

This file sets up the ESLint configuration for our frontend project, ensuring consistent code quality and style across JavaScript and JSX files. It integrates several plugins and extends recommended configurations to enforce best practices and catch common issues early.

#### Dependencies

- `@eslint/js`: Provides ESLint configuration for JavaScript.
- `globals`: Provides global definitions for ESLint.
- `eslint-plugin-react-hooks`: Enforces rules for React hooks.
- `eslint-plugin-react-refresh`: Adds React-specific rules, including support for React Refresh.
- `eslint/config`: Provides utilities to define and manage ESLint configurations.

#### Configuration

### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| None  | N/A     | N/A         |

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `defineConfig` | Configuration array | ESLint config object | Combines and extends ESLint configurations. |

### Configuration

This file configures ESLint to ignore the `dist` directory and applies specific rules to JavaScript and JSX files. It extends recommended configurations from `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. The `languageOptions` specify ECMAScript 2020 as the target version and include browser globals. The `no-unused-vars` rule is configured to treat capital underscore-prefixed variables as intentional.

#### Notes

- Ensure that all JavaScript and JSX files are linted according to this configuration.
- The `no-unused-vars` rule ignores variables starting with an uppercase underscore, which is common for constants.
- The `ecmaVersion` is set to the latest, ensuring compatibility with the most recent ECMAScript features.

---

### `frontend/index.html`
**Language:** Html

#### Module Overview

This HTML file defines the basic structure of our web application. It includes the necessary head elements such as meta tags for character set and viewport settings, a link to the application icon, and the title of the page. The body contains a single div with the id "root," which acts as the mounting point for our React application. The file also imports the main JavaScript module that initializes and runs the React application.

#### Dependencies

This file does not directly import any other modules but relies on the following key components:

- **`/src/main.jsx`**: The main JavaScript entry point for the React application.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| None | N/A | N/A | N/A |

#### Configuration

- **Meta Tags**:
  - `<meta charset="UTF-8">`: Sets the character encoding for the HTML document.
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures the page is responsive and renders well on all devices.

#### Notes

- The `<div id="root"></div>` element is where the React application will be mounted and rendered.
- The `<script type="module" src="/src/main.jsx"></script>` tag imports the main JavaScript module that bootstraps the React application.
- Ensure that the path to the JavaScript module is correct and that the React application is properly configured to mount to the `root` div.

---

### `frontend/jsconfig.json`
**Language:** Json

#### Module Overview

The `frontend/jsconfig.json` file is a configuration file for the TypeScript compiler in our frontend project. It sets up the base URL and module paths, enabling aliases to simplify import statements and streamline the development process. This configuration helps maintain cleaner and more manageable code by allowing developers to use relative paths instead of long, absolute paths.

#### Dependencies

This file does not directly import any modules but relies on TypeScript's compiler options to manage module resolution.

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| `baseUrl`     | Sets the base directory for resolving non-absolute module names. |
| `paths`       | Maps aliases to directories, allowing for cleaner imports. |

### Example Usage

```javascript
import { Component } from '@/components/Component';
```

In this example, `@/components/Component` is resolved to `src/components/Component` thanks to the `paths` configuration.

#### Notes

- Always ensure that the `baseUrl` and `paths` configurations are correctly set to avoid import errors.
- Changes to this file require restarting the TypeScript compiler for the changes to take effect.

---

### `frontend/package.json`
**Language:** Json

#### Module Overview

This `package.json` file is the heart of our frontend module's configuration. It lists all the dependencies and development tools required to build, develop, and lint the frontend codebase. The file ensures that all team members use the same versions of libraries and tools, which helps maintain consistency across different environments.

#### Dependencies

This section lists the key libraries and frameworks that our frontend relies on:

| Library | Purpose | Version |
| --- | --- | --- |
| @radix-ui/react-avatar | UI component for displaying avatars | ^1.1.10 |
| @radix-ui/react-dialog | UI component for dialogs | ^1.1.15 |
| @radix-ui/react-scroll-area | UI component for scroll areas | ^1.2.10 |
| @tailwindcss/typography | Tailwind CSS plugin for typography | ^0.5.16 |
| axios | HTTP client for making API requests | ^1.11.0 |
| react | Core library for building user interfaces | ^19.1.1 |
| react-dom | Library for rendering React to the DOM | ^19.1.1 |
| react-markdown | Component for rendering Markdown content | ^10.1.0 |
| react-router-dom | Routing library for React | ^6.26.1 |
| tailwindcss | Utility-first CSS framework | ^4.1.13 |

#### DevDependencies

This section lists the development tools required to build and maintain the frontend codebase:

| Tool | Purpose | Version |
| --- | --- | --- |
| @eslint/js | JavaScript linting tool | ^9.33.0 |
| @vitejs/plugin-react | Vite plugin for React | ^5.0.0 |
| eslint | JavaScript linter | ^9.33.0 |
| vite | Modern front-end build tool | ^7.1.2 |

#### Scripts

The `scripts` section defines the commands that can be run to build, develop, lint, and preview the frontend:

| Script | Command | Description |
| --- | --- | --- |
| dev | `npm run dev` | Starts the development server using Vite |
| build | `npm run build` | Builds the project for production |
| lint | `npm run lint` | Runs ESLint to check for linting errors |
| preview | `npm run preview` | Previews the production build |

#### Notes

- Ensure all dependencies are up-to-date to avoid compatibility issues.
- Use `npm install` to install all dependencies listed in this file.
- Always run `npm run lint` before committing changes to ensure code quality.

---

### `frontend/vite.config.js`
**Language:** Javascript

#### Module Overview

This `frontend/vite.config.js` file sets up the Vite build tool for our React-based frontend application. It integrates essential plugins like React and Tailwind CSS, and provides configuration for module resolution and server settings. The configuration ensures that the development and preview servers support history API fallback, which is crucial for single-page applications.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `vite` | Core build tool for fast development and production builds. |
| `@vitejs/plugin-react` | Plugin to support React in Vite. |
| `@tailwindcss/vite` | Plugin to integrate Tailwind CSS with Vite. |
| `path` | Node module for handling and transforming file paths. |

#### Configuration

| Configuration | Description |
|---------------|-------------|
| `plugins` | Array of plugins to use in the Vite build process. |
| `resolve.alias` | Path alias for importing modules from the `src` directory. |
| `server.historyApiFallback` | Enables history API fallback for the development server. |
| `preview.historyApiFallback` | Enables history API fallback for the preview server. |

#### Notes

- The `resolve.alias` configuration simplifies imports by allowing the use of `@` as an alias for the `src` directory.
- The `historyApiFallback` setting is essential for SPA routing, ensuring that all routes work correctly without refreshing the page.
- Ensure that all plugins are correctly installed in `package.json` to avoid build errors.

---

### `frontend/src/App.css`
**Language:** Css

Empty file.

---

### `frontend/src/App.jsx`
**Language:** Javascript

#### Module Overview

The `App.jsx` file is the entry point for our React application. It sets up the main structure of the app, including the routing logic and the initial state for authentication. The component uses React hooks to manage state and side effects, ensuring that the app responds to changes in authentication status and user interactions.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React`, `useState`, `useEffect` | Core React functionalities for state management and side effects. |
| `Routes`, `Route`, `Navigate` | Components from `react-router-dom` for defining and managing routes. |
| `ChatbotView`, `LoginPage`, `AdminDashboard` | View components for different parts of the application. |
| `ProtectedRoute` | A custom component to protect certain routes based on authentication status. |
| `./App.css` | CSS module for styling the app. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `App` | None | JSX | The main app component that renders the routing logic and views. |

#### Notes

- The `isAuthenticated` state is initialized based on the presence of an `authToken` in local storage.
- The app listens for changes in local storage to update the authentication status across different tabs.
- Protected routes are wrapped with the `ProtectedRoute` component to enforce authentication requirements.

---

### `frontend/src/index.css`
**Language:** Css

#### Module Overview

This CSS file serves as the central stylesheet for our application, importing essential libraries like Tailwind CSS and defining keyframe animations, theme variables, and base styles. It ensures consistent styling and smooth animations across the app, enhancing user experience.

#### Dependencies

- `tailwindcss`: Provides utility-first CSS framework.
- `tw-animate-css`: Extends Tailwind with additional animations.
- `@tailwindcss/typography`: Enhances prose text styles.

#### Animations

| Animation | Description |
|-|-|
| `fab-to-chat` | Scales and moves the FAB to the chat position. |
| `chat-to-fab` | Reverses the FAB-to-chat animation. |
| `fade-in` | Fades an element into view. |
| `bounce-in` | Bounces an element into view with scaling. |
| `slide-up` | Slides an element up into view. |
| `pulse-glow` | Creates a pulsing glow effect. |

#### Classes

| Class | Purpose |
|-|-|
| `.animate-fab-to-chat` | Applies FAB-to-chat animation. |
| `.animate-chat-to-fab` | Applies chat-to-FAB animation. |
| `.animate-fade-in` | Applies fade-in animation. |
| `.animate-slide-up` | Applies slide-up animation. |
| `.animate-pulse-glow` | Applies pulse-glow animation. |
| `.animate-bounce-in` | Applies bounce-in animation. |
| `.message-enter` | Applies fade-in animation for chat messages. |
| `.chat-widget-container` | Optimizes performance for chat widget. |
| `.transition-smooth` | Applies smooth transition for interactive elements. |

#### Theme Variables

Defines a comprehensive set of theme variables for consistent styling across the application, including radii, colors, and states.

#### Notes

- Ensure animations are tested for performance on target devices.
- Theme variables should be used consistently to maintain design integrity.

---

### `frontend/src/main.jsx`
**Language:** Javascript

#### Module Overview

The `frontend/src/main.jsx` file is the entry point for our React application. It initializes the React root and sets up the routing with React Router. The `StrictMode` wrapper helps identify potential problems in the application by including additional checks and warnings. This file ensures that the main `App` component is rendered within a `BrowserRouter`, enabling client-side routing.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `StrictMode` | Provides a way to highlight areas of the codebase that could be improved. |
| `createRoot` | A method from `react-dom/client` to create a root for rendering the React tree. |
| `BrowserRouter` | A component from `react-router-dom` that enables client-side routing. |
| `App` | The main application component that contains the core logic and UI. |
| `index.css` | Global styles for the application. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `createRoot(container).render()` | `React component tree` | None | Renders the React component tree into the DOM. |

#### Configuration

No specific configuration is set in this file. It relies on the components and routes defined in `App.jsx`.

#### Notes

- Ensure that the `<div id="root"></div>` exists in the `index.html` file to serve as the mounting point for the React application.
- The use of `StrictMode` is recommended for development to catch potential issues early.
- Any changes to the routing or component structure should be reflected in the `App.jsx` file.

---

### `frontend/src/api/client.js`
**Language:** Javascript

#### Module Overview

This file sets up an axios client to handle HTTP requests for our frontend application. It configures an axios instance with a base URL, timeout, and default headers. It also includes request and response interceptors to manage authentication tokens and handle unauthorized access errors.

#### Dependencies

- **axios**: A promise-based HTTP client for making requests to the backend API.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `api` | Axios instance configured for API requests | `get`, `post`, `put`, `delete`, etc. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `api.interceptors.request.use` | `config` | `config` | Adds authorization token to outgoing requests |
| `api.interceptors.response.use` | `response`, `error` | `response` or `Promise.reject(error)` | Handles response and errors, redirects on 401 |

#### Configuration

- **Base URL**: `import.meta.env.VITE_API_URL` or `http://localhost:3001/api`
- **Timeout**: 10 seconds

#### Notes

- The request interceptor checks for an `authToken` in local storage and adds it to the Authorization header of outgoing requests.
- The response interceptor handles unauthorized errors (401) by clearing the token and redirecting the user to the login page.
- Always ensure that the environment variable `VITE_API_URL` is set correctly for production environments.

---

### `frontend/src/api/index.js`
**Language:** Javascript

#### Module Overview

This module serves as a centralized API client for various functionalities within the application. It provides a clean interface for interacting with the backend services, handling authentication, document operations, and chat interactions. Each API function is designed to encapsulate the logic for a specific operation, ensuring that the rest of the application can focus on the user interface and business logic.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `api` | HTTP client for making requests to the backend. |
| `generateSessionId` | Utility function to generate a unique session ID. |
| `handleApiError` | Utility function to handle and format API errors. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `authAPI.login` | `credentials` | `Promise<response.data>` | Authenticates an admin by logging in with provided credentials. |
| `documentAPI.getAnnouncements` | None | `Promise<response.data>` | Fetches all announcements/documents from the server. |
| `documentAPI.uploadDocument` | `formData` | `Promise<response.data>` | Uploads a new document to the server. |
| `documentAPI.viewDocument` | `id` | `Promise<response>` | Retrieves a document for viewing. |
| `documentAPI.deleteDocument` | `id` | `Promise<response.data>` | Deletes a document from the server. |
| `documentAPI.getDocumentStatus` | `id` | `Promise<response.data>` | Retrieves the status of a document. |
| `chatAPI.askQuestion` | `question`, `conversationId` | `Promise<response.data>` | Asks a question and tracks the conversation. |
| `chatAPI.askAboutDocument` | `question`, `documentId`, `conversationId` | `Promise<response.data>` | Asks a question about a specific document. |
| `chatAPI.getConversations` | `page`, `limit` | `Promise<response.data>` | Retrieves all conversations. |
| `chatAPI.getConversation` | `id` | `Promise<response.data>` | Retrieves a specific conversation. |
| `chatAPI.deleteConversation` | `id` | `Promise<response.data>` | Deletes a specific conversation. |

#### Notes

- All API functions use `try-catch` blocks to handle errors and throw formatted error messages.
- The `generateSessionId` function is used to create a unique session ID for chat interactions.
- The `handleApiError` function standardizes error handling across all API calls.

---

### `frontend/src/components/DocumentList.jsx`
**Language:** Javascript

Empty file.

---

### `frontend/src/components/ProtectedRoute.jsx`
**Language:** Javascript

#### Module Overview

The `ProtectedRoute` component ensures that only authenticated users can access certain parts of the application. It uses the `Navigate` component from `react-router-dom` to redirect unauthenticated users to the login page. This component checks for the presence of an `authToken` and a `user` in the local storage, and if either is missing, it redirects the user to the login page with the current location as state.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| React      | Core library for building UI components. |
| Navigate   | Redirects to a specified path. |
| useLocation| Hook to access the current location object. |

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| None  | N/A     | N/A         |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|----------|-------------|
| None     | N/A        | N/A      | N/A         |

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| None           | N/A     |

#### Notes

- This component relies on the presence of `authToken` and `user` in local storage to determine if a user is authenticated.
- If the user is not authenticated, they are redirected to the `/login` page with the current location passed as state.
- Ensure that the `authToken` and `user` are properly set in local storage upon successful login.

---

### `frontend/src/components/index.js`
**Language:** Javascript

#### Module Overview

This file serves as the entry point for all the components used in the frontend application. It exports several components organized into categories such as chat, layout, sidebar, and document management. Each component is responsible for a specific part of the user interface, ensuring a modular and maintainable codebase.

#### Dependencies

This module imports several components from different directories within the `frontend/src/components` folder. These components are essential for rendering different parts of the application's UI.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | This file does not define any classes but exports them instead. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | This file does not define any functions. | N/A | It only exports components.

#### Configuration

There are no specific configuration settings in this file. It simply exports components that are used throughout the application.

#### Notes

- Ensure that all components being exported are correctly imported from their respective directories.
- This file should not contain any logic or state management; it's purely for exporting components.
- Any changes to the component structure should be reflected here to maintain consistency across the application.

---

### `frontend/src/components/chat/ChatArea.jsx`
**Language:** Javascript

#### Module Overview

The `ChatArea` component is a key part of our chat interface, responsible for rendering the chat messages, the header, and the input area where users can type and send messages. It integrates several subcomponents to achieve this functionality, including `ChatHeader`, `MessageList`, and `MessageInput`. The component also handles some state management and event handling for sending messages and toggling mobile menu.

#### Dependencies

- `ChatHeader`: Displays the header of the chat area.
- `MessageList`: Renders the list of chat messages.
- `MessageInput`: Provides the input field for typing new messages.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatArea` | Main container for chat messages and input area | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ChatArea` | `messages`, `inputValue`, `setInputValue`, `onSendMessage`, `onMobileMenuToggle`, `onSuggestionClick` | None | Renders the chat area with message list, header, and input field. Manages state and events for chat interactions. |

#### Configuration

- The `ChatArea` component receives props to manage the state and handle events:
  - `messages`: Array of chat messages.
  - `inputValue`: Current value of the message input.
  - `setInputValue`: Function to update the input value.
  - `onSendMessage`: Function to handle sending a new message.
  - `onMobileMenuToggle`: Function to toggle the mobile menu.
  - `onSuggestionClick`: Function to handle clicking on a message suggestion.

#### Notes

- The `ChatHeader` component is rendered twice with different `isMobile` props. This is a design choice to handle mobile and desktop header differences.
- Ensure that all passed props are correctly handled to avoid runtime errors.
- The `MessageInput` component is responsible for updating the input value and sending messages, so ensure these functions are correctly implemented in the parent component.

---

### `frontend/src/components/chat/ChatHeader.jsx`
**Language:** Javascript

#### Module Overview

The `ChatHeader` component renders the header section of a chat interface. It conditionally displays different layouts based on whether the user is on a mobile device or not. On mobile, it shows a simplified header with an avatar and title, while on larger screens, it provides a more detailed header with additional information.

#### Dependencies

- `Avatar` and `AvatarFallback` from `@/components/ui/avatar`: These components are used to display the avatar icon and fallback text respectively.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatHeader` | Renders the header for the chat interface | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ChatHeader` | `isMobile` (boolean, optional) | JSX element | Conditionally renders different header layouts based on the `isMobile` prop |

#### Configuration

- The `isMobile` prop determines the layout of the header. If `true`, a mobile-friendly layout is used; otherwise, a desktop layout is shown.

#### Notes

- The mobile layout uses a smaller avatar size and fallback text.
- The desktop layout includes a subtitle for additional context.
- The `AvatarFallback` component is used to display a fallback icon or text when no image is provided.

---

### `frontend/src/components/chat/ChatTranscripts.jsx`
**Language:** Javascript

#### Module Overview

The `ChatTranscripts` component is responsible for rendering and managing the chat transcripts interface. It fetches conversations from the API, allows users to view conversation details, and provides options to delete conversations. The component is divided into two main sections: a list of conversations on the left and detailed conversation view on the right. It incorporates pagination for navigating through conversations and a search functionality to filter conversations.

#### Dependencies

- `React`, `useState`, `useEffect` from "react": Core React functionalities for state and lifecycle management.
- Icons from "lucide-react": Icons used for UI elements like buttons.
- `chatAPI` from "../../api/index.js": API client for fetching and managing conversations.
- UI components from "../ui/": Reusable UI components like `Button`, `Input`, `Card`, etc.
- Utility functions from "../../utils/toast.js": Functions for displaying toast notifications and confirmation dialogs.

#### Functions

| Function                 | Parameters               | Returns | Description                                                                                       |
|:-------------------------|:-------------------------|:--------|:--------------------------------------------------------------------------------------------------|
| `fetchConversations`     | `page` (optional, number)| Promise | Fetches conversations from the API, updates the state with the fetched conversations and pagination info. |
| `fetchConversationDetail`| `id` (string)            | Promise | Fetches details of a specific conversation by its ID and updates the selected conversation state. |
| `handleDelete`           | `id` (string), `event`   | Promise | Handles the deletion of a conversation, shows a confirmation dialog, and updates the UI accordingly. |
| `handleConversationClick`| `conv` (object)          | void    | Handles the click event on a conversation, either selects or unselects the conversation.          |
| `formatDateTime`         | `dateString` (string)    | string  | Formats a date string into a locale-specific date-time string.                                   |
| `formatDuration`         | `start` (string), `end` (string) | string | Calculates and formats the duration between two date strings.                                    |

#### Notes

- The `handleDelete` function prevents the conversation from being selected when the delete button is clicked by stopping the event propagation.
- The component uses a combination of local state and API calls to manage the display and interaction of chat transcripts.
- Pagination is managed through the `currentPage` state and the `pagination` object fetched from the API.
- Search functionality filters conversations based on the `searchTerm` state.

---

### `frontend/src/components/chat/MessageBubble.jsx`
**Language:** Javascript

#### Module Overview

The `MessageBubble` component is a React functional component that renders individual chat messages. It handles both user and bot messages, applying different styles and additional information for bot messages like sources and document references. This component is part of the chat feature in the frontend application.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React` | Core React library for building UI components. |
| `ReactMarkdown` | Library for rendering markdown content in React. |
| `remarkGfm` | Plugin for `ReactMarkdown` to support GitHub Flavored Markdown. |
| `{ Badge }` | UI component for displaying badges, imported from `../ui/badge.jsx`. |
| `{ FileText }` | Icon component from `lucide-react` for displaying a file text icon. |
| `SourceSuggestions` | Component for displaying source suggestions, imported from `./SourceSuggestions.jsx`. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `MessageBubble` | `{ message, onSuggestionClick }` | JSX element | Renders a chat message bubble with appropriate styling and content based on the message type. |

#### Notes

- The component uses conditional rendering to apply different styles and content based on whether the message is from a user or a bot.
- The `formatTimestamp` function formats the message timestamp into a readable time string.
- Bot messages display additional information like sources, document references, and source suggestions.

---

### `frontend/src/components/chat/MessageInput.jsx`
**Language:** Javascript

#### Module Overview

The `MessageInput` component is a user interface element designed for inputting and sending messages in a chat application. It features an input field where users can type their messages and a send button to submit the message. The component also handles the "Enter" key press to send messages automatically.

#### Dependencies

- **useState**: Hook from React to manage state within functional components.
- **Button**: A UI component for rendering a button.
- **Input**: A UI component for rendering an input field.
- **ScrollArea**: A UI component for rendering a scrollable area.
- **Avatar**: A UI component for rendering an avatar.
- **ChevronRight**: An icon from `lucide-react` used in the send button.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `handleKeyPress` | `e` (event) | `void` | Handles the key press event to trigger message sending on "Enter" key press. |

#### Configuration

- **inputValue**: The current value of the input field.
- **setInputValue**: Function to update the input value.
- **onSendMessage**: Function to be called when a message is sent.

#### Notes

- The input field updates its value in real-time as the user types, using the `setInputValue` function.
- The send button is disabled if the input value is empty or only contains whitespace.
- Pressing the "Enter" key while focused in the input field triggers the `onSendMessage` function.

---

*This documentation was automatically generated and formatted by DocuSense AI.*