# Stage 1 - Install PHP dependencies
FROM composer AS composer
WORKDIR /app
COPY . .
RUN composer install --ignore-platform-reqs --no-scripts

# Stage 2 - Include PHP dependencies, install node dependencies and build distribution files
FROM node:10.15-alpine AS node
RUN apk update \
    && apk upgrade \
    && apk add --no-cache php-cli php-json git

WORKDIR /app
COPY . .
COPY --from=composer /app/vendor /app/vendor
RUN npm i && npm run build-production

# Stage 3 - Include distribution files and run web server
FROM node:11.12-alpine
RUN apk update && apk upgrade
EXPOSE 8080
WORKDIR /app
COPY ./.docker/web/package.json .
RUN npm i
COPY ./.docker/web/server.js .
COPY --from=node /app/dist ./public
CMD [ "npm", "start" ]
