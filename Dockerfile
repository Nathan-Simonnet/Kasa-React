FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable \
    && yarn install --immutable

COPY . .

RUN yarn build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
