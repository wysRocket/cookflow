# Compliance & UX Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address all compliance and UX review findings: add Refund/Complaints policies, amend Privacy Policy, add checkout consent checkbox, align credit amounts, fix Academy display, remove undocumented features, implement Community comments, and fix AI recipe flow.

**Architecture:** All changes are in the React frontend (Vite + TypeScript + Tailwind). No backend changes. Legal content is inline JSX in `LegalPage.tsx`. State persistence uses the existing `saveUserAppData`/`loadUserAppData` Firebase helper pattern already in use throughout the app.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, React Router v6, Firebase Firestore (via `lib/user-app-data` helper)

---

## File Map

| File | Change |
|---|---|
| `pages/LegalPage.tsx` | Add `refund`/`complaints` sections; amend Privacy §6–7; extend tabs + descriptions |
| `components/Footer.tsx` | Add Refund/Complaints links in Legal column; remove Careers link |
| `pages/Settings.tsx` | Add `tosAccepted` checkbox; remove `"chef"` and `"ai"` from `CREDIT_ACTIONS` |
| `components/Membership.tsx` | Fix credit amounts to 500/1500/3000 and update feature bullets |
| `components/AcademyGrid.tsx` | Remove price/credits row from homepage card bottom |
| `pages/Dashboard.tsx` | Add `price` + `lessons` to each course entry; render on card |
| `pages/Community.tsx` | Implement inline comments; reset counts; update `Post` type |
| `pages/RecipeList.tsx` | Charge 50 cr; toast notification; add Saved Recipes section |

---

## Task 1: Add Refund Policy and Complaints Policy to LegalPage.tsx

**Files:**
- Modify: `pages/LegalPage.tsx`

- [ ] **Step 1: Extend the `LegalSection` type**

  Replace line 7 in `pages/LegalPage.tsx`:
  ```ts
  // Before
  type LegalSection = "about" | "privacy" | "terms" | "vat";

  // After
  type LegalSection = "about" | "privacy" | "terms" | "vat" | "refund" | "complaints";
  ```

- [ ] **Step 2: Add `refund` entry to the `content` record**

  After the closing `}` of the `vat` entry (around line 188), add:
  ```tsx
  refund: {
    title: "Refund Policy",
    body: (
      <>
        <p>Last updated: May 8, 2026</p>
        <h3>1. Eligibility</h3>
        <p>
          Credits purchased through CookFlow are non-refundable once consumed
          against any feature, recipe, chef profile, or planner unlock. Unspent
          credits may be refunded within 14 days of the original purchase date, in
          accordance with EU consumer rights for digital goods (Directive
          2011/83/EU).
        </p>
        <h3>2. How to Request a Refund</h3>
        <p>
          Submit your request to{" "}
          <a href={`mailto:${companyInfo.contactEmail}`}>
            {companyInfo.contactEmail}
          </a>{" "}
          including: (a) your registered email address, (b) the order/invoice
          reference from your confirmation email, (c) the number of unspent
          credits you are requesting a refund for, and (d) the reason for the
          request.
        </p>
        <h3>3. Response SLA</h3>
        <p>
          We will acknowledge your request within 2 business days and issue a
          decision within 5 business days of acknowledgement. Approved refunds are
          processed within 7 business days via your original payment method.
        </p>
        <h3>4. Exclusions</h3>
        <p>The following are not eligible for refund:</p>
        <ul>
          <li>Credits that have been partially or fully consumed.</li>
          <li>Promotional or bonus credits granted outside a direct purchase.</li>
          <li>Credits whose 14-day eligibility window has expired.</li>
        </ul>
        <h3>5. Chargebacks</h3>
        <p>
          Initiating a chargeback before contacting us may result in temporary
          account suspension while the dispute is resolved. We encourage you to
          contact support first — most issues are resolved faster through our
          direct process.
        </p>
        <h3>6. Contact</h3>
        <p>
          {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
          {companyInfo.registrationNumber} · {companyDisplayAddress}
        </p>
      </>
    ),
  },
  ```

