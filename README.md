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

