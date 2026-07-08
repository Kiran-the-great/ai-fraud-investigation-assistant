# AI Fraud Investigation Assistant

An AI-powered Fraud Investigation Assistant that leverages **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)** to analyze financial and compliance documents, retrieve relevant information, and generate accurate, context-aware responses to investigative queries.

Built using **FastAPI**, **React**, **LangChain**, **ChromaDB**, **Llama 3 (via Groq)**, and modern AI workflows, this project demonstrates the application of RAG for intelligent decision support in fraud investigation.

---

## Features

- AI-powered conversational fraud investigation assistant
- Retrieval-Augmented Generation (RAG) pipeline for context-aware responses
- Semantic document retrieval using vector embeddings
- Natural language querying of financial and compliance documents
- Interactive chat interface built with React
- FastAPI backend for efficient API handling
- Context-aware answers generated using Llama 3 through Groq
- Markdown-rendered AI responses
- Clean and responsive user interface

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- React Markdown
- CSS

### Backend
- FastAPI
- Python
- LangChain
- ChromaDB
- Sentence Transformers
- Groq API
- Llama 3
- Uvicorn

---

## Project Architecture

```
                User
                  │
                  ▼
        React Frontend (Chat UI)
                  │
                  ▼
          FastAPI Backend
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
  ChromaDB Vector DB    Llama 3 (Groq)
        │                   │
        └─────────┬─────────┘
                  ▼
          AI Generated Response
```

---

## How It Works

1. Documents are processed and converted into vector embeddings.
2. Embeddings are stored inside ChromaDB.
3. A user submits an investigation query.
4. The system retrieves the most relevant document chunks.
5. Retrieved context is combined with the user's question.
6. Llama 3 generates a context-aware investigative response.
7. The answer is displayed through the React interface.

---

## Project Structure

```
AI-Fraud-Investigation-Assistant
│
├── backend
│   ├── app
│   ├── chroma_db
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Kiran-the-great/ai-fraud-investigation-assistant.git

cd ai-fraud-investigation-assistant
```

---

### Backend Setup

```bash
cd backend

python -m venv rag_env

rag_env\Scripts\activate      # Windows

pip install -r requirements.txt
```

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key
```

Run the FastAPI server.

```bash
uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Example Questions

- Summarize suspicious financial activities.
- Identify potential AML compliance issues.
- Explain unusual transaction patterns.
- Highlight possible fraud indicators.
- Provide evidence supporting the investigation.
- Summarize customer KYC information.

---

## Future Improvements

- Real-time fraud intelligence integration
- Advanced reranking techniques for improved retrieval
- User authentication and role-based access
- Audit logging and investigation history
- Multi-document upload support
- Cloud deployment and scalability
- Streaming AI responses
- PDF export of investigation reports

---

## Acknowledgements

- LangChain
- ChromaDB
- Groq
- Llama 3
- FastAPI
- React

---

## Author

**Kiransree Vijayakumar**

GitHub: https://github.com/Kiran-the-great
