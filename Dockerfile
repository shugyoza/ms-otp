FROM node:22-alpine

# create a working directory
WORKDIR /usr/src/app

# copy package.json to current directory
COPY "package.json" .
COPY "package-lock.json" .

RUN npm install

ADD . /usr/src/app/

RUN npm run build

CMD ["npm", "run", "dev"]

EXPOSE 3000