- [ ] **Step 3: Add `complaints` entry to the `content` record**

  After the `refund` entry closing `}`, add:
  ```tsx
  complaints: {
    title: "Complaints Policy",
    body: (
      <>
        <p>Last updated: May 8, 2026</p>
        <h3>1. Who Can File</h3>
        <p>
          Any registered CookFlow user, or any person whose personal data we
          process, may submit a complaint. You do not need to be a paying
          customer.
        </p>
        <h3>2. Required Information</h3>
        <p>A complete complaint must include:</p>
        <ul>
          <li>Your full name and registered email address.</li>
          <li>Your account ID (visible in Settings → Profile).</li>
          <li>A clear description of the issue or concern.</li>
          <li>The date(s) on which the issue occurred.</li>
          <li>Any supporting evidence (screenshots, transaction references).</li>
        </ul>
        <h3>3. How to Submit</h3>
        <p>
          Send your complaint to{" "}
          <a href={`mailto:${companyInfo.contactEmail}`}>
            {companyInfo.contactEmail}
          </a>{" "}
          with the subject line{" "}
          <em>"Formal Complaint — [brief topic]"</em>.
        </p>
        <h3>4. Review SLA</h3>
        <p>
          Acknowledgement: within 2 business days of receipt. Initial assessment:
          within 5 business days. Full resolution or escalation notice: within 15
          business days.
        </p>
        <h3>5. Appeals</h3>
        <p>
          If you are unsatisfied with our decision you may: (a) request an
          internal appeal within 14 days by replying to the resolution notice with
          your grounds — a senior team member will conclude the appeal within 10
          business days; or (b) escalate to your national data-protection
          supervisory authority for data-related complaints, or to your national
          consumer-protection authority for billing or service complaints.
        </p>
        <h3>6. Contact</h3>
        <p>
          {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
          {companyInfo.registrationNumber} · {companyDisplayAddress}
        </p>
      </>
    ),
  },
  ```

- [ ] **Step 4: Update the tab navigation array**

  Find the tab `<nav>` section (around line 232) and replace the array literal:
  ```tsx
  // Before
  {(["about", "privacy", "terms", "vat"] as LegalSection[]).map((s) => (

  // After
  {(["about", "privacy", "terms", "vat", "refund", "complaints"] as LegalSection[]).map((s) => (
  ```

- [ ] **Step 5: Update tab display labels**

  The existing label logic is a ternary chain. Replace it with a lookup object:
  ```tsx
  // Before (inside the map)
  {s === "about"
    ? "About"
    : s === "vat"
    ? "VAT Info"
    : s.charAt(0).toUpperCase() + s.slice(1)}

  // After
  {({
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    vat: "VAT Info",
    refund: "Refund Policy",
    complaints: "Complaints Policy",
  } as Record<LegalSection, string>)[s]}
  ```

- [ ] **Step 6: Update the `descriptions` record**

  After the existing `vat` description entry, add:
  ```ts
  refund:
    "Read CookFlow's refund policy, including eligibility, the request process, SLAs, and exclusions.",
  complaints:
    "Read CookFlow's complaints policy: who can file, required information, review SLAs, and how to appeal.",
  ```

  Also update the `section` guard in `LegalPage` body:
  ```ts
  // Before
  const section =
    (page as LegalSection) in content ? (page as LegalSection) : "privacy";

  // After — unchanged, already works via `in content`
  ```

- [ ] **Step 7: Verify**

  Run `npm run dev`. Navigate to `/legal/refund` and `/legal/complaints`. Both tabs should appear in the nav and render the correct policy text. Check that `/legal/privacy` tab still works.

- [ ] **Step 8: Commit**

  ```bash
  git add pages/LegalPage.tsx
  git commit -m "feat: add Refund Policy and Complaints Policy legal pages"
  ```

---

## Task 2: Amend Privacy Policy — §6 International Data Transfers + §7 Complaints

**Files:**
- Modify: `pages/LegalPage.tsx`

- [ ] **Step 1: Locate the `privacy` body in `content`**

  The privacy body closes with the `<h3>6. Contact</h3>` block (currently §6). That existing `<h3>6. Contact</h3>` block needs to be renumbered to §8 after we insert two new sections.

- [ ] **Step 2: Insert §6 and §7, renumber Contact to §8**

  Replace the block starting `<h3>5. GDPR Rights</h3>` through the end of the privacy body with:
  ```tsx
  <h3>5. GDPR Rights</h3>
  <p>
    If you are located in the EU/EEA, you have the right to access,
    rectify, port, or erase your personal data. Requests may be
    submitted through the CookFlow support channel referenced in your
    account area.
  </p>
  <h3>6. International Data Transfers</h3>
  <p>
    Your personal data is processed within the European Economic Area
    (EEA). Where we use infrastructure providers — including
    Firebase/Google Cloud for authentication and database services, and
    Stripe for payment processing — those providers are certified under
    the EU–US Data Privacy Framework and operate under Standard
    Contractual Clauses. No personal data is transferred to third
    countries outside those safeguards.
  </p>
  <h3>7. Complaints About Data Processing</h3>
  <p>
    To log a complaint about how we handle your personal data, follow
    the procedure set out in our{" "}
    <Link to="/legal/complaints">Complaints Policy</Link>. You also have
    the right to lodge a complaint directly with your national
    supervisory authority (for EU/EEA residents, the relevant Data
    Protection Authority for your country).
  </p>
  <h3>8. Contact</h3>
  <p>
    {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
    {companyInfo.registrationNumber} · {companyDisplayAddress}
  </p>
  ```

  Note: `Link` is already imported at the top of the file.

