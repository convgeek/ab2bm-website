import { test, expect } from '@playwright/test'

test.describe('inquiry form', () => {
  test('inquiry form renders all required fields', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByLabel(/first name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i).first()).toBeVisible()
    await expect(page.getByLabel(/company/i)).toBeVisible()
    await expect(page.getByLabel(/program/i)).toBeVisible()
  })
})

test.describe('media kit', () => {
  test('media kit form accepts name and email only', async ({ page }) => {
    await page.goto('/contact')
    const mediakitForm = page.locator('[data-testid="mediakit-form"]')
    await expect(mediakitForm.getByLabel(/name/i)).toBeVisible()
    await expect(mediakitForm.getByLabel(/email/i)).toBeVisible()
    // Should NOT have company or program fields
    await expect(mediakitForm.getByLabel(/company/i)).not.toBeVisible()
  })
})

test.describe('form confirmation', () => {
  test('inquiry form shows ?program= pre-selected when param is present', async ({ page }) => {
    await page.goto('/contact?program=content-syndication')
    const select = page.getByLabel(/program/i)
    await expect(select).toHaveValue('content-syndication')
  })
})
