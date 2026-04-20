# Ab2bm Brand Color Palette

Extracted from the Ab2bm logo. The existing site's strong red is intentionally excluded.

---

## Brand Tokens

| Token | OKLCH | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `--brand-purple` | `oklch(0.24 0.18 303)` | `#521480` | Deep purple — hero backgrounds, nav, primary buttons |
| `--brand-purple-dark` | `oklch(0.20 0.14 298)` | `#3D1F6B` | Text purple — headings, body text |
| `--brand-orange` | `oklch(0.63 0.16 50)` | `#E07328` | Orange accent — CTAs, highlights, the "2" energy |
| `--brand-silver` | `oklch(0.76 0.015 225)` | `#B4BEC8` | Silver — subtle backgrounds, cards, ring motif |

---

## Shadcn / Tailwind Mappings (Light Mode)

| CSS Variable | Value | Role |
|--------------|-------|------|
| `--primary` | `--brand-purple` | Primary interactive color |
| `--primary-foreground` | `oklch(0.985 0 0)` | White text on purple |
| `--accent` | `--brand-orange` | Accent / highlight color |
| `--accent-foreground` | `oklch(0.985 0 0)` | White text on orange |
| `--foreground` | `--brand-purple-dark` | Default body text |
| `--background` | `oklch(1 0 0)` | White page background |
| `--secondary` | `oklch(0.94 0.02 285)` | Light purple-tinted surface |
| `--muted` | `oklch(0.96 0.01 285)` | Muted surface |
| `--muted-foreground` | `oklch(0.52 0.07 295)` | Subdued text |
| `--border` | `oklch(0.90 0.02 285)` | Borders with purple tint |
| `--ring` | `oklch(0.45 0.14 300)` | Focus rings |

---

## Dark Mode

Dark mode flips to a deep purple background with orange as the primary interactive color.

| CSS Variable | Value | Role |
|--------------|-------|------|
| `--background` | `oklch(0.18 0.12 300)` | Deep purple background |
| `--foreground` | `oklch(0.985 0 0)` | White text |
| `--primary` | `--brand-orange` | Orange becomes primary CTA |
| `--card` | `oklch(0.22 0.14 300)` | Slightly lighter card surface |

---

## Tailwind Utility Classes

These are available anywhere in the codebase:

```
bg-brand-purple       text-brand-purple
bg-brand-purple-dark  text-brand-purple-dark
bg-brand-orange       text-brand-orange
bg-brand-silver       text-brand-silver
```

---

## Logo Source Colors

Identified from `docs/AB2B-Logo.jpg`:

- **Background**: Deep saturated purple `#521480`
- **"ADVANCE" / B·B letters**: Darker medium purple `#3D1F6B`
- **"2" numeral**: Warm orange `#E07328`
- **Concentric rings**: Cool silver-gray `#B4BEC8`
- **Ring dividers**: White `#FFFFFF`
- **Tagline dots** (New York · London · Dubai): Coral/salmon — excluded per brand direction
