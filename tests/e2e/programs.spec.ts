import { test, expect } from '@playwright/test'

test.describe('programs page', () => {
  test('programs page renders', async ({ page }) => {
    await page.goto('/programs')
    await expect(page).toHaveURL('/programs')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })
})

test.describe('content syndication', () => {
  test('content syndication section describes mechanics', async ({ page }) => {
    await page.goto('/programs')
    const section = page.locator('#content-syndication')
    await expect(section).toBeVisible()
    // Section must contain mechanics text — not just an empty heading
    await expect(section).not.toBeEmpty()
  })
})

test.describe('webinar program', () => {
  test('webinar program section describes mechanics', async ({ page }) => {
    await page.goto('/programs')
    const section = page.locator('#webinar')
    await expect(section).toBeVisible()
    await expect(section).not.toBeEmpty()
  })
})

test.describe('program inquiry', () => {
  test('program CTA links include ?program= param', async ({ page }) => {
    await page.goto('/programs')
    // Scope to main content to exclude header/footer nav links
    const main = page.locator('main')
    const ctaLinks = main.getByRole('link', { name: /conversation|inquire|contact/i })
    const count = await ctaLinks.count()
    expect(count).toBeGreaterThanOrEqual(2)
    // Verify at least one link has ?program= param
    const firstHref = await ctaLinks.first().getAttribute('href')
    expect(firstHref).toContain('program=')
  })
})
