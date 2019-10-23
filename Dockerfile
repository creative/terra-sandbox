FROM node:10 AS build

# Set the working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PUBLIC_URL /

# Install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

RUN npm run aggregate-translations
RUN npm run build

FROM nginx:1.17.5-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]