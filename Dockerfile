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
RUN npm install -g serve

ENV PORT 80

CMD ["sh", "-c", "serve -s build -l $PORT"]
