<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1R8GLNNrmDparNt1K4PVTRZ9DiIj-uJbv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Better Auth Setup

- Frontend client is configured in `/Users/wysmyfree/Projects/cookflow/lib/auth-client.ts`.
- Server config scaffold is in `/Users/wysmyfree/Projects/cookflow/auth.ts`.
- Local auth server runtime is `/Users/wysmyfree/Projects/cookflow/server/auth-server.mjs`.
- Protected app routes are toggled by `VITE_REQUIRE_AUTH`.

Recommended environment variables:

- `BETTER_AUTH_SECRET` (minimum 32 chars)
- `BETTER_AUTH_URL` (auth server URL, for example `http://localhost:8787`)
- `VITE_AUTH_URL` (frontend auth base URL; default is same-origin)
- `VITE_AUTH_PROXY_TARGET` (Vite dev proxy target for `/api/auth`, default `http://localhost:8787`)
- `VITE_REQUIRE_AUTH` (`true` to enforce auth guard, default off)

Run local auth + frontend:

1. Terminal A: `npm run auth:dev`
2. Terminal B: `npm run dev`

## Documentation

- User flow map (persona-based, live + vision): [docs/USER_FLOWS.md](docs/USER_FLOWS.md)
- Better Auth scaffold notes: [docs/BETTER_AUTH_SETUP.md](docs/BETTER_AUTH_SETUP.md)
