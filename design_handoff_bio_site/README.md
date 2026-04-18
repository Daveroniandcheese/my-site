# Handoff: Personal bio site redesign (Dave)

## Overview
A polished, dark-first personal bio site for Dave — designer/developer in Milwaukee. Replaces the stock Next.js starter landing with a richer home page (hero + portrait, selected work, writing index, footer). Four aesthetic "vibes" (editorial / technical / warm / brutalist) are included as toggles in the prototype, but **only one ships** — the developer picks based on final direction (see "Pick a vibe" below).

## About the design files
The file `Dave.prototype.html` in this folder is a **single-file HTML design reference**, not production code. It is a working prototype showing layout, type, color, motion, and responsive behavior. Your job is to **recreate this design inside the existing Next.js codebase** at `my-site/` — not to ship the HTML.

The target codebase:
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4 (alpha)
- MDX-driven blog posts (`app/blog/posts/*.mdx`) and projects (`app/projects/projects/*.mdx`)
- Geist Sans + Geist Mono already wired via `geist/font`
- Vercel Analytics, Speed Insights, Microsoft Clarity

Keep the data layer (MDX loaders in `app/blog/utils.ts`, `app/projects/utils.ts`), the RSS route, sitemap, and OG route untouched. Replace **markup and styling** only.

## Fidelity
**High-fidelity.** Final colors, type, spacing, and motion are all specified. The prototype is pixel-accurate to the intended result. Recreate exactly, using Tailwind v4 utilities and CSS variables in `app/global.css`.

## Pick a vibe
The prototype ships four vibes. Ask Dave which one he chose, then implement that one only. Defaults to **technical** (mono-heavy, `// section` headers, accent `#d4ff3a`). Keep accent color as a CSS variable so it can be tweaked without a rebuild.

## Design tokens

Add to `app/global.css` under `:root` (or `@theme` in Tailwind v4):

```css
:root {
  /* Surfaces */
  --bg:          #0b0b0d;  /* page */
  --bg-soft:     #121216;
  --bg-card:     #141418;  /* peek preview, tweaks panel */

  /* Ink */
  --ink:         #ededef;  /* primary text */
  --ink-dim:     #9b9ba3;  /* secondary, bio body */
  --ink-faint:   #5a5a62;  /* meta, eyebrows, labels */

  /* Rules */
  --rule:        #1f1f25;  /* section dividers, row borders */
  --rule-strong: #2a2a32;  /* tag borders, peek border */

  /* Accent (tweakable) */
  --accent:      #d4ff3a;  /* acid green — default */
  --accent-ink:  #0b0b0d;  /* text ON accent */

  /* Fonts — add via next/font then expose as vars */
  --ff-sans:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --ff-mono:    'JetBrains Mono', ui-monospace, monospace;
  --ff-display: 'Fraunces', Georgia, serif; /* editorial/warm */
  /* For "technical" vibe, --ff-display switches to JetBrains Mono */
  /* For "brutalist", switches to Space Grotesk */
}
```

### Spacing scale used
4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 80 px. Stick to these. No half-steps.

### Type scale
| Token | Mobile | Desktop | Font | Weight | Tracking |
|---|---|---|---|---|---|
| Hero H1 | clamp(40px, 12vw, 84px) | 84px | Fraunces (display) | 400 | -0.03em |
| Section H2 | 28px | 32px | Fraunces italic | 400 | -0.02em |
| Work title | 19px | 22px | Fraunces | 400 | -0.01em |
| Body bio | 16px | 18px | Inter | 400 | 0 |
| Post title | 15px | 16px | Inter | 400 | -0.005em |
| Eyebrow / meta | 11px | 12px | JetBrains Mono uppercase | 400 | 0.10-0.12em |
| Tag chip | 10px | 10px | JetBrains Mono uppercase | 400 | 0.06em |
| Footer "Dave." | 44px | 56px | Fraunces italic | 400 | -0.02em |

All line-heights: 0.88–1.0 for display, 1.35 for titles, 1.55 for body.

### Fonts
Install via `next/font/google`:

```ts
// app/layout.tsx
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--ff-sans' })
const mono  = JetBrains_Mono({ subsets: ['latin'], variable: '--ff-mono' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--ff-display', axes: ['opsz'] })
```

Drop `GeistSans`/`GeistMono` from `layout.tsx` — replaced.

## Mobile-first behavior

