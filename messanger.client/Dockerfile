FROM node:20.17.0-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm install -g @angular/cli

RUN cp src/environments/environment.docker.ts src/environments/environment.ts

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
