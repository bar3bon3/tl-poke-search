FROM node:16.10.0-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i --include=dev
COPY . ./
RUN npm run build

FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]