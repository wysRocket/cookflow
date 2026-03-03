# CookFlow Deployment Guide

## Architecture

- **Frontend** (React SPA): hosted as static files at `https://eurocookflow.com`
- **Auth Server** (Node.js): needs to run as a persistent process, accessible at `https://eurocookflow.com/api/auth/*`
- **Database** (MySQL): Hostinger shared hosting DB `cookflow` (user: `cookflow_user`)

---

## Frontend Deployment (Hostinger Static)

1. Build the frontend:
   ```bash
   VITE_REQUIRE_AUTH=true VITE_AUTH_URL=https://eurocookflow.com npm run build
   ```

2. Deploy via Hostinger API (or zip `dist/` and upload):
   ```bash
   zip -r dist.zip dist/
   # Then use Hostinger MCP: deployStaticWebsite
   ```

---

## Auth Server Deployment (Hostinger Node.js)

The auth server must be configured in **hPanel → Node.js** to actually start the process.

### Step 1: Deploy files (already done via MCP)

The latest deployment (`cookflow-auth-v3`) has been installed at:
`/home/u154770451/nodejs_apps/eurocookflow.com/`

### Step 2: Configure Node.js in hPanel

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. Select your hosting account → **Node.js** (under Advanced)
3. Click **Create Application** (or edit existing)
4. Set:
   - **Node.js Version**: 20
   - **Application Mode**: Production
   - **Application Root**: The path where the deployment was installed
   - **Application Startup File**: `index.mjs`
   - **Application URL**: `/` (to serve all traffic including SPA + auth)

5. Click **Create** / **Save**

The server uses these env vars (already in `.env` in the deployment):
```
BETTER_AUTH_URL=https://eurocookflow.com
BETTER_AUTH_SECRET=yyTcNwdxchDRsySB9GkEM9kifA/qOCuPW890iPVZmz8=
COOKFLOW_FRONTEND_URL=https://eurocookflow.com
AUTH_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=cookflow_user
DB_PASSWORD=2vsTF|L>s9A8n5u
DB_NAME=cookflow
```

---

## MySQL Schema Migration

The schema was deployed via a one-shot migration job. To re-run if needed:

1. Open [hPanel](https://hpanel.hostinger.com) → **Databases** → **phpMyAdmin**
2. Select the `cookflow` database
3. Click the **SQL** tab
4. Paste the contents of `scripts/migrate-mysql.sql`
5. Click **Go**

---

## Local Development

```bash
# Install dependencies
npm install

# Start auth server (reads server/.env for credentials)
npm run auth:dev

# Start frontend (in another terminal)
npm run dev
```

The `server/.env` file (NOT committed) should contain:
```env
VITE_REQUIRE_AUTH=true
VITE_AUTH_URL=http://localhost:3000
VITE_AUTH_PROXY_TARGET=http://localhost:8787
BETTER_AUTH_URL=http://localhost:8787
BETTER_AUTH_SECRET=<your-secret>
COOKFLOW_FRONTEND_URL=http://localhost:3000
AUTH_PORT=8787
DB_HOST=localhost
DB_PORT=3306
DB_USER=cookflow_user
DB_PASSWORD=<your-db-password>
DB_NAME=cookflow
```

---

## Environment Variables Reference

| Variable | Description | Required for Production |
|---|---|---|
| `BETTER_AUTH_URL` | Public URL of the auth server | Yes |
| `BETTER_AUTH_SECRET` | 32+ char secret for JWT signing | Yes |
| `COOKFLOW_FRONTEND_URL` | Frontend origin for CORS | Yes |
| `AUTH_PORT` | Port the auth server listens on | Optional (default: 8787) |
| `PORT` | Hostinger-injected port (takes priority) | Auto-set by Hostinger |
| `DB_HOST` | MySQL hostname | Yes |
| `DB_PORT` | MySQL port | Optional (default: 3306) |
| `DB_USER` | MySQL username | Yes |
| `DB_PASSWORD` | MySQL password | Yes |
| `DB_NAME` | MySQL database name | Yes |
