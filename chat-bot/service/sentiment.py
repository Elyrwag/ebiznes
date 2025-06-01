from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis", model="nie3e/sentiment-polish-gpt2-large")

def analyze_sentiment(text):
    result = sentiment_analyzer(text)[0]
    return result['label'].lower()