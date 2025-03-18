FROM node:22.3.0

WORKDIR ./

COPY package*.json ./

RUN npm install
RUN npm esbuild build/* --bundle --minify --mapsource --outdir=src

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
