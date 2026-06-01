from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("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")
)

def summarize_text(text):

    text = text[:8000]

    prompt = f"""
    Summarize the following study material.

    {text}

    Give:
    - Key points
    - Important concepts
    - Short summary
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return response.choices[0].message.content