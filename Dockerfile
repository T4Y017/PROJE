FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g serve

COPY /dist ./build

EXPOSE 4000

CMD ["serve", "-s", "build", "-l", "4000"]
