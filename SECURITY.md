# Security — CookFlow (Firebase project: cookflow-c74f3)

## Incident summary (April 2026)

The project experienced unauthorized resource usage caused by a compromised Firebase service account key. The key was inadvertently exposed in the repository's git history and was used by external actors to abuse project resources. The abusive behavior was not intentional and not related to the purpose of the application.

## Corrective actions taken

| Action | Status |
|---|---|
| Deleted all existing service account keys | Done |
| Audited IAM bindings; removed unknown members | Done |
| Revoked unused / unrecognized API keys | Done |
| Source code audited — no credentials remain in working tree | Done |
| `.gitignore` updated to block all credential file patterns | Done |
| Firestore security rules hardened (field validation, catch-all deny) | Done |
| `BETTER_AUTH_SECRET` fallback removed — server fails fast if unset | Done |

## Root cause

A Firebase service account key JSON file was committed to the repository at some point and became accessible via the public git history. Scanners used by bad actors routinely harvest such keys from public repositories within minutes of a push.

## Current security posture

### Authentication
- Firebase Authentication (email/password + Google OAuth) via the Firebase client SDK.
- Server-side session management uses [Better Auth](https://better-auth.dev). The `BETTER_AUTH_SECRET` is required at startup and must be set as a secret in the deployment environment — there is no insecure fallback.

### Firestore rules
- Only the `users/{userId}` collection is accessible.
- Authenticated users may only read/write their own document.
- Client-side deletion of user documents is blocked.
- Write operations are validated: unknown top-level fields are rejected; the `access` sub-document is type-checked and bounded (credits 0–10 000, list sizes capped).
- All other Firestore paths are denied by an explicit catch-all rule.

### Secret management
- All secrets are stored as GitHub Actions repository secrets and injected at build/deploy time.
- `.env` files are gitignored. `.env.example` contains only placeholder values.
- Credential file patterns (`*.pem`, `*service-account*.json`, `*firebase-adminsdk*.json`, etc.) are blocked by `.gitignore`.

### Recommendations (not yet implemented)
- Enable **Firebase App Check** to restrict SDK usage to verified app instances.
- Restrict the Firebase Web API key in GCP Console to the production domain only (`eurocookflow.com`).
- Move credit/access mutations to a server-side Cloud Function so Firestore rules can enforce that credits only decrease via client writes and only increase via verified server calls.
- Enable **GCP audit logs** for the Firebase project to detect future anomalies early.
