FROM node:8-alpine
LABEL maintainer dennis.ge<gedennis@163.com>

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm i --production

COPY device /usr/src/app/device
COPY utils /usr/src/app/utils

ENTRYPOINT [ "node", "/usr/src/app/device/index.js" ]

