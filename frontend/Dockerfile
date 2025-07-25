# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

COPY . .

ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]