Base styles target mobile (≤720px). `@media (min-width: 720px)` and `(min-width: 860px)` layer desktop on top. Touch targets are ≥44px on mobile (nav pills, footer links, list rows). On mobile the portrait drops **below** the hero text so the bio is above the fold. The floating nav pill in the top-right becomes inline at the top of the page on mobile.

Breakpoints used:
- `720px` — general mobile → tablet
- `860px` — hero + work list switch from stacked to multi-column

## Screens

### 1. Home (`app/page.tsx`)

Full-page layout, `max-width: 1240px`, centered, padding `20px` (mobile) / `40px` (desktop).

#### a. Top meta bar
Grid: `1fr auto` on mobile, `1fr auto 1fr` on desktop. Border-bottom `1px solid var(--rule)`.

- Left: "Dave Willey" — 17–18px, Fraunces 500, tracking -0.02em
- Right: pulsing green dot + "open to work" — JetBrains Mono 11–12px, `--ink-dim`. Dot is 7px circle, `var(--accent)` background, box-shadow `0 0 0 3px accent@25%`, animates `scale(1) → scale(1.15)` over 2.4s infinite.

#### b. Nav pill
On desktop (≥720px): `position: fixed; top: 32px; right: 40px`, `mix-blend-mode: difference`, rounded-full pills with 6×12px padding. Active item has a green dot before it.
On mobile: `position: static`, inline below top bar, pills have 10×14px padding, min-height 44px.

Items: `index` (active), `work`, `writing`, `rss`.

#### c. Hero
Grid: `1fr` mobile → `1fr 280px` desktop, 28/60px gap. Padding `16px 0 48px` mobile / `40px 0 80px` desktop.

Left column:
- Eyebrow: `<span>01</span> &nbsp; INDEX · MILWAUKEE, WI · EST. 2026` — the `01` is `color: var(--accent)`, rest is `var(--ink-faint)`.
- H1: "Designer & developer *making* things for the [web.]" — the word "making" is italic + `var(--ink-dim)`; "web." has an animated accent underline (3px bar, scaleX 0→1 over 0.8s, delay 0.9s after page load). Each line wrapped in a `reveal-line` span for the load-in animation (see Motion).
- Bio: two paragraphs, max-width 600px, 16–18px `var(--ink-dim)`. Bolded terms ("ecommerce UX", "SEO") are `var(--ink)` weight 500.
- Meta row: 3 items — `NOW Shipping a Shopify rebuild`, `LOC Milwaukee, WI · {live time} CT`, `AVAIL Q3 2026`. Mono 11–12px. Key is `--ink-faint`, value is `--ink-dim`. Live time = `Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit' })`, refreshed every 30s.

Right column — Portrait:
- `aspect-ratio: 4/5`, max-width 220px mobile / unconstrained desktop
- 1px border, 4px radius, gradient bg `#1a1a20 → #0f0f13`
- Four accent corner brackets (14×14px, 1px accent border, positioned at 8px inset, only two adjacent sides bordered)
- Inner SVG silhouette placeholder with dot pattern — replace with `/public/me.jpg` once Dave provides one. Keep the corner brackets as a stylistic frame around any image.
- Label "FIG. 01 — THE AUTHOR" in mono 10px `--ink-faint`, absolutely positioned 24px below the frame.

#### d. Selected work (`app/components/projects.tsx`)
Section: `border-top 1px solid var(--rule)`, padding 32/48px vertical.

Section head grid: `1fr` mobile → `180px 1fr` desktop.
- Left: eyebrow `02 SELECTED WORK` + H2 "Selected work" (Fraunces italic 28/32px)
- Right (desktop only, justify-end): description "A few recent builds. Mostly ecommerce, a bit of tooling, the rare unhinged side quest."

Work rows. Grid:
- Mobile: `36px 1fr 20px` — num, (title+tag+summary+year stacked), arrow
- Desktop (≥860px): `60px 1fr 180px 140px 24px` — num, (title+tag), summary, year, arrow

Each row:
- Border-top `1px solid var(--rule)`, last row gets border-bottom too
- Padding 18/24px
- Min-height 64px on mobile (tap target)
- Num: mono 10–11px `--ink-faint`, e.g. `001`
- Title: Fraunces 19/22px, line-height 1.2
- Tag chip: 1px `--rule-strong` border, 999px radius, 2×8px padding, mono 10px uppercase `--ink-dim`
- Summary: 13px `--ink-dim` line-height 1.4
- Year: mono 10–11px `--ink-faint` uppercase, e.g. `2026 — SHIPPED`
- Arrow: `↗` mono `--ink-faint`

