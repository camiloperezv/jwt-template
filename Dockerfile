FROM node:8
RUN yarn global add nodemon
WORKDIR /tmp
COPY package.json .
RUN yarn install

WORKDIR /app
RUN mv /tmp/node_modules .
COPY . /app