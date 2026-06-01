from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("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")
)

def create_study_plan(subjects, days):

    prompt = f"""
    Create a study plan.

    Subjects:
    {subjects}

    Duration:
    {days} days

    Give a day-by-day schedule.
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