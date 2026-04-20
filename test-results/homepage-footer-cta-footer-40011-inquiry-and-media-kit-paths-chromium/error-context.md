# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> footer cta >> footer CTA renders with inquiry and media kit paths
- Location: tests/e2e/homepage.spec.ts:66:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /media kit/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /media kit/i }) resolved to 2 elements:
    1) <a href="/contact?type=media-kit" class="inline-flex items-center justify-center rounded-lg border border-background/30 px-8 py-3 text-base font-semibold text-background transition-colors hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Download Media Kit</a> aka getByRole('link', { name: 'Download Media Kit', exact: true })
    2) <a class="hover:text-foreground" href="/contact?type=media-kit">Download media kit</a> aka getByRole('link', { name: 'Download media kit', exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /media kit/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Advance B2B Media — home" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: Advance B2B Media
      - navigation "Main navigation" [ref=e6]:
        - link "Home" [ref=e7] [cursor=pointer]:
          - /url: /
        - button "Programs" [ref=e9]:
          - text: Programs
          - img [ref=e10]
        - link "Methodology" [ref=e12] [cursor=pointer]:
          - /url: /methodology
        - link "Audience" [ref=e13] [cursor=pointer]:
          - /url: /audience
        - link "Resources" [ref=e14] [cursor=pointer]:
          - /url: /blog
        - link "About" [ref=e15] [cursor=pointer]:
          - /url: /about
        - link "Get in Touch" [ref=e16] [cursor=pointer]:
          - /url: /contact
  - main [ref=e18]:
    - generic [ref=e20]:
      - 'heading "Reaching the IT Buyers Competitors Miss: Decision-Makers, MSPs, and MSSPs" [level=1] [ref=e21]'
      - paragraph [ref=e22]: Advance B2B Media connects technology vendors with the IT buyers who actually evaluate and purchase — a curated audience of IT decision-makers, MSPs, and MSSPs across North America.
      - link "Start a Conversation" [ref=e24] [cursor=pointer]:
        - /url: /contact
    - generic [ref=e26]:
      - generic [ref=e27]:
        - heading "Our Programs" [level=2] [ref=e28]
        - paragraph [ref=e29]: Two proven demand generation programs built specifically for technology vendors targeting IT buyers.
      - generic [ref=e30]:
        - generic [ref=e31]:
          - heading "Content Syndication" [level=3] [ref=e32]
          - paragraph [ref=e33]: Distribute your thought leadership content to our verified audience of IT decision-makers, MSPs, and MSSPs — driving qualified pipeline at scale.
          - link "Learn about Content Syndication→" [ref=e35] [cursor=pointer]:
            - /url: /programs#content-syndication
        - generic [ref=e36]:
          - heading "Webinar Programs" [level=3] [ref=e37]
          - paragraph [ref=e38]: Host co-branded webinars with Advance B2B Media, connecting your subject matter experts directly with senior IT buyers actively evaluating solutions.
          - link "Learn about Webinars→" [ref=e40] [cursor=pointer]:
            - /url: /programs#webinar
      - link "View all programs" [ref=e42] [cursor=pointer]:
        - /url: /programs
    - generic [ref=e44]:
      - generic [ref=e45]:
        - heading "Audience Reach" [level=2] [ref=e46]
        - paragraph [ref=e47]: A curated, opt-in audience of qualified IT buyers
      - generic [ref=e48]:
        - generic [ref=e49]:
          - paragraph [ref=e50]: 50,000+
          - paragraph [ref=e51]: Total Audience
          - paragraph [ref=e52]: Verified opt-in (estimate)
        - generic [ref=e53]:
          - paragraph [ref=e54]: 12,000+
          - paragraph [ref=e55]: MSPs
          - paragraph [ref=e56]: Managed Service Providers (estimate)
        - generic [ref=e57]:
          - paragraph [ref=e58]: 4,000+
          - paragraph [ref=e59]: MSSPs
          - paragraph [ref=e60]: Managed Security Service Providers (estimate)
        - generic [ref=e61]:
          - paragraph [ref=e62]: 18,000+
          - paragraph [ref=e63]: IT Decision-Makers
          - paragraph [ref=e64]: Senior IT roles (estimate)
    - blockquote [ref=e67]:
      - paragraph [ref=e68]: Client testimonials coming soon.
    - generic [ref=e70]:
      - heading "Ready to Reach IT Decision-Makers?" [level=2] [ref=e71]
      - paragraph [ref=e72]: Connect with our team to discuss your demand generation goals. Whether you need content syndication reach or a targeted webinar program, we build the right engagement strategy for your audience.
      - generic [ref=e73]:
        - link "Start a Conversation" [ref=e74] [cursor=pointer]:
          - /url: /contact
        - link "Download Media Kit" [ref=e75] [cursor=pointer]:
          - /url: /contact?type=media-kit
  - contentinfo [ref=e76]:
    - generic [ref=e77]:
      - generic [ref=e78]:
        - generic [ref=e79]:
          - paragraph [ref=e80]: Advance B2B Media
          - paragraph [ref=e81]: Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
        - generic [ref=e82]:
          - paragraph [ref=e83]: Navigation
          - list [ref=e84]:
            - listitem [ref=e85]:
              - link "Home" [ref=e86] [cursor=pointer]:
                - /url: /
            - listitem [ref=e87]:
              - link "Programs" [ref=e88] [cursor=pointer]:
                - /url: /programs
            - listitem [ref=e89]:
              - link "About" [ref=e90] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e91]:
              - link "Contact" [ref=e92] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e93]:
          - paragraph [ref=e94]: Contact
          - list [ref=e95]:
            - listitem [ref=e96]:
              - link "Get in touch" [ref=e97] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e98]:
              - link "Download media kit" [ref=e99] [cursor=pointer]:
                - /url: /contact?type=media-kit
        - generic [ref=e100]:
          - paragraph [ref=e101]: Partnership
          - paragraph [ref=e102]:
            - text: Content strategy by
            - link "Conversational Geek" [ref=e103] [cursor=pointer]:
              - /url: https://conversationalgeek.com
      - paragraph [ref=e105]: © 2026 Advance B2B Media. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e111] [cursor=pointer]:
    - img [ref=e112]
  - alert [ref=e115]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('homepage hero', () => {
  4  |   test('hero section renders with IT decision-makers and MSPs/MSSPs named', async ({ page }) => {
  5  |     await page.goto('/')
  6  |     const hero = page.locator('section').first()
  7  |     await expect(hero).toContainText(/MSP|MSSP/i)
  8  |   })
  9  |   test('primary CTA button is visible and links to /contact', async ({ page }) => {
  10 |     await page.goto('/')
  11 |     const cta = page.getByRole('link', { name: /contact|start|conversation/i }).first()
  12 |     await expect(cta).toBeVisible()
  13 |     await expect(cta).toHaveAttribute('href', /\/contact/)
  14 |   })
  15 | })
  16 | 
  17 | test.describe('logo strip', () => {
  18 |   test('logo strip renders below hero (TRST-01)', async ({ page }) => {
  19 |     await page.goto('/')
  20 |     await expect(page.locator('[data-testid="logo-strip"]')).toBeVisible()
  21 |   })
  22 | })
  23 | 
  24 | test.describe('programs overview', () => {
  25 |   test('programs overview section renders with CTAs', async ({ page }) => {
  26 |     await page.goto('/')
  27 |     await expect(page.locator('[data-testid="programs-overview"]')).toBeVisible()
  28 |     await expect(
  29 |       page.locator('[data-testid="programs-overview"] a[href*="/programs"]').first()
  30 |     ).toBeVisible()
  31 |   })
  32 | })
  33 | 
  34 | test.describe('audience stats', () => {
  35 |   test('audience stats section renders', async ({ page }) => {
  36 |     await page.goto('/')
  37 |     await expect(page.locator('[data-testid="audience-stats"]')).toBeVisible()
  38 |   })
  39 | })
  40 | 
  41 | test.describe('social proof', () => {
  42 |   test('social proof / testimonial section renders (TRST-03)', async ({ page }) => {
  43 |     await page.goto('/')
  44 |     const testimonial = page.locator('[data-testid="testimonial-highlight"]')
  45 |     await expect(testimonial).toBeVisible()
  46 |     // Attribution text must be present (name, title, or company)
  47 |     await expect(testimonial).toContainText(/.+/)
  48 |   })
  49 | 
  50 |   test('homepage has a case study highlight section (CASE-03)', async ({ page }) => {
  51 |     await page.goto('/')
  52 |     await expect(page.locator('[data-testid="case-study-highlight"]')).toBeVisible()
  53 |   })
  54 | })
  55 | 
  56 | test.describe('blog preview', () => {
  57 |   test('blog preview section is hidden when no posts exist', async ({ page }) => {
  58 |     await page.goto('/')
  59 |     // No blog grid should be present in Phase 1 (no posts)
  60 |     const blogCards = page.locator('[data-testid="blog-card"]')
  61 |     await expect(blogCards).toHaveCount(0)
  62 |   })
  63 | })
  64 | 
  65 | test.describe('footer cta', () => {
  66 |   test('footer CTA renders with inquiry and media kit paths', async ({ page }) => {
  67 |     await page.goto('/')
  68 |     await expect(page.getByRole('link', { name: /contact|inquiry/i })).toBeVisible()
> 69 |     await expect(page.getByRole('link', { name: /media kit/i })).toBeVisible()
     |                                                                  ^ Error: expect(locator).toBeVisible() failed
  70 |   })
  71 | })
  72 | 
```