---
phase: 3
slug: differentiator-and-launch-ready
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-19
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.59.1 (e2e) + Vitest 4.1.4 (unit) |
| **Config file** | `playwright.config.ts` (e2e), `vitest.config.ts` (unit) |
| **Quick run command** | `npx playwright test tests/e2e/programs.spec.ts tests/e2e/methodology.spec.ts` |
| **Full suite command** | `npm run test:e2e` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/e2e/programs.spec.ts tests/e2e/methodology.spec.ts`
- **After every plan wave:** Run `npm run test:e2e`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 0 | METH-01,02,03 | e2e stub | `npx playwright test tests/e2e/methodology.spec.ts` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 0 | METH-04 | e2e rewrite | `npx playwright test tests/e2e/programs.spec.ts` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | METH-01,02,03 | e2e | `npx playwright test tests/e2e/methodology.spec.ts` | ❌ W0 | ⬜ pending |
| 3-01-04 | 01 | 1 | METH-04 | e2e | `npx playwright test tests/e2e/programs.spec.ts` | ❌ W0 | ⬜ pending |
| 3-02-01 | 02 | 2 | METH-04 | e2e | `npx playwright test tests/e2e/programs.spec.ts` | ❌ W0 | ⬜ pending |
| 3-02-02 | 02 | 3 | INFRA-06 | manual | `npx lighthouse https://[vercel-url] --output=json` | ❌ Manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/e2e/methodology.spec.ts` — stubs for METH-01, METH-02, METH-03 (three section visibility tests)
- [ ] `tests/e2e/programs.spec.ts` — rewrite to cover METH-04 (6 branded program pages, nav dropdown, individual routes)

*Note: INFRA-06 (Core Web Vitals) is production-only. No automated pre-deploy gate is possible — manual Lighthouse audit on Vercel preview URL.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| LCP < 2.5s, CLS < 0.1, INP < 200ms on all pages | INFRA-06 | Production Vercel URL required; field data from Speed Insights only available post-deploy | Deploy to Vercel preview → run Lighthouse on home, programs index, each program page, methodology, audience, blog. Check `@vercel/speed-insights` dashboard for INP/CLS field data. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
