# CookFlow Deployment Guide

## Architecture

| Layer                 | Where                    | Status                                |
| --------------------- | ------------------------ | ------------------------------------- |
| Frontend (React SPA)  | Hostinger static hosting | ✅ Live at `https://eurocookflow.com` |
| Auth Server (Node.js) | **Render.com free tier** | ⏳ Needs 5-min setup (see below)      |
| Database (MySQL)      | Hostinger shared DB      | ✅ Schema already applied             |

Hostinger's shared hosting plan **does not** run persistent Node.js processes — it only serves static files and PHP. The auth server must live on a platform that supports persistent Node.js (Render, Railway, Fly.io, etc.).

---

## Step 1 — Deploy Auth Server on Render.com (one-time, ~5 min)

1. Go to **[render.com](https://render.com)** and sign up / log in with GitHub
2. Click **New → Web Service**
3. Connect the **`wysRocket/cookflow`** repository
4. Render detects `render.yaml` automatically. Confirm these settings:
   - **Name**: `cookflow-auth`
   - **Region**: Frankfurt
   - **Build Command**: `npm install --omit=dev`
   - **Start Command**: `node server/index.mjs`
   - **Plan**: Free
5. Under **Environment Variables**, add:

   | Key                  | Value                                          |
   | -------------------- | ---------------------------------------------- |
   | `BETTER_AUTH_SECRET` | `yyTcNwdxchDRsySB9GkEM9kifA/qOCuPW890iPVZmz8=` |
   | `DB_HOST`            | `localhost`                                    |
   | `DB_USER`            | `cookflow_user`                                |
   | `DB_PASSWORD`        | `2vsTF\|L>s9A8n5u`                             |
   | `DB_NAME`            | `cookflow`                                     |

   > **Note:** `BETTER_AUTH_URL` and `COOKFLOW_FRONTEND_URL` will be set in Step 2 once you have the Render URL.

6. Click **Create Web Service** — Render will build and deploy in ~2 minutes.
7. Copy your Render URL: `https://cookflow-auth.onrender.com` (or similar)

---

## Step 2 — Set the Auth URL in Render env vars

Once deployed, go to your Render service → **Environment** and add:

| Key                     | Value                                |
| ----------------------- | ------------------------------------ |
| `BETTER_AUTH_URL`       | `https://cookflow-auth.onrender.com` |
| `COOKFLOW_FRONTEND_URL` | `https://eurocookflow.com`           |

Then click **Save Changes** — Render will restart automatically.

---

## Step 3 — Rebuild & Redeploy the Frontend

Replace `YOUR_RENDER_URL` with your actual Render service URL:

```bash
VITE_REQUIRE_AUTH=true VITE_AUTH_URL=https://YOUR_RENDER_URL npm run build
zip -r /tmp/cookflow-static.zip dist/
# Then deploy via Hostinger MCP: deployStaticWebsite
```

Or run the full deploy in one shot:

```bash
VITE_REQUIRE_AUTH=true VITE_AUTH_URL=https://cookflow-auth.onrender.com npm run build
```

Then redeploy `dist/` to Hostinger.

---

## MySQL Schema (already applied)

The schema was applied via a one-shot migration job. If you ever need to re-run it:

1. Open [hPanel](https://hpanel.hostinger.com) → **Databases** → **phpMyAdmin**
2. Select the `cookflow` database
3. Click the **SQL** tab
4. Paste the contents of [`scripts/migrate-mysql.sql`](../scripts/migrate-mysql.sql)
5. Click **Go**

---

## Local Development

```bash
# Install dependencies
npm install

# Start auth server locally (reads server/.env)
npm run auth:dev

# Start frontend in another terminal
npm run dev
```

`server/.env` (not committed — create it yourself):

```env
BETTER_AUTH_URL=http://localhost:8787
BETTER_AUTH_SECRET=yyTcNwdxchDRsySB9GkEM9kifA/qOCuPW890iPVZmz8=
COOKFLOW_FRONTEND_URL=http://localhost:3000
AUTH_PORT=8787
DB_HOST=localhost
DB_PORT=3306
DB_USER=cookflow_user
DB_PASSWORD=2vsTF|L>s9A8n5u
DB_NAME=cookflow
```

---

## Environment Variables Reference

| Variable                | Description                                      | Required                |
| ----------------------- | ------------------------------------------------ | ----------------------- |
| `BETTER_AUTH_URL`       | Public URL of the auth server                    | Yes                     |
| `BETTER_AUTH_SECRET`    | 32+ char secret for JWT signing                  | Yes                     |
| `COOKFLOW_FRONTEND_URL` | Frontend origin for CORS                         | Yes                     |
| `PORT`                  | Port to listen on (injected by hosting platform) | Set by platform         |
| `AUTH_PORT`             | Fallback port if `PORT` not set                  | Optional (default 8787) |
| `DB_HOST`               | MySQL hostname                                   | Yes                     |
| `DB_PORT`               | MySQL port                                       | Optional (default 3306) |
| `DB_USER`               | MySQL username                                   | Yes                     |
| `DB_PASSWORD`           | MySQL password                                   | Yes                     |
| `DB_NAME`               | MySQL database name                              | Yes                     |

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

| Variable                | Description                              | Required for Production  |
| ----------------------- | ---------------------------------------- | ------------------------ |
| `BETTER_AUTH_URL`       | Public URL of the auth server            | Yes                      |
| `BETTER_AUTH_SECRET`    | 32+ char secret for JWT signing          | Yes                      |
| `COOKFLOW_FRONTEND_URL` | Frontend origin for CORS                 | Yes                      |
| `AUTH_PORT`             | Port the auth server listens on          | Optional (default: 8787) |
| `PORT`                  | Hostinger-injected port (takes priority) | Auto-set by Hostinger    |
| `DB_HOST`               | MySQL hostname                           | Yes                      |
| `DB_PORT`               | MySQL port                               | Optional (default: 3306) |
| `DB_USER`               | MySQL username                           | Yes                      |
| `DB_PASSWORD`           | MySQL password                           | Yes                      |
| `DB_NAME`               | MySQL database name                      | Yes                      |
