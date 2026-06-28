# Campus-mitra - Documentation

## Project Overview

The `repo_a6308e84db08` repository contains the source code for the Campus-mitra project, a comprehensive solution for document management and AI-driven chat interactions. The project is structured into several key components: `ai_pipeline`, `backend`, `chatbot-rag-langchain-main`, and `frontend`.

The `ai_pipeline` directory houses the AI-driven functionalities, including document processing and chat query handling. It utilizes Python and various libraries for natural language processing and machine learning. The `backend` directory contains an Express.js server that manages user authentication, chat interactions, and document uploads. It connects to a MongoDB database for data storage and retrieval.

The `chatbot-rag-langchain-main` directory includes a LangChain-based chatbot implementation, leveraging Retrieval-Augmented Generation (RAG) for enhanced conversational capabilities. The `frontend` directory contains a React application that provides the user interface for interacting with the backend services. It includes components for document management, chat interfaces, and user authentication.

The project uses a tech stack that includes Python for the AI pipeline, Node.js and Express.js for the backend, MongoDB for database management, and React for the frontend. The components interact through RESTful APIs, with the frontend sending requests to the backend, which then processes these requests using the AI pipeline where necessary. The intended users of this project are likely educational institutions or organizations that require a robust document management system coupled with AI-driven chat support.

## Architecture

## Architecture Overview

### Code Organization

The codebase is organized into several key modules, each serving a distinct purpose:

- **`ai_pipeline/`**: Contains the AI pipeline module, responsible for document processing and handling user queries.
- **`backend/`**: Houses the Express backend, managing authentication, chat, and document-related operations.
- **`chatbot-rag-langchain-main/`**: Contains the RAG-based chatbot implementation.
- **`frontend/`**: Includes the React frontend, providing the user interface for interacting with the system.

### Data Flow

Data flows through the system in the following manner:

1. **Frontend**: Users interact with the application via the React frontend, submitting queries and documents.
2. **Backend**: The Express backend handles these requests, authenticating users, processing documents, and managing conversations.
3. **AI Pipeline**: The AI pipeline processes documents, extracts text, and generates responses using RAG and conversation context.
4. **Database**: MongoDB stores user data, conversations, and documents.

### Key Design Patterns

- **MVC (Model-View-Controller)**: Used in the backend to separate concerns between data models, views, and controllers.
- **Service Layer**: Encapsulates business logic, such as document processing and chat handling, in service classes.
- **Middleware**: Utilized in the backend for authentication, rate limiting, and file upload handling.

### Main Entry Points

- **`ai_pipeline/main.py`**: Entry point for the AI pipeline API.
- **`backend/index.js`**: Entry point for the Express backend server.
- **`frontend/src/main.jsx`**: Entry point for the React frontend application.

### Practical Considerations

- **Configuration**: Settings and configurations are centralized in files like `ai_pipeline/config/settings.py` and `backend/src/config/database.js`.
- **Dependencies**: Dependencies are managed via `package.json` files in each module.
- **Modularity**: The codebase is designed to be modular, allowing for easy maintenance and extension of individual components.

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
├── nitinog10-Campus-mitra-72efc69/
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

## Dependencies

### Major Libraries

- **concurrently**
  - **Purpose**: To run multiple commands concurrently.
  - **Version Constraint**: `^9.0.0`
  - **Type**: Development Dependency

- **vite**
  - **Purpose**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
  - **Version Constraint**: `^7.1.4`
  - **Type**: Production Dependency

### Version Constraints

- **Development Dependencies**
  - `concurrently`: `^9.0.0`
  
- **Production Dependencies**
  - `vite`: `^7.1.4`

### Usage in Scripts

- **dev**: Runs the development server using `node scripts/start-dev.js`.
- **dev:all**: Runs development servers for all workspaces (`frontend`, `backend`, `ai_pipeline`, `telegram-bot`) concurrently.
- **dev:legacy**: Runs development servers for `frontend`, `backend`, and `ai_pipeline` concurrently.
- **telegram-bot**: Runs the Telegram bot using the command `yarn workspace telegram-bot run start`.
- **telegram-bot:dev**: Runs the Telegram bot in development mode using `yarn workspace telegram-bot run dev`.

## File Reference

This section contains detailed documentation for each source file in the repository.

### `Namespace.md`
**Language:** Md

Empty file.

---

### `README.md`
**Language:** Md

#### Module Overview

The `README.md` file serves as the primary documentation for the Campus-mitra project, offering a comprehensive guide for developers to understand, set up, and contribute to the project. It outlines the project's purpose, features, technology stack, and instructions for getting started. This file is crucial for onboarding new team members and ensuring everyone is aligned with the project's goals and structure.

#### Dependencies

| Dependency | Purpose |
| --- | --- |
| Node.js | JavaScript runtime for the backend |
| Python | Programming language for the AI pipeline |
| MongoDB | Database for storing project data |
| FastAPI | Framework for building APIs with Python |
| LangChain | Library for building AI applications |
| Node.js, Express | Frameworks for the backend server |
| Mongoose | ODM for MongoDB |
| React, Vite | Libraries for the frontend application |

#### Notes

- Ensure all dependencies are installed before running the project.
- The project uses a monorepo structure, with separate directories for the AI pipeline, backend, and frontend.
- Follow the installation and running instructions carefully to avoid configuration issues.

---

### `package.json`
**Language:** Json

#### Module Overview

The `package.json` file is the heart of our project's configuration, detailing dependencies and defining scripts to streamline development workflows. It specifies the project's name, workspaces for different parts of the application, and scripts to run various parts of the application in development mode. This file ensures that everyone on the team uses the same versions of libraries and tools, maintaining consistency across development environments.

#### Dependencies

| Package | Purpose |
| --- | --- |
| concurrently | Allows running multiple commands concurrently. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `dev` | None | None | Starts the development server. |
| `dev:all` | None | None | Runs development servers for all workspaces. |
| `dev:legacy` | None | None | Runs development servers for legacy workspaces. |
| `telegram-bot` | None | None | Starts the Telegram bot. |
| `telegram-bot:dev` | None | None | Runs the Telegram bot in development mode. |

#### Configuration

| Configuration | Purpose |
| --- | --- |
| `workspaces` | Lists the different parts of the application that are treated as separate projects. |
| `scripts` | Defines custom scripts to run various parts of the application in development mode. |

#### Notes

- The `private` field is set to `true` to prevent accidental publication of the project to the npm registry.
- The `devDependencies` section includes tools required only for development, such as `concurrently`.
- The `dependencies` section lists libraries essential for the project, such as `vite` for module bundling.

---

### `ai_pipeline/README.md`
**Language:** Md

#### Module Overview

The `ai_pipeline` module is the backbone of Project campusmitra's AI capabilities. It integrates FastAPI for API management, LangChain for advanced language processing, OCR for optical character recognition, and a vector database for efficient data retrieval. This module orchestrates the entire AI workflow, ensuring seamless interaction between these technologies to deliver intelligent, data-driven solutions.

#### Dependencies

