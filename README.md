# eCommerce Product Management

Fullstack TypeScript monorepo for showing and managing products on a webstore. Seed data is modeled around laser tattoo removal services.

Full brief in [GUIDELINES.md](./GUIDELINES.md).

## Stack

NestJS + TypeORM + PostgreSQL on the backend, React + Vite on the frontend (in progress), with a shared `packages/types` workspace holding Zod schemas. pnpm workspaces, Turborepo, Docker Compose.

## Run

```
docker compose up --build
```

Starts Postgres, runs the migration, seeds data, and starts the API on `http://localhost:3001/api`.

## API

- `GET /api/products` active products (`?includeInactive=true` for all)
- `POST /api/products` create (max 10 attributes, validated server-side)
- `PATCH /api/products/:id/active` toggle active/inactive

## Tests

```
pnpm --filter @ecommerce/api test        # unit, no database
pnpm --filter @ecommerce/api test:e2e    # e2e, needs the DB up
```

## Design decisions

- **Monorepo with a shared contract.** `packages/types` holds Zod schemas as the single source of truth. Types are inferred from them and the same schema validates the API body and the frontend form, so front and back never drift.
- **Attributes as a related table.** Products and attributes are a one-to-many relation with a foreign key, not a JSONB column, so the relationship and referential integrity hold.
- **NestJS layered architecture.** Controller, service, and repository are separate, so HTTP concerns, business logic, and data access stay independent and testable in isolation.
- **Versioned migrations.** The schema changes only through migrations, never `synchronize`, so it stays reproducible.

Redis could later cache the active-products query, but it is not worth the extra moving part for this dataset.
