FROM node:10.16.3-stretch

COPY . /cars-nestjs
WORKDIR /cars-nestjs

# expose ports
EXPOSE 3000

RUN npm i

RUN npm run build

CMD [ "npm", "run", "start:prod" ]