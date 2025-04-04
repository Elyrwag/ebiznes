## Aby aplikacja działała, konieczne jest dodanie tokenów do zmiennych środowiskowych (np. w IntelliJ: Edit Configuration > Add Environment variables)

- **DISCORD_BOT_TOKEN**     - token do uwierzytelnienia bota na platformie Discord
- **SLACK_BOT_TOKEN**       - token do uwierzytelniania bota na platformie Slack
- **SLACK_WEBSOCKET_TOKEN** - token do otrzymania adresu WSS dla bota na platformie Slack<br>(na platformie Discord adres WSS jest uniwersalny, nie trzeba więc tokenu)

### Komendy:

Bot odpowiada na następujące komendy:
- help
- hello
- category
- products \<category\>

#### Discord:

Aby wejść w interakcję z botem, przed daną komendą należy użyć prefiksu "!", np. `!help`

#### Slack:

Aby wejść w interakcję z botem, przed daną komendą należy go oznaczyć, np. `<NazwaNaszegoBota> help`

Dodatkowo, samo oznaczenie bota jest równoważne komendzie help, czyli `<NazwaNaszegoBota> ≡ <NazwaNaszegoBota> help`
