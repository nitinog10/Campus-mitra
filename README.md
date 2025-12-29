# Campusmitra - RAG-Powered AI Chat Platform

A comprehensive AI-powered chat platform that enables document-based conversations using Retrieval-Augmented Generation (RAG). Users can upload PDF documents and have intelligent conversations based on the document content.

## 🚀 Features

- **Document Upload & Processing**: Upload PDF documents and automatically create vector embeddings
- **RAG-Powered Chat**: Intelligent conversations based on uploaded document content
- **Multi-Document Search**: Search and chat across multiple documents simultaneously
- **Admin Dashboard**: Manage documents, view chat transcripts, and monitor system usage
- **Real-time Chat Interface**: Modern, responsive chat widget with typing indicators
- **Persistent Vector Storage**: FAISS-based vector storage with automatic cache management
- **Authentication System**: Secure JWT-based authentication for admin access
- **Rate Limiting**: Built-in rate limiting for API endpoints

## 🏗️ Architecture

The project follows a microservices architecture with three main components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│    Frontend     │◄──►│     Backend     │◄──►│   AI Pipeline   │
│   (React/Vite)  │    │  (Node.js/API)  │    │ (Python/FastAPI)│
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Browser UI    │    │    MongoDB      │    │  Vector Stores  │
│                 │    │    Database     │    │     (FAISS)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
Synapse/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── chat/          # Chat-related components
│   │   │   ├── document/      # Document management components
│   │   │   ├── admin/         # Admin dashboard components
│   │   │   └── ui/            # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── api/               # API client functions
│   │   └── views/             # Main page components
│   └── package.json
├── backend/                     # Node.js backend API
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic services
│   │   ├── middleware/        # Express middleware
│   │   └── config/            # Configuration files
│   └── package.json
├── ai_pipeline/                 # Python AI service
│   ├── services/              # AI processing services
│   │   ├── document_processor.py  # PDF processing & vector creation
│   │   ├── chat_service.py        # RAG chat implementation
│   │   └── cache_service.py       # Document cache management
│   ├── models/                # Request/response models
│   ├── config/                # Configuration settings
│   ├── vector_stores/         # FAISS vector databases
│   └── requirements.txt
└── README.md
```

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Document database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### AI Pipeline

- **Python 3.12** - Programming language
- **FastAPI** - Modern Python web framework
- **LangChain** - LLM application framework
- **OpenAI GPT-4** - Language model
- **FAISS** - Vector similarity search
- **PyPDF** - PDF text extraction

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **OpenAI API Key**

### 1. Clone the Repository

```bash
git clone <repo link>
cd synapse
```

### 2. Environment Setup

Create `.env` files in the respective directories:

Copy and rename from drive...

**Backend (.env):**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/synapse

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server
PORT=5000
NODE_ENV=development

# AI Pipeline
AI_PIPELINE_URL=http://localhost:8001
```

**AI Pipeline (.env):**

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Server
PORT=8001
HOST=0.0.0.0

# Vector Store
VECTOR_STORE_PATH=vector_stores
```

### 3. Install Dependencies

**In root directory**

```bash
yarn install
```

**AI Pipeline:**

```bash
cd ai_pipeline
# Create virtual environment
python -m venv .venv
# Activate virtual environment
source .venv/Scripts/activate #Bash
.\.venv\Scripts\activate #PS
# install dependencies
pip install -r requirements.txt
```

### 4. Start the Services

Start all services together:

```bash
# in root directory, run:
yarn dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **AI Pipeline**: http://localhost:8001

## 📝 API Documentation

### Backend API Endpoints

#### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

#### Documents

- `GET /api/documents` - List all documents
- `POST /api/documents/upload` - Upload new document
- `DELETE /api/documents/:id` - Delete document

#### Chat

- `POST /api/chat` - Send chat message
- `GET /api/chat/conversations` - Get chat history
- `DELETE /api/chat/conversations/:id` - Delete conversation

### AI Pipeline API Endpoints

#### Document Processing

- `POST /api/documents/process` - Process uploaded PDF
- `GET /api/documents/list` - List available documents
- `GET /api/documents/status/:id` - Get document status
- `DELETE /api/documents/:id` - Delete document and vectors

#### Chat

- `POST /api/chat/query` - Single document chat
- `POST /api/chat/search-multiple` - Multi-document search

## 🔧 Configuration

### Backend Configuration

Located in `backend/src/config/database.js`:

```javascript
// MongoDB connection settings
// JWT configuration
// Rate limiting settings
```

### AI Pipeline Configuration

Located in `ai_pipeline/config/settings.py`:

```python
# OpenAI settings
# Vector store configuration
# Document processing parameters
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt password encryption
- **Rate Limiting** - API endpoint protection
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Request payload validation
- **File Type Validation** - PDF-only uploads

## 📊 Data Flow

1. **Document Upload**:

   ```
   User uploads PDF → Backend validates → Forwards to AI Pipeline →
   PDF processed → Text extracted → Vector embeddings created →
   Stored in FAISS → Document info cached
   ```

2. **Chat Query**:
   ```
   User sends message → Backend forwards to AI Pipeline →
   Vector similarity search → Relevant chunks retrieved →
   OpenAI generates response → Response returned to user
   ```

## 🔍 Key Components

### Document Processor (`ai_pipeline/services/document_processor.py`)

- PDF text extraction using PyPDF
- Text chunking and preprocessing
- Vector embedding generation
- FAISS index creation and management

### Chat Service (`ai_pipeline/services/chat_service.py`)

- RAG implementation
- Vector similarity search
- OpenAI API integration
- Response generation

### Cache Service (`ai_pipeline/services/cache_service.py`)

- Document metadata persistence
- Automatic cache rebuilding
- Vector store management

### Frontend Chat Widget (`frontend/src/components/chat/ChatWidget/`)

- Real-time chat interface
- Typing indicators
- Message history
- Responsive design

## 🐛 Troubleshooting

### Common Issues

1. **AI Pipeline not starting**:

   - Check OpenAI API key is set
   - Verify Python dependencies installed
   - Check port 8001 is available

2. **Document upload fails**:

   - Ensure file is PDF format
   - Check file size limits
   - Verify AI pipeline is running

3. **Chat responses empty**:

   - Check document processing completed
   - Verify vector stores exist
   - Check OpenAI API credits

4. **Database connection errors**:
   - Verify MongoDB is running
   - Check connection string in .env
   - Ensure database permissions

### Logs and Debugging

- **Frontend**: Browser developer console
- **Backend**: Console logs and error responses
- **AI Pipeline**: FastAPI logs and error traces
