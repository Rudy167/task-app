FROM node:16.0.0

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/task-app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]