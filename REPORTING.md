Playwright CI & Test Reporting
==============================

This file explains how CI test reporting works for this repository and how to view test output locally.

What the CI does
- The CI workflow runs Playwright tests in `employee_automation`.
- The HTML report is uploaded as an artifact named `playwright-report` (downloadable from the Actions run).
- A short Actions summary is written to the Checks UI (`GITHUB_STEP_SUMMARY`) showing the overall status and where to find the artifact.

Why JUnit reporting was removed
- JUnit-based reporting + automated Check Run creation caused issues with forked PRs and runner token restrictions. To keep CI robust and simple, the workflow uses an HTML artifact and writes a compact Actions summary.

Viewing reports locally
1. Install dependencies and browsers:

```bash
cd employee_automation
npm ci
npx playwright install --with-deps
```

2. Run tests and generate HTML report:

```bash
npx playwright test --reporter=html --reporter=dot
```

3. Open the HTML report:

```bash
npx playwright show-report
```

If you want JUnit XML output or richer Check Run annotations later, we can add a dedicated post-CI report workflow or use a different reporter action. For now the Actions summary + HTML artifact gives a lightweight, PR-safe view of test results.
