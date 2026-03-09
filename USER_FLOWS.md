# User Flows: Cookflow

**Owned by:** Product Flow Agent
**Stitch Project:** projects/889224776793372108
**Design System:** DESIGN.md
**Site Structure:** SITE.md

---

## Agent Team

| Agent                        | Role                                                               | Owns                                             |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| **Orchestrator**             | Coordinates all agents, resolves blockers, gates phase transitions | This file (phases)                               |
| **Product Flow Agent**       | Roadmap, user flows, feature slicing, acceptance criteria          | `USER_FLOWS.md`, `SITE.md`                       |
| **Stitch Screen Agent**      | Generates/iterates UI screens                                      | `stitch.json`, `next-prompt.md`                  |
| **Design System Agent**      | Synthesizes design tokens from screens                             | `DESIGN.md`                                      |
| **React Component Agent**    | Converts Stitch screens → React components                         | `/components/`, `/pages/`                        |
| **Auth Agent**               | Better Auth integration, session, guards                           | `/lib/auth-client.ts`, `/server/auth-server.mjs` |
| **Frontend Architect Agent** | Wires routing, state, layout, cross-page consistency               | `App.tsx`, `DashboardLayout`                     |

---

## Implementation Phases

### Phase 1 — Foundation (Auth + Layout) `[COMPLETE]`

Unblock all app pages behind auth. DashboardLayout must be solid before anything else renders.

- [x] Auth layer wired end-to-end (sign-in, sign-up, session, protected routes)
- [x] DashboardLayout with sidebar + header complete
- [x] Route guard: unauthenticated → `/auth/sign-in`

### Phase 2 — Core Content Screens `[COMPLETE]`

Generate missing Stitch screens, convert to components, implement pages.

- [x] Recipe List implemented (dark mode, Unsplash photos, search, filter, bookmark)
- [x] Recipe Detail implemented (dark mode, hero image, ingredients checklist, timed steps, Start Cooking nav)
- [x] Home Dashboard implemented (courses grid, CookFlows timeline, credit wallet packs)

### Phase 3 — Planning & Workflow `[COMPLETE]`

- [x] Meal Planner implemented (dark mode, food photos, drag-and-drop, click-to-pick modal, week nav, stats, → Shopping List)
- [x] Shopping List implemented (dark mode, categories, progress bar, inline add-item form, ← back to Planner)
- [ ] Pantry status widget (deferred to Phase 5)

### Phase 4 — Academy & Community `[COMPLETE]`

Existing Stitch screens: Chef Progress Dashboard, Culinary Skills Gallery, Course Lesson Interface.

- [x] Cooking Mode implemented (full-screen overlay, step-by-step, timer, ingredient spotlight, step dots)
- [x] Chef List implemented (dark mode, 6 chefs, search, rating/courses/students stats)
- [x] Chef Profile updated (CookFlow design system colors, orange/green, XP bar gradient)
- [x] Community page implemented (feed, like/bookmark, tabs, Featured Chefs + Trending sidebar)

### Phase 5 — Monetisation & Polish `[IN PROGRESS]`

Existing Stitch screens: Credit Wallet Packs v1/v2, Premium Settings Page.

- [ ] Settings page implemented
- [ ] Credit wallet flow
- [ ] Mobile responsiveness pass

---

## User Flows

### F-01: Onboarding

**Entry:** `/` (Landing Page)
**Exit:** `/app/courses` (Dashboard)

```
Landing Page
  → [CTA: "Start Cooking"] → /auth/sign-up
  → Sign Up form (name, email, password)
  → Account created → redirect /app/courses
```

**Acceptance Criteria:**

- [ ] CTA button on landing page navigates to sign-up
- [ ] Sign-up validates: required fields, email format, password min 8 chars
- [ ] Successful sign-up creates session and redirects to dashboard
- [ ] Error states shown inline (not alert boxes)

---

### F-02: Authentication

**Entry:** `/auth/sign-in`
**Exit:** `/app/courses` or redirect to originally requested route

```
Sign In form (email, password)
  → [Success] → Dashboard (or originally requested route)
  → [Fail] → Inline error "Invalid email or password"
  → [Forgot Password] → (Phase 5)

Sign Out (from any app page)
  → Session cleared → /
```

**Acceptance Criteria:**

- [ ] Sign-in form submits to Better Auth
- [ ] Session persisted across page refresh
- [ ] Sign-out clears session, redirects to `/`
- [ ] `PublicOnlyRoute` redirects authenticated users away from `/auth/*`
- [ ] `ProtectedRoute` redirects unauthenticated users to `/auth/sign-in`

---

### F-03: Recipe Discovery

**Entry:** `/app/recipes`
**Exit:** `/app/recipes/:id`

```
Recipe List
  → Search bar → filter results in real-time
  → Filter chips (cuisine, time, difficulty)
  → Recipe Card click → Recipe Detail

Recipe Detail
  → Ingredients list
  → Step-by-step instructions
  → [Start Cooking] → Cooking Mode (F-05)
  → [Save to Meal Plan] → Meal Planner (F-06)
```

**Acceptance Criteria:**

- [ ] Recipe list renders grid of Recipe Cards (image, title, time, rating)
- [ ] Search filters by title (client-side, instant)
- [ ] Recipe Detail shows: hero image, ingredients, ordered steps, meta (time, servings, difficulty)
- [ ] "Start Cooking" button visible and navigates to Cooking Mode

---

### F-04: Chef Progress Dashboard

**Entry:** `/app/courses`
**Exit:** `/app/courses/:id` (Cooking Mode)

```
Dashboard (existing Stitch screen)
  → Skill progress rings
  → Recent activity feed
  → Recommended next course card → Course detail
```

**Acceptance Criteria:**

