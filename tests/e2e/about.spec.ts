import { test, expect } from '@playwright/test'

test.describe('about page', () => {
  test('about page renders company story', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL('/about')
    // Page must contain some company narrative — not just headings
    await expect(page.locator('p')).not.toHaveCount(0)
  })
})

test.describe('team section', () => {
  test('team section renders with team members', async ({ page }) => {
    await page.goto('/about')
    // At minimum, placeholder team member cards should be visible
    const teamCards = page.locator('[data-testid="team-card"]')
    const count = await teamCards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

test.describe('cg partnership', () => {
  test('cg partnership section is visible', async ({ page }) => {
    await page.goto('/about')
    const partnershipSection = page.locator('[data-testid="cg-partnership"]')
    await expect(partnershipSection).toBeVisible()
    // Must contain a link to conversationalgeek.com — scoped to section to avoid header/footer conflicts
    await expect(partnershipSection.getByRole('link', { name: /conversational geek/i })).toBeVisible()
  })
})
