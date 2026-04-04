# Этап 1: Сборка Angular-приложения
FROM node:20.17.0-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (чистая установка)
RUN npm ci

# Копируем исходники
COPY . .

# Устанавливаем Angular CLI
RUN npm install -g @angular/cli

# Hot reload с доступом наружу
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
