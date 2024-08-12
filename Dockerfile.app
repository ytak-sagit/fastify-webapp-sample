# syntax = docker/dockerfile:1

ARG UBUNTU_VERSION=22.04
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-${UBUNTU_VERSION}

# パッケージをアップデート
RUN apt update && apt upgrade

# Node.jsのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs

# Javaのインストール
# NOTE: Allure Reportのレポート生成に必要
RUN apt install -y openjdk-17-jdk

ARG USERNAME=vscode
ARG GROUPNAME=vscode
USER ${USERNAME}

WORKDIR /app/e2e
RUN mkdir node_modules

# 必要なファイル群のみをコンテナへコピー
COPY --chown=${USERNAME}:${GROUPNAME} ./.env.example /app/.env
COPY --chown=${USERNAME}:${GROUPNAME} ./*.json /app
COPY --chown=${USERNAME}:${GROUPNAME} ./db /app/db
COPY --chown=${USERNAME}:${GROUPNAME} ./src /app/src
COPY --chown=${USERNAME}:${GROUPNAME} ./e2e /app/e2e

WORKDIR /app
RUN mkdir node_modules \
    # NOTE: APPコンテナからDBコンテナへ通信するために、.envのPGHOST環境変数をDBコンテナ名へ置換
    && sed -i 's/PGHOST=localhost/PGHOST=fastify-db/' .env

CMD [ "node" ]
