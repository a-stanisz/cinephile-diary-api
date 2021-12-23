FROM node:14.15-alpine as debug

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install
RUN npm install -g nodemon

RUN mkdir ./src
COPY ./src ./src

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./src/server.js" ]

FROM node:14.15-alpine as build

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "./src/server.js"]