- [ ] Component matches CookFlow Stitch screen `93971e8dfbd8468281897eb181cfd268`
- [ ] Navigation to `/app/courses/:id` works from course cards
- [ ] Progress data renders (can be static/mock in Phase 4)

---

### F-05: Cooking Mode

**Entry:** `/app/courses/:id` via "Start Cooking"
**Exit:** `/app/courses` on completion or back nav

```
Full-screen step view
  → Large text step instruction
  → Timer (if step has duration)
  → [Previous] / [Next Step] controls
  → [Done] → back to Recipe Detail
```

**Acceptance Criteria:**

- [ ] Full-screen layout (no sidebar visible)
- [ ] Steps navigable forward/back
- [ ] Current step index shown (e.g. "Step 2 of 7")
- [ ] Timer starts automatically if step duration is set

---

### F-06: Meal Planning

**Entry:** `/app/meal-planner`
**Exit:** `/app/shopping-list`

```
Calendar week view
  → Day slot → [+ Add Meal] → Recipe picker modal
  → Recipe selected → added to day slot
  → [Generate Shopping List] → /app/shopping-list
```

**Acceptance Criteria:**

- [ ] Weekly calendar renders current week by default
- [ ] Each day has breakfast / lunch / dinner slots
- [ ] Recipe picker searches from Recipe List
- [ ] Shopping list auto-generates from all planned meals' ingredients

---

### F-07: Shopping List

**Entry:** `/app/shopping-list` (generated from meal plan or manual)
**Exit:** n/a (task completion)

```
Ingredient list grouped by category (Produce, Dairy, Meat…)
  → Checkbox each item
  → Checked items visually struck-through
  → [Clear Checked] action
```

**Acceptance Criteria:**

- [ ] Items grouped by ingredient category
- [ ] Check/uncheck persists in session
- [ ] "Clear Checked" removes completed items
- [ ] Manual add item input works

---

### F-08: Chef / Community

**Entry:** `/app/chefs` or `/app/community`
**Exit:** `/app/chef/:id`

```
Chef List → Chef cards (avatar, name, specialty)
  → Chef Profile → bio, courses, recipes
  → [Follow] action (Phase 5)

Community → Feed of activity from followed chefs
```

**Acceptance Criteria:**

- [ ] Chef List renders grid of chef cards
- [ ] Chef Profile matches Stitch screen `b3ca8b80b0204ba3b16b301622a38d98`
- [ ] Back navigation works

---

### F-09: Settings

**Entry:** `/app/settings`
**Exit:** n/a

```
Tabs: Profile | Preferences | Credits | Account
  → Profile: edit name, avatar, bio
  → Preferences: units (metric/imperial), dietary tags
  → Credits: top-up packs, unlock spending actions, entitlement status
  → Account: change password, sign out, delete account
```

**Acceptance Criteria:**

- [ ] Profile edits save via Better Auth `updateUser`
- [ ] Credits section shows current balance and unlock status
- [ ] Settings page matches Stitch screen `26df72df12e3470cb91aa0e5e9263b68`

---

## Feature Slices (Prioritised Backlog)

| #   | Feature                                             | Phase | Blocked by    |
| --- | --------------------------------------------------- | ----- | ------------- |
| 1   | Auth end-to-end (sign-in, sign-up, session, guards) | 1     | —             |
| 2   | DashboardLayout (sidebar, header)                   | 1     | —             |
| 3   | Chef Progress Dashboard page                        | 2     | Layout        |
| 4   | Recipe List page + search                           | 2     | Layout        |
| 5   | Recipe Detail page                                  | 2     | Recipe List   |
| 6   | Cooking Mode                                        | 2     | Recipe Detail |
| 7   | Meal Planner page                                   | 3     | Recipe List   |
| 8   | Shopping List page                                  | 3     | Meal Planner  |
| 9   | Chef List + Chef Profile pages                      | 4     | Layout        |
| 10  | Community page                                      | 4     | Layout        |
| 11  | Settings page                                       | 5     | Auth          |
| 12  | Credit wallet flow                                 | 5     | Settings      |

---

## Screen → Page Mapping

| Stitch Screen                 | Screen ID                          | Target Page              | Status      |
| ----------------------------- | ---------------------------------- | ------------------------ | ----------- |
| CookFlow Premium Landing Page | `9fbd9b6dd3cb49e6a14beec2b143b13c` | `/`                      | Implemented |
| Chef Progress Dashboard       | `93971e8dfbd8468281897eb181cfd268` | `/app/courses`           | Stub        |
| Culinary Skills Gallery       | `2c11bdacdcc34c46a161824c55eefa9d` | `/app/courses`           | Stub        |
| Course Lesson Interface       | `9e92136d6c0342a8a20d0a3ac6926fcd` | `/app/courses/:id`       | Stub        |
| Public Chef Profile           | `b3ca8b80b0204ba3b16b301622a38d98` | `/app/chef/:id`          | Stub        |
| Credit Wallet Pack v1         | `be63158a3b2043de8839a3ed21c499d0` | `/app/settings`          | Partial     |
| Credit Wallet Pack v2         | `e647d17644ae4dd083a94ca14968e6dd` | `/` (Membership section) | Partial     |
| Premium Settings Page         | `26df72df12e3470cb91aa0e5e9263b68` | `/app/settings`          | Stub        |
| Home Dashboard                | _(not yet generated)_              | `/app`                   | Missing     |
| Recipe List                   | _(not yet generated)_              | `/app/recipes`           | Missing     |
| Recipe Detail                 | _(not yet generated)_              | `/app/recipes/:id`       | Missing     |
| Meal Planner                  | _(not yet generated)_              | `/app/meal-planner`      | Missing     |
| Shopping List                 | _(not yet generated)_              | `/app/shopping-list`     | Missing     |
