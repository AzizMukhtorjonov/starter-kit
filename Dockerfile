FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install i -g prisma

RUN npm install

COPY . .

RUN prisma generate

RUN npm run build

ARG ENTRY_FILE
ENV ENTRY_FILE=$ENTRY_FILE

RUN echo $ENTRY_FILE

EXPOSE $PORT

CMD node $ENTRY_FILE


