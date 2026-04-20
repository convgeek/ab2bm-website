# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: case-studies.spec.ts >> case studies >> homepage has a case study highlight section (CASE-03)
- Location: tests/e2e/case-studies.spec.ts:26:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="case-study-highlight"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="case-study-highlight"]')

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
  13 |     await expect(cards).toHaveCount(3, { timeout: 10000 })
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
> 28 |     await expect(page.locator('[data-testid="case-study-highlight"]')).toBeVisible()
     |                                                                        ^ Error: expect(locator).toBeVisible() failed
  29 |   })
  30 | })
  31 | 
```