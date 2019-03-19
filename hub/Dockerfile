FROM node:8-alpine
LABEL maintainer dennis.ge<gedennis@163.com>

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm i --production

COPY hub /usr/src/app/hub
COPY utils /usr/src/app/utils

EXPOSE 3000
ENTRYPOINT [ "node", "/usr/src/app/hub/index.js" ]