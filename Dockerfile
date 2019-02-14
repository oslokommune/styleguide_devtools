FROM composer AS composer
WORKDIR /app
COPY . .
RUN composer install --ignore-platform-reqs --no-scripts

FROM node:10.12-alpine

# Install packages
RUN apk update \
    && apk upgrade \
    && apk add --no-cache php-cli php-json

EXPOSE 9000

WORKDIR /app
COPY . .
COPY --from=composer /app/vendor /app/vendor
