import { test, expect } from '@playwright/test'

test.describe('methodology page', () => {
  test('renders methodology page', async ({ page }) => {
    await page.goto('/methodology')
    await expect(page).toHaveURL('/methodology')
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('audience building section (METH-01)', () => {
  test('audience building section is visible and non-empty', async ({ page }) => {
    await page.goto('/methodology')
    const section = page.locator('[data-testid="methodology-audience-building"]')
    await expect(section).toBeVisible()
    await expect(section).not.toBeEmpty()
  })
})

test.describe('content syndication process section (METH-02)', () => {
  test('content syndication section is visible and non-empty', async ({ page }) => {
    await page.goto('/methodology')
    const section = page.locator('[data-testid="methodology-content-syndication"]')
    await expect(section).toBeVisible()
    await expect(section).not.toBeEmpty()
  })
})

test.describe('webinar program process section (METH-03)', () => {
  test('webinar program process section is visible and non-empty', async ({ page }) => {
    await page.goto('/methodology')
    const section = page.locator('[data-testid="methodology-webinar"]')
    await expect(section).toBeVisible()
    await expect(section).not.toBeEmpty()
  })
})
