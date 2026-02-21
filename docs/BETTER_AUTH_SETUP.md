# Better Auth Integration Notes

This repository now includes a Better Auth scaffold, with guarded routes and auth pages.

## What Exists

- Server config scaffold: `/Users/wysmyfree/Projects/cookflow/auth.ts`
- Server runtime: `/Users/wysmyfree/Projects/cookflow/server/auth-server.mjs`
- Frontend client: `/Users/wysmyfree/Projects/cookflow/lib/auth-client.ts`
- Route guard: `/Users/wysmyfree/Projects/cookflow/components/ProtectedRoute.tsx`
- Public-only auth-page guard: `/Users/wysmyfree/Projects/cookflow/components/PublicOnlyRoute.tsx`
- Header auth controls (user badge + sign out): `/Users/wysmyfree/Projects/cookflow/components/AuthControls.tsx`
- Auth pages:
  - `/Users/wysmyfree/Projects/cookflow/pages/SignIn.tsx`
  - `/Users/wysmyfree/Projects/cookflow/pages/SignUp.tsx`

## Environment Variables

- `BETTER_AUTH_SECRET` (required in non-dev)
- `BETTER_AUTH_URL` (server base URL)
- `COOKFLOW_FRONTEND_URL` (trusted origin; default `http://localhost:3000`)
- `VITE_AUTH_URL` (frontend auth endpoint; defaults to current origin)
- `VITE_AUTH_PROXY_TARGET` (Vite proxy target for `/api/auth`; default `http://localhost:8787`)
- `VITE_REQUIRE_AUTH=true` to enforce auth guard on `/app/*`

## Current Behavior

- If `VITE_REQUIRE_AUTH` is not `true`, app routes remain accessible without auth.
- If `VITE_REQUIRE_AUTH=true`, `/app/*` requires session and redirects to `/auth/sign-in`.
- If `VITE_REQUIRE_AUTH=true`, authenticated users visiting `/auth/sign-in` or `/auth/sign-up` are redirected back to `next` or `/app/courses`.
- Sign-in/sign-up pages call Better Auth client APIs and expect a running auth server.

## Local Run

1. Start auth server:
   - `npm run auth:dev`
2. Start frontend:
   - `npm run dev`
3. Optional enforcement:
   - Set `VITE_REQUIRE_AUTH=true` in your env.

## Production Follow-ups

1. Set production `BETTER_AUTH_SECRET` and strict trusted origins.
2. Move from memory adapter to persistent DB adapter.
3. Add email verification + reset handlers.
4. Add rate limiting backed by secondary storage or database.
