FROM node:22.21.1-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN node db/database.js
EXPOSE 1337

CMD ["node", "index.js"]