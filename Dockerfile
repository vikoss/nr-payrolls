FROM node:20.18.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
CMD ["node", ".output/server/index.mjs"]
