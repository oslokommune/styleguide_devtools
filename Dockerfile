FROM composer AS composer
WORKDIR /app
COPY . .
COPY ./.docker/composer.* ./
RUN composer install --ignore-platform-reqs --no-scripts

FROM node:11.14

# Install packages
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get install -y php-cli php-json

EXPOSE 9000

WORKDIR /app
COPY . .
COPY ./.docker/package.* ./
COPY --from=composer /app/vendor /app/vendor
