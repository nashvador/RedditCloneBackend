FROM node:16.13.1-alpine3.14


WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY ./ ./

RUN npm install
RUN npm install ts-node-dev

CMD npm run dev