- [ ] **Step 3: Verify**

  Navigate to `/legal/privacy`. Sections §6 and §7 should appear between GDPR Rights and Contact. The link to `/legal/complaints` should navigate to the Complaints Policy tab.

- [ ] **Step 4: Commit**

  ```bash
  git add pages/LegalPage.tsx
  git commit -m "feat: amend Privacy Policy with data transfers and complaints procedure"
  ```

---

## Task 3: Footer — Add Refund/Complaints Links, Remove Careers

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Update the Legal column links**

  Find the Legal `<ul>` (starts around line 122). Replace the entire `<ul>` content:
  ```tsx
  // Before
  <ul className="space-y-2 text-sm text-gray-400">
    <li>
      <Link to="/legal/privacy" className="hover:text-[#14b8a6] transition-colors">
        Privacy
      </Link>
    </li>
    <li>
      <Link to="/legal/terms" className="hover:text-[#14b8a6] transition-colors">
        Terms
      </Link>
    </li>
    <li>
      <Link to="/legal/vat" className="hover:text-[#14b8a6] transition-colors">
        VAT Info
      </Link>
    </li>
  </ul>

  // After
  <ul className="space-y-2 text-sm text-gray-400">
    <li>
      <Link to="/legal/privacy" className="hover:text-[#14b8a6] transition-colors">
        Privacy
      </Link>
    </li>
    <li>
      <Link to="/legal/terms" className="hover:text-[#14b8a6] transition-colors">
        Terms
      </Link>
    </li>
    <li>
      <Link to="/legal/refund" className="hover:text-[#14b8a6] transition-colors">
        Refund Policy
      </Link>
    </li>
    <li>
      <Link to="/legal/complaints" className="hover:text-[#14b8a6] transition-colors">
        Complaints Policy
      </Link>
    </li>
    <li>
      <Link to="/legal/vat" className="hover:text-[#14b8a6] transition-colors">
        VAT Info
      </Link>
    </li>
  </ul>
  ```

- [ ] **Step 2: Remove the Careers list item from the Company column**

  Find the Company `<ul>` (around line 92). Remove the Careers `<li>`:
  ```tsx
  // Remove this block entirely:
  <li>
    <Link
      to="/auth/sign-up"
      className="hover:text-[#14b8a6] transition-colors"
    >
      Careers
    </Link>
  </li>
  ```

- [ ] **Step 3: Verify**

  On the landing page footer, confirm: Careers link is gone; Legal column shows Privacy, Terms, Refund Policy, Complaints Policy, VAT Info; all links navigate correctly.

- [ ] **Step 4: Commit**

  ```bash
  git add components/Footer.tsx
  git commit -m "feat: add Refund/Complaints footer links, remove Careers link"
  ```

---

## Task 4: Top-Up Credits — Mandatory ToS/Refund Checkbox

**Files:**
- Modify: `pages/Settings.tsx`

- [ ] **Step 1: Add `tosAccepted` state**

  After the `isPaymentLoading` state declaration (around line 82), add:
  ```ts
  const [tosAccepted, setTosAccepted] = useState(false);
  ```

- [ ] **Step 2: Reset checkbox when modal closes**

  After the `isPaymentLoading` state, add a `useEffect`:
  ```ts
  useEffect(() => {
    if (!showTopUpModal) setTosAccepted(false);
  }, [showTopUpModal]);
  ```

- [ ] **Step 3: Add the checkbox UI above the Proceed button**

  Find the "Proceed to Checkout" `<button>` (around line 438). Immediately before it, insert:
  ```tsx
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={tosAccepted}
      onChange={(e) => setTosAccepted(e.target.checked)}
      className="mt-1 h-4 w-4 rounded accent-[#0EA5C6] flex-shrink-0 cursor-pointer"
    />
    <span className="text-xs text-[#8AA0C5] leading-5">
      I have read and agree to the{" "}
      <a
        href="/legal/terms"
        target="_blank"
        rel="noreferrer"
        className="text-[#35D2F1] underline hover:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="/legal/refund"
        target="_blank"
        rel="noreferrer"
        className="text-[#35D2F1] underline hover:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        Refund Policy
      </a>
      .
    </span>
  </label>
  ```

