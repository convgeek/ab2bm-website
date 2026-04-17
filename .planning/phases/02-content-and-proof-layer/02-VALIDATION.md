---
phase: 2
slug: content-and-proof-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.4 (unit) + Playwright 1.59.1 (e2e) |
| **Config file** | `vitest.config.ts` (unit) + `playwright.config.ts` (e2e) |
| **Quick run command** | `npm run test` |
| **Full suite command** | `npm run test && npm run test:e2e` |
| **Estimated runtime** | ~10s (unit) / varies (e2e against Vercel preview) |

---

## Sampling Rate

- **After every task commit:** `npm run build` (confirms TypeScript and schema changes compile)
- **After every plan wave:** `npm run build && npm run test`
- **Before `/gsd:verify-work`:** Full suite (`npm run test && npm run test:e2e`) against Vercel preview URL with real Sanity content
- **Max feedback latency:** ~10 seconds (build check)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 0 | AUDN-01,02,03,04 | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ W0 | ⬜ pending |
| 2-02-01 | 02 | 0 | BLOG-01,02,03 | e2e | `npx playwright test tests/e2e/blog.spec.ts` | ❌ W0 | ⬜ pending |
| 2-03-01 | 03 | 0 | CASE-01,02 | e2e | `npx playwright test tests/e2e/case-studies.spec.ts` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 1 | AUDN-01,02 | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ W0 | ⬜ pending |
| 2-01-03 | 01 | 1 | AUDN-03,04 | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 1 | BLOG-01,02 | e2e | `npx playwright test tests/e2e/blog.spec.ts` | ❌ W0 | ⬜ pending |
| 2-03-02 | 03 | 1 | CASE-01,02,03 | e2e | `npx playwright test tests/e2e/case-studies.spec.ts` | ❌ W0 | ⬜ pending |
| 2-03-03 | 03 | 2 | CASE-03 | e2e | `npx playwright test tests/e2e/homepage.spec.ts` | ✅ exists | ⬜ pending |
| 2-04-01 | 04 | 2 | TRST-01,03 | e2e | `npx playwright test tests/e2e/homepage.spec.ts` | ✅ exists | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/e2e/audience.spec.ts` — stubs for AUDN-01, AUDN-02, AUDN-03, AUDN-04
- [ ] `tests/e2e/blog.spec.ts` — stubs for BLOG-01, BLOG-02, BLOG-03
- [ ] `tests/e2e/case-studies.spec.ts` — stubs for CASE-01, CASE-02, CASE-03
- [ ] Implement `test.todo()` placeholders in `tests/e2e/homepage.spec.ts` for CASE-03, TRST-01, TRST-03

*Existing infrastructure (Vitest + Playwright) covers all phase requirements. No new framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Client/partner logos have explicit written permission | TRST-02 | Legal/process requirement — no automated check | Ab2bm confirms logo permission in writing before any logo goes live; document confirmation in STATE.md |
| Content count thresholds (6+ posts, 3+ case studies) | BLOG-03, CASE-01 | Requires real Sanity content published to Vercel preview | Run `npm run test:e2e` against preview URL after content team publishes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
