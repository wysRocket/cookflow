# Design System: Cookflow

**Project ID:** projects/889224776793372108

## 1. Visual Theme & Atmosphere

**Dark, Premium, Culinary**
The design feels sophisticated and immersive, like a professional kitchen at night. It uses a dark slate foundation with teal and gold accents, generous whitespace, and strong typographic hierarchy. The atmosphere is expert, confident, and inspiring.

## 2. Color Palette & Roles

- **Primary Action (Culinary Teal):** `#14b8a6` — Primary buttons, active nav states, CTAs, interactive highlights. Hover: `#0d9488`.
- **Accent/Secondary (Heritage Gold):** `#D4AF37` — Badges, secondary buttons, star ratings, achievement markers. Hover: `#c9a227`.
- **Background (Deep Slate):** `#0F172A` — Page backgrounds, full-screen overlays.
- **Surface/Card:** `#1E293B` — Cards, modals, panels, sidebars.
- **Border/Divider:** `#334155` — Card borders, input borders, dividers.
- **Text Primary:** `#F1F5F9` — Headings, body text, labels.
- **Text Secondary (Ash):** `#94A3B8` — Captions, subtext, placeholders.
- **Text Dimmer:** `#64748B` — Timestamps, metadata, inactive states.

## 3. Typography Rules

- **Font Family:** 'Inter', system-ui, sans-serif. Serif headings: 'Playfair Display'.
- **Headings:** Bold weight (700), tight letter-spacing (-0.02em).
- **Body:** Regular weight (400), readable line-height (1.5).
- **Labels/Badges:** Medium weight (500–600), uppercase, wide letter-spacing (tracking-widest).

## 4. Component Stylings

- **Buttons (Primary):** `bg-[#14b8a6] text-white rounded-full px-6 py-2.5 font-bold hover:bg-[#0d9488]`.
- **Buttons (Secondary/Outline):** `border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37]/10`.
- **Cards:** `bg-[#1E293B] border border-[#334155] rounded-2xl`. Hover: `hover:border-[#14b8a6]/40`.
- **Inputs:** `bg-[#1E293B] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:border-[#14b8a6]`.
- **Progress/XP bars:** Gradient `from-[#14b8a6] to-[#D4AF37]`.

## 5. Layout Principles

- **Whitespace:** Generous padding (p-6, p-8) to avoid clutter.
- **Grid:** Responsive 3-column grid for content, 1-col on mobile.
- **Navigation:** Sticky DashboardLayout header with teal active-link underline.
- **Full-screen overlays:** `fixed inset-0 z-50 bg-[#0F172A]` (e.g., CookingMode).