Hover (desktop only via `@media (hover: hover)`): row background becomes `color-mix(in srgb, var(--accent) 5%, transparent)`, padding-left jumps 8→20px (smooth 0.3s), title turns accent, arrow translates `(3px, -3px)` and turns accent. `:active` mirrors hover for mobile tap feedback.

Data source: `getProjects()` in `app/projects/utils.ts`. Frontmatter shape (update MDX files):
```md
---
title: "Loam & Leaf"
summary: "Headless Shopify rebuild. 3× faster LCP, 40% lift in organic traffic."
tag: "Hydrogen"
year: 2026
status: "SHIPPED"   // or "LIVE" / "ARCHIVED"
publishedAt: "2026-03-01"
---
```

Below rows: pill-button "All projects ↗" — 1px border `--rule-strong`, 999px, mono 12px, 10×16px padding. Hover: border and text go accent.

#### e. Writing (`app/components/posts.tsx`)
Same section-head pattern. Description: "Notes from the build. The web, the kitchen, and whatever I'm currently overthinking."

Post rows. Grid:
- Mobile: `92px 1fr 20px` — date, title, arrow (num + read-time hidden)
- Desktop: `60px 120px 1fr 140px 24px` — num, date, title, read-time, arrow

Row:
- Border-top `--rule`, last border-bottom
- Padding 14/18px, min-height 56px mobile
- Date: mono 11–12px `--ink-dim`, `font-variant-numeric: tabular-nums`, format `MMM DD, YYYY` uppercase (e.g. `APR 18, 2026`)
- Title: Inter 15–16px `--ink`, line-height 1.35
- Read-time: mono 11px `--ink-faint` uppercase, right-aligned, e.g. `8 MIN READ`
- Hover/active: same pattern as work rows (accent bg + padding shift + title + arrow go accent)

Data: `getBlogPosts()`. Compute read-time from MDX word count / 200, round up. Add a `readTime` helper in `app/blog/utils.ts`.

Below rows: "Archive ↗" pill (same as All projects).

#### f. Footer (`app/components/footer.tsx`)
Grid: `1fr` mobile → `1fr 1fr` desktop, aligned end.

Left — Elsewhere list:
- Eyebrow "Elsewhere"
- Links: rss, github, linkedin, email — mono 13px `--ink-dim`, each 10px vertical padding (44px tap target) on mobile, 3px desktop. Leading `↗` icon. Hover: text → accent, arrow translates `(2px, -2px)`.

Right — Copyright block:
- Giant "Dave." wordmark: Fraunces italic 44/56px, `--ink`
- Below: `© 2026 · Milwaukee, WI` + `Built in public with opinions.` — mono 11/12px `--ink-faint`, line-height 1.8
- Text-align left on mobile, right on desktop

### 2. `/blog/[slug]` and `/projects/[slug]` detail pages
Keep the existing `components/mdx.tsx` renderer. Update `.prose` styles in `global.css` to match the new palette:
- Body `--ink-dim` 16–18px, line-height 1.7
- H1 Fraunces 44px, H2 Fraunces italic 32px
- Code blocks: `bg: var(--bg-soft)`, border `1px var(--rule)`, JetBrains Mono 14px
- Links: `color: var(--ink)`, underline with `decoration-color: var(--accent)`, 0.1em offset
- Prepend each post with an eyebrow (`DATE · READ-TIME`) and a "Back to writing ↗" link above the title.

### 3. `/blog` and `/projects` index pages
Same post-row / work-row components as the home page, un-limited. Add a small filter rail (tags for projects, years for blog) above the list — optional, only if Dave asks.

## Interactions & motion

All motion respects `prefers-reduced-motion: reduce` — wrap in that media query to zero out durations.

### Load-in (runs once, on page mount)
1. `requestAnimationFrame` → 80ms later add class `loaded` to `<body>`
2. `.reveal-line > span` elements translate Y from `105%` to `0` over 1s cubic-bezier(.2,.8,.2,1) — wrap each headline line in `<span class="reveal-line"><span>TEXT</span></span>`
3. `.stagger > *` children fade + lift 12px, staggered 100ms per child (delays 0.4s / 0.5s / 0.6s / 0.7s)
4. Accent underline on "web." scales X from 0 to 1 over 0.8s, 0.9s delay

