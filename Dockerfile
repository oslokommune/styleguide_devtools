FROM node:14

EXPOSE 9000

WORKDIR /app
COPY ./.env ./.env
COPY ./build ./build
COPY ./config ./config
COPY ./dist ./dist
COPY ./src ./src
COPY ./package.* ./
COPY ./eventListener.js ./
COPY ./.eslintrc.json ./
COPY ./.babelrc ./
