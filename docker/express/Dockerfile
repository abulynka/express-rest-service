FROM node:14.17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json /usr/app/
COPY .env /usr/app/
RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
