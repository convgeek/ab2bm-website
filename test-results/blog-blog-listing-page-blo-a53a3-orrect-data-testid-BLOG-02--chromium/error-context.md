# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog.spec.ts >> blog listing page >> blog cards have correct data-testid (BLOG-02)
- Location: tests/e2e/blog.spec.ts:10:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="blog-card"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="blog-card"]').first()

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
    - generic [ref=e19]:
      - heading "Resources" [level=1] [ref=e20]
      - paragraph [ref=e21]: Insights and strategies for B2B technology marketers.
    - generic [ref=e22]:
      - paragraph [ref=e23]: Content coming soon.
      - paragraph [ref=e24]: Check back shortly — new articles are on the way.
  - contentinfo [ref=e25]:
    - generic [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e28]:
          - paragraph [ref=e29]: Advance B2B Media
          - paragraph [ref=e30]: Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
        - generic [ref=e31]:
          - paragraph [ref=e32]: Navigation
          - list [ref=e33]:
            - listitem [ref=e34]:
              - link "Home" [ref=e35] [cursor=pointer]:
                - /url: /
            - listitem [ref=e36]:
              - link "Programs" [ref=e37] [cursor=pointer]:
                - /url: /programs
            - listitem [ref=e38]:
              - link "About" [ref=e39] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e40]:
              - link "Contact" [ref=e41] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e42]:
          - paragraph [ref=e43]: Contact
          - list [ref=e44]:
            - listitem [ref=e45]:
              - link "Get in touch" [ref=e46] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e47]:
              - link "Download media kit" [ref=e48] [cursor=pointer]:
                - /url: /contact?type=media-kit
        - generic [ref=e49]:
          - paragraph [ref=e50]: Partnership
          - paragraph [ref=e51]:
            - text: Content strategy by
            - link "Conversational Geek" [ref=e52] [cursor=pointer]:
              - /url: https://conversationalgeek.com
      - paragraph [ref=e54]: © 2026 Advance B2B Media. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e60] [cursor=pointer]:
    - img [ref=e61]
  - alert [ref=e64]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('blog listing page', () => {
  4  |   test('listing page loads at /blog (BLOG-01)', async ({ page }) => {
  5  |     await page.goto('/blog')
  6  |     await expect(page).not.toHaveURL(/\/404/)
  7  |     await expect(page.locator('main')).toBeVisible()
  8  |   })
  9  | 
  10 |   test('blog cards have correct data-testid (BLOG-02)', async ({ page }) => {
  11 |     await page.goto('/blog')
  12 |     // When posts exist, they render as blog-card elements
  13 |     const cards = page.locator('[data-testid="blog-card"]')
  14 |     // Count check is only enforced after content is published (BLOG-03 is a content gate)
> 15 |     await expect(cards.first()).toBeVisible()
     |                                 ^ Error: expect(locator).toBeVisible() failed
  16 |   })
  17 | 
  18 |   test('at least 6 posts appear on listing page (BLOG-03)', async ({ page }) => {
  19 |     await page.goto('/blog')
  20 |     const cards = page.locator('[data-testid="blog-card"]')
  21 |     await expect(cards).toHaveCount(6, { timeout: 10000 })
  22 |   })
  23 | 
  24 |   test('individual post page renders (BLOG-01)', async ({ page }) => {
  25 |     await page.goto('/blog')
  26 |     // Navigate to first post
  27 |     const firstLink = page.locator('[data-testid="blog-card"] a').first()
  28 |     const href = await firstLink.getAttribute('href')
  29 |     if (href) {
  30 |       await page.goto(href)
  31 |       await expect(page.locator('article')).toBeVisible()
  32 |     }
  33 |   })
  34 | })
  35 | 
```