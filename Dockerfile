FROM node:14-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/request-http /usr/share/nginx/html
COPY ./config/nginx.conf /etx/nginx/conf.d/default.conf

# docker build -t curso-angular .
# docker run -p 8081:80 curso-angular
