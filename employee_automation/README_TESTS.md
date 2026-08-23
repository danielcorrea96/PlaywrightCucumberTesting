# Run Playwright TypeScript BDD-like tests

Install dependencies (if needed):

```bash
npm install
npx playwright install
```

Run tests:

```bash
npm run test:playwright
```

View HTML report:

```bash
npm run show-report
```

Notes:
- Tests are written in TypeScript under `tests/` and use direct page interactions.
- If tests fail due to site changes, update selectors in the `tests/` files accordingly.
