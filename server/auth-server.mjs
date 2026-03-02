import http from 'node:http';
import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import mysql from 'mysql2/promise';
import { toNodeHandler } from 'better-auth/node';

const port = Number(process.env.AUTH_PORT ?? 8787);

function buildDatabase() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (DB_HOST && DB_USER && DB_PASSWORD && DB_NAME) {
    console.log('Using MySQL adapter for persistent session storage');
    return mysql.createPool({
      host: DB_HOST,
      port: DB_PORT ? Number(DB_PORT) : 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }
  console.warn('No DB_* env vars found — using in-memory adapter (data will not persist)');
  return memoryAdapter({ user: [], session: [], account: [], verification: [] });
}

const auth = betterAuth({
  appName: 'CookFlow',
  baseURL: process.env.BETTER_AUTH_URL ?? `http://localhost:${port}`,
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-only-secret-change-this-before-production-1234',
  trustedOrigins: [process.env.COOKFLOW_FRONTEND_URL ?? 'http://localhost:3000'],
  database: buildDatabase(),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});

const authHandler = toNodeHandler(auth);

const server = http.createServer(async (req, res) => {
  const url = req.url ?? '/';

  if (url.startsWith('/api/auth')) {
    await authHandler(req, res);
    return;
  }

  if (url === '/healthz') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, () => {
  console.log(`Better Auth server running on http://localhost:${port}`);
});
