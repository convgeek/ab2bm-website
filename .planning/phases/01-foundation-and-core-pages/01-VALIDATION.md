---
phase: 1
slug: foundation-and-core-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + Playwright |
| **Config file** | vitest.config.ts / playwright.config.ts (Wave 0 installs) |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run && npx playwright test` |
| **Estimated runtime** | ~30 seconds (vitest) / ~90 seconds (playwright) |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run && npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01-01 | 1 | INFRA-01 | unit | `npx vitest run --reporter=verbose` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01-01 | 1 | INFRA-02 | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01-01 | 1 | INFRA-03 | e2e | `npx playwright test --grep "sanity"` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01-01 | 1 | INFRA-04 | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01-01 | 1 | INFRA-05 | e2e | `npx playwright test --grep "analytics"` | ❌ W0 | ⬜ pending |
| 1-02-01 | 01-02 | 2 | HOME-01 | e2e | `npx playwright test --grep "homepage hero"` | ❌ W0 | ⬜ pending |
| 1-02-02 | 01-02 | 2 | HOME-02 | e2e | `npx playwright test --grep "logo strip"` | ❌ W0 | ⬜ pending |
| 1-02-03 | 01-02 | 2 | HOME-03 | e2e | `npx playwright test --grep "programs overview"` | ❌ W0 | ⬜ pending |
| 1-02-04 | 01-02 | 2 | HOME-04 | e2e | `npx playwright test --grep "audience stats"` | ❌ W0 | ⬜ pending |
| 1-02-05 | 01-02 | 2 | HOME-05 | e2e | `npx playwright test --grep "social proof"` | ❌ W0 | ⬜ pending |
| 1-02-06 | 01-02 | 2 | HOME-06 | e2e | `npx playwright test --grep "blog preview"` | ❌ W0 | ⬜ pending |
| 1-02-07 | 01-02 | 2 | HOME-07 | e2e | `npx playwright test --grep "footer cta"` | ❌ W0 | ⬜ pending |
| 1-03-01 | 01-03 | 2 | PROG-01 | e2e | `npx playwright test --grep "programs page"` | ❌ W0 | ⬜ pending |
| 1-03-02 | 01-03 | 2 | PROG-02 | e2e | `npx playwright test --grep "content syndication"` | ❌ W0 | ⬜ pending |
| 1-03-03 | 01-03 | 2 | PROG-03 | e2e | `npx playwright test --grep "webinar program"` | ❌ W0 | ⬜ pending |
| 1-03-04 | 01-03 | 2 | PROG-04 | e2e | `npx playwright test --grep "program inquiry"` | ❌ W0 | ⬜ pending |
| 1-04-01 | 01-04 | 2 | ABUT-01 | e2e | `npx playwright test --grep "about page"` | ❌ W0 | ⬜ pending |
| 1-04-02 | 01-04 | 2 | ABUT-02 | e2e | `npx playwright test --grep "team section"` | ❌ W0 | ⬜ pending |
| 1-04-03 | 01-04 | 2 | ABUT-03 | e2e | `npx playwright test --grep "cg partnership"` | ❌ W0 | ⬜ pending |
| 1-05-01 | 01-05 | 3 | CONV-01 | unit | `npx vitest run --grep "submitInquiry"` | ❌ W0 | ⬜ pending |
| 1-05-02 | 01-05 | 3 | CONV-02 | unit | `npx vitest run --grep "Supabase"` | ❌ W0 | ⬜ pending |
| 1-05-03 | 01-05 | 3 | CONV-03 | e2e | `npx playwright test --grep "inquiry form"` | ❌ W0 | ⬜ pending |
| 1-05-04 | 01-05 | 3 | CONV-04 | e2e | `npx playwright test --grep "media kit"` | ❌ W0 | ⬜ pending |
| 1-05-05 | 01-05 | 3 | CONV-05 | e2e | `npx playwright test --grep "form confirmation"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/unit/submit-inquiry.test.ts` — stubs for CONV-01, CONV-02 HubSpot dual-write and Supabase audit log logic
- [ ] `tests/unit/submit-mediakit.test.ts` — stubs for CONV-03, CONV-04 media kit submission logic
- [ ] `tests/e2e/homepage.spec.ts` — stubs for HOME-01 through HOME-07
- [ ] `tests/e2e/programs.spec.ts` — stubs for PROG-01 through PROG-04
- [ ] `tests/e2e/about.spec.ts` — stubs for ABUT-01 through ABUT-03
- [ ] `tests/e2e/conversion.spec.ts` — stubs for CONV-03 through CONV-05
- [ ] `tests/e2e/sanity-cms.spec.ts` — stubs for INFRA-03 (Sanity Studio accessibility)
- [ ] `vitest.config.ts` — unit test configuration
- [ ] `playwright.config.ts` — e2e test configuration

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| HubSpot deal appears in CRM with correct program type | CONV-01 | Requires live HubSpot account; can't mock CRM dashboard | Submit form, log in to HubSpot, verify deal exists with program_type field |
| Sanity publish reflects on live site | INFRA-03 | Requires live Sanity + Vercel environment | Edit content in Studio, publish, verify change appears on site within 5s |
| GTM/analytics events fire correctly | INFRA-05 | Requires browser + GTM preview mode | Use GTM Preview, trigger form submission, verify dataLayer events |
| Vercel deployment succeeds | INFRA-01 | CI/CD environment only | Push to main branch, verify Vercel build passes in dashboard |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
