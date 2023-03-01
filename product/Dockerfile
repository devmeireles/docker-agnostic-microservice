FROM node:18

WORKDIR /app
COPY package*.json .
RUN npm install \
  && mv node_modules /node_modules
COPY . .

CMD npm start