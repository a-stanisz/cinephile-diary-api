FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json* ./
RUN npm install
RUN npm install -g nodemon
RUN npm install -g mocha
RUN npm install -g chai

RUN mkdir ./src
COPY ./src ./src

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./src/server.js" ]