# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversion.spec.ts >> form confirmation >> inquiry form shows ?program= pre-selected when param is present
- Location: tests/e2e/conversion.spec.ts:25:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByLabel(/program/i)
Expected: "content-syndication"
Received: "general"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByLabel(/program/i)
    9 × locator resolved to <select name="programType" aria-invalid="false" id="inquiry-programType" class="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors border-input">…</select>
      - unexpected value "general"

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
      - heading "Start a Conversation" [level=1] [ref=e21]
      - paragraph [ref=e22]: Ready to reach IT decision-makers, MSPs, and MSSPs? Tell us about your goals and we'll follow up within one business day.
    - generic [ref=e25]:
      - generic [ref=e27]:
        - heading "Send an Inquiry" [level=2] [ref=e28]
        - paragraph [ref=e29]: Tell us about your program interests and we'll be in touch.
        - generic [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e33]: First Name *
              - textbox "First Name *" [ref=e34]
            - generic [ref=e35]:
              - generic [ref=e36]: Last Name *
              - textbox "Last Name *" [ref=e37]
          - generic [ref=e38]:
            - generic [ref=e39]: Email *
            - textbox "Email *" [ref=e40]
          - generic [ref=e41]:
            - generic [ref=e42]: Company *
            - textbox "Company *" [ref=e43]
          - generic [ref=e44]:
            - generic [ref=e45]: Program Interest
            - combobox "Program Interest" [ref=e46]:
              - option "Select a program…" [selected]
              - option "ADVANCE ENGAGE"
              - option "ADVANCE ABM"
              - option "ADVANCE INSTALL"
              - option "ADVANCE BANT"
              - option "ADVANCE EXPAND"
              - option "Webinar"
          - generic [ref=e47]:
            - generic [ref=e48]: Message (optional)
            - textbox "Message (optional)" [ref=e49]:
              - /placeholder: Tell us about your target audience, campaign goals, or timeline...
          - button "Send Inquiry" [ref=e50]
      - generic [ref=e52]:
        - generic [ref=e54]: Free Resource
        - heading "Download the Media Kit" [level=2] [ref=e55]
        - paragraph [ref=e56]: Get audience stats, program details, and pricing examples sent to your inbox.
        - generic [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: Name *
            - textbox "Name *" [ref=e61]
          - generic [ref=e62]:
            - generic [ref=e63]: Email *
            - textbox "Email *" [ref=e64]
          - button "Download Media Kit" [ref=e65]
  - contentinfo [ref=e66]:
    - generic [ref=e67]:
      - generic [ref=e68]:
        - generic [ref=e69]:
          - paragraph [ref=e70]: Advance B2B Media
          - paragraph [ref=e71]: Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
        - generic [ref=e72]:
          - paragraph [ref=e73]: Navigation
          - list [ref=e74]:
            - listitem [ref=e75]:
              - link "Home" [ref=e76] [cursor=pointer]:
                - /url: /
            - listitem [ref=e77]:
              - link "Programs" [ref=e78] [cursor=pointer]:
                - /url: /programs
            - listitem [ref=e79]:
              - link "About" [ref=e80] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e81]:
              - link "Contact" [ref=e82] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e83]:
          - paragraph [ref=e84]: Contact
          - list [ref=e85]:
            - listitem [ref=e86]:
              - link "Get in touch" [ref=e87] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e88]:
              - link "Download media kit" [ref=e89] [cursor=pointer]:
                - /url: /contact?type=media-kit
        - generic [ref=e90]:
          - paragraph [ref=e91]: Partnership
          - paragraph [ref=e92]:
            - text: Content strategy by
            - link "Conversational Geek" [ref=e93] [cursor=pointer]:
              - /url: https://conversationalgeek.com
      - paragraph [ref=e95]: © 2026 Advance B2B Media. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e101] [cursor=pointer]:
    - img [ref=e102]
  - alert [ref=e105]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('inquiry form', () => {
  4  |   test('inquiry form renders all required fields', async ({ page }) => {
  5  |     await page.goto('/contact')
  6  |     await expect(page.getByLabel(/first name/i)).toBeVisible()
  7  |     await expect(page.getByLabel(/email/i).first()).toBeVisible()
  8  |     await expect(page.getByLabel(/company/i)).toBeVisible()
  9  |     await expect(page.getByLabel(/program/i)).toBeVisible()
  10 |   })
  11 | })
  12 | 
  13 | test.describe('media kit', () => {
  14 |   test('media kit form accepts name and email only', async ({ page }) => {
  15 |     await page.goto('/contact')
  16 |     const mediakitForm = page.locator('[data-testid="mediakit-form"]')
  17 |     await expect(mediakitForm.getByLabel(/name/i)).toBeVisible()
  18 |     await expect(mediakitForm.getByLabel(/email/i)).toBeVisible()
  19 |     // Should NOT have company or program fields
  20 |     await expect(mediakitForm.getByLabel(/company/i)).not.toBeVisible()
  21 |   })
  22 | })
  23 | 
  24 | test.describe('form confirmation', () => {
  25 |   test('inquiry form shows ?program= pre-selected when param is present', async ({ page }) => {
  26 |     await page.goto('/contact?program=content-syndication')
  27 |     const select = page.getByLabel(/program/i)
> 28 |     await expect(select).toHaveValue('content-syndication')
     |                          ^ Error: expect(locator).toHaveValue(expected) failed
  29 |   })
  30 | })
  31 | 
```