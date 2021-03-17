FROM composer AS composer
WORKDIR /app
COPY ./composer.* ./
RUN composer install --ignore-platform-reqs --no-scripts

FROM node:14

# Install packages
RUN apt update \
  && apt upgrade -y \
  && apt install -y software-properties-common
RUN apt -y install lsb-release apt-transport-https ca-certificates 
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list
RUN apt update
RUN apt install -y php7.4-cli php7.4-json

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
COPY --from=composer /app/vendor /app/vendor
