#!/bin/bash

echo "🚀 SiteCraft AI - Avvio completo"
echo "================================"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato. Installa Node.js 16+ prima di continuare."
    exit 1
fi

# Install backend dependencies
echo "📦 Installazione dipendenze backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  ATTENZIONE: File .env non trovato!"
    echo "Crea il file backend/.env con:"
    echo "OPENAI_API_KEY=la_tua_chiave_api"
    echo ""
    echo "Ottieni una chiave da: https://platform.openai.com/api-keys"
    exit 1
fi

# Start backend
echo "🔥 Avvio backend su http://localhost:3001"
node server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
echo "🎨 Avvio frontend..."
cd ..
echo "Apri nel browser: http://localhost:8080"
echo ""
echo "Per avviare il frontend con Python:"
echo "  python3 -m http.server 8080"
echo ""
echo "O con Node.js:"
echo "  npx serve . -p 8080"
echo ""
echo "Premi CTRL+C per fermare il backend"
echo ""

# Keep script running
wait $BACKEND_PID
