import random

OPENINGS = [
    u"Cześć! W czym mogę pomóc?",
    u"Witaj w naszym sklepie! W czym mogę pomóc?",
    u"Hej! W czym mogę pomóc?",
    u"Witaj! Potrzebujesz pomocy?",
    u"Cześć! Potrzebujesz pomocy?"
]

CLOSINGS = [
    u"Dziękuję za rozmowę! Miłego dnia!",
    u"Mam nadzieję, że pomogłem. Do zobaczenia!",
    u"Dziękuję za rozmowę! Do usłyszenia!",
    u"Dziękuję! Do zobaczenia!",
    u"Do usłyszenia!"
]

def get_random_opening():
    return random.choice(OPENINGS)

def get_random_closing():
    return random.choice(CLOSINGS)