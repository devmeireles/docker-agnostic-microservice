FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

# must be reviwed,
#when using start:prod command it's trying to get app/main folder which doesn't exist

# RUN npm run build

# FROM node:18

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

# CMD [ "npm", "run", "start:prod" ]
