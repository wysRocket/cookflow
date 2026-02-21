import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';

const memoryDb = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

export const auth = betterAuth({
  appName: 'CookFlow',
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:8787',
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-only-secret-change-this-before-production-1234',
  trustedOrigins: [process.env.COOKFLOW_FRONTEND_URL ?? 'http://localhost:3000'],
  database: memoryAdapter(memoryDb),
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
