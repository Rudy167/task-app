FROM node:16.0.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/project /usr/share/nginx/html