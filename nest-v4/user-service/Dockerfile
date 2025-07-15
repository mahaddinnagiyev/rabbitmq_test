FROM node:22-alpine

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install --omit=dev && npm install @types/express

COPY . .

RUN npm run build

RUN rm -rf ./src

EXPOSE 3001

CMD ["npm", "run", "start:prod"]