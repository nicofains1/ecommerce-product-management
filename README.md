# eCommerce Product Management

Fullstack TypeScript monorepo for showing and managing products on a webstore. The seed data is a laser tattoo removal catalog.

Full brief in [GUIDELINES.md](./GUIDELINES.md).

## Run it

Requires Docker.

```
docker compose up --build
```

That starts Postgres, runs the migration, seeds the data, and serves:

- Frontend: http://localhost:5173
- API: http://localhost:3001/api

## Monorepo

| Package          | What it does                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| `apps/api`       | NestJS + TypeORM backend. REST API, migrations, seeders.                  |
| `apps/web`       | React + Vite frontend. Store and Manage views.                            |
| `packages/types` | Shared Zod schemas, used for types and validation on both sides.          |
| `e2e`            | Playwright end-to-end tests that drive the running app against real data. |

pnpm workspaces + Turborepo, TypeScript strict everywhere.

## API

- `GET /api/products` returns active products (`?includeInactive=true` for all)
- `POST /api/products` creates one (up to 10 attributes, validated server-side)
- `PATCH /api/products/:id/active` toggles active/inactive

## Tests

```
pnpm --filter @ecommerce/api test    # backend unit + integration
pnpm --filter @ecommerce/e2e test:e2e   # end-to-end, boots the Docker stack
```

## Design decisions

- **Shared contract.** `packages/types` holds Zod schemas as the single source of truth. Types are inferred from them, and the same schema validates the API body and the frontend form, so front and back never drift.
- **Attributes as a related table.** Products and attributes are a one-to-many relation with a foreign key, not a JSONB column, so the relationship and referential integrity hold.
- **Layered architecture.** On the backend, controller/service/repository stay separate. On the frontend, pure UI components live in `ui/`, data-fetching containers wrap them, and views compose the pages.
- **Versioned migrations.** The schema changes only through migrations, never `synchronize`.

Redis could later cache the active-products query, but it is not worth the extra moving part for this dataset.
