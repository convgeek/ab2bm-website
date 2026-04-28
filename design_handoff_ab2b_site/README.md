# Handoff: Advance B2B Media — Website Redesign

## Overview

This handoff bundle contains the **Concentric** design system for Advance B2B Media (AB2B), a B2B demand-generation agency with offices in New York, London, and Dubai. The system defines the brand's visual language — color, typography, spacing, components, and motion — and is intended as the foundation for a full website redesign.

The aesthetic direction is deliberately **editorial-confident**: royal purple dominant, orange reserved for high-signal moments, serif display type with italic accents that echo the logo's "2". It is built to differentiate AB2B from the generic SaaS-blue look of its competitive set (Integrate, Activate, DemandWorks, Headley, IntentMacro, Leadium, TCI).

## About the Design Files

The files in this bundle are **design references created in HTML** — a single-page design system prototype (`Design System.html`) showing intended look, tokens, components, and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Next.js, Astro, WordPress, etc.) using its established patterns, libraries, and build conventions. If no environment exists yet, choose the framework most appropriate for a marketing/lead-gen site (Next.js or Astro are good defaults), and implement the system there.

The HTML in the reference is intentionally token-driven via CSS custom properties. That maps cleanly to CSS variables, Tailwind theme tokens, CSS-in-JS theme objects, or CSS Modules — pick whichever fits the target codebase.

## Fidelity

**High-fidelity (hifi).** Every color, type ramp, spacing value, radius, shadow, and interaction state is final and production-ready. Exact hex values, font families, weights, and pixel values are specified below and should be followed precisely.

Section 09 of the reference file ("In context") shows an assembled landing hero. This is illustrative — it demonstrates how the system composes — but the handoff does **not** yet include full page designs for Programs, Capabilities, Case Studies, Insights, About, or Contact. Those screens will be designed separately. For now, implement the design system as a reusable foundation (tokens + components + layout primitives) and render the landing hero as the first page.

## Screens / Views

### Landing hero (reference implementation)

- **Name**: Landing hero
- **Purpose**: Primary above-the-fold for the homepage. Establishes brand voice, states the value proposition, surfaces the three office locations, presents one conversion CTA.
- **Layout**:
  - Full-bleed purple (`--purple-900` / `#2A0A4A`) surface with 1px border in same color.
  - Three stacked horizontal bands: top nav (22px × 56px padding), hero body (96px × 56px padding), bottom footer meta (24px × 56px padding). Bands are separated by 1px `rgba(255,255,255,0.08)` dividers.
  - Hero body is a 2-column grid: `1.3fr / 1fr`, 64px gap. Left column holds eyebrow + headline + lede + CTAs. Right column holds a translucent stats card aligned to the bottom.
  - A concentric-circles SVG mark (720×720, opacity 0.09) is absolutely positioned at right, vertically centered, as decorative brand echo. `pointer-events: none`, `z-index: 1`; content sits above at `z-index: 2`.
- **Components**:
  - **Top nav**: flex space-between. Wordmark left (`Instrument Serif`, 26px, the "2" italic in `--orange-400`). 5 links center (`Inter Tight`, 14px, 500 weight, `rgba(255,255,255,0.78)`, 36px gap, `white-space: nowrap`). Small accent button right ("Start a pilot").
  - **Eyebrow**: monospace, 11px, `letter-spacing: 0.18em`, uppercase, `--orange-400`, preceded by a 40×1px line in `--orange-400`. Content: `B2B Demand · New York · London · Dubai`.
  - **Headline**: Instrument Serif, `clamp(56px, 7vw, 104px)`, line-height 0.9, letter-spacing -0.02em, weight 400, white. Contains an italic `<em>` span in `--orange-400` — this italic-orange treatment echoes the "2" in the logo and is the primary brand-voice device across the site.
  - **Lede**: Inter Tight, 19px, line-height 1.5, `rgba(255,255,255,0.75)`, max-width 540px, bottom margin 40px.
  - **CTA pair**: flex, 14px gap. Primary is `btn-accent btn-lg` with arrow icon. Secondary is `btn-secondary btn-lg` ("See how we work").
  - **Stats card**: right-column aside. `padding: 32px`, `border: 1px solid rgba(255,255,255,0.12)`, `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(8px)`. Three rows of stat + label, each separated by a dotted divider. Stat numbers are Instrument Serif 64px with one digit italicized in `--orange-400` (e.g. "8**2**%"). Labels are mono, 10px, 0.16em tracking, uppercase, right-aligned, max-width 140px.
  - **Footer meta**: flex space-between. Left: three office locations with small 5px orange dots. Right: scroll indicator.

