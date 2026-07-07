from fastapi import FastAPI
from pydantic import BaseModel

from fastapi import UploadFile
from fastapi import File
from fastapi.middleware.cors import CORSMiddleware

from services.document_processor import (
    extract_pdf_text
)

from services.masking_service import (
    mask_sensitive_data
)

from services.fraud_service import (
    analyze_transaction
)

from services.rag_service import ask_question

app = FastAPI(
    title="AI Fraud Investigation Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def home():

    return {
        "message":
        "Fraud Investigation Assistant API Running"
    }

@app.post("/chat")
def chat(data: ChatRequest):

    result = ask_question(
       data.question
    )

    return result

@app.post("/analyze-transaction")
async def analyze_transaction_pdf(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:

        f.write(
            await file.read()
        )

    text = extract_pdf_text(
        file_path
    )

    masked_text = mask_sensitive_data(
        text
    )

    result = analyze_transaction(
        masked_text
    )

    return {
        "analysis": result
    }

@app.get("/stats")
def stats():

    return {
        "documents": 10,
        "model": "LLaMA 3",
        "vector_db": "ChromaDB",
        "embedding_model":
        "MiniLM"
    }