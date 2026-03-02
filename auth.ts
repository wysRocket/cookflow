import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import mysql from 'mysql2/promise';

function buildDatabase() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (DB_HOST && DB_USER && DB_PASSWORD && DB_NAME) {
    return mysql.createPool({
      host: DB_HOST,
      port: DB_PORT ? Number(DB_PORT) : 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }
  // Fallback: in-memory adapter for local development
  const memoryDb: { user: unknown[]; session: unknown[]; account: unknown[]; verification: unknown[] } = {
    user: [],
    session: [],
    account: [],
    verification: [],
  };
  return memoryAdapter(memoryDb);
}

export const auth = betterAuth({
  appName: 'CookFlow',
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:8787',
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

export type Session = typeof auth.$Infer.Session;
