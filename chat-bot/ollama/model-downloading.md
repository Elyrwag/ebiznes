## W folderze ollama-models powinien znajdować się pobrany model, aby aplikacja działała prawidłowo.

W przypadku braku modelu, po uruchomieniu `docker-compose up --build` należy zainstalować model llama3.1:8b następującą komendą:

```
docker exec ollama ollama run llama3.1:8b
```

W przypadku używania innego modelu należy również zmienić `OLLAMA_MODEL` w `service/main.py` na nazwę modelu