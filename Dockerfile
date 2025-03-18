FROM node:22.3.0

WORKDIR /app

COPY . .

RUN npm i && npm run build

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
