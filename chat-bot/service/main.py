from fastapi import FastAPI
from pydantic import BaseModel
from filters import is_relevant
from sentiment import analyze_sentiment
from phrases import get_random_opening, get_random_closing
import httpx

app = FastAPI()
OLLAMA_URL = "http://ollama:11434/api/chat"
OLLAMA_MODEL = "llama3.1:8b"

class Message(BaseModel):
    message: str

async def get_full_llama_response(msg: Message):
    timeout = httpx.Timeout(120.0, read=120.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(OLLAMA_URL, json={
                "model": OLLAMA_MODEL,
                "messages": [
                    {"role": "system", "content": "Jesteś asystentem sprzedaży w sklepie odzieżowym. Odpowiadaj na pytania o dostępne produkty, ceny, dostępność i style."},
                    {"role": "user", "content": msg.message}
                ],
                "stream": False
            })
            response.raise_for_status()

            return response
        except httpx.ReadTimeout:
            return "Timeout error while fetching data from Llama."
        except httpx.RequestError as exc:
            return f"An error occurred while requesting data: {exc}"

@app.post("/ask")
async def ask(msg: Message):
    message = msg.message
    print("Message:")
    print(message)

    sentiment = analyze_sentiment(message)
    print("Sentiment:")
    print(sentiment)

    if not is_relevant(message):
        print("Message irrelevant. Returned non-generated response")
        return {"response": "Niestety, to pytanie nie jest związane z naszym sklepem."}

    full_response = await get_full_llama_response(msg)
    if isinstance(full_response, str):
        print(full_response)
        return {"response": "Wystąpił błąd. Spróbuj ponownie później."}

    response_json = full_response.json()

    response_msg = response_json["message"]["content"]
    print("Response message:")
    print(response_msg)

    sentiment = analyze_sentiment(response_msg)
    print("Sentiment:")
    print(sentiment)

    if sentiment == "negative":
        print("Answer with negative sentiment. Added additional information to response")
        response_msg += "\n\nJeżeli uważasz, że to błąd, skontaktuj się z naszym działem wsparcia klienta."

    return {"response": response_msg}

@app.get("/start")
def start_conversation():
    return {"response": get_random_opening()}

@app.get("/end")
def end_conversation():
    return {"response": get_random_closing()}