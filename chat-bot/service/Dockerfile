FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download pl_core_news_sm

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3334"]
