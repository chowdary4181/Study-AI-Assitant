from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("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")
)

def generate_mock_test(topic):

    prompt = f"""
Generate exactly 10 multiple-choice questions on {topic}.

Return ONLY valid JSON.

Format:

{{
  "mcqs":[
    {{
      "question":"Question text",
      "options":["A","B","C","D"],
      "answer":"Correct Option"
    }}
  ]
}}

Generate 10 MCQs.
No explanation.
No markdown.
JSON only.
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

    return json.loads(
        response.choices[0].message.content
    )