- [ ] **Step 4: Disable Proceed button when unchecked**

  Update the button's `disabled` prop:
  ```tsx
  // Before
  disabled={isPaymentLoading}

  // After
  disabled={!tosAccepted || isPaymentLoading}
  ```

- [ ] **Step 5: Verify**

  Open Settings → Add Credits. The checkbox appears above the button. The button is greyed out until the checkbox is ticked. Ticking the checkbox enables the button. Closing and reopening the modal resets the checkbox to unchecked.

- [ ] **Step 6: Commit**

  ```bash
  git add pages/Settings.tsx
  git commit -m "feat: add mandatory ToS/Refund Policy consent checkbox to Top Up modal"
  ```

---

## Task 5: Align Homepage Credit Bundles to Settings Modal Rate

**Files:**
- Modify: `components/Membership.tsx`

- [ ] **Step 1: Update the `creditBundles` array**

  The Settings modal rate is 100 credits = €1. Replace the three bundle objects:
  ```tsx
  const creditBundles = [
    {
      name: "Starter Pack",
      price: 4.99,
      credits: 500,
      features: [
        "500 credits — unlock ~5 recipes",
        "or top up your chef profile views",
        "Great for first-time cooks",
        "No subscription required",
      ],
      color: "border-white/20",
      btn: "bg-white/10 text-white hover:bg-white/20",
      to: "/app/settings",
    },
    {
      name: "Pro Pack",
      price: 14.99,
      credits: 1500,
      features: [
        "1500 credits — unlock recipes and chefs",
        "Includes planner month unlock (100 cr)",
        "Best value for active learners",
        "No recurring billing",
      ],
      popular: true,
      color: "border-sage/50",
      btn: "bg-[#14b8a6] text-obsidian hover:bg-emerald-300",
      to: "/app/settings",
    },
    {
      name: "Studio Pack",
      price: 29.99,
      credits: 3000,
      features: [
        "3000 credits — maximum reserve",
        "Batch unlocks for deep learning",
        "Multiple planner month extensions",
        "No lock-in, pay as you go",
      ],
      color: "border-gold/50",
      btn: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90",
      to: "/app/settings",
    },
  ];
  ```

- [ ] **Step 2: Verify**

  On the landing page `#members` section, each pack should now show: Starter 500 cr, Pro 1500 cr, Studio 3000 cr. Clicking "Buy Credits" still navigates to `/app/settings`.

- [ ] **Step 3: Commit**

  ```bash
  git add components/Membership.tsx
  git commit -m "fix: align homepage credit bundle amounts to 100 cr/EUR rate"
  ```

---

## Task 6: Remove Price Display from Homepage Academy Cards

**Files:**
- Modify: `components/AcademyGrid.tsx`

- [ ] **Step 1: Remove the price/credits row from `AcademyCard`**

  Find the price block inside the card (around lines 171–179):
  ```tsx
  // Remove this entire block:
  <div className="flex items-center justify-between border-t border-white/20 pt-4 backdrop-blur-sm bg-black/20 rounded px-2 -mx-2">
    <div className="flex flex-col">
      <span className="text-xl font-bold text-white">
        €{module.price}
      </span>
      <span className="text-[10px] text-[#14b8a6] font-bold tracking-wider uppercase">
        or {module.price * 100} Credits
      </span>
    </div>
    <span className="text-xs text-gray-300">Full Access</span>
  </div>
  ```

- [ ] **Step 2: Verify**

  On the landing page Academy section, course cards no longer show a price. The level, lesson count, and technique tip are still visible.

- [ ] **Step 3: Commit**

  ```bash
  git add components/AcademyGrid.tsx
  git commit -m "fix: remove price display from homepage Academy cards"
  ```

---

## Task 7: Add Price + Lesson Count to Logged-In Courses Page

**Files:**
- Modify: `pages/Dashboard.tsx`

