FROM node:14.17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json .env nest-cli.json tsconfig*.json /usr/app/
RUN npm install

CMD [ "npm", "run", "start:dev" ]
