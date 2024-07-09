FROM node:22-alpine3.19

#ENV NODE_VERSION 22.4.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm","start" ]