- [ ] **Step 1: Update the `academyCourses` type and data**

  The `academyCourses` array currently has `details: string` (e.g. `"27 details"`). Replace the entire `academyCourses` array with one that has `price: number` and `lessons: number` matching `data.ts` `academyModules`:

  ```ts
  const academyCourses = [
    { id: 1,  title: "Modern Pastry",              instructor: "PARIS",        timeAgo: "3 weeks ago",  lessons: 12, price: 49,  image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80" },
    { id: 2,  title: "Artisan Pasta",              instructor: "ROME",         timeAgo: "1 month ago",  lessons: 10, price: 55,  image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80" },
    { id: 3,  title: "Molecular Tapas",            instructor: "SAN SEBASTIAN",timeAgo: "2 weeks ago",  lessons: 15, price: 79,  image: "https://images.unsplash.com/photo-1773333155314-cbfb5f6d4dba?q=80&w=1470&auto=format&fit=crop" },
    { id: 4,  title: "New Nordic Fermentation",    instructor: "COPENHAGEN",   timeAgo: "5 weeks ago",  lessons: 8,  price: 45,  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop" },
    { id: 5,  title: "Seafood Butchery",           instructor: "MARSEILLE",    timeAgo: "4 weeks ago",  lessons: 14, price: 65,  image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80" },
    { id: 6,  title: "Oenology & Pairing",         instructor: "BORDEAUX",     timeAgo: "6 weeks ago",  lessons: 6,  price: 39,  image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80" },
    { id: 7,  title: "Plant-Based Molecular",      instructor: "BERLIN",       timeAgo: "1 month ago",  lessons: 11, price: 44,  image: "https://images.unsplash.com/photo-1671437361711-1d78e0546583?q=80&w=1470&auto=format&fit=crop" },
    { id: 8,  title: "The New Mother Sauces",      instructor: "LYON",         timeAgo: "2 weeks ago",  lessons: 18, price: 89,  image: "https://images.unsplash.com/photo-1551437424-8d2ccf214a19?q=80&w=1470&auto=format&fit=crop" },
    { id: 9,  title: "Architectural Desserts",     instructor: "VIENNA",       timeAgo: "5 weeks ago",  lessons: 9,  price: 52,  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" },
    { id: 10, title: "Japanese Knife Mastery",     instructor: "TOKYO",        timeAgo: "3 weeks ago",  lessons: 16, price: 95,  image: "https://images.unsplash.com/photo-1591831616711-bcc70b017abb?q=80&w=774&auto=format&fit=crop" },
    { id: 11, title: "Meze & Live-Fire Cooking",   instructor: "ISTANBUL",     timeAgo: "1 month ago",  lessons: 10, price: 48,  image: "https://images.unsplash.com/photo-1664463761167-ad704d263da6?q=80&w=774&auto=format&fit=crop" },
    { id: 12, title: "Spice Alchemy",              instructor: "MARRAKECH",    timeAgo: "6 weeks ago",  lessons: 8,  price: 42,  image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" },
    { id: 13, title: "Mole & Masa",                instructor: "MEXICO CITY",  timeAgo: "2 months ago", lessons: 14, price: 72,  image: "https://images.unsplash.com/photo-1625167473766-a0cda0257d9c?q=80&w=774&auto=format&fit=crop" },
    { id: 14, title: "Dim Sum Architecture",       instructor: "SHANGHAI",     timeAgo: "4 weeks ago",  lessons: 12, price: 58,  image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80" },
    { id: 15, title: "Ceviche & Citrus Chemistry", instructor: "LIMA",         timeAgo: "3 weeks ago",  lessons: 11, price: 67,  image: "https://images.unsplash.com/photo-1619221881833-5e5aeff458fd?q=80&w=774&auto=format&fit=crop" },
    { id: 16, title: "Thai Curry Science",         instructor: "BANGKOK",      timeAgo: "5 weeks ago",  lessons: 9,  price: 46,  image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80" },
    { id: 17, title: "Smoke & Char Mastery",       instructor: "OAXACA",       timeAgo: "1 week ago",   lessons: 13, price: 74,  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },
  ];
  ```

- [ ] **Step 2: Update the card render to show price and lesson count**

  Find the card body `<div className="p-5">` block. Replace:
  ```tsx
  // Before
  <p className="text-xs text-[#64748B]">
    {course.timeAgo} • {course.details}
  </p>

  // After
  <div className="flex items-center justify-between mt-2">
    <p className="text-xs text-[#64748B]">
      {course.timeAgo} · {course.lessons} Lessons
    </p>
    <span className="text-xs font-bold text-[#14b8a6]">
      €{course.price}
    </span>
  </div>
  ```

- [ ] **Step 3: Update the `filteredCourses` filter to use the new fields**

  The filter currently checks `course.title` and `course.instructor` — those fields haven't changed. No update needed.

- [ ] **Step 4: Verify**

  Navigate to `/app/courses`. Each card shows the correct lesson count (matches homepage) and a teal price badge. No `undefined` values.

- [ ] **Step 5: Commit**

  ```bash
  git add pages/Dashboard.tsx
  git commit -m "fix: add accurate lesson count and price to Courses page cards"
  ```

---

## Task 8: Remove Chef Session and AI Recipe from Spend Credits Modal

