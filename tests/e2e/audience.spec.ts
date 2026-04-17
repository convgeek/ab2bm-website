import { test, expect } from '@playwright/test'

test.describe('audience page', () => {
  test('page loads at /audience', async ({ page }) => {
    await page.goto('/audience')
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('MSP and MSSP are named as distinct segments (AUDN-01)', async ({ page }) => {
    await page.goto('/audience')
    await expect(page.locator('main')).toContainText(/MSP/i)
    await expect(page.locator('main')).toContainText(/MSSP/i)
  })

  test('persona cards render for all four segments (AUDN-02)', async ({ page }) => {
    await page.goto('/audience')
    const cards = page.locator('[data-testid="persona-card"]')
    await expect(cards).toHaveCount(4)
  })

  test('audience stats section renders with methodology note (AUDN-03)', async ({ page }) => {
    await page.goto('/audience')
    await expect(page.locator('[data-testid="audience-stats"]')).toBeVisible()
    await expect(page.locator('[data-testid="methodology-note"]')).toBeVisible()
  })

  test('industry breakdown and company size distribution render (AUDN-04)', async ({ page }) => {
    await page.goto('/audience')
    await expect(page.locator('[data-testid="industry-breakdown"]')).toBeVisible()
    await expect(page.locator('[data-testid="company-size-distribution"]')).toBeVisible()
  })
})
