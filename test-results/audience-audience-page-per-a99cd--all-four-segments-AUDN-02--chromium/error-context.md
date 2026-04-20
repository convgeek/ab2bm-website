# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: audience.spec.ts >> audience page >> persona cards render for all four segments (AUDN-02)
- Location: tests/e2e/audience.spec.ts:16:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="persona-card"]')
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-testid="persona-card"]')
    9 × locator resolved to 0 elements
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
    - generic [ref=e20]:
      - heading "Our Audience" [level=1] [ref=e21]
      - paragraph [ref=e22]: The IT professionals and channel partners Ab2bm reaches
    - generic [ref=e24]:
      - heading "Audience Segments" [level=2] [ref=e25]
      - paragraph [ref=e26]: "Ab2bm reaches four distinct segments: IT Practitioners, IT Decision-Makers and Executives, Managed Service Providers (MSPs), and Managed Security Service Providers (MSSPs). Each represents a separate buying role."
      - paragraph [ref=e27]: Audience segment profiles coming soon.
    - generic [ref=e29]:
      - heading "Audience by the Numbers" [level=2] [ref=e30]
      - paragraph [ref=e32]: Verified audience data coming soon.
      - generic [ref=e33]: "Methodology: Audience data sourced from first-party subscription records and verified engagement metrics. Full methodology note coming soon."
    - generic [ref=e36]:
      - generic [ref=e37]:
        - heading "Industry Breakdown" [level=2] [ref=e38]
        - paragraph [ref=e40]: Data coming soon.
      - generic [ref=e41]:
        - heading "Company Size Distribution" [level=2] [ref=e42]
        - paragraph [ref=e44]: Data coming soon.
  - contentinfo [ref=e45]:
    - generic [ref=e46]:
      - generic [ref=e47]:
        - generic [ref=e48]:
          - paragraph [ref=e49]: Advance B2B Media
          - paragraph [ref=e50]: Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
        - generic [ref=e51]:
          - paragraph [ref=e52]: Navigation
          - list [ref=e53]:
            - listitem [ref=e54]:
              - link "Home" [ref=e55] [cursor=pointer]:
                - /url: /
            - listitem [ref=e56]:
              - link "Programs" [ref=e57] [cursor=pointer]:
                - /url: /programs
            - listitem [ref=e58]:
              - link "About" [ref=e59] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e60]:
              - link "Contact" [ref=e61] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e62]:
          - paragraph [ref=e63]: Contact
          - list [ref=e64]:
            - listitem [ref=e65]:
              - link "Get in touch" [ref=e66] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e67]:
              - link "Download media kit" [ref=e68] [cursor=pointer]:
                - /url: /contact?type=media-kit
        - generic [ref=e69]:
          - paragraph [ref=e70]: Partnership
          - paragraph [ref=e71]:
            - text: Content strategy by
            - link "Conversational Geek" [ref=e72] [cursor=pointer]:
              - /url: https://conversationalgeek.com
      - paragraph [ref=e74]: © 2026 Advance B2B Media. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e80] [cursor=pointer]:
    - img [ref=e81]
  - alert [ref=e84]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('audience page', () => {
  4  |   test('page loads at /audience', async ({ page }) => {
  5  |     await page.goto('/audience')
  6  |     await expect(page).not.toHaveURL(/\/404/)
  7  |     await expect(page.locator('main')).toBeVisible()
  8  |   })
  9  | 
  10 |   test('MSP and MSSP are named as distinct segments (AUDN-01)', async ({ page }) => {
  11 |     await page.goto('/audience')
  12 |     await expect(page.locator('main')).toContainText(/MSP/i)
  13 |     await expect(page.locator('main')).toContainText(/MSSP/i)
  14 |   })
  15 | 
  16 |   test('persona cards render for all four segments (AUDN-02)', async ({ page }) => {
  17 |     await page.goto('/audience')
  18 |     const cards = page.locator('[data-testid="persona-card"]')
> 19 |     await expect(cards).toHaveCount(4)
     |                         ^ Error: expect(locator).toHaveCount(expected) failed
  20 |   })
  21 | 
  22 |   test('audience stats section renders with methodology note (AUDN-03)', async ({ page }) => {
  23 |     await page.goto('/audience')
  24 |     await expect(page.locator('[data-testid="audience-stats"]')).toBeVisible()
  25 |     await expect(page.locator('[data-testid="methodology-note"]')).toBeVisible()
  26 |   })
  27 | 
  28 |   test('industry breakdown and company size distribution render (AUDN-04)', async ({ page }) => {
  29 |     await page.goto('/audience')
  30 |     await expect(page.locator('[data-testid="industry-breakdown"]')).toBeVisible()
  31 |     await expect(page.locator('[data-testid="company-size-distribution"]')).toBeVisible()
  32 |   })
  33 | })
  34 | 
```