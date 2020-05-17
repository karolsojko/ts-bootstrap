FROM node:10.20.1-alpine

WORKDIR /var/www

COPY package.json yarn.lock /var/www/

RUN yarn install --pure-lockfile

COPY . /var/www

RUN yarn build

EXPOSE 3000

CMD yarn start
