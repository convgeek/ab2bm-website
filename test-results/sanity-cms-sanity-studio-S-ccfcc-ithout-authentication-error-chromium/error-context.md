# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sanity-cms.spec.ts >> sanity studio >> Sanity Studio loads at /studio without authentication error
- Location: tests/e2e/sanity-cms.spec.ts:7:7

# Error details

```
TypeError: _test.test.todo is not a function
```

# Test source

```ts
  1  | import { test } from '@playwright/test'
  2  | 
  3  | // Stub tests for INFRA-03 (Sanity Studio accessibility)
  4  | // These will be filled in once a real Sanity project is provisioned
  5  | 
  6  | test.describe('sanity studio', () => {
  7  |   test('Sanity Studio loads at /studio without authentication error', async ({ page }) => {
> 8  |     test.todo()
     |          ^ TypeError: _test.test.todo is not a function
  9  |   })
  10 |   test('all document types are visible in Studio sidebar', async ({ page }) => {
  11 |     test.todo()
  12 |   })
  13 | })
  14 | 
```