## Interactions & Behavior

### Buttons
- **Primary (`.btn-primary`)**: purple-900 bg, white text. Hover: bg transitions to `--purple-700` (#4A1C7E), 180ms `cubic-bezier(.2, .7, .2, 1)`. Active: `--ink` (#1B0632). Disabled: `--stone-300` bg, `not-allowed` cursor. Focus-visible: 2px solid `--orange-500` outline, 2px offset.
- **Accent (`.btn-accent`)**: orange-500 bg, white text. Hover: `--orange-400` (#FF8A3D). Active: `--orange-600` (#D45A1C). Focus-visible: 2px solid `--purple-900` outline. **Use rule: one accent button per screen, reserved for the single primary conversion moment.**
- **Secondary (`.btn-secondary`)**: transparent bg, purple-900 text, 1px `--rule-strong` border. Hover: border darkens to `--purple-900`, bg `rgba(42,10,74,0.04)`. On dark surfaces: inverted (white text, white/30% border).
- **Ghost (`.btn-ghost`)**: underlined text-style link, purple-900 → orange-500 on hover.
- **Arrow icon**: 14×14px SVG (`<use href="#arrow">`). On button hover, `translateX(3px)` with 220ms ease.

### Links (nav, breadcrumb)
- 14px Inter Tight, weight 500.
- Underline effect: 1px bottom bar in `--orange-500`, `scaleX(0)` default, `scaleX(1)` on hover (160–220ms). Active links are pinned to the scale-1 state with `--purple-900` text.
- All nav items use `white-space: nowrap`.

### Inputs
- 13px Inter Tight label, 6px gap to input, optional hint (mono, 10px) right-aligned on same row.
- Input: 13px vertical / 16px horizontal padding, 15px font size, 1px `--rule-strong` border, 4px radius.
- Hover: border `--stone-500`.
- Focus: border `--purple-900`, `box-shadow: 0 0 0 3px var(--purple-100)` (purple halo).
- Invalid (`aria-invalid="true"`): border `--danger`, halo `rgba(181,58,46,0.12)`, error message below in 12px danger color.

### Checkboxes / Radios
- 18×18px custom styled boxes with 1.5px border.
- Checked: `--purple-900` bg, white check glyph (CSS border trick).
- Radio: same mechanic, `border-radius: 50%`, inner white dot on check.

### Cards
- 1px `--rule` border, white bg, 32px padding, 320px min-height.
- Hover: border transitions to `--purple-700` (200ms ease-out).
- Concentric SVG mark absolutely positioned bottom-right at -40px offset, 160×160, opacity 0.08 (0.18 on stat cards). Echo of the brand.
- Variants: `.card--stat` (purple-900 bg, huge italic stat number), `.card--accent` (orange-500 bg — use sparingly, once per section max).

### Motion
- **One easing curve**: `cubic-bezier(.2, .7, .2, 1)` — ease-out, slight initial kick, settles gracefully.
- **Three durations**: 160ms (micro — link underlines, input focus), 180–220ms (standard — button hover, arrow translate), 300ms (surface — card hover, modal, reveal).
- **No bounces, no springs.** Editorial precision only.
- Reveal-on-scroll (if implemented): opacity 0 → 1 + `translateY(12px) → 0`, 300ms, stagger 60ms per child.

## State Management

The design system itself is stateless; state management depends on the page being built. For the landing and forms:
- **Contact / pilot form**: standard controlled inputs. Email, company (optional), budget (text), phone. Multi-select checkboxes for "Programs of interest" (content syndication, account-based demand, intent-qualified leads, webinar & event). Single-select radios for "Target region" (North America, EMEA, Global). Submit → server action or API route. Validation on blur + on submit.
- **Nav**: track `activeRoute` from router state; apply `.active` class to matching link.
- **Scroll reveals** (if added): IntersectionObserver with 10% threshold.

## Design Tokens

### Colors (CSS custom properties)

```css
/* Core brand */
--ink:        #1B0632;   /* deep plum ink, near-black — primary text on light */
--purple-900: #2A0A4A;   /* logo base — primary brand surface */
--purple-800: #3A1263;
--purple-700: #4A1C7E;   /* primary button hover */
--purple-600: #5E2A9B;
--purple-500: #7A44C2;
--purple-300: #B89BE0;
--purple-100: #EADDF7;   /* focus halo */
--purple-050: #F6F0FC;

/* Accent — from the "2" in B2B */
--orange-600: #D45A1C;   /* body-safe orange (4.7:1 on white) */
--orange-500: #EE6A24;   /* logo orange — accent buttons, italic emphasis */
--orange-400: #FF8A3D;   /* hover / on dark surfaces */
--orange-100: #FFE6D3;

/* Neutrals — warm, low chroma, purple-undertoned */
--paper:      #F7F4EF;   /* default body bg */
--paper-2:    #EFEAE1;
--bone:       #E5DFD3;
--stone-700:  #4A4339;   /* muted text */
--stone-500:  #7A7366;
--stone-300:  #B5AE9F;

/* Support */
--signal:     #0E7C5A;
--warning:    #B5851A;
--danger:     #B53A2E;

/* Semantic aliases */
--bg:       var(--paper);
--bg-alt:   var(--paper-2);
--fg:       var(--ink);
--fg-muted: var(--stone-700);
--rule:         rgba(27, 6, 50, 0.12);
--rule-strong:  rgba(27, 6, 50, 0.22);
```

### Usage ratio: 60 / 30 / 10
- **60%** — paper + ink (body surfaces, long-form content)
- **30%** — purple (hero, nav, emphasis blocks)
- **10%** — orange (one CTA / stat / underline per screen)

### Contrast & accessibility
- Ink / Paper → 15.8:1 ✓ AA
- Purple-900 / Paper → 13.4:1 ✓ AA
- White / Purple-900 → 13.1:1 ✓ AA
- Orange-600 / White → 4.7:1 ✓ AA body
- **Orange-500 / White → 3.4:1 — fails AA body**. Only use for display-size text (≥24px) or non-text ornament. Use `--orange-600` on white for body copy.

### Typography

**Fonts** — all via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Display** — `Instrument Serif`, Regular + Italic. Serifs, narrow, editorial. Italic is load-bearing: it is used throughout to highlight numerals and single words in orange (echoing the logo's "2").
- **Body / UI** — `Inter Tight`, 300–800. Tighter than Inter proper; reads well at small UI sizes.
- **Mono / Labels** — `JetBrains Mono`, 400 / 500 / 600.

**Type scale**:

| Token | Family | Size | Line-height | Tracking | Weight | Use |
|---|---|---|---|---|---|---|
| `type-d1` | Instrument Serif | 96px (desktop) / `clamp(56px, 7vw, 104px)` in hero | 0.92 | -0.02em | 400 | Hero headlines |
| `type-d2` | Instrument Serif | 64px | 0.95 | -0.015em | 400 | Section titles |
| `type-d3` | Instrument Serif | 40px | 1.0 | -0.01em | 400 | Card titles, subheads |
| `type-h1` | Inter Tight | 32px | 1.15 | -0.015em | 600 | UI headings |
| `type-h2` | Inter Tight | 22px | 1.25 | -0.01em | 600 | UI subheads |
| `type-body` | Inter Tight | 17px | 1.5 | 0 | 400 | Long-form body |
| `type-small` | Inter Tight | 14px | 1.45 | 0 | 400 | Captions, hints |
| `type-mono` | JetBrains Mono | 12px | — | 0.14em | 500 | Eyebrows, labels, data |

**Hero headlines** use `clamp(56px, 7vw, 104px)` for responsive scaling. Other display sizes are fixed; drop down one step at ≤768px viewport (96 → 64, 64 → 40, 40 → 28).

### Spacing scale (4px base)

```css
--s-1: 4px;  --s-2: 8px;  --s-3: 12px;  --s-4: 16px;
--s-5: 20px; --s-6: 24px; --s-8: 32px;  --s-10: 40px;
--s-12: 48px; --s-16: 64px; --s-20: 80px; --s-24: 96px;
```

Section vertical padding: 96px top, 24px bottom between system sections; 64px–120px on marketing pages. Card/container internal padding: 32–40px. Button padding: 12px × 22px default, 8 × 14 small, 16 × 28 large.

### Border radius (restrained)

```css
--r-1: 2px;  --r-2: 4px;  --r-3: 6px;  --r-pill: 999px;
```

- **0px** — cards, surfaces, panels (editorial flatness)
- **4px** — buttons, inputs, small UI elements (default)
- **999px** — chips only
- No large rounded corners. This is a deliberate deviation from the SaaS-default 8–12px radius.

### Shadows (purple-tinted)

```css
--shadow-sm: 0 1px 2px rgba(27,6,50,.06), 0 1px 1px rgba(27,6,50,.04);
--shadow-md: 0 6px 16px rgba(27,6,50,.08), 0 2px 4px rgba(27,6,50,.05);
--shadow-lg: 0 24px 48px rgba(27,6,50,.12), 0 8px 16px rgba(27,6,50,.06);
```

All shadows use `rgba(27, 6, 50, x)` (ink-toned) rather than neutral gray. Elevation reads as warm purple light.

### Motion

```css
--ease: cubic-bezier(.2, .7, .2, 1);
```

- Micro: 160ms (links, inputs, chips)
- Standard: 180–220ms (buttons, arrows, nav)
- Surface: 300ms (cards, modals, reveals)

## Assets

- **`assets/logo.jpg`** — The existing Advance B2B logo (provided by the client, `AB2B-Logo.jpg`). **Preserve intact**; no retouching or recolor. Request a transparent PNG or SVG from the client for production use — the JPG has a purple background baked in, which limits placement flexibility.
- **`#concentric` SVG symbol** — Inline SVG defined in the reference file. A set of concentric circles with bisecting/diagonal lines, echoing the wheel in the logo. Used as a decorative accent on cards (low opacity, corner-cropped) and on the hero (large, center-right, opacity 0.09).
- **`#arrow` SVG symbol** — Simple chevron-arrow glyph, 16×16, used inside buttons. Translates 3px right on button hover.
- **Google Fonts** — Instrument Serif, Inter Tight, JetBrains Mono. Load via `<link>` in `<head>` or self-host for performance.

No photography or illustration assets are included. When adding imagery later, AB2B should commission or license photography that matches the editorial tone (muted palette, real people / real offices, low-saturation) rather than generic stock. An alternative path is typographic-only pages with the concentric device as the dominant visual.

## Files

- **`Design System.html`** — The single-page design system reference. All sections are labeled (01 Brand through 10 Motion) and contain live examples. This is the source of truth for the system.
- **`assets/logo.jpg`** — The client logo.

Open `Design System.html` in a browser to see every token, component state, and the assembled landing hero in context.

## Implementation notes

- **Token layer first.** Before building any page, set up the full token map in the target stack (`:root` CSS variables, Tailwind `theme.extend`, or a `tokens.ts` file). Every component below pulls from these; don't inline hex values at the component level.
- **Component primitives.** Build these in order: `Button`, `Input`, `Field`, `Checkbox`/`Radio`, `Chip`, `Card`, `Nav`. Each maps 1:1 to a section in the reference file.
- **Layout primitives.** `Section` (with numbered eyebrow + title + desc head), `Grid`, `Stack`, `Container` (max-width 1320px, 48px gutter).
- **The italic-orange device.** The italic-serif-in-orange treatment for single letters / numerals is a core brand expression. Build it as a component (`<Accent>2</Accent>` or similar) so it can be used consistently in headlines, stats, and the wordmark.
- **Accessibility.** All interactive elements must have visible `:focus-visible` states (already specified). Form fields need associated labels. The concentric decorative SVGs should have `aria-hidden="true"`.
- **Do not add** gradient backgrounds, rounded-corner cards, emoji, generic SaaS iconography, or AI-slop stock imagery. The system's strength is its restraint — protect it.
