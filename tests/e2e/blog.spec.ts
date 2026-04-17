import { test, expect } from '@playwright/test'

test.describe('blog listing page', () => {
  test('listing page loads at /blog (BLOG-01)', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('blog cards have correct data-testid (BLOG-02)', async ({ page }) => {
    await page.goto('/blog')
    // When posts exist, they render as blog-card elements
    const cards = page.locator('[data-testid="blog-card"]')
    // Count check is only enforced after content is published (BLOG-03 is a content gate)
    await expect(cards.first()).toBeVisible()
  })

  test('at least 6 posts appear on listing page (BLOG-03)', async ({ page }) => {
    await page.goto('/blog')
    const cards = page.locator('[data-testid="blog-card"]')
    await expect(cards).toHaveCount(6, { timeout: 10000 })
  })

  test('individual post page renders (BLOG-01)', async ({ page }) => {
    await page.goto('/blog')
    // Navigate to first post
    const firstLink = page.locator('[data-testid="blog-card"] a').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      await expect(page.locator('article')).toBeVisible()
    }
  })
})
