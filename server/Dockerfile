FROM node:latest

WORKDIR /usr/src/app/server

COPY package.json .

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "start"]