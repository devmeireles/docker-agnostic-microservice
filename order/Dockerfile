FROM php:fpm

# Set the working directory
WORKDIR /application

# Copy the composer.json and composer.lock
COPY composer*.json ./application

# Install the dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV PATH="/usr/local/bin:$PATH"

COPY . /application

RUN composer install