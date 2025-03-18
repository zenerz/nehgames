FROM node:22.3.0

WORKDIR ./

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
