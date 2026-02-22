# SiteCraft AI 🚀

SaaS completo per creare siti web con intelligenza artificiale. Descrivi il sito in linguaggio naturale e l'AI genera codice HTML pulito, design moderno e animazioni fluide.

## 🎯 Funzionalità

- **Generazione AI**: Usa GPT-4 per creare siti web completi
- **Editor visuale**: Interfaccia intuitiva con Framer Motion
- **Deploy istantaneo**: Link immediato dopo la generazione
- **Storico siti**: Salva e gestisci tutti i tuoi progetti
- **Responsive**: Design ottimizzato per tutti i dispositivi

## 🛠️ Stack Tecnico

**Frontend:**
- React 18
- Framer Motion (animazioni)
- CSS moderno con variabili

**Backend:**
- Node.js + Express
- OpenAI API (GPT-4)
- File system per storage

## 🚀 Avvio Rapido

### 1. Clona e installa

```bash
cd sitecraft-ai/backend
npm install
```

### 2. Configura API Key

```bash
# Copia il file di esempio
cp .env.example .env

# Modifica .env e inserisci la tua API Key di OpenAI
OPENAI_API_KEY=sk-tua-chiave-api-qui
```

### 3. Avvia il backend

```bash
npm start
# oppure per development:
npm run dev
```

Il backend sarà disponibile su `http://localhost:3001`

### 4. Apri il frontend

Apri semplicemente `index.html` nel browser, oppure usa un server locale:

```bash
# Opzione 1: Python
python3 -m http.server 8080

# Opzione 2: Node.js
npx serve .

# Opzione 3: PHP
php -S localhost:8080
```

Vai su `http://localhost:8080`

## 📁 Struttura Progetto

```
sitecraft-ai/
├── index.html              # Frontend React
├── backend/
│   ├── server.js          # API Express
│   ├── package.json
│   └── .env.example
├── sites/                 # Siti generati (auto-created)
└── README.md
```

## 🔌 API Endpoints

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/generate` | POST | Genera nuovo sito |
| `/api/sites` | GET | Lista siti utente |
| `/api/sites/:id` | GET | Dettaglio sito |

### Esempio chiamata API

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Un sito per una gelateria artigianale",
    "userId": "user-123"
  }'
```

## 💡 Esempi di Prompt

- "Un portfolio per fotografo di matrimoni, stile elegante, galleria fotografica, sezione servizi, contatti"
- "Landing page per app fitness, colori energici, caratteristiche, prezzi, call to action"
- "Sito ristorante sushi, design minimal giapponese, menu, prenotazioni, galleria"
- "Blog personale di viaggi, stile avventura, mappa interattiva, archivio post"

## 🔧 Configurazione Avanzata

### Cambiare modello AI

In `backend/server.js`, modifica:
```javascript
model: "gpt-4", // o "gpt-3.5-turbo" per risparmiare
```

### Aggiungere autenticazione reale

Sostituire `useAuth` nel frontend con:
- Supabase Auth
- Firebase Auth
- Auth0

### Database persistente

Sostituire `Map` in memory con:
- Supabase PostgreSQL
- MongoDB Atlas
- Firebase Firestore

## 🎨 Personalizzazione

Modifica le variabili CSS in `index.html`:

```css
:root {
  --primary: #6366f1;    /* Cambia colore primario */
  --secondary: #ec4899;   /* Cambia colore secondario */
  --bg: #0f0f23;         /* Cambia sfondo */
}
```

## 📝 Note

- Richiede **Node.js 16+**
- Necessita di **API Key OpenAI** (con billing attivo)
- Per produzione aggiungi autenticazione vera e database

## 🐛 Troubleshooting

**Errore: "Failed to generate"**
→ Verifica che `OPENAI_API_KEY` sia corretta nel file `.env`

**Errore CORS**
→ Assicurati che backend e frontend siano su porte diverse ma accessibili

**Sito non generato**
→ Controlla che il backend sia avviato su porta 3001

## 📄 Licenza

MIT - Libero uso per progetti personali e commerciali.