### Scroll reveal
Use `IntersectionObserver` (threshold 0.15). Elements marked `.in-view` fade in + lift from 16px. Apply to section-heads, work-list, writing-list.

### Custom cursor (desktop only — `@media (hover: hover)`)
- Small dot (12×12px, `var(--accent)` bg, `mix-blend-mode: difference`) follows mouse instantly
- Larger ring (36×36px, 1px `--ink-dim` border) lerps toward mouse at `0.18` per frame via rAF
- On `:hover` of any `a` or `button`: ring grows to 80×80px, border becomes accent, bg `accent@8%`, 0.3s
- Hide on `mouseleave` of document
- Hide via `@media (hover: none)` for touch devices
- Toggle `body.has-cursor { cursor: none; }` while active

### Link peek-previews
On `mouseenter` of any `[data-peek]` element: show a floating 240px card positioned at the cursor (updates on `mousemove`), `translate(-50%, -110%) scale(1)` with 0.15s fade/scale. Card contains:
- 16:9 thumb: `linear-gradient(135deg, var(--accent) 0%, hsl(random, 40%, 25%) 100%)` + overlaid 12px grid pattern (swap for real OG images once ready — use the existing `/og` route)
- Title (13px `--ink` 500)
- Meta (10px mono uppercase `--ink-faint`), e.g. `APR 18, 2026 · 2 MIN`

Disable on touch.

### Hover animations on rows
See Work / Writing sections above.

## State management
- Theme: CSS variables only, no JS state
- Live time: `useEffect` with `setInterval` every 30s, Chicago timezone
- Cursor position: `useRef` + rAF, not React state
- In-view: `IntersectionObserver` in a `useEffect`

No global state, no context, no stores.

## Implementation file plan

Recreate inside `my-site/`:

```
app/
  layout.tsx                  # swap fonts to Inter + JetBrains Mono + Fraunces; dark-only html class
  global.css                  # replace Tailwind @imports + new CSS variables + .prose updates
  page.tsx                    # new hero + sections composition
  components/
    nav.tsx                   # fixed pill on desktop, inline on mobile, mix-blend-mode difference
    footer.tsx                # 2-col grid, "Dave." wordmark + elsewhere links
    top-meta.tsx              # NEW — name + "open to work" pulse
    eyebrow.tsx               # NEW — tiny mono uppercase label w/ accent index
    section-head.tsx          # NEW — shared eyebrow + H2 + desc pattern
    portrait.tsx              # NEW — aspect-4/5 frame with accent corners
    cursor.tsx                # NEW, "use client" — custom cursor + ring
    peek.tsx                  # NEW, "use client" — floating preview card w/ context
    reveal.tsx                # NEW, "use client" — load-in + IntersectionObserver wrapper
    posts.tsx                 # rewrite to new row layout
    projects.tsx              # rewrite to new row layout + tag/year metadata
```

Client-only pieces (`cursor.tsx`, `peek.tsx`, `reveal.tsx`) should be wrapped in dynamic imports with `ssr: false` to avoid hydration flashes.

## Assets
- No image assets yet. Portrait is an SVG placeholder — replace with `public/me.jpg` once Dave provides a photo. Keep the accent corner-bracket frame around it.
- No icons needed — the arrow `↗` is a Unicode character, not an SVG.
- Favicon: Dave hasn't provided one. Ask.

## Content to update before launch
- `layout.tsx` — `SITE_NAME`, `SITE_DESCRIPTION`
- `app/sitemap.ts` — real domain in `baseUrl`
- `app/blog/posts/hello-world.mdx` — real first post (or delete if not ready)
- `app/projects/projects/example-project.mdx` — real project (or delete)
- `app/components/footer.tsx` — GitHub / LinkedIn / email already present and correct

## Files in this bundle
- `Dave.prototype.html` — the full working design reference (all four vibes live; see `TWEAK_DEFAULS` at top of file to switch)
- `README.md` — this file

## Open questions for Dave
1. Which vibe? (editorial / technical / warm / brutalist — currently defaults to technical)
2. Final accent color? (acid green `#d4ff3a` is default; alternates in prototype: orange `#ff5b1f`, indigo `#6366f1`, cyan `#22d3ee`, cream `#f5f1e8`, pink `#ec4899`)
3. Real portrait photo?
4. Keep live Milwaukee time in the hero meta, or drop it?
5. Real copy for bio (currently the placeholder Dave wrote) and real projects/posts?
