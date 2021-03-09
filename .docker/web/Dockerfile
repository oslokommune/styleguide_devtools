# Stage 1 - Install PHP dependencies
FROM composer AS composer
WORKDIR /app
COPY . .
COPY ./composer.* ./
RUN composer install --ignore-platform-reqs --no-scripts

# Stage 2 - Include PHP dependencies, install node dependencies and build distribution files
FROM node:11.14 AS node
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y php-cli php-json git

WORKDIR /app
COPY . .
COPY ./package.* ./
COPY --from=composer /app/vendor /app/vendor
RUN npm i
RUN ./node_modules/.bin/npm-install-peers
RUN npm run build-production

# Stage 3 - Include distribution files and run web server
FROM node:11.14
RUN apt-get update && apt-get -y upgrade
EXPOSE 80
WORKDIR /app
COPY ./.docker/web/package.json .
RUN npm i
COPY ./.docker/web/server.js .
COPY --from=node /app/dist ./public
CMD [ "npm", "start" ]
