---
page: settings
---
CookFlow Settings Page — user profile, preferences, and subscription management. Dark mode. Background #0F172A.

Standard DashboardLayout (no override). max-w-3xl mx-auto.

HEADER: "Settings" text-3xl font-bold #F1F5F9. Subtext: "Manage your profile and preferences" text-sm #94A3B8.

TABS (horizontal pill row): Profile | Preferences | Subscription | Account. Active tab: #F97316 bg rounded-full text-white. Inactive: #1E293B border #334155 #94A3B8.

TAB: PROFILE
- Avatar section: circular avatar 80px (pravatar placeholder), "Change Photo" button #84CC16 text-sm.
- Form fields (each: label #64748B text-xs uppercase tracking-widest, input #1E293B border #334155 rounded-xl px-4 py-3 text-[#F1F5F9]):
  - Display Name
  - Email (read-only, slightly dimmed)
  - Bio (textarea 3 rows)
- Save button: #F97316 bg rounded-full px-6 py-2.5 font-bold.

TAB: PREFERENCES
- Units toggle: "Metric" | "Imperial" — pill-style toggle, active #F97316.
- Dietary tags: multi-select chips (Vegetarian, Vegan, Gluten-Free, Dairy-Free, Nut-Free, Halal, Kosher). Selected: #F97316/20 border #F97316/40 text-[#F97316]. Unselected: #1E293B border #334155 #94A3B8.
- Weekly email digest toggle: switch component, orange when on.
- Cooking difficulty default: Easy / Medium / Hard dropdown.

TAB: SUBSCRIPTION
- Current plan card: #1E293B border #334155 rounded-2xl p-6. "Free Plan" label. Feature comparison: 3 bullet points of what's included.
- Upgrade CTA card: gradient bg from #F97316/20 to #84CC16/10 border #F97316/30 rounded-2xl p-6. "Pro Plan — $12/mo" heading #F1F5F9 text-xl font-bold. 5 feature bullets. "Upgrade Now" button #F97316 bg rounded-full px-8 py-3 font-bold.

TAB: ACCOUNT
- "Change Password" section: current password + new password fields + confirm.
- Danger zone: red-400 border/text. "Sign Out" button (outline red). "Delete Account" button (outline red, requires confirmation).

**DESIGN SYSTEM (REQUIRED):**
## 1. Visual Theme
Dark mode. Background #0F172A. All cards #1E293B border #334155.

## 2. Colors
Primary #F97316 | Accent #84CC16 | Surface #1E293B | Border #334155 | Text #F1F5F9 | Muted #94A3B8

## 3. Typography
Inter. Labels: text-xs uppercase tracking-widest. Inputs: text-sm #F1F5F9. Headings: font-bold.

## 4. Components
Buttons: rounded-full. Cards: rounded-2xl border #334155. Inputs: rounded-xl border #334155 focus:border-[#F97316].
