# 1. Aşama: React uygulamasını build et
FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Build edilmiş dosyaları serve et
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./build

EXPOSE 4000

CMD ["serve", "-s", "build", "-l", "4000"]
