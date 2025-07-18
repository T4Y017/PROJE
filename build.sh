#!/bin/bash

echo "🔧 Adım 1: React projesi build ediliyor..."
npm run build

echo "🐳 Adım 2: Docker imajı oluşturuluyor (react-app)..."
docker build -t react-app .

echo "🚀 Adım 3: Container çalıştırılıyor (react-app)..."
docker run --rm --name frontend --network my-app-net -p 4000:4000 -e VITE_API_URL=http://backend:3000 react-app
