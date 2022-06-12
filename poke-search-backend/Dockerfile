FROM node:16.15.1-alpine
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i --include=dev
COPY . ./
RUN npx tsc
EXPOSE 3001
CMD ["node", "dist/app.js"]