- **FastAPI**: Provides the framework for building the API endpoints.
- **LangChain**: Facilitates complex language processing tasks.
- **OCR**: Implements optical character recognition for extracting text from images.
- **Vector Database**: Manages and retrieves vectorized data for efficient similarity searches.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Pipeline | Manages the entire AI pipeline workflow | `run()`, `fetch_data()`, `process_data()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `api_endpoint` | `request` | `response` | Handles API requests and returns responses |
| `ocr_extract` | `image_path` | `text` | Extracts text from an image using OCR |

#### Configuration

- **API Endpoints**: Configuration for FastAPI routes.
- **OCR Settings**: Parameters for the OCR engine, such as language and character set.

#### Notes

- Ensure Python virtual environments are used to manage dependencies.
- Always validate inputs to avoid errors in the pipeline.

---

### `ai_pipeline/main.py`
**Language:** Python

#### Module Overview

The `ai_pipeline/main.py` file is the core of the AI Pipeline API, built using FastAPI. It orchestrates the document processing and chat query functionalities, providing endpoints for uploading documents, querying the document store, and managing document statuses. The file integrates various services and utilities to ensure smooth operation of the API.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `FastAPI` | Framework for building the API |
| `uvicorn` | ASGI server to run the FastAPI app |
| `CORSMiddleware` | Middleware to handle Cross-Origin Resource Sharing |
| `DocumentProcessor`, `ChatService` | Services for document handling and chat queries |
| `ChatRequest`, `MultiDocumentChatRequest` | Request models for chat queries |
| `DocumentResponse`, `ChatResponse`, `StatusResponse` | Response models for API endpoints |
| `settings` | Configuration settings for the API |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `read_root` | None | JSON | Returns a welcome message |
| `health_check` | None | JSON | Returns the health status of the service |
| `process_document` | `file: UploadFile` | JSON | Processes an uploaded PDF document |
| `chat_query` | `request: ChatRequest` | JSON | Processes a chat query using the RAG pipeline |
| `search_multiple_documents` | `request: MultiDocumentChatRequest` | JSON | Searches across multiple documents for a query |
| `list_documents` | None | JSON | Lists all available documents |
| `get_document_status` | `doc_id: str` | JSON | Retrieves the status of a document |
| `delete_document` | `doc_id: str` | JSON | Deletes a document from the vector store |

#### Notes

- The API supports only PDF files for document uploads.
- The file size limit for uploads is set to 20MB.
- The API includes error handling for common issues like unsupported file types and processing errors.

---

### `ai_pipeline/package.json`
**Language:** Json

#### Module Overview

The `ai_pipeline/package.json` file serves as the configuration backbone for our AI pipeline project. It specifies the project's name, version, and main entry point, as well as the scripts necessary to run the project in both development and production environments. This file ensures that all team members use the same set of dependencies and commands to start the application.

#### Dependencies

This file does not list direct dependencies but relies on the `pyproject.toml` file for Python package management. The key dependencies are managed there and ensure that the correct versions of libraries are used across all environments.

#### Scripts

The `scripts` section defines commands to run the application:

| Script | Purpose |
| --- | --- |
| `dev` | Starts the application in development mode with hot reloading. |
| `start` | Starts the application in production mode without hot reloading. |

#### Notes

- Ensure you run `npm install` in the root directory if you encounter any missing dependency issues.
- The `main.py` file is the entry point for the application and should be updated to reflect the current state of the AI pipeline logic.
- Always check the version number in the `package.json` file to ensure compatibility with other parts of the project.

---

### `ai_pipeline/requirements.txt`
**Language:** Txt

#### Module Overview

The `ai_pipeline/requirements.txt` file contains a list of Python packages essential for running the AI pipeline. These dependencies ensure that the application has all the necessary libraries to handle various tasks, from API management to data processing and machine learning operations.

#### Dependencies

| Package | Purpose | Key Features |
| --- | --- | --- |
| `fastapi` | Web framework for building APIs with Python | Fast, easy-to-use, and modern |
| `uvicorn` | ASGI server for Python | Asynchronous server, high performance |
| `python-multipart` | Parse multipart/form-data | Handles file uploads |
| `pydantic` | Data validation and settings management | Models for data validation |
| `python-dotenv` | Load environment variables from a.env file | Manages environment variables |
| `openai` | Official Python SDK for the OpenAPI | Interface with the OpenAPI platform |
| `langchain` | Framework for building applications with large language models | Modular, extensible, and flexible |
| `langchain-core` | Core components for LangChain | Essential building blocks |
| `langchain-community` | Community-contributed extensions for LangChain | Additional features and plugins |
| `langchain-openai` | Integration with the OpenAPI for LangChain | Connects LangChain with OpenAPI |
| `faiss-cpu` | CPU-based implementation of the FAISS library | Efficient similarity search and clustering |
| `pypdf` | PDF parsing and manipulation | Read, write, and modify PDF files |
| `cachetools` | Caching utilities | Improve performance by caching results |

#### Notes

- Ensure all dependencies are up-to-date to avoid compatibility issues.
- Some packages may require additional configuration in environment variables or settings files.
- Check for any known issues or updates for each dependency to maintain optimal performance and security.

---

### `ai_pipeline/config/settings.py`
**Language:** Python

#### Module Overview

This file, `settings.py`, defines the configuration settings for the AI pipeline. It includes environment variables, paths for data storage, and operational parameters like file size limits and chunking settings. These settings are crucial for the proper functioning of the AI pipeline, ensuring that it operates within defined constraints and utilizes resources efficiently.

#### Dependencies

- `os`: Provides a way to use operating system-dependent functionality.
- `dotenv`: Loads environment variables from a `.env` file into `os.environ`.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| Settings | Manages configuration settings for the AI pipeline. | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| None | None | None | No functions are defined in this file. |

#### Configuration

This file uses environment variables to configure sensitive information like API keys and sets various operational parameters for the AI pipeline.

### Constants

- `vector_store_path`: Directory for vector store data.
- `temp_uploads_path`: Directory for temporary uploads.
- `max_file_size`: Maximum allowed file size for uploads (20MB).
- `chunk_size`: Size of chunks for processing (4000 characters).
- `chunk_overlap`: Overlap between chunks for processing (100 characters).
- `similarity_search_k`: Number of top K documents to retrieve for similarity search (2).
- `enable_response_cache`: Flag to enable caching of responses (True).

#### Notes

- Environment variables are loaded using `dotenv` to keep sensitive information secure.
- The `Settings` class initializes with environment variables and predefined constants.
- Ensure that the `.env` file is correctly set up with necessary environment variables for this file to work correctly.

---

### `ai_pipeline/models/request_models.py`
**Language:** Python

#### Module Overview

This file defines data models for requests that are part of our AI pipeline. It uses Pydantic to create robust request models that enforce data validation and serialization. These models are crucial for ensuring that incoming requests are well-formed and contain the necessary data before they are processed further in the pipeline.

#### Dependencies

- **Pydantic**: A library for data validation using Python type annotations.
- **Typing**: Provides runtime support for type hints.

#### Classes

| Class               | Purpose                                                                                   | Key Methods |
|---------------------|--------------------------------------------------------------------------------------------|-------------|
| `ChatRequest`       | Represents a request for a single document chat. Includes a query and an optional document ID. | N/A         |
| `MultiDocumentChatRequest` | Represents a request for a chat involving multiple documents. Includes a query and a list of document IDs. | N/A         |
| `DocumentUploadRequest` | Represents a request to upload a document. Includes a filename and the document content. | N/A         |

#### Functions

There are no functions defined in this file.

#### Configuration

- **Pydantic ConfigDict**: Used to add extra JSON schema information for validation and examples.

#### Notes

- The `ChatRequest` and `MultiDocumentChatRequest` classes use Pydantic's `BaseModel` and `ConfigDict` to define the structure and provide example data for better understanding.
- The `DocumentUploadRequest` class includes a filename and document content in bytes, ensuring that file uploads are handled correctly.
- All models are optional where appropriate, allowing for flexibility in request handling.

---

### `ai_pipeline/models/response_models.py`
**Language:** Python

#### Module Overview

This file defines Pydantic models that represent the structure of responses from different parts of our AI pipeline. These models ensure that the responses are validated and have the correct structure, making it easier to handle them throughout the application. The models are used to encapsulate the data returned from various endpoints, ensuring consistency and ease of use.

#### Dependencies

- `pydantic`: A library for data validation using Python type annotations.
- `typing`: Provides type hints for Python variables, allowing for better code readability and error checking.

#### Classes

| Class        | Purpose                                                                                     | Key Methods |
|--------------|---------------------------------------------------------------------------------------------|------------|
| `DocumentResponse` | Represents a response containing the status of document processing. | N/A        |
| `ChatResponse`    | Represents a response containing the generated chat content and metadata. | N/A        |
| `StatusResponse`  | Represents a simple status response with success flag and a message. | N/A        |

#### Classes

| Class        | Purpose                                                                                     | Key Methods |
|--------------|---------------------------------------------------------------------------------------------|------------|
| `DocumentResponse` | Represents a response containing the status of document processing. | N/A        |
| `ChatResponse`    | Represents a response containing the generated chat content and metadata. | N/A        |
| `StatusResponse`  | Represents a simple status response with success flag and a message. | N/A        |

#### Notes

- Each model uses `pydantic.BaseModel` to ensure that the response data adheres to the defined structure.
- The `ConfigDict` is used to add extra JSON schema information for better documentation and validation.
- The `DocumentResponse` and `ChatResponse` classes include optional and default values to handle various scenarios gracefully.
- The `StatusResponse` is a simple model used for status checks and notifications.

---

### `ai_pipeline/services/cache_service.py`
**Language:** Python

#### Module Overview

The `cache_service.py` file implements a caching mechanism for document information, using an in-memory cache with time-to-live (TTL) entries and persistent storage on disk. This service is designed to efficiently manage document metadata, ensuring quick access while maintaining data integrity across application restarts.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `TTLCache` from `cachetools` | Provides an in-memory cache with TTL functionality |
| `time` | Used for time-related functions |
| `json` | For serializing and deserializing cache data |
| `os` | For interacting with the operating system, such as file operations |
| `Path` from `pathlib` | For handling file paths in a more readable and object-oriented way |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `CacheService` | Manages caching of document information with persistent storage | `__init__`, `load_persistent_cache`, `rebuild_cache_from_disk`, `save_persistent_cache`, `get`, `set`, `delete`, `clear` |

#### Functions

There are no standalone functions in this file. All functionality is encapsulated within the `CacheService` class.

#### Configuration

- **maxsize**: The maximum number of items allowed in the cache. Default is 100.
- **ttl**: The time-to-live for cache entries in seconds. Default is 3600 seconds (1 hour).

#### Notes

- The cache service automatically loads from and saves to a persistent storage file named `cache_data.json` on initialization and when items are added or removed.
- Only document information (keys starting with `doc_info_`) is saved to the persistent cache to avoid storing temporary data.
- The cache service uses atomic file operations to prevent data corruption during writes.

---

### `ai_pipeline/services/chat_service.py`
**Language:** Python

#### Module Overview

This module defines the `ChatService` class, which is responsible for processing user queries, generating responses using Retrieval-Augmented Generation (RAG), and maintaining conversation context. It integrates with the `OpenAI` API for generating responses, uses a `DocumentProcessor` for loading document content, and implements a simple in-memory cache and conversation memory to improve performance and context awareness.

#### Dependencies

- `OpenAI`: For interacting with the OpenAI API to generate responses.
- `DocumentProcessor`: For loading and processing document content.
- `cache_service`: For caching responses to prevent repeated API calls.
- `settings`: For configuration, including the OpenAI API key and other settings.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ChatService` | Manages user queries, generates responses, and maintains conversation context. | `__init__`, `_cleanup_cache`, `_get_conversation_history`, `_update_conversation_memory`, `get_response` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `_cleanup_cache` | None | None | Cleans up old cache entries to prevent memory bloat. |
| `_get_conversation_history` | `session_id: str`, `max_turns: int = 3` | `str` | Retrieves recent conversation history for a given session. |
| `_update_conversation_memory` | `session_id: str`, `question: str`, `response: str` | None | Updates the conversation memory with the latest question and response. |
| `get_response` | `query: str`, `document_id: Optional[str] = None`, `session_id: Optional[str] = None` | `Dict[str, Any]` | Generates a response for the user query using RAG and conversation context. |

#### Configuration

- `settings.openai_api_key`: The API key for accessing the OpenAI service.
- `settings.similarity_search_k`: The number of similar documents to retrieve for RAG.

#### Constants

- `self.prompt_template`: The template used for generating prompts for the AI model.

#### Notes

- The `api_key_available` flag determines whether the service can make API calls to OpenAI.
- The conversation memory is currently stored in-memory and should be replaced with a persistent storage solution (e.g., Redis or a database) in production.
- The cache is periodically cleaned up to prevent memory bloat, but this is a simple implementation and may need optimization.

---

### `ai_pipeline/services/document_processor.py`
**Language:** Python

#### Module Overview

This module provides a comprehensive service for processing documents, specifically PDFs. It extracts text, chunks it into manageable pieces, and stores these chunks in a FAISS vector store for efficient retrieval. The module integrates with external services like `OpenAI` for embeddings and `cache_service` for metadata persistence.

#### Dependencies

