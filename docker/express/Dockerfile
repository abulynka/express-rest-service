FROM node:14.17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json .env nodemon.json tsconfig.json /usr/app/
RUN npm install

CMD [ "npm", "run", "dev" ]
