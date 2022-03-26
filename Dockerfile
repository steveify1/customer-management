FROM node:14

WORKDIR "/app"

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE ${PORT}

RUN npm run build