- `re`, `os`, `pickle`, `hashlib`, `shutil`, `io`, `typing`, `uuid`: Standard library modules for regex, OS operations, serialization, hashing, file operations, type hints, and UUID generation.
- `langchain_core.documents.Document`, `langchain_openai.OpenAIEmbeddings`, `langchain_text_splitters.RecursiveCharacterTextSplitter`, `langchain_community.vectorstores.FAISS`, `pypdf.PdfReader`: External libraries for document handling, embeddings, text splitting, vector store management, and PDF parsing.
- `config.settings.settings`, `services.cache_service.cache_service`: Project-specific configurations and caching service.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `DocumentProcessor` | Central class for document processing | `__init__`, `_parse_pdf`, `_text_to_docs`, `_create_vector_store`, `process_document`, `get_vector_store`, `get_document_status`, `list_documents`, `delete_document` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `_parse_pdf` | `file_content: bytes`, `filename: str` | `Tuple[List[str], str]` | Parses PDF content and extracts text. |
| `_text_to_docs` | `text: List[str]`, `filename: str` | `List[Document]` | Converts text into document chunks. |
| `_create_vector_store` | `documents: List[Document]` | `FAISS` | Creates FAISS vector store from documents. |
| `process_document` | `file_content: bytes`, `filename: str` | `str` | Processes document and stores in vector database. |
| `get_vector_store` | `doc_id: str` | `FAISS` | Loads vector store for a document. |
| `get_document_status` | `doc_id: str` | `str` | Retrieves processing status of a document. |
| `list_documents` |   | `List[Dict]` | Lists all available documents. |
| `delete_document` | `doc_id: str` |   | Deletes document and its vector store. |

#### Configuration

- `settings.openai_api_key`: Required for initializing `OpenAIEmbeddings`.
- `settings.chunk_size`, `settings.chunk_overlap`: Used in `RecursiveCharacterTextSplitter` for text chunking.
- `settings.vector_store_path`: Directory path for storing vector stores.

#### Notes

- Ensure `settings.openai_api_key` is properly configured; otherwise, vector store creation and retrieval will fail.
- Text extraction from PDFs may fail if the PDF is empty or corrupted.
- Chunking may result in empty chunks if the text doesn't split properly; these are filtered out.
- Vector stores are saved to disk and loaded using FAISS native methods.
- Document metadata is persisted to disk and cached for quick access.
- Deleting a document removes both its vector store directory and cache entry.

---

### `ai_pipeline/utils/pdf_utils.py`
**Language:** Python

#### Module Overview

This module, `pdf_utils.py`, contains utility functions that assist in processing PDF files. It includes methods for calculating SHA256 hashes of file contents, validating PDF files by their extensions, and formatting file sizes into human-readable strings. These functions are designed to be used across various parts of the AI pipeline where PDF file handling is required.

#### Dependencies

- `hashlib`: A module for secure hash and message digest algorithms.
- `typing`: Provides type hints for better code readability and error checking.

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `calculate_file_hash` | `file_content: bytes` | `str` | Calculates the SHA256 hash of the provided file content. |
| `validate_pdf_file` | `filename: str` | `bool` | Validates if the given filename ends with `.pdf`. |
| `format_file_size` | `size_bytes: int` | `str` | Formats the file size into a human-readable string. |

#### Notes

- `calculate_file_hash` expects the file content as a byte stream and returns the SHA256 hash as a hexadecimal string.
- `validate_pdf_file` checks the file extension and returns `True` if it ends with `.pdf`, otherwise `False`.
- `format_file_size` converts bytes into a more readable format like KB, MB, or GB, handling sizes down to bytes and up to gigabytes.

---

### `backend/index.js`
**Language:** Javascript

#### Module Overview

The `backend/index.js` file initializes the Express application, connects to the database, and sets up various middleware and routes. It ensures the server is secure, handles CORS, and processes incoming requests. This file is crucial for the backend's functionality, providing a structured way to manage routes and middleware.

### Dependencies

| Import | Purpose |
| ------ | ------- |
| `express` | Framework for building web applications. |
| `cors` | Middleware to handle Cross-Origin Resource Sharing. |
| `helmet` | Middleware to secure Express apps by setting various HTTP headers. |
| `dotenv` | Module to load environment variables from a `.env` file. |
| `connectDB` | Function to connect to the database. |
| `apiRoutes` | API routes configuration. |
| `apiLimiter` | Middleware for rate limiting API requests. |

### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `app.get("/")` | `req`, `res` | JSON response | Root endpoint to check server status and list available endpoints. |

### Configuration

- `PORT`: Port number for the server, defaulting to 3001.
- `FRONTEND_URL`: URL of the frontend application, defaulting to `http://localhost:5173`.

### Notes

- Ensure the `.env` file is properly configured with necessary environment variables.
- The rate limiting middleware is applied to all API routes to prevent abuse.
- The server logs messages to the console for debugging and monitoring purposes.

---

### `backend/package.json`
**Language:** Json

#### Module Overview

This `package.json` file is the backbone of our backend project's configuration. It specifies the project's name, version, and entry point, and outlines the scripts used for development and production. It also lists the dependencies required for the project to run correctly, including libraries for security, data handling, and middleware.

#### Dependencies

This section details the key libraries and their purposes:

| Library | Purpose |
| --- | --- |
| bcrypt | Hashes passwords for secure storage. |
| cors | Enables Cross-Origin Resource Sharing. |
| dotenv | Loads environment variables from a `.env` file. |
| express | The web framework for building APIs. |
| express-rate-limit | Limits the number of requests from a single IP. |
| express-validator | Validates request data. |
| helmet | Enhances security with various HTTP headers. |
| jsonwebtoken | Manages JSON Web Tokens for authentication. |
| mongoose | MongoDB object modeling tool. |
| multer | Handles multipart/form-data, mainly for file uploads. |

#### Scripts

| Script | Description |
| --- | --- |
| `dev` | Starts the application in development mode. |
| `start` | Starts the application in production mode. |

#### Notes

- Ensure environment variables are correctly set in the `.env` file for sensitive configurations.
- Regularly update dependencies to avoid vulnerabilities.
- Be mindful of rate limiting to protect against brute force attacks.

---

### `backend/src/config/database.js`
**Language:** Javascript

#### Module Overview

The `database.js` file is responsible for initializing and managing the connection to our MongoDB database. It uses Mongoose, an Object Data Modeling (ODM) library for MongoDB, to handle the database operations. This module ensures that the application can interact with the database by setting up the connection, handling connection events, and implementing graceful shutdown procedures.

#### Dependencies

| Library | Purpose |
| --- | --- |
| `mongoose` | Provides a straightforward way to work with MongoDB databases. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `connectDB` | None | None | Establishes a connection to the MongoDB database and handles connection events. |

#### Configuration

| Variable | Purpose |
| --- | --- |
| `process.env.DB_URL` | The URL for the MongoDB database, stored in environment variables for security. |

#### Notes

- The `connectDB` function attempts to connect to the MongoDB database using the URL provided in the `process.env.DB_URL` environment variable.
- Connection events are handled to log errors and manage disconnections silently.
- Graceful shutdown is implemented to ensure that the database connection is closed properly when the application is terminated.

---

### `backend/src/controllers/authController.js`
**Language:** Javascript

#### Module Overview

The `authController.js` file is a crucial part of our backend, focusing on user authentication. It validates login requests to ensure the data meets specified criteria and processes the actual login by interacting with the `authService`. This controller ensures that only valid and properly formatted data is used to authenticate users, providing a secure and reliable login mechanism.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `authenticateAdmin` from `../services/authService.js` | Service function to authenticate admin users. |
| `body`, `validationResult` from `express-validator` | Middleware to validate request bodies and check for validation errors. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateLogin` | N/A | Array of validation middleware | Defines validation rules for the login request, ensuring the username and password meet specific criteria. |
| `login` | `req`, `res` | JSON response | Handles the login process, validates the request, authenticates the user, and sends an appropriate response based on the outcome. |

#### Notes

- The `validateLogin` function uses `express-validator` to ensure the username and password fields are correctly formatted and meet the required length.
- The `login` function first checks for validation errors. If any are found, it returns a 400 status with the errors. If validation passes, it attempts to authenticate the user. Depending on the success of the authentication, it returns either a success message with the user data and token or an error message.
- Always ensure that sensitive information, such as passwords, is handled securely and never logged or exposed in error messages.

---

### `backend/src/controllers/chatController.js`
**Language:** Javascript

#### Module Overview

This file defines the `chatController.js` module, which is responsible for processing chat-related HTTP requests. It integrates with AI services to answer questions, manages conversation state, and provides admin endpoints for conversation management. The module ensures request validation, handles errors gracefully, and maintains session and conversation context.

#### Dependencies

- `aiProxyService.js`: Provides methods to interact with AI services for question answering.
- `models/index.js`: Imports `Conversation` and `Document` models for database operations.
- `express-validator`: Used for request validation.
- `requestUtils.js`: Utility functions for generating session IDs and extracting request metadata.

#### Functions

| Function               | Parameters        | Returns          | Description                                                                                       |
|------------------------|-------------------|------------------|---------------------------------------------------------------------------------------------------|
| `validateQuestion`     | -                 | Validation rules | Express validator middleware to validate chat questions.                                          |
| `ask`                  | `req`, `res`      | -                | Controller to handle asking a question, supports conversation tracking and fallback mechanisms.    |
| `askAboutDocument`     | `req`, `res`      | -                | Controller to ask a question about a specific document.                                           |
| `getConversations`     | `req`, `res`      | -                | Admin controller to fetch a paginated list of active conversations.                               |
| `getConversation`      | `req`, `res`      | -                | Admin controller to fetch details of a specific conversation.                                     |
| `deleteConversation`   | `req`, `res`      | -                | Admin controller to delete a specific conversation.                                               |

#### Notes

- Error handling is implemented to manage failures in AI service calls and database operations.
- Admin endpoints for conversation management are protected and intended for internal use only.
- Pagination for conversation retrieval is based on query parameters `page` and `limit`.

---

### `backend/src/controllers/documentController.js`
**Language:** Javascript

#### Module Overview

The `documentController.js` file is a crucial part of our backend, managing all document-related operations. It interacts with the AI service to upload, retrieve, update, and delete documents. This controller ensures that document operations are handled efficiently and securely, providing necessary validations and error handling.

#### Dependencies

| Module | Purpose |
| --- | --- |
| `aiProxyService.js` | Provides functions to interact with the AI service for document operations. |
| `Document` | Mongoose model for document data. |
| `express-validator` | Library for validating request data. |
| `fs` | Node.js file system module for file operations. |
| `path` | Node.js path module for handling file paths. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `validateUpload` | N/A | Array of validation middleware | Middleware to validate document upload requests. |
| `uploadDocument` | `req`, `res` | JSON response | Handles the document upload process, including validation and interaction with the AI service. |
| `getAnnouncements` | `req`, `res` | JSON response | Fetches all indexed documents from the AI service. |
| `updateDocumentStatusWebhook` | `req`, `res` | JSON response | Webhook endpoint to update the status of a document in the AI service. |
| `viewDocument` | `req`, `res` | Stream of document file | Streams the requested document file to the client. |
| `getDocumentStatus` | `req`, `res` | JSON response | Retrieves the status of a document from the AI service. |
| `deleteDocument` | `req`, `res` | JSON response | Deletes a document from the AI service. |

#### Notes

- Always ensure that the `req.file` object is present when uploading a document.
- The `viewDocument` function streams the document file directly to the client, which can be resource-intensive for large files.
- Error handling is implemented to return appropriate HTTP status codes and messages.

---

### `backend/src/middleware/auth.js`
**Language:** Javascript

#### Module Overview

The `auth.js` file defines middleware functions to handle authentication for admin and optional user requests in the backend. These middleware functions are essential for securing routes that require user authentication and ensuring that only authorized users can access specific endpoints.

**Dependencies**

| Import | Purpose |
| :--- | :--- |
| `validateToken` from `../services/authService.js` | Validates the JWT token to extract user information. |

**Functions**

| Function | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `authenticateAdmin` | `req`, `res`, `next` | None | Middleware to authenticate admin requests. It checks for a valid Bearer token in the Authorization header, validates the token, and adds user information to the request object if valid. If the token is missing or invalid, it returns a 401 status with an appropriate message. |
| `optionalAuth` | `req`, `res`, `next` | None | Middleware for optional user authentication. It checks for a valid Bearer token in the Authorization header and validates it. If the token is valid, it adds user information to the request object. If the token is missing or invalid, it simply proceeds to the next middleware without failing the request. |

**Notes**

- The `authenticateAdmin` middleware is designed for routes that require admin-level access. It ensures that only authenticated admin users can access these routes.
- The `optionalAuth` middleware is used for routes that might need user context but are not strictly required to be authenticated. It allows the request to proceed even if the user is not authenticated.
- Both middleware functions handle errors gracefully, logging any issues and returning appropriate HTTP status codes.

---

### `backend/src/middleware/rateLimiter.js`
**Language:** Javascript

#### Module Overview

This file defines middleware that applies rate limiting to our API endpoints. It uses the `express-rate-limit` library to set different limits on the number of requests an IP can make to various parts of our application within a specified time window. This helps to mitigate the risk of Distributed Denial of Service (DDoS) attacks and ensures fair usage of our resources.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express-rate-limit` | Provides rate limiting functionality |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `apiLimiter` | None | Rate limiter middleware | Applies a rate limit of 100 requests per 15 minutes to all API endpoints. |
| `authLimiter` | None | Rate limiter middleware | Applies a stricter rate limit of 5 login attempts per 15 minutes to authentication endpoints. |
| `chatLimiter` | None | Rate limiter middleware | Applies a rate limit of 10 chat requests per minute to the chat/ask endpoint. |

