# ebiznes

### Zadanie 1: Docker

:white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10

:white_check_mark: 3.5 obraz ubuntu:24.04 z Javą w wersji 8 oraz Kotlinem

:white_check_mark: 4.0 najnowszy Gradle oraz paczka JDBC SQLite w ramach projektu na Gradle (build.gradle)

:white_check_mark: 4.5 program typu HelloWorld oraz uruchamianie aplikacji przez CMD oraz gradle

:white_check_mark: 5.0 konfiguracja docker-compose 

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/0805aac8b8e4bc0ecbc5d643eb4c5f5d72dd7b9b)

**Obraz**: [dockerhub](https://hub.docker.com/r/elyrwag/ebiznes-docker-image)

**Kod**: [docker](https://github.com/Elyrwag/ebiznes/tree/main/docker)


### Zadanie 2: Scala

framework Play w Scali 3

:white_check_mark: 3.0 kontroler do Produktów

:white_check_mark: 3.5 endpointy do kontrolera zgodnie z CRUD - dane pobierane z listy

:white_check_mark: 4.0 kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD

:white_check_mark: 4.5 aplikacja uruchamiana na dockerze oraz skrypt uruchamiający aplikację via ngrok

:white_check_mark: 5.0 konfiguracja CORS dla dwóch hostów dla metod CRUD 

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/bf73fb52d723e594207a6261b4c4ae1056626a3d)

**Kod**: [scala](https://github.com/Elyrwag/ebiznes/tree/main/scala)


### Zadanie 3: Kotlin

framework Ktor w Kotlinie

:white_check_mark: 3.0 aplikacja kliencka, która pozwala na przesyłanie wiadomości na platformę Discord

:white_check_mark: 3.5 aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)

:white_check_mark: 4.0 zwraca listę kategorii na określone żądanie użytkownika

:white_check_mark: 4.5 zwraca listę produktów według żądanej kategorii

:white_check_mark: 5.0 aplikacja obsługuje dodatkowo platformę Slack

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/035d563bf0be023b858bd356b6a8356bbd209928)

**Kod**: [kotlin](https://github.com/Elyrwag/ebiznes/tree/main/kotlin)


### Zadanie 4: Go

framework Echo w Go, baza danych: SQLite

5 modeli, gdzie pomiędzy dwoma jest relacja

:white_check_mark: 3.0 aplikacja, która ma kontroler Produktów zgodny z CRUD

:white_check_mark: 3.5 model Produktów wykorzystując gorm, model wykorzystywany do obsługi produktów w kontrolerze

:white_check_mark: 4.0 model Koszyka oraz odpowiedni endpoint

:white_check_mark: 4.5 model Kategorii, relacja między Kategorią, a Produktem

:white_check_mark: 5.0 gorm’owe scope'y

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/4c459a60582ca193c4e03a246010153aa4353a62)

**Kod**: [echo-go](https://github.com/Elyrwag/ebiznes/tree/main/echo-go)


### Zadanie 5: React + Go

Aplikacja webowa - sklep 

Frontend: React, Backend: Go

:white_check_mark: 3.0 dwa komponenty: Produkty oraz Płatności. Płatności wysyłają do aplikacji serwerowej dane, a w Produktach pobierane są dane o produktach z aplikacji serwerowej

:white_check_mark: 3.5 Koszyk wraz z widokiem; wykorzystany routing

:white_check_mark: 4.0 React hooks do przesyłania danych pomiędzy wszystkimi komponentami

:white_check_mark: 4.5 skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose

:white_check_mark: 5.0 axios oraz nagłówki pod CORS

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/9d87da4db1b6672bc12b6059935e74d58f390082)

**Kod**: [shop-app](https://github.com/Elyrwag/ebiznes/tree/main/shop-app)


### Zadanie 6: Testy

Użyte rozwiązanie: CypressJS

:white_check_mark: 3.0 minimum 20 przypadków testowych w CypressJS

:white_check_mark: 3.5 rozszerzenie testów funkcjonalnych, aby zawierały minimum 50 asercji

:white_check_mark: 4.0 testy jednostkowe z minimum 50 asercjami

:white_check_mark: 4.5 testy API pokrywające wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint

:white_check_mark: 5.0 uruchomienie testów funkcjonalnych na Browserstacku

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/7bf1195baccb0184c4fd43afaa968b92b7861aa2)

**Kod**: [shop-app-tests](https://github.com/Elyrwag/ebiznes/tree/main/shop-app-tests)


### Zadanie 7: Sonar

Linter dla Go: [golangci-lint](https://golangci-lint.run/)

:white_check_mark: 3.0 linter do kodu aplikacji serwerowej w hookach gita

:white_check_mark: 3.5 wyeliminowane wszystkie błędy typu "Bugs" w kodzie w Sonarze (kod aplikacji serwerowej)

:white_check_mark: 4.0 wyeliminowane wszystkie błędy typu "Code Smells" w kodzie w Sonarze (kod aplikacji serwerowej)

:white_check_mark: 4.5 wyeliminowane wszystkie błędy typu "Vulnerabilities" i "Security Hotspots" w kodzie w Sonarze (kod aplikacji serwerowej)

:white_check_mark: 5.0 wyeliminowane wszystkie błędy w kodzie aplikacji klienckiej

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/63517f44b725210b15cad85555c339ccdedacfe5)

**Kod**: 
- [folder shop-app-sonar](https://github.com/Elyrwag/ebiznes/tree/main/shop-app-sonar)
- [repozytorium shop-app-sonar](https://github.com/Elyrwag/shop-app-sonar)


### Zadanie 8: OAuth2

:white_check_mark: 3.0 logowanie przez aplikację serwerową

:white_check_mark: 3.5 rejestracja przez aplikację serwerową

:white_check_mark: 4.0 logowanie przez Google OAuth2

:white_check_mark: 4.5 logowanie przez Github OAuth2

:white_check_mark: 5.0 zapisywanie danych logowania OAuth2 po stronie serwera

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/d07efddf6afc6be2f1d1a6b1797990c3ad0e8d7e)

**Kod**: [oauth2](https://github.com/Elyrwag/ebiznes/tree/main/oauth2)


### Zadanie 9: Chat bot

Frontend: React, Backend: Go, Service: Python, Model: llama3.1:8b

:white_check_mark: 3.0 serwis po stronie serwerowej do łączenia z modelem do usługi chat

:white_check_mark: 3.5 interfejs frontowy dla użytkownika, który komunikuje się z serwisem, odpowiedzi wysyłane do frontendowego interfejsu

:white_check_mark: 4.0 listy z 5 różnymi otwarciami oraz zamknięciami rozmowy

:white_check_mark: 4.5 filtrowanie po zagadnieniach związanych ze sklepem

:white_check_mark: 5.0 filtrowanie odpowiedzi po sentymencie

**Commit zbiorczy**: [commit 5 i poniżej](https://github.com/Elyrwag/ebiznes/commit/287114defed770bceb32d22e268b87ef09029d84)

**Kod**: [chat-bot](https://github.com/Elyrwag/ebiznes/tree/main/chat-bot)

