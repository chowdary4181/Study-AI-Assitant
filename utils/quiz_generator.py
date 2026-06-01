from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("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")
)

def generate_quiz(topic):

    prompt = f"""
    Generate 10 multiple choice questions on {topic}.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content