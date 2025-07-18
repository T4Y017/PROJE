# 1. Aşama: Build Vite app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Aşama: Serve dist klasörünü production ortamında
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./build

EXPOSE 4000

CMD ["serve", "-s", "build", "-l", "4000"]
