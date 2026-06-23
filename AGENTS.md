# AGENTS.md

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (lint + typecheck + build)
npm run start      # serve production build
npm run lint       # ESLint
```

## Architecture

- **Stack:** Next.js 15 (App Router), Tailwind CSS v4, React 19
- **CSS:** Tailwind v4 with CSS custom properties for theming (`var(--accent)`, `var(--background)`, etc.). Dark mode via `.dark` class toggled on `<html>`. No `tailwind.config` — Tailwind v4 is configured via CSS `@import "tailwindcss"` with `@custom-variant dark`.
- **State:** React Context (`src/lib/store.js`) for cart, wishlist, search, and theme. Persisted to `localStorage`.
- **Data:** Static mock data in `src/lib/data.js` (16 products, 6 reviews, 8 brands, 5 categories). No API or database.
- **Images:** Uses `picsum.photos` seed URLs. Next.js `next/image` NOT used (standard `<img>` with `remotePatterns` in config).

## Key facts

- All pages use `"use client"` — this is a client-rendered SPA-like app.
- `useSearchParams()` requires `<Suspense>` boundary (Next.js 15 constraint). Done in `src/app/products/page.js`.
- Custom CSS variables defined in `globals.css`. Always use `var(--<name>)` for colors, never Tailwind color classes directly.
- No shadcn/ui CLI was used; Radix primitives are listed in package.json but not imported yet.
- No testing framework installed.

## Project structure

```
src/
  app/               # Next.js App Router pages
    layout.js        # Root layout with StoreProvider
    page.js          # Home page (hero, categories, best sellers, etc.)
    products/
      page.js        # Product listing with filters/sort
      [id]/page.js   # Product detail
    cart/page.js     # Cart with quantity controls
    checkout/page.js # Checkout form + order summary
    wishlist/page.js # Wishlist grid
    account/page.js  # Account tabs (profile, orders, addresses, wishlist)
  components/        # Reusable UI components
  lib/
    store.js         # React Context state management
    data.js          # Mock product/review/brand data
    utils.js         # cn() helper (clsx + tailwind-merge)
```
