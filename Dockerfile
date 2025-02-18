FROM node:20.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
CMD ["node", ".output/server/index.mjs"]
