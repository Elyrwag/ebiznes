import spacy

RELEVANT_KEYWORDS = [
    "ubrania", "odzież", "koszulka", "koszulki", "spodnie", "buty", "but", "bluza", "bluzka", "sweter", "kurtka",
    "płaszcz", "szalik", "czapka", "rękawiczki", "sukienka", "spódnica", "t-shirt", "dres", "sklep", "zakupy", "marka",
    "asortyment", "oferta", "promocja", "cena", "rabaty", "wyprzedaż", "koszyk", "kasa", "paragon", "faktura",
    "dostępność", "płatność", "przelew", "gotówka", "karta", "paypal", "raty", "zwrot", "reklamacja", "gwarancja",
    "dostawa", "wysyłka", "kurier", "odbiór", "paczka", "poczta", "adres", "czas", "termin", "kontakt", "pomoc", "pomóc",
    "serwis", "obsługa", "reklamacje", "formularz", "regulamin", "zwroty", "rozmiar", "kolor", "materiał", "model"
]

nlp = spacy.load("pl_core_news_sm")

def lemmatize(text):
    doc = nlp(text)
    return [token.lemma_.lower() for token in doc if token.is_alpha]

def is_relevant(text):
    lemmatized_input = lemmatize(text)
    return any(word in RELEVANT_KEYWORDS for word in lemmatized_input)
