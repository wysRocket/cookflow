# Compliance & UX Fixes — Design Spec
_Date: 2026-05-08_

## Overview

Address all compliance and UX inconsistencies raised in a formal review. Changes span legal
policy pages, checkout consent, credit-amount alignment, feature completeness, and
broken/misleading UI elements.

---

## 1. Legal Documents

### 1.1 New sections in LegalPage.tsx

Add two new `LegalSection` types: `"refund"` and `"complaints"`.

**Refund Policy content:**
- Eligibility: credits are non-refundable once consumed; unspent credits within 14 days of
  first purchase eligible for refund under EU consumer law on digital goods.
- Process: submit refund request to the contact email with order reference; response within
  5 business days.
- Exclusions: consumed credits, promotional/gifted credits.
- Chargebacks: warn that chargebacks may result in account suspension.

**Complaints Policy content:**
- Who can file: any registered user or prospective customer.
- Required information: name, email, account ID, description of issue, date of incident.
- SLA: acknowledgement within 2 business days; resolution within 15 business days.
- Escalation / appeal: if unsatisfied, user may escalate to the supervisory authority
  (Data Protection Commissioner or equivalent national authority).

### 1.2 Privacy Policy amendments (existing `privacy` section)

Add after existing §5 GDPR Rights:

- **§6 International Data Transfers** — Personal data is processed within the European
  Economic Area (EEA). Infrastructure providers (Firebase/Google Cloud, Stripe) are certified
  under the EU-US Data Privacy Framework and Standard Contractual Clauses; no transfers occur
  to third countries outside those safeguards.
- **§7 Complaints** — To log a complaint about how we handle your personal data, follow the
  procedure in our [Complaints Policy](/legal/complaints). You also have the right to lodge a
  complaint with your national supervisory authority.

### 1.3 Navigation updates

**LegalPage.tsx tabs:** extend the tab array from
`["about", "privacy", "terms", "vat"]` to
`["about", "privacy", "terms", "vat", "refund", "complaints"]`.

Display labels: `"refund"` → "Refund Policy", `"complaints"` → "Complaints Policy".

Also extend `descriptions` record to cover the two new sections.

**Footer.tsx Legal column:** add two new `<Link>` items:
- Refund Policy → `/legal/refund`
- Complaints Policy → `/legal/complaints`

---

## 2. Top-Up Credits Checkout Consent

### 2.1 Mandatory checkbox

In `Settings.tsx` inside `showTopUpModal`, insert a required checkbox immediately above the
"Proceed to Checkout" button.

**Checkbox label (inline links):**
> I have read and agree to the [Terms of Service](/legal/terms) and [Refund Policy](/legal/refund).

**Behaviour:**
- Introduce `const [tosAccepted, setTosAccepted] = useState(false)`.
- Reset to `false` whenever the modal is closed or re-opened (`setShowTopUpModal`).
- The "Proceed to Checkout" button is `disabled` when `!tosAccepted || isPaymentLoading`.
- Disabled visual: existing `disabled:opacity-60 disabled:cursor-not-allowed` already in
  place on the button — no extra styling needed.

---

## 3. Credit Amount Alignment

### 3.1 Membership.tsx credit bundles

The Settings modal rate is **100 credits = €1** (`exchangeRate = 100` for EUR).
Align homepage bundles to this rate and update feature bullets:

| Pack | Price | Credits (before) | Credits (after) |
|---|---|---|---|
| Starter | €4.99 | 50 | 500 |
| Pro | €14.99 | 200 | 1500 |
| Studio | €29.99 | 500 | 3000 |

Update feature bullets for each pack to reflect realistic spend at the new credit amounts
(e.g. "Starter — 500 credits, unlock ~5 recipes or 2 chef profiles").

---

## 4. Academy Section Alignment

### 4.1 Dashboard.tsx — add price + accurate lesson count

The `academyCourses` array in `Dashboard.tsx` currently has `details` (e.g. "27 details",
inconsistent) and no price. The `data.ts` `academyModules` array is the source of truth with
correct `lessons` and `price` fields.

Add `price` and fix `lessons` in each `academyCourses` entry by matching on title/id order
(ids are 1–16 matching academyModules 1–16, plus a few extras without a module equivalent
that get a sensible default).

Display on each Dashboard course card:
- Price badge: `€{price}` or `{price * 100} cr`
- Lesson count: `{lessons} Lessons` (replacing the "details" string)

