FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install i -g prisma

RUN npm install

COPY . .

RUN prisma generate

RUN npm run build

ARG NPM_SCRIPT
ENV NPM_SCRIPT=$NPM_SCRIPT

EXPOSE $PORT

CMD npm run $NPM_SCRIPT


