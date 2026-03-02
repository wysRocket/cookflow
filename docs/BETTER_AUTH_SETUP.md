# Better Auth Integration Notes

This repository uses Better Auth for sign-in, sign-up, and route-level authorization. The auth server can run against an in-memory adapter (local dev) or a persistent MySQL database (staging / production).

---

## What Exists

| File | Purpose |
|---|---|
| `auth.ts` | Server-side Better Auth config (TypeScript, imported by build tooling) |
| `server/auth-server.mjs` | Standalone Node.js auth HTTP server |
| `lib/auth-client.ts` | Browser-side Better Auth React client |
| `components/ProtectedRoute.tsx` | Redirects unauthenticated users to `/auth/sign-in` |
| `components/PublicOnlyRoute.tsx` | Redirects authenticated users away from auth pages |
| `components/AuthControls.tsx` | User badge + sign-out button rendered in the nav |
| `pages/SignIn.tsx` | Sign-in form |
| `pages/SignUp.tsx` | Registration form |

---

## Environment Variables

### Frontend (Vite)

| Variable | Default | Notes |
|---|---|---|
| `VITE_REQUIRE_AUTH` | `false` | Set to `true` to enforce auth on `/app/*` |
| `VITE_AUTH_URL` | current origin | Base URL the browser calls for auth |
| `VITE_AUTH_PROXY_TARGET` | `http://localhost:8787` | Vite dev proxy target for `/api/auth` |

### Auth server

| Variable | Required | Notes |
|---|---|---|
| `BETTER_AUTH_SECRET` | **Yes** | Min 32 chars. Generate: `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Yes | Public URL of the auth server |
| `COOKFLOW_FRONTEND_URL` | Yes | Trusted CORS origin (your frontend URL) |
| `AUTH_PORT` | No | Auth server listen port (default `8787`) |

### Database (MySQL / Hostinger)

All five vars must be set to activate the MySQL adapter. If any are missing the auth server falls back to the in-memory adapter (no persistence).

| Variable | Example | Notes |
|---|---|---|
| `DB_HOST` | `localhost` | Hostname of the MySQL server |
| `DB_PORT` | `3306` | Port (default `3306`) |
| `DB_USER` | `cookflow_user` | MySQL username |
| `DB_PASSWORD` | `••••••••` | MySQL password |
| `DB_NAME` | `cookflow` | Database name |

---

## Local Development

1. Start auth server (in-memory, no DB needed):
   ```
   npm run auth:dev
   ```
2. Start the Vite frontend:
   ```
   npm run dev
   ```
3. (Optional) enforce auth guard:
   ```
   VITE_REQUIRE_AUTH=true npm run dev
   ```

---

## Database Setup (Hostinger MySQL)

Hostinger shared hosting and most VPS plans provide **MySQL**. Better Auth connects via the `mysql2` driver included in this project.

### 1. Create the database on Hostinger

In **hPanel → MySQL Databases**:
1. Create a new database, e.g. `cookflow`.
2. Create a dedicated user and grant it all privileges on that database.
3. Note the **host**, **port** (usually `3306`), **user**, **password**, and **database** name.

### 2. Set environment variables on your server

```
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=https://your-domain.com
COOKFLOW_FRONTEND_URL=https://your-domain.com
DB_HOST=<hostinger-mysql-host>
DB_PORT=3306
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=cookflow
```

### 3. Run the Better Auth schema migration

Better Auth's CLI creates the required tables (`user`, `session`, `account`, `verification`) automatically:

```bash
npx @better-auth/cli@latest migrate
```

The CLI reads your `auth.ts` config, connects to the MySQL pool, and applies the schema. Re-run this command whenever you add or change plugins.

### 4. Start the auth server in production

```bash
node server/auth-server.mjs
```

Use a process manager such as PM2 to keep it running:

```bash
pm2 start server/auth-server.mjs --name cookflow-auth
```

---

## How Authorization Works

```
Browser
  │
  ├─ GET /app/*  ──►  ProtectedRoute
  │                       │ VITE_REQUIRE_AUTH=true?
  │                       ├─ no  →  render page
  │                       └─ yes →  authClient.useSession()
  │                                   │ session?
  │                                   ├─ yes → render page
  │                                   └─ no  → redirect /auth/sign-in?next=…
  │
  ├─ POST /api/auth/sign-up/email  ──►  auth server  ──►  MySQL users table
  └─ POST /api/auth/sign-in/email  ──►  auth server  ──►  MySQL sessions table
```

Sign-in and sign-up forms post to `/api/auth/*`. The Vite dev proxy forwards those requests to the auth server (port 8787). In production, configure your reverse proxy (e.g. Nginx) to forward `/api/auth` to the auth server process.

---

## Production Checklist

- [ ] Generate a strong `BETTER_AUTH_SECRET` (`openssl rand -base64 32`)
- [ ] Set `BETTER_AUTH_URL` to the public HTTPS URL
- [ ] Set `COOKFLOW_FRONTEND_URL` to your frontend domain (CSRF protection)
- [ ] Set all five `DB_*` variables pointing to the Hostinger MySQL database
- [ ] Run `npx @better-auth/cli@latest migrate` to create tables
- [ ] Set `VITE_REQUIRE_AUTH=true` in your production build env
- [ ] Configure Nginx/reverse-proxy to forward `/api/auth` to the auth server
- [ ] Keep auth server alive with PM2 or systemd
- [ ] (Optional) Add email verification handler in `auth.ts`
- [ ] (Optional) Add password-reset email handler in `auth.ts`

