FROM node:14.17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json nest-cli.json tsconfig*.json /usr/app/
RUN npm i

CMD [ "npm", "run", "start:dev" ]
