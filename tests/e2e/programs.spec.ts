import { test, expect } from '@playwright/test'

const PROGRAM_SLUGS = [
  'advance-engage',
  'advance-abm',
  'advance-install',
  'advance-bant',
  'advance-expand',
  'webinar',
]

const BRANDED_NAMES = [
  'ADVANCE ENGAGE',
  'ADVANCE ABM',
  'ADVANCE INSTALL',
  'ADVANCE BANT',
  'ADVANCE EXPAND',
  'Webinar',
]

test.describe('programs index page (METH-04)', () => {
  test('programs index renders overview grid', async ({ page }) => {
    await page.goto('/programs')
    await expect(page).toHaveURL('/programs')
    const grid = page.locator('[data-testid="programs-grid"]')
    await expect(grid).toBeVisible()
  })

  test('programs index shows all 6 branded program names', async ({ page }) => {
    await page.goto('/programs')
    for (const name of BRANDED_NAMES) {
      await expect(page.getByText(name, { exact: false })).toBeVisible()
    }
  })
})

test.describe('individual program pages (METH-04)', () => {
  for (const slug of PROGRAM_SLUGS) {
    test(`/programs/${slug} renders program hero`, async ({ page }) => {
      await page.goto(`/programs/${slug}`)
      await expect(page).toHaveURL(`/programs/${slug}`)
      const hero = page.locator('[data-testid="program-hero"]')
      await expect(hero).toBeVisible()
    })
  }
})

test.describe('program CTA routing (CONV-05)', () => {
  for (const slug of PROGRAM_SLUGS) {
    test(`/programs/${slug} CTA links to contact with program param`, async ({ page }) => {
      await page.goto(`/programs/${slug}`)
      const main = page.locator('main')
      const ctaLinks = main.getByRole('link', { name: /conversation|inquire|contact|get started/i })
      const count = await ctaLinks.count()
      expect(count).toBeGreaterThanOrEqual(1)
      const firstHref = await ctaLinks.first().getAttribute('href')
      expect(firstHref).toContain('program=')
    })
  }
})

test.describe('nav dropdown (METH-04)', () => {
  test('programs nav dropdown is present in desktop nav', async ({ page }) => {
    await page.goto('/')
    const dropdown = page.locator('[data-testid="programs-dropdown"]')
    await expect(dropdown).toBeVisible()
  })

  test('programs dropdown lists all 6 program links', async ({ page }) => {
    await page.goto('/')
    const dropdown = page.locator('[data-testid="programs-dropdown"]')
    await dropdown.hover()
    for (const slug of PROGRAM_SLUGS) {
      const link = page.locator(`a[href="/programs/${slug}"]`).first()
      await expect(link).toBeVisible()
    }
  })
})