#### Configuration

| Configuration | Value | Description |
| --- | --- | --- |
| `windowMs` | Varies (e.g., 15 minutes, 1 minute) | Time window for rate limiting |
| `max` | Varies (e.g., 100, 5, 10) | Maximum number of requests allowed within the time window |
| `message` | Custom error message | Response message when rate limit is exceeded |
| `retryAfter` | Custom retry time | Suggested time to wait before retrying a request |
| `standardHeaders` | `true` | Enables standard rate limit headers |
| `legacyHeaders` | `false` | Disables legacy rate limit headers |

#### Notes

- The rate limiters are designed to provide a balance between security and usability.
- Custom error messages are provided to inform users when they've exceeded the allowed request rate.
- The `retryAfter` field in the error message suggests a reasonable wait time before retrying a request.

---

### `backend/src/middleware/upload.js`
**Language:** Javascript

#### Module Overview

The `upload.js` file sets up and manages file uploads for the backend. It uses the `multer` library to handle multipart/form-data, which is primarily used for uploading files. This middleware ensures that only files of certain types and sizes are accepted and provides error handling for upload issues.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `multer` | A middleware for handling `multipart/form-data`, which is used for uploading files. |
| `path` | Provides utilities for working with file and directory paths. |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `upload` | N/A | `multer` instance | Configures multer for file uploads with memory storage, file size limits, and file type filtering. |
| `handleUploadError` | `error`, `req`, `res`, `next` | N/A | Handles errors that occur during file uploads, responding with appropriate HTTP status codes and messages. |

#### Configuration

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `MAX_FILE_SIZE_MB` | 20 | Maximum file size in megabytes, configurable via environment variable. |
| `ALLOWED_FILE_TYPES` | `["pdf"]` | Array of allowed file types, configurable via environment variable. |

#### Notes

- The `fileFilter` function ensures that only files with specified MIME types are accepted.
- The `upload` middleware is exported and can be used in routes to handle file uploads.
- The `handleUploadError` middleware is designed to catch and handle errors thrown by `multer`.

---

### `backend/src/models/AdminUser.js`
**Language:** Javascript

#### Module Overview

This file sets up the structure and behavior for an admin user in our application using Mongoose. It defines the schema for the admin user, including validation rules for the username and password fields. Additionally, it includes a pre-save hook to hash the password before saving it to the database and a method to compare passwords. The model is then exported for use in other parts of the application.

**Dependencies**

| Dependency | Purpose |
| --- | --- |
| `mongoose` | Provides schema definition and model creation for MongoDB. |
| `bcrypt` | Used for hashing and comparing passwords. |

**Classes**

| Class | Purpose |
| --- | --- |
| `AdminUser` | Represents an admin user in the database. |

**Functions**

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `comparePassword` | `candidatePassword` (string) | Boolean | Compares a candidate password with the hashed password stored in the database. |

**Notes**

- The password is hashed using bcrypt with a cost factor of 12.
- The `comparePassword` method is used to authenticate admin users.
- The `toJSON` method ensures the password is not included in the JSON representation of the user object.

---

### `backend/src/models/Conversation.js`
**Language:** Javascript

#### Module Overview

This file defines the `Conversation` model using Mongoose, which is used to manage conversations in the backend. It includes schemas for both messages within a conversation and the conversation itself, along with methods to manipulate conversation data.

**Dependencies**

| Import | Purpose |
| --- | --- |
| `mongoose` | Provides schema and model functionalities for MongoDB. |

**Classes**

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `Conversation` | Mongoose model for conversations | `addMessage` |

**Functions**

There are no standalone functions in this file.

**Configuration**

| Configuration | Description |
| --- | --- |
| `messageSchema` | Schema for individual messages within a conversation. |
| `conversationSchema` | Schema for the conversation itself. |

**Methods**

| Method | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `addMessage` | `messageData` (object) | `Promise<Conversation>` | Adds a new message to the conversation and updates the last activity timestamp. |

**Notes**

- The `addMessage` method automatically updates the `lastActivity` timestamp to the current date and time whenever a new message is added.
- The `conversationSchema` includes indexes on `startTime` and a compound index on `isActive` and `lastActivity` to optimize query performance.

---

### `backend/src/models/Document.js`
**Language:** Javascript

#### Module Overview

The `Document.js` file is a core component of our backend, defining the structure and behavior of document records in our MongoDB database. It uses Mongoose to create a schema that enforces validation rules and provides a blueprint for document objects. This model is essential for handling document uploads, storage, and retrieval within our application.

**Dependencies**

| Import | Purpose |
| --- | --- |
| `mongoose` | Provides schema definition and model creation capabilities for MongoDB. |

**Classes**

| Class | Purpose |
| --- | --- |
| `Document` | Represents a document in the database, including properties like title, filename, and upload status. |

**Functions**

There are no standalone functions in this file. The primary function is the model creation using Mongoose.

**Configuration**

The schema includes several validation rules and default values to ensure data integrity and consistency.

**Notes**

- The `uploadDate` field defaults to the current date and time when a document is created.
- The `status` field has predefined values to track the processing state of the document.
- Indexes are created on `status` and `uploadDate` for optimized query performance.

---

### `backend/src/models/index.js`
**Language:** Javascript

#### Module Overview

This file serves as the entry point for our backend's data models, encapsulating the core entities that our application interacts with. It imports and exports several key model classes, each representing a different aspect of our application's data structure. These models are essential for maintaining the integrity and organization of our data, ensuring that our application can efficiently manage and manipulate the data it holds.

#### Dependencies

| Import | Source | Purpose |
| --- | --- | --- |
| `AdminUser` | `./AdminUser.js` | Represents an administrative user with specific permissions. |
| `Document` | `./Document.js` | Represents a document entity within the application. |
| `Conversation` | `./Conversation.js` | Represents a conversation entity, containing messages and participants. |
| `utilityFunction1` | `../utils/utilities.js` | Utility function 1, used for common tasks. |
| `utilityFunction2` | `../utils/utilities.js` | Utility function 2, used for common tasks. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `AdminUser` | Manages administrative users. | `createAdminUser`, `updateAdminUser`, `deleteAdminUser` |
| `Document` | Manages document entities. | `createDocument`, `updateDocument`, `deleteDocument` |
| `Conversation` | Manages conversation entities. | `createConversation`, `addMessage`, `deleteConversation` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `utilityFunction1` | Varies | Depends on implementation | General utility function 1. |
| `utilityFunction2` | Varies | Depends on implementation | General utility function 2. |

#### Notes

- The file includes commented-out code for running regression tests, which can be enabled by uncommenting the relevant lines.
- Ensure to run regression tests regularly to maintain the integrity of the models.

---

### `backend/src/routes/authRoutes.js`
**Language:** Javascript

#### Module Overview

The `authRoutes.js` file sets up the Express routes for handling authentication-related requests. It defines a single route for logging in an admin user, applying a rate limiter to mitigate abuse and including controller functions to handle the actual login logic.

#### Dependencies

- **express**: The web framework used to create the router.
- **authController.js**: Contains the `login` and `validateLogin` functions used to handle authentication logic.
- **rateLimiter.js**: Provides a middleware to limit the number of requests from a single IP.

#### Functions

| Function | Parameters | Returns | Description |
|----------|-------------|---------|-------------|
| `login`  | `req, res`  | `res`   | Handles the actual login process and sends back a response. |
| `validateLogin` | `req, res, next` | `next` | Validates the incoming login request and passes control to the next middleware or route handler. |

#### Configuration

- **authLimiter**: Middleware that limits the number of requests from a single IP address to prevent abuse.

#### Notes

- The `login` route is protected by the `authLimiter` to prevent rate abuse.
- The `validateLogin` function is used to validate the incoming login request before proceeding to the `login` function.
- Ensure that the `authController.js` file is correctly implemented to handle authentication logic.

---

