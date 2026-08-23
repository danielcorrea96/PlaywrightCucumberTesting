# BDD Feature Files

This folder contains Gherkin `.feature` files organized by functionality.

Folders:
- `features/auth` — login and access control
- `features/registration` — account creation scenarios
- `features/forgot_password` — password recovery scenarios
- `features/employee` — create, details, edit, delete
- `features/search` — search and filter
- `features/pagination` — pagination tests
- `features/dashboard` — analytics and refresh

How to use:
- These are plain Gherkin feature files. Integrate with your preferred test runner (Cucumber, Playwright Cucumber plugin, etc.).
- Example: use a Playwright + Cucumber adapter or translate scenarios to Playwright tests.
