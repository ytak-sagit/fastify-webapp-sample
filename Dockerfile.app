# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-slim

USER node

# 必要なファイル群のみをコンテナへコピー
COPY --chown=node:node ./.env.example /app/.env
COPY --chown=node:node ./*.json /app
COPY --chown=node:node ./db /app/db
COPY --chown=node:node ./src /app/src

WORKDIR /app

RUN mkdir node_modules \
    # NOTE: APPコンテナからDBコンテナへ通信するために、.envのPGHOST環境変数をDBコンテナ名へ置換
    && sed -i 's/PGHOST=localhost/PGHOST=fastify-db/' .env
