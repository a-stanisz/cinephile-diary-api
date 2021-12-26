FROM node:14.15-alpine

ARG PORT=3000
ENV PORT ${AUTH_SRV_PORT}
EXPOSE ${AUTH_SRV_PORT}

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "./src/server.js"]