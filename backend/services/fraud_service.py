import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze_transaction(transaction_text):

    prompt = f"""
You are a senior banking fraud investigator.

Analyze the transaction.

Return your answer in exactly:

Risk Level:
(Low / Medium / High)

Suspicious Indicators:
- ...

Recommended Actions:
- ...

Explain why the transaction may be suspicious.

Transaction:

{transaction_text}
"""

    response = llm.invoke(prompt)

    return response.content