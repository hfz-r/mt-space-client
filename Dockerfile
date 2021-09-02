FROM node:14-alpine as build

WORKDIR /app

# build args
ARG API_URL
# setup env 
ENV REACT_APP_API_URL=$API_URL
ENV PATH /app/node_modules/.bin:$PATH

# copy package
COPY Client/web-app/package.json .
COPY Client/web-app/yarn.lock .

# run
RUN yarn
# copy others
COPY Client/web-app .

# build
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY Client/web-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]