FROM node:14.15-alpine

ARG PORT=3000
ENV PORT ${MOVIES_SRV_PORT}
EXPOSE ${MOVIES_SRV_PORT} 9229 9230

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install
RUN npm install -g nodemon

RUN mkdir ./src
COPY ./src ./src

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./src/server.js" ]
# CMD ["nodemon", "./src/server.js"]