### `backend/src/routes/chatRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the routing for chat-related API endpoints. It handles various operations such as asking questions to the AI, fetching conversations, and managing individual conversations through specific endpoints. It uses middleware for rate limiting, authentication, and question validation.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | Framework for handling HTTP requests |
| `ask`, `validateQuestion`, `getConversations`, `getConversation`, `deleteConversation`, `askAboutDocument` | Functions from chatController for handling chat-related logic |
| `authenticateAdmin` | Middleware for authenticating admin users |
| `chatLimiter`, `apiLimiter` | Middleware for rate limiting |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.post("/ask")` | `req, res` | `Promise` | Handles POST requests to ask a question to the AI |
| `router.post("/ask-document")` | `req, res` | `Promise` | Handles POST requests to ask a question about a specific document |
| `router.get("/conversations")` | None | `Promise` | Handles GET requests to get all conversations (admin only) |
| `router.get("/conversations/:id")` | `:id` | `Promise` | Handles GET requests to get a specific conversation (admin only) |
| `router.delete("/conversations/:id")` | `:id` | `Promise` | Handles DELETE requests to delete a specific conversation (admin only) |

#### Notes

- All admin-related routes are protected by `authenticateAdmin` middleware.
- Rate limiting is applied to all chat-related routes using `chatLimiter` and general API routes using `apiLimiter`.
- `validateQuestion` middleware ensures that the question being asked is valid before proceeding.

---

### `backend/src/routes/documentRoutes.js`
**Language:** Javascript

#### Module Overview

This file sets up the Express routes for managing documents, including uploading, viewing, deleting, and retrieving document statuses. It ensures that only authenticated admins can perform certain actions, such as uploading and deleting documents. The routes are protected by various middleware functions to enforce rate limits, authentication, and error handling.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | Framework for handling HTTP requests. |
| `../controllers/documentController.js` | Contains controller functions for document operations. |
| `../middleware/auth.js` | Provides middleware for authentication. |
| `../middleware/upload.js` | Provides middleware for handling file uploads. |
| `../middleware/rateLimiter.js` | Provides middleware for rate limiting. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `getAnnouncements` | None | Array of documents | Retrieves all uploaded documents. |
| `uploadDocument` | `req`, `res` | None | Handles the upload of a new document. |
| `validateUpload` | `req`, `res`, `next` | None | Validates the uploaded document. |
| `updateDocumentStatusWebhook` | `req`, `res` | None | Updates document status via webhook. |
| `viewDocument` | `req`, `res`, `next` | Document content | Retrieves the content of a specific document. |
| `deleteDocument` | `req`, `res` | None | Deletes a specific document. |
| `getDocumentStatus` | `req`, `res` | Document status | Retrieves the processing status of a document. |

#### Configuration

No specific configuration is required for this file. It relies on the middleware and controller functions defined in other modules.

#### Notes

- All admin-only routes are protected by the `authenticateAdmin` middleware.
- The `apiLimiter` middleware is used to prevent abuse of the document routes.
- Error handling for file uploads is managed by the `handleUploadError` middleware.

---

### `backend/src/routes/index.js`
**Language:** Javascript

#### Module Overview

This file sets up the primary routing structure for the backend API. It imports and mounts various route modules, including authentication, document handling, chat, and Telegram-specific routes. It also includes a simple health check endpoint to verify the API's operational status.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `express` | Core framework for handling HTTP requests and routing. |
| `authRoutes` | Routes related to user authentication. |
| `documentRoutes` | Routes related to document management. |
| `chatRoutes` | Routes related to chat functionality. |
| `telegramRoutes` | Routes related to Telegram integration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `router` | Express Router instance used to define and mount routes. | `use()`, `get()` |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `router.use("/auth", authRoutes)` | `path`, `routes` | None | Mounts the authentication routes. |
| `router.use("/documents", documentRoutes)` | `path`, `routes` | None | Mounts the document management routes. |
| `router.use("/chat", chatRoutes)` | `path`, `routes` | None | Mounts the chat routes. |
| `router.use("/telegram", telegramRoutes)` | `path`, `routes` | None | Mounts the Telegram-specific routes. |
| `router.get("/health",...)` | `req`, `res` | JSON response | Health check endpoint that returns the API status. |

#### Configuration

None

#### Notes

- The health check endpoint at `/health` provides a simple way to verify the API's operational status.
- Each route module is mounted under a specific path, making it easy to organize and scale the API.
- Ensure that all route modules are correctly implemented and imported to avoid routing errors.

---

### `backend/src/routes/telegramRoutes.js`
**Language:** Javascript

#### Module Overview

This file defines the routes for handling Telegram bot interactions. It sets up rate limiting, validation rules, and endpoints for asking questions, querying specific documents, and performing health checks. The routes are integrated with the `express` router and utilize services from `aiProxyService` for processing questions.

#### Dependencies

- `express`: Core routing functionality.
- `express-validator`: For request validation.
- `aiProxyService`: Services for processing questions and document-specific queries.
- `express-rate-limit`: For applying rate limiting to Telegram routes.

#### Functions

| Function                  | Parameters         | Returns   | Description                                                                                       |
|---------------------------|--------------------|-----------|---------------------------------------------------------------------------------------------------|
| `telegramAsk`             | `req`, `res`       | `Promise` | Handles general question requests from the Telegram bot.                                          |
| `telegramAskDocument`     | `req`, `res`       | `Promise` | Handles document-specific question requests from the Telegram bot.                                |
| `telegramHealthCheck`     | `req`, `res`       | `Promise` | Provides a health check endpoint for the Telegram bot.                                            |
| `validateTelegramRequest` | N/A                | `Array`   | Validation rules for Telegram bot requests.                                                       |

#### Configuration

- `telegramRateLimit`: Rate limiting configuration for Telegram bot requests.
  - `windowMs`: 1 minute
  - `max`: 10 requests per minute per IP
  - `message`: Custom error message for rate limit exceeded

#### Notes

- Rate limiting is applied to all Telegram routes to prevent abuse.
- Validation rules are enforced for all Telegram bot requests to ensure data integrity.
- Error handling is implemented to provide meaningful responses in case of failures.

---

### `backend/src/services/aiProxyService.js`
**Language:** Javascript

#### Module Overview

This module serves as a bridge between our application and the AI pipeline, managing document uploads, querying the AI for answers, and maintaining conversation state. It abstracts the complexities of interacting with the AI service, providing a clean API for the rest of the application to use.

#### Dependencies

- `Document`, `Conversation`: Mongoose models for database interactions.
- `axios`: For making HTTP requests to the AI pipeline.
- `fs`, `path`: Node.js modules for file system operations.
- `truncateMessage`, `ensureUploadsDir`: Utility functions for message truncation and ensuring the uploads directory exists.

#### Configuration

- `AI_PIPELINE_URL`: URL of the AI pipeline service, defaults to `http://localhost:8001`.
- `MOCK_MODE`: Boolean indicating whether to use mock responses for testing purposes.

#### Functions

| Function                      | Parameters                                    | Returns                                              | Description                                                                                       |
|-------------------------------|-----------------------------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `uploadDocumentToAI`          | `file`, `title`, `uploadedBy`                | `{ success, message, document }`                     | Uploads a document to the AI pipeline, saves it to the database, and updates its status.          |
| `getIndexedDocuments`         | None                                          | `{ success, documents }`                              | Retrieves all indexed documents from the database.                                                |
| `askQuestion`                 | `question`, `sessionId`, `userIp`, `userAgent`| `{ success, response, content_type, sources, conversationId }` | Sends a question to the AI, retrieves the answer, and saves the conversation.                      |
| `addMessageToConversation`    | `conversationId`, `message`, `sessionId`      | `{ success, response, content_type, sources, conversationId }` | Adds a message to an existing conversation or starts a new one if the conversation is not found.  |

#### Notes

- In `MOCK_MODE`, the module simulates AI responses and processing delays for testing purposes without actual AI interaction.
- Error handling is robust, with specific checks for common issues like incorrect API keys.
- Conversations are designed to be stateful, maintaining context across multiple user queries.

---

### `backend/src/services/authService.js`
**Language:** Javascript

#### Module Overview

The `authService.js` file provides essential functions for managing admin user authentication within the application. It includes creating a default admin user if it doesn't exist, authenticating an admin user, validating JWT tokens, and retrieving a user by ID. These functions work together to ensure secure and efficient admin user management.

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

- The `createDefaultAdmin` function ensures that a default admin user is created only if it doesn't already exist.
- The `authenticateAdmin` function checks the provided credentials and returns a JWT token upon successful authentication.
- The `validateToken` function verifies the JWT token and returns user information if the token is valid.
- The `getUserById` function retrieves an admin user by their ID, throwing an error if the user is not found.

---

### `backend/src/utils/jwtUtils.js`
**Language:** Javascript

#### Module Overview

This module, `jwtUtils.js`, provides essential functions for creating, verifying, and decoding JSON Web Tokens (JWT). It uses the `jsonwebtoken` library to manage JWT operations, ensuring secure token generation and validation within the application. The module is crucial for implementing authentication and authorization mechanisms.

#### Dependencies

| Library | Purpose |
| --- | --- |
| `jsonwebtoken` | Provides methods for creating, verifying, and decoding JWTs. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `generateToken` | `payload` | `string` | Generates a JWT with the given payload and returns it. |
| `verifyToken` | `token` | `object` or `Error` | Verifies the given JWT and returns the decoded payload if valid. Throws an error if the token is invalid or expired. |
| `decodeToken` | `token` | `object` or `Error` | Decodes the given JWT and returns the payload. Does not verify the token's signature. |

#### Configuration

| Constant | Purpose |
| --- | --- |
| `JWT_SECRET` | Secret key used for signing and verifying JWTs. |
| `JWT_EXPIRES_IN` | Duration for which the JWT is valid. |

#### Notes

- The `JWT_SECRET` is either taken from the environment variable `JWT_SECRET` or defaults to a hardcoded value. In production, it is recommended to use a long, random string for `JWT_SECRET`.
- The `generateToken` function includes additional claims (`issuer` and `audience`) to enhance security by specifying who can issue and use the token.
- The `verifyToken` function includes specific error handling for token expiration and invalid tokens.
- The `decodeToken` function does not verify the token's signature but simply decodes it, which should be used cautiously as it does not provide any security guarantees.

---

### `chatbot-rag-langchain-main/README.md`
**Language:** Md

#### Module Overview

This README file serves as a detailed guide for setting up and running a Streamlit-based chatbot application powered by Retrieval-Augmented Generation (RAG) and LangChain. It explains how to upload PDFs, query them, and receive metadata-rich answers. The application leverages LangChain, FAISS, and the GPT models from OpenAI to extract and query document content effectively.

#### Dependencies

