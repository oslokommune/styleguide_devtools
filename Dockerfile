FROM node:16

EXPOSE 9000

WORKDIR /app
COPY ./build ./build
COPY ./config ./config
COPY ./dist ./dist
COPY ./src ./src
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.eslintrc.json ./
COPY ./.babelrc ./
COPY ./rollup.config.js ./

RUN yarn install
