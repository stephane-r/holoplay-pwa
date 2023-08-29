FROM --platform=linux/amd64 node:20-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build
RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "/app/build"]