| Dependency | Purpose |
| --- | --- |
| Streamlit | UI framework for the chatbot |
| LangChain | PDF parsing and chunking |
| FAISS | Vector search backend |
| PyPDF2 | PDF parsing |
| OpenAI Embeddings | Text embedding for semantic search |
| PyMuPDF | PDF parsing (optional) |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `parse_pdf` | PDF file | List of text chunks | Extracts text from each page of the PDF |
| `text_to_docs` | Text chunks | List of Document objects | Splits text into chunks and attaches metadata |
| `docs_to_index` | List of Document objects | FAISS index | Creates a FAISS index from the documents |
| `get_index_for_pdf` | List of PDF files, filenames, API key | FAISS index | Orchestrates PDF parsing, chunking, embedding, and indexing |
| `similarity_search` | Query, k | List of relevant chunks | Returns the most relevant chunks for a query |

#### Notes

- Ensure the `OPENAI_API_KEY` is set either in the `.streamlit/secrets.toml` file or as an environment variable.
- Uploaded PDFs are stored in memory and are not persisted to disk by default.
- The FAISS index is stored in memory and is cleared on server restart unless optional persistence is implemented.

---

### `chatbot-rag-langchain-main/app.py`
**Language:** Python

#### Module Overview

This file defines the main application for a chatbot that leverages a vector database to find relevant information from uploaded PDFs and answers user questions using the `OpenAI` API. It uses Streamlit for the user interface and incorporates caching to optimize performance. The chatbot uses a predefined prompt template to format the context from the PDFs and sends this to the `OpenAI` API for generating responses.

#### Dependencies

| Import | Purpose |
| ------ | ------- |
| `streamlit` | Provides the framework for the web application. |
| `openai` | Interfaces with the `OpenAI` API for generating responses. |
| `brain` | Contains the function to create a vector database from PDFs. |
| `os` | Used for environment variable access. |
| `utils` | Contains utility functions, including loading the `OPENAI_API_KEY`. |

#### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `create_vectordb` | `files`, `filenames` | `vectordb` | Creates a vector database from the provided PDF files and filenames. |

#### Configuration

- **OPENAI_API_KEY**: The API key for `OpenAI`, loaded from either Streamlit secrets or environment variables.

#### Notes

- Ensure the `OPENAI_API_KEY` is set either in `.streamlit/secrets.toml` or as an environment variable.
- The `create_vectordb` function is cached to avoid recreating the vector database on every request.
- The chatbot uses a predefined prompt template to format the context from the PDFs before sending it to the `OpenAI` API.

---

### `chatbot-rag-langchain-main/brain.py`
**Language:** Python

#### Module Overview

The `brain.py` file is a core component of our chatbot's retrieval-augmented generation (RAG) system. It handles the ingestion of PDF files, processes the text to create document chunks, and indexes these chunks using FAISS for efficient retrieval. This module is crucial for ensuring that the chatbot can access and utilize relevant information from a collection of PDF documents.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `re` | Regular expressions for text processing. |
| `BytesIO` | In-memory file-like object for handling PDF data. |
| `typing` | Type hints for better code readability and maintainability. |
| `pickle` | Serialization and deserialization of Python object structures. |
| `langchain_core.documents` | Document class for structuring text data. |
| `langchain_openai` | Integration with OpenAI for embeddings. |
| `langchain_text_splitters` | Text splitting utilities for chunking documents. |
| `langchain_community.vectorstores` | FAISS integration for vector storage and search. |
| `pypdf` | PDF reading and text extraction. |
| `faiss` | Efficient similarity search and clustering of dense vectors. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `parse_pdf` | `file: BytesIO`, `filename: str` | `Tuple[List[str], str]` | Extracts text from a PDF file and processes it for better readability. |
| `text_to_docs` | `text: List[str]`, `filename: str` | `List[Document]` | Converts text into a list of `Document` objects, each representing a chunk of text. |
| `docs_to_index` | `docs`, `openai_api_key` | `FAISS` | Creates a FAISS index from a list of `Document` objects using embeddings. |
| `get_index_for_pdf` | `pdf_files`, `pdf_names`, `openai_api_key` | `FAISS` | Processes a list of PDF files, extracts text, creates documents, and indexes them. |

#### Notes

- Ensure the `openai_api_key` is correctly set up and accessible.
- The `parse_pdf` function uses regular expressions to clean up text, which may need adjustments based on specific PDF formats.
- The `text_to_docs` function splits text into manageable chunks, which is crucial for performance and relevance in retrieval.
- The `docs_to_index` function relies on the `langchain_openai` embeddings, which requires an active API key from OpenAI.

---

### `chatbot-rag-langchain-main/requirements.txt`
**Language:** Txt

#### Module Overview

The `requirements.txt` file lists the Python packages necessary for the chatbot project that leverages LangChain and related libraries. It ensures that all team members have the same environment setup to develop, test, and deploy the chatbot application seamlessly.

#### Dependencies

The following libraries are crucial for the project:

- `openai`: Provides access to the powerful language models from OpenAPI.
- `streamlit`: A framework for building interactive web applications for data science and machine learning.
- `langchain`: A library for building applications with language models.
- `langchain-core`: Core components of the LangChain library.
- `langchain-community`: Community-contributed extensions for LangChain.
- `langchain-openai`: Integration with OpenAPI for LangChain.
- `faiss-cpu`: A library for efficient similarity search and clustering of dense vectors.
- `pypdf`: A library for reading and writing PDF files.
- `tiktoken`: A tokenizer for the LLMs, useful for token-based text processing.

#### Notes

- Ensure all listed dependencies are installed using `pip install -r requirements.txt`.
- Keep an eye on version compatibility, especially for `openai` and `langchain` packages.
- For any updates or new dependencies, modify this file accordingly.

---

### `frontend/README.md`
**Language:** Md

#### Module Overview

This frontend directory houses the foundational setup for a React application using Vite. It includes configurations for hot module replacement (HMR) and ESLint rules to ensure a smooth development experience. The directory leverages either Babel or SWC for React Fast Refresh, providing flexibility in tooling choices.

#### Dependencies

- **@vitejs/plugin-react**: Uses Babel for Fast Refresh.
- **@vitejs/plugin-react-swc**: Uses SWC for Fast Refresh.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| None | N/A | N/A | N/A |

#### Configuration

This setup includes minimal configurations for React and ESLint, with options to expand the ESLint configuration for production applications.

#### Notes

- For production applications, it is recommended to use TypeScript with type-aware lint rules enabled.
- The provided templates and plugins offer flexibility in choosing between Babel or SWC for React Fast Refresh.

---

### `frontend/components.json`
**Language:** Json

#### Module Overview

This file, `frontend/components.json`, serves as the configuration hub for our frontend component setup. It specifies the styling framework, icon library, and aliases for various directories, ensuring that all components are consistently styled and easily accessible. This setup is crucial for maintaining a clean and organized codebase, allowing developers to quickly locate and utilize components and utilities.

#### Dependencies

- **Tailwind CSS**: Configured for styling with custom base colors and CSS variables.
- **Lucide**: Used as the icon library for consistent iconography across the application.
- **Aliases**: Provides shortcuts for frequently used directories, enhancing code readability and maintainability.

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| `$schema` | Defines the schema for the configuration file. |
| `style` | Sets the styling theme (e.g., "new-york"). |
| `rsc` | Boolean flag indicating resource configuration. |
| `tsx` | Boolean flag indicating TypeScript usage. |
| `tailwind` | Tailwind CSS configuration settings. |
| `iconLibrary` | Specifies the icon library used (e.g., "lucide"). |
| `aliases` | Provides shortcuts for frequently accessed directories. |
| `registries` | Holds component registries (currently empty). |

#### Notes

- Ensure that all paths in the `aliases` section are correctly set to avoid import errors.
- Changes to the `tailwind` configuration may require updates to the `src/index.css` file.
- The `iconLibrary` setting should be kept consistent with the project's design requirements.

---

### `frontend/eslint.config.js`
**Language:** Javascript

#### Module Overview

This file sets up ESLint, a static code analysis tool, to enforce coding standards and best practices for JavaScript and JSX files in the frontend. It integrates various ESLint plugins and configurations to ensure consistent code quality and adherence to project-specific coding rules.

#### Dependencies

- `@eslint/js`: Provides ESLint configurations for JavaScript.
- `globals`: Provides global variables definitions.
- `eslint-plugin-react-hooks`: Enforces rules for React hooks.
- `eslint-plugin-react-refresh`: Adds rules specific to React Refresh.
- `eslint/config`: Provides functions to define ESLint configurations.

#### Configuration

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `defineConfig` | `configArray` | `ESLintConfig` | Defines an ESLint configuration using an array of config objects. |

#### Notes

