# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.16
ARG UBUNTU_VERSION=22.04

# cache our node version for installing later
FROM node:${NODE_VERSION}-slim AS node

# base image
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-${UBUNTU_VERSION}

# パッケージをアップデート
RUN apt update && apt upgrade

# tiniのインストール
# Avoid running nodejs process as PID 1 (use tini)
# 参考: https://zenn.dev/jrsyo/articles/e42de409e62f5d
RUN apt -qq install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 3000

# Node.jsのインストール
# 参考: https://note.milldea.com/posts/two-ways-to-install-nodejs-with-fixed-version-in-dockerfile
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs \
 && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
 && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npx

# Javaのインストール
# NOTE: Allure Reportのレポート生成に必要
# NOTE: [インストール参考] https://hub.docker.com/_/eclipse-temurin
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:17 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

ARG USERNAME=vscode
ARG GROUPNAME=vscode
USER ${USERNAME}

WORKDIR /app/e2e
RUN mkdir node_modules

# 必要なファイル群のみをコンテナへコピー
COPY --chown=${USERNAME}:${GROUPNAME} ./.husky /app/.husky
COPY --chown=${USERNAME}:${GROUPNAME} ./.env.example /app/.env
COPY --chown=${USERNAME}:${GROUPNAME} ./*.json /app
COPY --chown=${USERNAME}:${GROUPNAME} ./db /app/db
COPY --chown=${USERNAME}:${GROUPNAME} ./src /app/src
COPY --chown=${USERNAME}:${GROUPNAME} ./e2e /app/e2e

WORKDIR /app
RUN mkdir node_modules \
    # NOTE: APPコンテナからDBコンテナへ通信するために、.envのPGHOST環境変数をDBコンテナ名へ置換
    && sed -i 's/PGHOST=localhost/PGHOST=fastify-db/' .env

# tiniでnodeを起動する
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD [ "node" ]
