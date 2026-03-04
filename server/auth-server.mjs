import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import mysql from 'mysql2/promise';
import { toNodeHandler } from 'better-auth/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const STATIC_DIR = fs.existsSync(DIST_DIR) ? DIST_DIR : PUBLIC_DIR;
const HASHED_ASSET_RE = /^\/assets\/.+-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.map': 'application/json',
};

function insideStaticDir(filePath) {
  const resolved = path.resolve(filePath);
  return resolved === STATIC_DIR || resolved.startsWith(`${STATIC_DIR}${path.sep}`);
}

function getCacheHeaders(urlPath, ext) {
  if (ext === '.html') {
    return {
      'cache-control': 'no-cache, no-store, must-revalidate',
      pragma: 'no-cache',
      expires: '0',
    };
  }

  if (HASHED_ASSET_RE.test(urlPath)) {
    return { 'cache-control': 'public, max-age=31536000, immutable' };
  }

  return { 'cache-control': 'public, max-age=3600' };
}

function serveStatic(req, res) {
  let urlPath = '/';
  try {
    const parsed = new URL(req.url ?? '/', 'http://localhost');
    urlPath = decodeURIComponent(parsed.pathname);
  } catch {
    urlPath = '/';
  }

  let filePath = path.join(
    STATIC_DIR,
    urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, ''),
  );

  if (!insideStaticDir(filePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // SPA fallback — serve index.html for all unknown paths
    filePath = path.join(STATIC_DIR, 'index.html');
    urlPath = '/index.html';
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? 'application/octet-stream';
  res.writeHead(200, {
    'content-type': contentType,
    ...getCacheHeaders(urlPath, ext),
  });
  fs.createReadStream(filePath).pipe(res);
}

const port = Number(process.env.PORT ?? process.env.AUTH_PORT ?? 8787);

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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
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

  serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Serving static files from ${STATIC_DIR}`);
  console.log(`Better Auth server running on http://localhost:${port}`);
});
