FROM node:18 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG REACT_APP_BACKEND_HOST
ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_HOST=$REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT
RUN npm run build
FROM node:18

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
