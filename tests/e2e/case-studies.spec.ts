import { test, expect } from '@playwright/test'

test.describe('case studies', () => {
  test('listing page loads at /case-studies (CASE-01)', async ({ page }) => {
    await page.goto('/case-studies')
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('at least 3 case study cards render (CASE-01)', async ({ page }) => {
    await page.goto('/case-studies')
    const cards = page.locator('[data-testid="case-study-card"]')
    await expect(cards).toHaveCount(3, { timeout: 10000 })
  })

  test('individual case study page renders with metrics (CASE-02)', async ({ page }) => {
    await page.goto('/case-studies')
    const firstLink = page.locator('[data-testid="case-study-card"] a').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      await expect(page.locator('[data-testid="case-study-metrics"]')).toBeVisible()
    }
  })

  test('homepage has a case study highlight section (CASE-03)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="case-study-highlight"]')).toBeVisible()
  })
})
