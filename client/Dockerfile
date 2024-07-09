FROM node:22-alpine3.19

#ENV NODE_VERSION 22.4.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ENV REACT_APP_URL=http://localhost:4001
EXPOSE 4000

CMD [ "npm","start" ]