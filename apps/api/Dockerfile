FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @ecommerce/types build
RUN pnpm --filter @ecommerce/api build

FROM base AS production
ENV NODE_ENV=production
RUN apk add --no-cache netcat-openbsd
COPY --from=build --chown=node:node /app ./
RUN chmod +x /app/docker/api-entrypoint.sh
WORKDIR /app/apps/api
USER node
EXPOSE 3000
ENTRYPOINT ["/app/docker/api-entrypoint.sh"]
