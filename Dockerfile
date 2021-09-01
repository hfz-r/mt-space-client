FROM node:13.12.0-alpine as build

WORKDIR /app

# build args
ARG API_URL
# setup env 
ENV REACT_APP_API_URL=$API_URL
ENV PATH /app/node_modules/.bin:$PATH

# copy package
COPY package.json yarn.lock ./

# run
RUN yarn
# copy deps
COPY . ./

# build
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]