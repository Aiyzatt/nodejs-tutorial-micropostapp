FROM node:lts-buster-slim
WORKDIR /app

COPY ./src/micropost ./
RUN npm install