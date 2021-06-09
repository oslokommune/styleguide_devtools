# Stage 1 - Install node dependencies and build distribution files
FROM node:16 AS node
WORKDIR /app
RUN mkdir build
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./config/webpack.common.cjs ./config/webpack.common.cjs
COPY ./config/webpack.production.cjs ./config/webpack.production.cjs
COPY ./src ./src
COPY ./rollup.config.js ./rollup.config.js
COPY ./.eslintrc.json ./.eslintrc.json
COPY ./.babelrc ./.babelrc
RUN yarn install
COPY ./.docker/styleguide ./node_modules/styleguide
RUN yarn run build
RUN yarn run build-production

# Stage 2 - Include distribution files and run web server
FROM node:16
RUN apt-get update && apt-get -y upgrade
EXPOSE 80
WORKDIR /app
COPY ./.docker/package.json .
RUN yarn install
COPY ./.docker/server.js .
COPY --from=node /app/dist ./public
CMD [ "npm", "start" ]
