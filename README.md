# Pocket Draw Backend

[![Copier](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/copier-org/copier/refs/heads/master/img/badge/black-badge.json)](https://github.com/copier-org/copier)

## Hono API

This repository contains a Node.js backend built with [Hono](https://hono.dev/)
for the Pocket Draw React Native client.

### Getting started

```sh
npm install
cp .env.sample .env
npm run dev
```

The server listens on `http://localhost:3000` by default. Set `HOST`, `PORT`,
and `CLIENT_ORIGIN` in `.env` to change the server or React Native CORS origin.

### Endpoints

| Method | Path              | Purpose                                 |
| ------ | ----------------- | --------------------------------------- |
| `GET`  | `/`               | Service metadata                        |
| `GET`  | `/health`         | Health check                            |
| `GET`  | `/api/v1/example` | Example resource response               |
| `POST` | `/api/v1/example` | Example JSON resource creation template |

Add new resources under `src/routes/`, then mount them in `src/app.ts`. Route
handlers should return JSON envelopes (`{ data: ... }`) so the React Native
client has a consistent response shape.

### Scripts

- `npm run dev` starts the development server with reloads.
- `npm run typecheck` validates TypeScript without emitting files.
- `npm run build` runs the same TypeScript validation for CI compatibility.
- `npm start` starts the server without file watching.

## Recommendations

### Configuration directory

If this project is a tool, CLI, or library that reads its own configuration,
support resolving it from a project-level `.config/` directory
(e.g. `.config/pocket-draw-backend.toml`) alongside
any other locations you accept. It keeps consumers' repo roots tidy and follows
an emerging cross-ecosystem convention:

- <https://github.com/numtide/prj-spec> — project directory specification
- <https://dot-config.github.io/> — the `.config/` directory convention
- <https://github.com/pi0/config-dir> — reference implementation for resolving it
