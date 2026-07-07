import os

from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate

from langchain.chains.combine_documents import (
    create_stuff_documents_chain
)

from langchain.chains.retrieval import (
    create_retrieval_chain
)

load_dotenv()

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="database/chroma_db",
    embedding_function=embedding_model
)

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

prompt = ChatPromptTemplate.from_template(
"""
You are an AI Fraud Investigation Assistant.

Use the provided context whenever possible.

If sufficient information is not available,
answer using general financial fraud,
AML and KYC knowledge.

Context:
{context}

Question:
{input}
"""
)

document_chain = create_stuff_documents_chain(
    llm,
    prompt
)

retrieval_chain = create_retrieval_chain(
    retriever,
    document_chain
)

def ask_question(question):

    result = retrieval_chain.invoke(
        {"input": question}
    )

    sources = []

    for doc in result["context"]:
        
        source = doc.metadata.get(
            "source",
            "Unknown"
        )

        sources.append(source)

    sources = list(set(sources))

    return {
        "answer": result["answer"],
        "sources": sources
    }