# syntax=docker/dockerfile:1
FROM node:14-alpine
EXPOSE 3000
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
CMD ["npm", "start"]