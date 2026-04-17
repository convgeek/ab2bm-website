import { test, expect } from '@playwright/test'

test.describe('homepage hero', () => {
  test('hero section renders with IT decision-makers and MSPs/MSSPs named', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section').first()
    await expect(hero).toContainText(/MSP|MSSP/i)
  })
  test('primary CTA button is visible and links to /contact', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: /contact|start|conversation/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', /\/contact/)
  })
})

test.describe('logo strip', () => {
  test('logo strip renders below hero (TRST-01)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="logo-strip"]')).toBeVisible()
  })
})

test.describe('programs overview', () => {
  test('programs overview section renders with CTAs', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="programs-overview"]')).toBeVisible()
    await expect(
      page.locator('[data-testid="programs-overview"] a[href*="/programs"]').first()
    ).toBeVisible()
  })
})

test.describe('audience stats', () => {
  test('audience stats section renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="audience-stats"]')).toBeVisible()
  })
})

test.describe('social proof', () => {
  test('social proof / testimonial section renders (TRST-03)', async ({ page }) => {
    await page.goto('/')
    const testimonial = page.locator('[data-testid="testimonial-highlight"]')
    await expect(testimonial).toBeVisible()
    // Attribution text must be present (name, title, or company)
    await expect(testimonial).toContainText(/.+/)
  })

  test('homepage has a case study highlight section (CASE-03)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="case-study-highlight"]')).toBeVisible()
  })
})

test.describe('blog preview', () => {
  test('blog preview section is hidden when no posts exist', async ({ page }) => {
    await page.goto('/')
    // No blog grid should be present in Phase 1 (no posts)
    const blogCards = page.locator('[data-testid="blog-card"]')
    await expect(blogCards).toHaveCount(0)
  })
})

test.describe('footer cta', () => {
  test('footer CTA renders with inquiry and media kit paths', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /contact|inquiry/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /media kit/i })).toBeVisible()
  })
})
