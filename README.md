# eCommerce Product Management

Fullstack TypeScript app for showing and managing products on a webstore. Built as a monorepo.

The full challenge brief is in [GUIDELINES.md](./GUIDELINES.md).

## Stack

- **Backend:** NestJS + TypeORM, PostgreSQL
- **Frontend:** React + Vite
- **Shared:** a `packages/types` workspace with Zod schemas used for validation and type inference on both sides
- **Tooling:** pnpm workspaces, Turborepo, TypeScript strict mode
- **Infra:** Docker Compose

## Structure

```
apps/
  api/    NestJS backend
  web/    React + Vite frontend
packages/
  types/  shared Zod schemas and TypeScript types
```

## Setup

Requires Node 22+, pnpm, and Docker.

_Docker Compose setup and run instructions will go here once the services are wired up._