**Files:**
- Modify: `pages/Settings.tsx`

- [ ] **Step 1: Remove `"chef"` and `"ai"` from `CREDIT_ACTIONS`**

  Replace the full `CREDIT_ACTIONS` constant:
  ```ts
  // Before
  const CREDIT_ACTIONS = [
    {
      key: "planner",
      title: "Unlock Meal Planner",
      subtitle: "30-day access",
      cost: 100,
      icon: "calendar_month",
    },
    {
      key: "ai",
      title: "Generate AI Recipe",
      subtitle: "One generation",
      cost: 50,
      icon: "auto_awesome",
    },
    {
      key: "chef",
      title: "Book Chef Session",
      subtitle: "30-minute slot",
      cost: 150,
      icon: "video_camera_front",
    },
  ] as const;

  // After
  const CREDIT_ACTIONS = [
    {
      key: "planner",
      title: "Unlock Meal Planner",
      subtitle: "30-day access",
      cost: 100,
      icon: "calendar_month",
    },
  ] as const;
  ```

- [ ] **Step 2: Remove the now-unreachable `if (actionKey === "ai")` and `if (actionKey === "chef")` lines from `handleSpendAction`**

  The `handleSpendAction` function currently has:
  ```ts
  if (actionKey === "ai") showToast("AI recipe generation started.");
  if (actionKey === "chef") showToast("Chef session request submitted.");
  ```

  Remove both lines. The function after the `spendCredits` call will just be:
  ```ts
  const ok = spendCredits(cost);
  if (!ok) {
    showToast("Not enough credits.");
    return;
  }
  setShowSpendModal(false);
  ```

- [ ] **Step 3: Verify**

  Open Settings → Spend Credits. Only "Unlock Meal Planner" is shown. No chef or AI options.

- [ ] **Step 4: Commit**

  ```bash
  git add pages/Settings.tsx
  git commit -m "fix: remove undocumented Chef Session and AI Recipe from Spend Credits modal"
  ```

---

## Task 9: Implement Inline Community Comments

**Files:**
- Modify: `pages/Community.tsx`

- [ ] **Step 1: Add `CommentItem` interface and update `Post` type**

  At the top of the file, after the existing imports, add the `CommentItem` interface and update `Post`:
  ```ts
  interface CommentItem {
    id: number;
    author: string;
    content: string;
    time: string;
  }

  interface Post {
    id: number;
    author: string;
    avatar: string;
    role: string;
    time: string;
    content: string;
    image?: string;
    tags: string[];
    likes: number;
    comments: CommentItem[];
    liked: boolean;
    bookmarked: boolean;
  }
  ```

- [ ] **Step 2: Update `INITIAL_POSTS` to use `comments: []`**

  Every post in `INITIAL_POSTS` currently has `comments: <number>`. Replace every
  `comments: <number>` with `comments: []`. There are 24 posts — do a find-and-replace
  in the file for the pattern `comments: \d+` → `comments: []`.

  Example (first post):
  ```ts
  // Before
  comments: 34,

  // After
  comments: [],
  ```

- [ ] **Step 3: Update `normalizePost` to handle both old (number) and new (array) shapes**

  The existing `normalizePost` reads `comments` as a number. Replace that section:
  ```ts
  // Before (inside normalizePost)
  const comments = Number(post.comments);
  // ...
  comments: Number.isFinite(comments) ? Math.max(0, Math.round(comments)) : 0,

  // After (inside normalizePost)
  const rawComments = post.comments;
  const comments: CommentItem[] = Array.isArray(rawComments)
    ? rawComments
        .map((c: unknown): CommentItem | null => {
          if (!c || typeof c !== "object") return null;
          const ci = c as Partial<CommentItem>;
          if (
            typeof ci.id !== "number" ||
            typeof ci.author !== "string" ||
            typeof ci.content !== "string" ||
            typeof ci.time !== "string"
          )
            return null;
          return { id: ci.id, author: ci.author, content: ci.content, time: ci.time };
        })
        .filter((c): c is CommentItem => c !== null)
    : [];
  // ...
  comments,
  ```

  Also remove the old `const comments = Number(post.comments);` line that was previously
  there — it is replaced by the `rawComments` block above. Leave the `const likes = Number(post.likes);`
  line and all `likes` logic untouched.

- [ ] **Step 4: Remove unused `replyingTo` / `replyContent` state**

  Community.tsx has two state variables that are now superseded by the new comment system.
  Remove these lines:
  ```ts
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  ```

- [ ] **Step 5: Add comment UI state**

  Inside `Community` component, after existing state declarations:
  ```ts
  const [openComments, setOpenComments] = useState<Set<number>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  ```

