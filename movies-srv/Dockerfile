FROM node:14.15-alpine as debug

RUN apk update
RUN apk upgrade
RUN apk add bash

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG PORT=3000
ENV PORT ${MOVIES_SRV_PORT}
EXPOSE ${MOVIES_SRV_PORT} 9229 9230

RUN npm i npm@latest -g

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

# HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /opt/node_app/app
COPY --chown=node:node . .

# RUN mkdir ./src
# COPY ./src ./src

# COPY docker-entrypoint.sh /usr/local/bin/
# USER root
# RUN chmod +x /usr/local/bin/docker-entrypoint.sh
# USER node
# # ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./src/server.js" ]
# ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "node",  "./bin/www" ]