### 4.2 AcademyGrid.tsx (homepage) — remove price display

The homepage cards currently show `€{module.price}` and `{module.price * 100} Credits`. Since
pricing at checkout is handled solely through the credits top-up flow (not per-course
purchase), remove the price/credits row from the homepage card bottom section to eliminate the
mismatch. Keep all other card content (level, lesson count, technique tip).

---

## 5. Chef Session — Remove from Spend Credits

Remove the `"chef"` entry from `CREDIT_ACTIONS` in `Settings.tsx`. The chef-booking service
has no described fulfilment path or contractor relationship documentation. The Chefs section
(browsing chef profiles) remains intact.

---

## 6. Careers Link — Remove from Footer

Remove the "Careers" list item from the Company section in `Footer.tsx`. No careers page or
contractor relationship is described on the site.

---

## 7. Community Comments

### 7.1 Current state
Comment counts on posts are hardcoded (up to 76) but clicking the comment button fires an
`alert("Comments section coming soon!")`. This misrepresents engagement.

### 7.2 Fix
Implement a minimal inline comment thread per post:

- Replace `alert(...)` with toggling a `commentsOpen` set (keyed by post id).
- When open, render a comment list and a reply input below the post actions row.
- New comment: appended to `post.comments` array (need to extend `Post.comments` from
  `number` to `{ id: number; author: string; content: string; time: string }[]`).
- Comment count displayed is `post.comments.length` (actual count, not a hardcoded number).
- Reset initial `INITIAL_POSTS` comment counts to `0` and `comments: []` (array, not number).
- The `normalizePost` function must be updated to handle both old (number) and new (array)
  shape for backwards compatibility with persisted Firestore state.
- Persisted via `saveUserAppData` (already wired).

---

## 8. AI Recipe — Align Cost, Add Saved Section, Add Notification

### 8.1 Cost alignment

`RecipeList.tsx` calls `spendCredits(1)`; `Settings.tsx` CREDIT_ACTIONS shows `cost: 50`.

Resolution: remove "Generate AI Recipe" from `CREDIT_ACTIONS` in `Settings.tsx` (the feature
lives on the Recipes page, not in the generic spend modal). Update `RecipeList.tsx` to charge
`50` credits.

### 8.2 Generation notification

Replace the `window.alert` with an in-page toast (reuse the existing toast pattern from
`Settings.tsx` or a local `useState` toast). Message:

> "50 credits charged — AI recipe saved to Saved Recipes."

If insufficient credits:
> "Not enough credits. Top up in Settings."

### 8.3 Saved Recipes section

Add a collapsible "Saved Recipes" section above the main recipe grid in `RecipeList.tsx`.

- State: `savedRecipes: GeneratedRecipe[]` — loaded/saved via `loadUserAppData /
  saveUserAppData` under key `"savedAiRecipes"`.
- `GeneratedRecipe` shape: `{ id: number; name: string; generatedAt: string; prompt?: string }`.
- Each generated recipe creates a stub entry (name = "AI Recipe — {date}", no real generation
  backend exists yet).
- Section is hidden when `savedRecipes.length === 0`.
- Each card shows the recipe name, date, and a "Remove" button.

---

## Files changed

| File | Change |
|---|---|
| `pages/LegalPage.tsx` | Add `refund`/`complaints` sections; amend Privacy Policy §6–7; extend tabs + descriptions |
| `pages/Settings.tsx` | Add `tosAccepted` checkbox in Top Up modal; remove `"chef"` from CREDIT_ACTIONS; remove `"ai"` from CREDIT_ACTIONS |
| `components/Membership.tsx` | Fix credit amounts to 500/1500/3000; update feature bullets |
| `components/Footer.tsx` | Add Refund Policy + Complaints Policy links; remove Careers link |
| `components/AcademyGrid.tsx` | Remove price/credits row from card bottom |
| `pages/Dashboard.tsx` | Add `price` + accurate `lessons` to each course; render on card |
| `pages/Community.tsx` | Implement inline comments; reset counts to 0; update Post type |
| `pages/RecipeList.tsx` | Charge 50 cr; toast notification; add Saved Recipes section |

---

## Out of scope

- Actual AI recipe generation backend
- Real chef booking fulfilment
- Payment gateway changes
- Courses content (step wording) — a separate content task
