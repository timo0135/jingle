FROM node:lts-alpine

ENV NODE_ENV development

WORKDIR /app


COPY ./package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

ENV PATH ./node_modules/.bin/:$PATH
