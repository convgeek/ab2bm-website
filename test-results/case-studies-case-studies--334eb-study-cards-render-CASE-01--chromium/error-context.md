# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: case-studies.spec.ts >> case studies >> at least 3 case study cards render (CASE-01)
- Location: tests/e2e/case-studies.spec.ts:10:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="case-study-card"]')
Expected: 3
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="case-study-card"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
      - generic [ref=e20]:
        - heading "Case Studies" [level=1] [ref=e21]
        - paragraph [ref=e22]: Real results for tech vendors reaching MSP and MSSP audiences.
      - paragraph [ref=e23]: Case studies coming soon.
  - contentinfo [ref=e24]:
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - paragraph [ref=e28]: Advance B2B Media
          - paragraph [ref=e29]: Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
        - generic [ref=e30]:
          - paragraph [ref=e31]: Navigation
          - list [ref=e32]:
            - listitem [ref=e33]:
              - link "Home" [ref=e34] [cursor=pointer]:
                - /url: /
            - listitem [ref=e35]:
              - link "Programs" [ref=e36] [cursor=pointer]:
                - /url: /programs
            - listitem [ref=e37]:
              - link "About" [ref=e38] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e39]:
              - link "Contact" [ref=e40] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e41]:
          - paragraph [ref=e42]: Contact
          - list [ref=e43]:
            - listitem [ref=e44]:
              - link "Get in touch" [ref=e45] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e46]:
              - link "Download media kit" [ref=e47] [cursor=pointer]:
                - /url: /contact?type=media-kit
        - generic [ref=e48]:
          - paragraph [ref=e49]: Partnership
          - paragraph [ref=e50]:
            - text: Content strategy by
            - link "Conversational Geek" [ref=e51] [cursor=pointer]:
              - /url: https://conversationalgeek.com
      - paragraph [ref=e53]: © 2026 Advance B2B Media. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e59] [cursor=pointer]:
    - img [ref=e60]
  - alert [ref=e63]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('case studies', () => {
  4  |   test('listing page loads at /case-studies (CASE-01)', async ({ page }) => {
  5  |     await page.goto('/case-studies')
  6  |     await expect(page).not.toHaveURL(/\/404/)
  7  |     await expect(page.locator('main')).toBeVisible()
  8  |   })
  9  | 
  10 |   test('at least 3 case study cards render (CASE-01)', async ({ page }) => {
  11 |     await page.goto('/case-studies')
  12 |     const cards = page.locator('[data-testid="case-study-card"]')
> 13 |     await expect(cards).toHaveCount(3, { timeout: 10000 })
     |                         ^ Error: expect(locator).toHaveCount(expected) failed
  14 |   })
  15 | 
  16 |   test('individual case study page renders with metrics (CASE-02)', async ({ page }) => {
  17 |     await page.goto('/case-studies')
  18 |     const firstLink = page.locator('[data-testid="case-study-card"] a').first()
  19 |     const href = await firstLink.getAttribute('href')
  20 |     if (href) {
  21 |       await page.goto(href)
  22 |       await expect(page.locator('[data-testid="case-study-metrics"]')).toBeVisible()
  23 |     }
  24 |   })
  25 | 
  26 |   test('homepage has a case study highlight section (CASE-03)', async ({ page }) => {
  27 |     await page.goto('/')
  28 |     await expect(page.locator('[data-testid="case-study-highlight"]')).toBeVisible()
  29 |   })
  30 | })
  31 | 
```