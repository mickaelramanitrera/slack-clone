# syntax=docker/dockerfile:1
FROM node:14-alpine
EXPOSE 18080
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
CMD ["npm", "start"]