- The `globalIgnores` function is used to ignore files in the `dist` directory from linting.
- The `extends` property integrates recommended configurations from `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- The `languageOptions` specify the ECMAScript version and parser options, including enabling JSX.
- The `rules` object enforces an error for unused variables, with a pattern to ignore constants starting with an uppercase letter.

---

### `frontend/index.html`
**Language:** Html

#### Module Overview

This HTML file is the foundational structure for the CampusMitra web application. It sets up the basic HTML5 document, including the head and body sections. The head contains meta information, a link to the application icon, and the title of the application. The body includes a single div with an id of "root," which acts as the mounting point for the React application. The file also imports the main JavaScript module that initializes and renders the React components.

#### Dependencies

This file does not directly import any dependencies but relies on the following:

- **/src/main.jsx**: The main entry point for the React application that mounts the React components to the "root" div.

#### Classes

No classes are defined in this HTML file.

#### Functions

No functions are defined in this HTML file.

#### Configuration

There are no specific configuration settings in this file.

#### Notes

- The `<div id="root"></div>` element is where the React application will be mounted and rendered.
- The `<script type="module" src="/src/main.jsx"></script>` tag is crucial for loading the main JavaScript module that initializes the React application.
- The `<link rel="icon" type="image/svg+xml" href="./src/assets/Campusmitra_logo.svg" />` tag links to the application's icon, which should be placed in the specified path.

---

### `frontend/jsconfig.json`
**Language:** Json

#### Module Overview

The `frontend/jsconfig.json` file defines the base configuration for the TypeScript compiler. It sets the base directory and specifies path aliases to streamline module imports, making the codebase easier to navigate and maintain. This configuration is crucial for ensuring that TypeScript understands the project structure and can resolve module paths correctly.

#### Dependencies

This file does not directly import any modules but relies on TypeScript's compiler options to function.

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| `baseUrl`     | Sets the base directory for resolving non-absolute module names. |
| `paths`       | Maps aliases to directories, allowing for cleaner imports. |

### Notes

- The `@/*` alias maps to `./src/*`, which means any import starting with `@` will be resolved to the `src` directory.
- Ensure that the `tsconfig.json` file includes this `jsconfig.json` file in its `include` array for the path aliases to take effect.

---

### `frontend/package.json`
**Language:** Json

#### Module Overview

This `package.json` file is the heart of our frontend module, detailing all the dependencies and scripts necessary for development, building, linting, and previewing our React application. It specifies the versions of libraries we use and sets up the commands to run these tasks efficiently.

#### Dependencies

This section lists the libraries that our frontend relies on to function correctly. These include UI components, routing, HTTP requests, and styling utilities.

| Package | Purpose | Version |
| --- | --- | --- |
| @radix-ui/react-avatar | UI component for avatars | ^1.1.10 |
| @radix-ui/react-dialog | UI component for dialogs | ^1.1.15 |
| @radix-ui/react-scroll-area | UI component for scroll areas | ^1.2.10 |
| @radix-ui/react-slot | Utility for slotting | ^1.2.3 |
| @tailwindcss/typography | Tailwind CSS plugin for typography | ^0.5.16 |
| @tailwindcss/vite | Tailwind CSS plugin for Vite | ^4.1.13 |
| axios | HTTP client for making requests | ^1.11.0 |
| class-variance-authority | Utility for managing component variants | ^0.7.1 |
| clsx | Utility for constructing className strings | ^2.1.1 |
| lucide-react | Icon library for React | ^0.542.0 |
| react | Core library for React | ^19.1.1 |
| react-dom | Library for rendering React to the DOM | ^19.1.1 |
| react-markdown | Component for rendering Markdown in React | ^10.1.0 |
| react-router-dom | Routing for React applications | ^6.26.1 |
| rehype-raw | Rehype plugin to keep raw HTML | ^7.0.0 |
| remark-gfm | Remark plugin to support GitHub Flavored Markdown | ^4.0.1 |
| sweetalert2 | SweetAlert2 library for React | ^11.23.0 |
| tailwind-merge | Utility to merge Tailwind classes | ^3.3.1 |
| tailwindcss | Utility-first CSS framework | ^4.1.13 |

#### DevDependencies

This section lists the development-only dependencies required for building, linting, and testing our frontend module.

| Package | Purpose | Version |
| --- | --- | --- |
| @eslint/js | ESLint parser for JavaScript | ^9.33.0 |
| @types/react | TypeScript types for React | ^19.1.10 |
| @types/react-dom | TypeScript types for ReactDOM | ^19.1.7 |
| @vitejs/plugin-react | Vite plugin for React | ^5.0.0 |
| eslint | Linter for identifying and fixing problems in JavaScript code | ^9.33.0 |
| eslint-plugin-react-hooks | ESLint plugin for React Hooks | ^5.2.0 |
| eslint-plugin-react-refresh | ESLint plugin for React Refresh | ^0.4.20 |
| globals | Globals for Vite | ^16.3.0 |
| tw-animate-css | Tailwind CSS plugin for animate.css | ^1.3.8 |
| vite | Module bundler for modern web projects | ^7.1.2 |

#### Notes

- Ensure to run `npm install` to install all dependencies before starting the development server.
- Use `npm run dev` to start the development server.
- Linting can be performed with `npm run lint`.
- To build the project for production, use `npm run build`.
- For previewing the production build, use `npm run preview`.

---

### `frontend/vite.config.js`
**Language:** Javascript

#### Module Overview

This file, `frontend/vite.config.js`, sets up the configuration for the Vite build tool, which is used to bundle and serve our frontend application. It integrates React and Tailwind CSS plugins, sets up path aliases for easier imports, and configures the development and preview servers to support HTML history fallbacks.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `vite` | The build tool used to bundle and serve the frontend application. |
| `@vitejs/plugin-react` | Plugin to support React in Vite. |
| `@tailwindcss/vite` | Plugin to integrate Tailwind CSS with Vite. |
| `path` | Node module to handle and transform file paths. |

#### Configuration

| Setting | Purpose |
|---------|---------|
| `plugins` | Array of plugins to use in the Vite build process. |
| `resolve.alias` | Path alias to simplify imports from the `src` directory. |
| `server.historyApiFallback` | Enables HTML5 history fallback for the development server. |
| `preview.historyApiFallback` | Enables HTML5 history fallback for the preview server. |

#### Notes

- The `@` alias simplifies imports from the `src` directory, making it easier to reference files without long relative paths.
- The `historyApiFallback` setting ensures that single-page application routing works correctly during development and preview.

---

### `frontend/src/App.css`
**Language:** Css

Empty file.

---

### `frontend/src/App.jsx`
**Language:** Javascript

#### Module Overview

The `App.jsx` file is the entry point for our React application. It manages the overall layout and routing of the app, ensuring that users are directed to the appropriate views based on their authentication status. It also sets up the initial state for authentication by checking the local storage for a token and user data.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React`, `useState`, `useEffect` | Core React hooks for state management and side effects. |
| `Routes`, `Route`, `Navigate` | React Router components for defining and navigating routes. |
| `ChatbotView`, `LoginPage`, `AdminDashboard` | View components for different parts of the application. |
| `ProtectedRoute` | A custom component to protect certain routes. |
| `./App.css` | CSS module for styling the application. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `App` | None | JSX | The main component that renders the app's routes and manages authentication state. |

#### Notes

- The `isAuthenticated` state is initialized based on the presence of an `authToken` in local storage.
- The app listens for changes in local storage to update the authentication state across different tabs.
- Protected routes are wrapped with the `ProtectedRoute` component to enforce authentication requirements.

---

### `frontend/src/index.css`
**Language:** Css

#### Module Overview

This CSS file serves as the central stylesheet for our frontend application. It imports essential libraries like Tailwind CSS and defines keyframe animations for various UI elements. Additionally, it establishes theme variables and global styles that ensure consistency across the application. This file is critical for maintaining a uniform look and feel, as well as smooth user interactions through well-defined animations.

#### Dependencies

- `tailwindcss`: Provides utility-first CSS framework.
- `tw-animate-css`: Extends Tailwind with additional animations.
- `@tailwindcss/typography`: Enhances prose text styles.

#### Animations

| Animation Name | Description |
| --- | --- |
| `fab-to-chat` | Scales and moves FAB widget to chat position. |
| `chat-to-fab` | Reverses `fab-to-chat` animation. |
| `fade-in` | Fades element into view. |
| `bounce-in` | Bounces element into view with scaling. |
| `slide-up` | Slides element up into view. |
| `pulse-glow` | Creates a pulsing glow effect. |

#### Classes

| Class | Purpose |
| --- | --- |
| `.animate-fab-to-chat` | Applies `fab-to-chat` animation. |
| `.animate-chat-to-fab` | Applies `chat-to-fab` animation. |
| `.animate-fade-in` | Applies `fade-in` animation. |
| `.animate-slide-up` | Applies `slide-up` animation. |
| `.animate-pulse-glow` | Applies `pulse-glow` animation. |
| `.animate-bounce-in` | Applies `bounce-in` animation. |
| `.message-enter` | Applies `fade-in` animation for chat messages. |
| `.chat-widget-container` | Optimizes performance for chat widget. |
| `.transition-smooth` | Applies smooth transition for interactive elements. |

#### Theme Variables

| Variable | Light Mode | Dark Mode |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

#### Notes

- Ensure animations are tested across target browsers for consistency.
- Theme variables are crucial for maintaining a coherent design system. Any changes should be thoroughly reviewed.

---

### `frontend/src/main.jsx`
**Language:** Javascript

#### Module Overview

This file serves as the entry point for our React application. It sets up the root React component and integrates routing using `react-router-dom`. The `StrictMode` wrapper helps identify potential problems in the application, and the `BrowserRouter` enables navigation between different views.

#### Dependencies

- **StrictMode**: A wrapper component that activates additional checks and warnings.
- **createRoot**: A method from `react-dom/client` to create a root for rendering the React tree.
- **BrowserRouter**: A component from `react-router-dom` that enables client-side routing.
- **index.css**: Global styles for the application.
- **App**: The main component that contains the core logic and structure of the application.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| App | Main application component | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| createRoot(container).render() | container: DOM element | N/A | Renders the React component tree into the specified DOM container. |

#### Notes

- The `StrictMode` component helps identify potential issues by executing certain checks twice in development mode.
- The `BrowserRouter` requires a `<div>` with the id `root` in the HTML file to function correctly.
- Ensure that `index.css` is correctly linked in the HTML file to apply global styles.

---

### `frontend/src/api/client.js`
**Language:** Javascript

#### Module Overview

This file sets up an axios instance tailored for our application's API interactions. It includes base URL configuration, default headers, request and response interceptors for handling authentication tokens and error responses. This instance is then exported for use throughout the frontend application.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `axios`    | HTTP client for making API requests |

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| `api` | Axios instance configured for API requests | N/A |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| N/A      | N/A        | `api`   | Configures and returns an axios instance |

#### Configuration

- **Base URL**: `import.meta.env.VITE_API_URL` or `http://localhost:3001/api`
- **Timeout**: 10,000 milliseconds
- **Default Headers**: `Content-Type` set to `application/json`

#### Notes

- The request interceptor adds an authorization header with a bearer token if available in local storage.
- The response interceptor handles 401 errors by clearing the authentication token and redirecting to the login page.
- This setup ensures that all API requests include the necessary headers and that unauthorized access attempts are managed appropriately.

---

### `frontend/src/api/index.js`
**Language:** Javascript

#### Module Overview

The `frontend/src/api/index.js` file serves as a centralized hub for all API interactions within the frontend application. It exports three main objects: `authAPI`, `documentAPI`, and `chatAPI`, each containing functions to handle specific tasks related to user authentication, document management, and chat functionalities. These functions abstract the underlying HTTP requests, providing a clean and consistent interface for the rest of the application to interact with the backend services.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `api` | HTTP client for making requests to the backend. |
| `generateSessionId` | Utility function to generate a unique session ID. |
| `handleApiError` | Utility function to handle and throw errors from API calls. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `login` | `credentials` | `response.data` | Authenticates an admin user by logging in with provided credentials. |
| `getAnnouncements` | None | `response.data` | Fetches all announcements/documents from the server. |
| `uploadDocument` | `formData` | `response.data` | Uploads a new document to the server. |
| `viewDocument` | `id` | `response` | Retrieves a document for viewing. |
| `deleteDocument` | `id` | `response.data` | Deletes a document from the server. |
| `getDocumentStatus` | `id` | `response.data` | Retrieves the status of a specific document. |
| `askQuestion` | `question`, `conversationId` | `response.data` | Asks a question with conversation tracking. |
| `askAboutDocument` | `question`, `documentId`, `conversationId` | `response.data` | Asks a question about a specific document. |
| `getConversations` | `page`, `limit` | `response.data` | Retrieves all conversations (admin only). |
| `getConversation` | `id` | `response.data` | Retrieves a specific conversation (admin only). |
| `deleteConversation` | `id` | `response.data` | Deletes a specific conversation (admin only). |

#### Notes

- All API functions use `try-catch` blocks to handle errors, ensuring that any issues during the request are caught and processed by the `handleApiError` utility.
- The `generateSessionId` function is used to create a unique session ID for chat interactions, ensuring that each conversation is tracked correctly.
- The `api` client is responsible for making HTTP requests to the backend, abstracting away the complexities of handling HTTP responses and errors.

---

### `frontend/src/components/DocumentList.jsx`
**Language:** Javascript

Empty file.

---

### `frontend/src/components/ProtectedRoute.jsx`
**Language:** Javascript

#### Module Overview

The `ProtectedRoute` component ensures that only authenticated users can access certain parts of the application. It uses the `authToken` and `user` stored in `localStorage` to determine if the user is logged in. If the user is not authenticated, it redirects them to the login page with the intended destination passed as state.

#### Dependencies

| Import | Purpose |
| --- | --- |
| React | Core library for building UI components. |
| Navigate, useLocation | From `react-router-dom` to handle routing and location state. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| ProtectedRoute | Renders children if authenticated, otherwise redirects to login. | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| isAuthenticated | None | Boolean | Checks if the user is authenticated based on the presence of `authToken` and `user` in `localStorage`. |

#### Notes

- Ensure `authToken` and `user` are correctly set in `localStorage` upon successful login.
- The `Navigate` component will replace the current entry in the history stack, preventing the user from using the back button to return to the protected route after logging in.
- This component should be used as a wrapper around routes that need to be protected.

---

### `frontend/src/components/index.js`
**Language:** Javascript

#### Module Overview

This file serves as the entry point for all the components used in the frontend application. It exports several components categorized into chat, layout, sidebar, and document sections, facilitating a modular and organized approach to building the user interface.

#### Dependencies

The following are key imports from this file:

- **Chat Components**: `MessageInput`, `MessageBubble`, `MessageList`, `ChatHeader`, `ChatArea`, `ChatWidget`, `ChatTranscripts`
- **Layout Components**: `ChatLayout`
- **Sidebar Components**: `DesktopSidebar`, `MobileSidebar`
- **Document Components**: `DocumentUploader`, `DocumentList`, `DocumentManager`, `DocumentViewer`

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration or Constants

There are no configuration or constants defined in this file.

#### Notes

- This file is crucial for maintaining a clean and organized structure in the frontend components.
- Ensure that all components are correctly imported and exported to avoid any runtime errors.
- When adding new components, remember to update this index file to include the new exports.

---

### `frontend/src/components/chat/ChatArea.jsx`
**Language:** Javascript

#### Module Overview

The `ChatArea` component is a part of the chat interface, responsible for rendering the chat messages, a header, and an input area for new messages. It integrates several subcomponents to display a list of messages and an input field where users can type and send new messages. The component also handles some mobile-specific interactions through passed-in callbacks.

#### Dependencies

- **ChatHeader**: A component for rendering the chat header with different configurations for mobile and desktop views.
- **MessageList**: A component for displaying a list of chat messages.
- **MessageInput**: A component for rendering the input field where users can type and send new messages.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| ChatArea | Main chat area component | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| ChatArea | messages, inputValue, setInputValue, onSendMessage, onMobileMenuToggle, onSuggestionClick | None | Renders the chat area with message list, header, and input field. |

#### Configuration

- **messages**: Array of message objects to be displayed in the chat.
- **inputValue**: Current value of the message input field.
- **setInputValue**: Function to update the inputValue state.
- **onSendMessage**: Function to handle sending a new message.
- **onMobileMenuToggle**: Function to handle mobile menu toggle actions.
- **onSuggestionClick**: Function to handle click events on message suggestions.

#### Notes

- The `ChatHeader` component is rendered twice with different `isMobile` props to handle mobile and desktop views.
- The `MessageInput` component is responsible for capturing user input and invoking the `onSendMessage` function when a new message is sent.
- The `onMobileMenuToggle` function is currently not used within this component but is passed through props for potential future use.

---

### `frontend/src/components/chat/ChatHeader.jsx`
**Language:** Javascript

#### Module Overview

The `ChatHeader` component renders the header for a chat interface, displaying an avatar and the name "Sarathi". It adapts its layout based on whether the user is on a mobile device or not. On mobile, it uses a simplified layout with minimal spacing, while on larger screens, it provides a more detailed header with additional information.

#### Dependencies

- **Avatar**: A UI component for displaying avatars.
- **AvatarFallback**: A fallback component for the avatar when no image is provided.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| ChatHeader | Renders the header of the chat interface | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| ChatHeader | { isMobile = false } | JSX Element | Renders the chat header based on the `isMobile` prop. |

#### Notes

- The `isMobile` prop determines the layout of the header. If `true`, it renders a simplified mobile layout; otherwise, it renders a detailed layout for larger screens.
- The avatar uses a fallback text "🤖" when no image is provided.
- The header background color is always white, and it has a bottom border for separation.

---

### `frontend/src/components/chat/ChatTranscripts.jsx`
**Language:** Javascript

#### Module Overview

The `ChatTranscripts` component is a React functional component that handles the display and management of chat transcripts. It fetches conversations from the API, allows users to view and delete conversations, and displays detailed conversation information when selected. The component is split into two main sections: a list of conversations on the left and detailed conversation information on the right.

#### Dependencies

- `React`, `useState`, `useEffect` from "react": Core React functionalities for state and lifecycle management.
- `MessageSquare`, `Trash2`, `Eye`, `User`, `Bot`, `Clock`, `Search` from "lucide-react": Icons used within the component.
- `chatAPI` from "../../api/index.js": API client for fetching and managing conversations.
- `Button` from "../ui/button.jsx": Reusable button component.
- `Input` from "../ui/input.jsx": Reusable input component.
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` from "../ui/card.jsx": Reusable card components for layout.
- `ScrollArea` from "../ui/scroll-area.jsx": Component for scrollable areas.
- `Badge` from "../ui/badge.jsx": Component for displaying badges.
- `showSuccessToast`, `showErrorToast`, `showConfirmDialog` from "../../utils/toast.js": Utility functions for displaying toast notifications and confirmation dialogs.

#### Functions

| Function                  | Parameters                 | Returns | Description                                                                                     |
|--------------------------|---------------------------|---------|-------------------------------------------------------------------------------------------------|
| `ChatTranscripts`        | None                      | JSX     | Main component function that renders the chat transcripts interface.                            |
| `fetchConversations`     | `page` (number)           | Promise | Fetches conversations from the API and updates the component state.                              |
| `fetchConversationDetail`| `id` (string)             | Promise | Fetches detailed conversation information from the API and updates the component state.         |
| `handleDelete`           | `id` (string), `event`    | Promise | Handles conversation deletion, showing a confirmation dialog and updating the conversation list. |
| `handleConversationClick`| `conv` (object)           | None    | Handles conversation selection, fetching details, and toggling selection.                        |
| `formatDateTime`         | `dateString` (string)     | string  | Formats a date string into a locale-specific date-time string.                                  |
| `formatDuration`         | `start` (string), `end` (string) | string | Calculates and formats the duration between two date strings.                                    |

#### Notes

- The component uses local state to manage conversations, selected conversation, loading states, pagination, current page, and search term.
- The `useEffect` hook is used to fetch conversations when the current page changes.
- The `handleDelete` function prevents the conversation from being selected when the delete button is clicked by stopping event propagation.
- The `formatDateTime` and `formatDuration` functions handle potential errors gracefully by returning default values ("Invalid Date" or "N/A") when the input is invalid.

---

### `frontend/src/components/chat/MessageBubble.jsx`
**Language:** Javascript

#### Module Overview

The `MessageBubble` component in this file is designed to render chat messages in a visually distinct manner depending on whether the message is sent by the user or the bot. It leverages conditional rendering and custom styling to differentiate between user and bot messages. The component also handles the display of timestamps, source files, and document references for bot-generated messages.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `React` | Core library for building UI components. |
| `ReactMarkdown` | A library to render Markdown content in React. |
| `remarkGfm` | A plugin for `ReactMarkdown` to support GitHub Flavored Markdown. |
| `Badge` | A UI component for displaying small labels or tags. |
| `FileText` | An icon component from `lucide-react`. |
| `SourceSuggestions` | A sub-component for displaying suggested sources for bot messages. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `formatTimestamp` | `timestamp` (string) | string | Formats a timestamp into a localized time string. |

#### Notes

- The component uses conditional class names to apply different styles based on the message sender.
- The `ReactMarkdown` component is used to render Markdown content with custom components for various Markdown elements.
- The `Badge` component is used to display source files and document references for bot messages.
- The `SourceSuggestions` component is conditionally rendered for bot messages that have source suggestions.

---

### `frontend/src/components/chat/MessageInput.jsx`
**Language:** Javascript

#### Module Overview

The `MessageInput` component provides a user interface for inputting and sending messages in a chat application. It includes an input field for typing messages and a button to send them. The component listens for the "Enter" key to trigger the message sending action, enhancing user experience by allowing quick message submissions.

#### Dependencies

- **useState**: Hook from React to manage state within functional components.
- **Button**: A UI component for sending messages.
- **Input**: A UI component for text input.
- **ScrollArea**: A UI component for scrolling areas, not directly used here but part of the UI library.
- **Avatar**: A UI component for displaying avatars, not directly used here.
- **ChevronRight**: An icon from `lucide-react` used in the send button.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `MessageInput` | Chat message input component | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `handleKeyPress` | `e` (event) | None | Triggers `onSendMessage` when the "Enter" key is pressed |

#### Configuration

- The input field has a placeholder prompting users to ask about campus.
- The send button is disabled when the input field is empty.

#### Notes

- The `handleKeyPress` function ensures that pressing "Enter" sends the message.
- The send button's text is visible on larger screens and an icon is shown on smaller screens for better UX.
- The message input area is centered and styled for readability.

---

*This documentation was automatically generated and formatted by DocuSense AI.*