- [ ] **Step 6: Add helper functions for comments**

  After existing handler functions:
  ```ts
  const toggleComments = (id: number) => {
    setOpenComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submitComment = (postId: number) => {
    const content = (commentInputs[postId] ?? "").trim();
    if (!content) return;
    const newComment: CommentItem = {
      id: Date.now(),
      author: "You",
      content,
      time: "Just now",
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id !== postId
          ? p
          : { ...p, comments: [newComment, ...p.comments] },
      ),
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };
  ```

- [ ] **Step 7: Update the comment button and add inline comment thread**

  Find the comment button in the post actions row:
  ```tsx
  // Before
  <button
    onClick={() => alert("Comments section coming soon!")}
    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[#64748B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
  >
    <MessageCircle className="w-4 h-4" />
    {post.comments}
  </button>

  // After
  <button
    onClick={() => toggleComments(post.id)}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors ${
      openComments.has(post.id)
        ? "text-[#D4AF37] bg-[#D4AF37]/10"
        : "text-[#64748B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
    }`}
  >
    <MessageCircle className="w-4 h-4" />
    {post.comments.length}
  </button>
  ```

  Then, after the closing `</div>` of the actions row, and still inside the post card `<div>`, add the collapsible comment section:
  ```tsx
  {openComments.has(post.id) && (
    <div className="border-t border-[#334155] pt-4 space-y-3">
      {post.comments.length === 0 && (
        <p className="text-xs text-[#475569] italic">No comments yet.</p>
      )}
      {post.comments.map((c) => (
        <div key={c.id} className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-[#334155] flex items-center justify-center text-[10px] text-[#94A3B8] flex-shrink-0 mt-0.5">
            {c.author[0]}
          </div>
          <div className="flex-1 bg-[#0F172A] rounded-xl px-3 py-2">
            <p className="text-xs font-semibold text-[#CBD5E1]">{c.author}</p>
            <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{c.content}</p>
            <p className="text-[10px] text-[#475569] mt-1">{c.time}</p>
          </div>
        </div>
      ))}
      <form
        onSubmit={(e) => { e.preventDefault(); submitComment(post.id); }}
        className="flex gap-2 items-center"
      >
        <input
          type="text"
          value={commentInputs[post.id] ?? ""}
          onChange={(e) =>
            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
          }
          placeholder="Add a comment…"
          className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-xs text-[#CBD5E1] placeholder-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors"
        />
        <button
          type="submit"
          disabled={!(commentInputs[post.id] ?? "").trim()}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-[#14b8a6] text-white hover:bg-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  )}
  ```

- [ ] **Step 8: Verify**

  Navigate to `/app/community`. All post comment counts show 0. Clicking the comment icon expands the thread. Typing in the input and pressing Post adds the comment to the thread. The count increments. The like/bookmark buttons still work. New posts work. Persists on page reload (via saveUserAppData).

- [ ] **Step 9: Commit**

  ```bash
  git add pages/Community.tsx
  git commit -m "feat: implement inline community comments with persistent state"
  ```

---

## Task 10: Fix AI Recipe — Align Cost, Saved Recipes Section, Toast Notification

**Files:**
- Modify: `pages/RecipeList.tsx`

- [ ] **Step 1: Add `GeneratedRecipe` interface**

  After the existing `Recipe` interface (around line 21):
  ```ts
  interface GeneratedRecipe {
    id: number;
    name: string;
    generatedAt: string;
  }
  ```

- [ ] **Step 2: Add `savedRecipes` state and persistence**

  After the existing `bookmarked` state declarations (around line 36):
  ```ts
  const [savedRecipes, setSavedRecipes] = useState<GeneratedRecipe[]>([]);
  const savedRecipesHydratedRef = useRef(false);
  ```

  After the existing `useEffect` that loads bookmarks, add a new `useEffect`:
  ```ts
  useEffect(() => {
    let cancelled = false;
    savedRecipesHydratedRef.current = false;

    const loadSavedRecipes = async () => {
      if (!user) {
        savedRecipesHydratedRef.current = true;
        return;
      }
      try {
        const saved = await loadUserAppData<{ savedAiRecipes?: unknown }>(
          user.uid,
          "savedAiRecipes",
        );
        if (cancelled) return;
        const items = Array.isArray(saved?.savedAiRecipes)
          ? (saved.savedAiRecipes as unknown[])
              .filter(
                (r): r is GeneratedRecipe =>
                  !!r &&
                  typeof r === "object" &&
                  typeof (r as GeneratedRecipe).id === "number" &&
                  typeof (r as GeneratedRecipe).name === "string" &&
                  typeof (r as GeneratedRecipe).generatedAt === "string",
              )
          : [];
        setSavedRecipes(items);
      } catch (error) {
        console.error("Failed to load saved AI recipes", error);
      } finally {
        if (!cancelled) savedRecipesHydratedRef.current = true;
      }
    };

    void loadSavedRecipes();
    return () => { cancelled = true; };
  }, [user]);
  ```

  After the existing `useEffect` that saves bookmarks, add a new `useEffect`:
  ```ts
  useEffect(() => {
    if (!user || !savedRecipesHydratedRef.current) return;
    const timer = window.setTimeout(() => {
      void saveUserAppData(user.uid, "savedAiRecipes", { savedAiRecipes: savedRecipes }).catch(
        (error) => {
          console.error("Failed to save AI recipes", error);
        },
      );
    }, 350);
    return () => window.clearTimeout(timer);
  }, [savedRecipes, user]);
  ```

- [ ] **Step 3: Add toast state**

  After the `savedRecipesHydratedRef` declaration:
  ```ts
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };
  ```

- [ ] **Step 4: Update `handleGenerateAiRecipe` — charge 50 cr, replace alert with toast**

  Replace the entire function:
  ```ts
  const handleGenerateAiRecipe = () => {
    if (!spendCredits(50)) {
      showToast("Not enough credits. Top up in Settings.");
      return;
    }
    const newRecipe: GeneratedRecipe = {
      id: Date.now(),
      name: `AI Recipe — ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
      generatedAt: new Date().toISOString(),
    };
    setSavedRecipes((prev) => [newRecipe, ...prev]);
    showToast("50 credits charged — AI recipe saved to Saved Recipes below.");
  };
  ```

- [ ] **Step 5: Add toast render at the top of the return JSX**

  At the very start of the `return (` block (before `<div className="space-y-6">`), add:
  ```tsx
  <>
    {toast && (
      <div className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl bg-[#1E293B] border border-[#14b8a6]">
        {toast}
      </div>
    )}
    <div className="space-y-6">
  ```

  And close with `</div></>` at the end.

- [ ] **Step 6: Add Saved Recipes section above the recipe grid**

  Between the filter bar `</div>` and the grid `{filtered.length === 0 ?`, insert:
  ```tsx
  {savedRecipes.length > 0 && (
    <div>
      <h2 className="text-lg font-bold text-[#F1F5F9] mb-3">Saved Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {savedRecipes.map((r) => (
          <div
            key={r.id}
            className="bg-[#1E293B] rounded-2xl border border-[#14b8a6]/30 p-4 flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#F1F5F9] truncate">{r.name}</p>
              <p className="text-xs text-[#64748B] mt-1">
                {new Date(r.generatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() =>
                setSavedRecipes((prev) => prev.filter((x) => x.id !== r.id))
              }
              className="text-[#475569] hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
              aria-label="Remove saved recipe"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
  ```

- [ ] **Step 7: Verify**

  Navigate to `/app/recipes`. The "Generate with AI" button now shows the current credit count. Clicking it charges 50 cr and shows a toast. The Saved Recipes section appears above the grid with the new entry. Clicking × removes the entry. Page refresh preserves saved recipes. If credits < 50, a "Not enough credits" toast appears and no recipe is saved.

- [ ] **Step 8: Commit**

  ```bash
  git add pages/RecipeList.tsx
  git commit -m "feat: align AI recipe cost to 50 cr, add Saved Recipes section and toast notification"
  ```

---

## Final Verification Checklist

- [ ] `/legal/refund` renders full Refund Policy with correct section headings
- [ ] `/legal/complaints` renders full Complaints Policy with correct section headings
- [ ] `/legal/privacy` shows §6 International Data Transfers and §7 Complaints
- [ ] Footer Legal column: Privacy, Terms, Refund Policy, Complaints Policy, VAT Info — no Careers
- [ ] Top Up Credits modal: checkbox required before Proceed button enables
- [ ] Checkbox resets on modal close/reopen
- [ ] Homepage credit bundles: 500 / 1500 / 3000 credits
- [ ] Homepage Academy cards: no price shown
- [ ] `/app/courses`: every card shows lesson count and `€` price
- [ ] Spend Credits modal: only Meal Planner option visible
- [ ] Community: comment button opens inline thread; count reflects actual comments; Post button adds comment
- [ ] `/app/recipes`: Generate AI Recipe charges 50 cr; toast appears; Saved Recipes section visible
- [ ] Insufficient credits shows correct toast in Recipes page
