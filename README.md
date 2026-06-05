# Campus-mitra

A comprehensive system for managing and interacting with documents using AI-driven capabilities.

## About

This project provides a robust solution for document management, AI-driven interactions, and user-friendly data visualization. It is designed for users who need efficient document handling, AI chatbot interactions, and intuitive data presentation.

## Features

- AI-driven document processing and management
- FastAPI and LangChain integration for AI functionalities
- OCR for document text extraction
- Vector database for efficient data storage and retrieval
- Node.js and Express backend with MongoDB database
- Authentication, chat, and document management controllers
- Rate limiting and file upload middleware
- React frontend for user interactions
- Chat functionality and document management components

## Tech Stack

- Python
- FastAPI
- LangChain
- Node.js
- Express
- MongoDB
- Mongoose
- React
- Vite

## Getting Started

### Prerequisites

- Node.js
- Python
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nitinog10/Campus-mitra.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Campus-mitra
   ```
3. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
4. Install AI pipeline dependencies:
   ```sh
   cd../ai_pipeline
   pip install -r requirements.txt
   ```
5. Set up MongoDB and configure the database connection in `backend/src/config/database.js`.

### Running the Project

1. Start the AI pipeline:
   ```sh
   cd ai_pipeline
   python main.py
   ```
2. Start the backend server:
   ```sh
   cd../backend
   npm start
   ```
3. Start the frontend development server:
   ```sh
   cd../frontend
   npm install
   npm run dev
   ```

## Project Structure

- `ai_pipeline/`: Contains the AI-driven document processing and management services.
- `backend/`: Houses the Node.js and Express backend with MongoDB integration.
- `frontend/`: Includes the React application for the user interface.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT

## Code Improvements Applied

- Added regression tests for high-risk files: `backend/src/models/index.js`, `nitinog10-Campus-mitra-d6be147/backend/src/models/index.js`, `nitinog10-Campus-mitra-d6be147/frontend/src/components/ui/badge.jsx`.
- Proposed extracting shared utility code into a dedicated module to reduce coupling.
- Updated documentation by re-indexing and regenerating walkthroughs/diagrams.

## Code Improvements Applied

- Added regression tests for high-risk files: `frontend/src/api/index.js`, `frontend/src/components/ui/button.jsx`, `frontend/src/components/ui/input.jsx`.
- Proposed extracting shared utility code into a dedicated module to reduce coupling.
- Updated documentation by re-indexing and regenerating walkthroughs/diagrams.
