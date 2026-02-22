# SiteCraft AI - Deploy su Render

## 🚀 Deploy Rapido (1 click)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/deyemproject-cloud/sitecraft-ai)

---

## 📋 Istruzioni Manuali

### 1. Crea account su Render
Vai su https://render.com e registrati (gratuito, no carta di credito)

### 2. Crea Web Service
1. Vai su "Dashboard" → "New" → "Web Service"
2. Collega il repo GitHub `deyemproject-cloud/sitecraft-ai`
3. Configura:
   - **Name**: `sitecraft-ai`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: Free

### 3. Aggiungi Environment Variables
Nella sezione "Environment" aggiungi:
```
OPENAI_API_KEY=sk-la_tua_chiave_openai
PORT=10000
```

### 4. Deploy
Clicca "Create Web Service". Il deploy impiega ~2 minuti.

---

## 🌐 Accesso dopo deploy

**Backend API**: `https://sitecraft-ai.onrender.com/api`

**Frontend**: Apri direttamente `index.html` in locale o hostalo su GitHub Pages:
1. Forka il repo
2. Vai su Settings → Pages
3. Seleziona branch `main` → folder `/ (root)`

---

## ⚠️ Limitazioni Piano Gratuito Render

- **Sleep dopo 15 min di inattività** (il primo accesso può impiegare 30-60 secondi)
- **Bandwith limitata** ma sufficiente per test
- **DB in memory** - i siti generati si perdono al riavvio

Per produzione: passa a piano Starter ($7/mese) o usa database persistente.

---

## 🔧 Struttura Progetto

```
sitecraft-ai/
├── backend/           # Server Node.js (deploy su Render)
│   ├── server.js
│   └── package.json
├── index.html         # Frontend (GitHub Pages o static hosting)
└── render.yaml        # Configurazione automatica
```

---

## 💡 Suggerimenti

Per evitare il "cold start" di Render (sleep), puoi usare un servizio di ping gratuito come:
- https://uptimerobot.com (ping ogni 5 minuti gratis)
- https://cron-job.org

---

## 📞 Supporto

Problemi con il deploy? Controlla i log su Render Dashboard → Logs.
