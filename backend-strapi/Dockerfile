# syntax=docker/dockerfile:1
FROM node:14-alpine
EXPOSE 3001
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "develop"]