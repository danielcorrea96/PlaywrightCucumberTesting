# Playwright Cucumber Testing - Employee Automation

A comprehensive **Behavior-Driven Development (BDD)** automated test suite built with **Playwright** and **TypeScript** for testing the **EAEmployee** (Employee Management Application).

## 📋 Project Overview

This project automates end-to-end testing of a multi-tenant Employee Management System with features including:
- **Authentication** (Login, Registration, Forgot Password)
- **Employee Management** (Create, Read, Update, Delete)
- **Search & Filtering** (Find employees by name, email, etc.)
- **Pagination** (Navigate through employee records)
- **Dashboard Analytics** (View workforce statistics)

**Application Under Test (AUT):** https://eaapp.somee.com

---

## 🏗️ Project Structure

```
PlaywightCucumberTesting/
├── employee_automation/          # Main test project
│   ├── config/
│   │   └── app.config.js        # Application configuration
│   ├── data/
│   │   └── employee.factory.js  # Test data generators
│   ├── features/                # BDD Feature files (Cucumber scenarios)
│   │   ├── auth/
│   │   │   └── login.feature
│   │   ├── employee/
│   │   │   ├── create.feature
│   │   │   └── details_edit_delete.feature
│   │   ├── dashboard/
│   │   │   └── dashboard.feature
│   │   ├── search/
│   │   │   └── search_filter.feature
│   │   ├── pagination/
│   │   │   └── pagination.feature
│   │   ├── registration/
│   │   │   └── registration.feature
│   │   ├── forgot_password/
│   │   │   └── forgot_password.feature
│   │   └── common/
│   │       └── backgrounds.feature
│   ├── tests/                   # TypeScript test files
│   │   ├── auth/
│   │   │   └── login.spec.ts
│   │   ├── employee/
│   │   │   ├── create.spec.ts
│   │   │   └── edit_delete.spec.ts
│   │   ├── fixtures/
│   │   │   └── authFixture.ts
│   │   ├── helpers/
│   │   │   └── auth.ts
│   │   ├── pages/               # Page Object Model
│   │   │   ├── BasePage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   ├── EmployeePage.ts
│   │   │   └── ...
│   │   ├── dashboard/
│   │   ├── forgot_password/
│   │   ├── pagination/
│   │   ├── registration/
│   │   └── search/
│   ├── playwright-report/       # HTML test reports
│   ├── test-results/            # JUnit XML results
│   ├── playwright.config.ts     # Playwright configuration
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript configuration
│   ├── REQUIREMENT.md           # Product requirements
│   ├── TEST-PLAN.md            # Detailed test scenarios
│   └── README_TESTS.md          # Quick start guide
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   cd PlaywightCucumberTesting/employee_automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

---

## ▶️ Running Tests

### Run All Tests
```bash
npm run test:playwright
```

### Run Tests with Specific Configuration
```bash
npx playwright test --config=playwright.config.ts
```

### Run Specific Test File
```bash
npx playwright test tests/auth/login.spec.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

---

## 📊 Viewing Test Reports

### View HTML Report
```bash
npm run show-report
```
This generates and opens a detailed HTML report with:
- Test execution timeline
- Pass/fail status for each test
- Screenshots on failure
- Video recordings on failure
- Trace files for debugging

### Test Report Location
- **HTML Report:** `playwright-report/index.html`
- **JUnit Results:** `test-results/junit-results.xml`

---

## 🧪 Test Coverage

### Authentication Tests
- ✅ Successful login with valid credentials
- ✅ Failed login with incorrect password
- ✅ Login form validation
- ✅ "Keep me signed in" functionality
- ✅ User registration with password validation
- ✅ Forgot password flow

### Employee Management Tests
- ✅ Create new employee
- ✅ View employee details
- ✅ Edit employee information
- ✅ Delete employee records
- ✅ Search employees by name/email
- ✅ Filter employees by criteria
- ✅ Pagination through employee list

### Dashboard Tests
- ✅ View workforce analytics
- ✅ Dashboard data integrity

### Common Scenarios
- ✅ Access control for protected pages
- ✅ Session management
- ✅ Navigation flows

---

## 🏗️ Architecture

### Page Object Model (POM)
Tests use the **Page Object Model** pattern for better maintainability:
- `BasePage.ts` - Base class with common methods
- `LoginPage.ts` - Login-specific interactions
- `EmployeePage.ts` - Employee management interactions
- `DashboardPage.ts` - Dashboard interactions

### Fixtures & Helpers
- `authFixture.ts` - Authentication setup fixtures
- `auth.ts` - Authentication helper functions
- `employee.factory.js` - Test data generation

### Configuration
- **Base URL:** `https://eaapp.somee.com`
- **Timeout:** 60 seconds per test
- **Action Timeout:** 10 seconds
- **Navigation Timeout:** 30 seconds
- **Viewport:** 1280x720

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.62.1 | E2E Test Framework |
| **TypeScript** | Latest | Type-safe scripting |
| **Node.js** | v14+ | Runtime |
| **npm** | v6+ | Package manager |

---

## 📝 Test Configuration Details

### playwright.config.ts
```typescript
- testDir: './tests'
- timeout: 60000ms
- screenshot: 'only-on-failure'
- video: 'retain-on-failure'
- trace: 'retain-on-failure'
- Reporters: List, JUnit XML, HTML
- Headless: true (by default)
```

---

## 🔍 Debugging

### Enable Debug Mode
```bash
npx playwright test --debug
```
Opens Playwright Inspector with step-by-step execution.

### Generate Trace Files
Trace files are automatically generated on test failure. View them:
```bash
npx playwright show-trace test-results/trace.zip
```

### View Console Logs
Check browser console output in test reports or add:
```typescript
page.on('console', msg => console.log(msg.text()));
```

---

## 📚 Documentation

- **[REQUIREMENT.md](employee_automation/REQUIREMENT.md)** - Complete product requirements and API routes
- **[TEST-PLAN.md](employee_automation/TEST-PLAN.md)** - Detailed BDD test scenarios
- **[README_TESTS.md](employee_automation/README_TESTS.md)** - Quick test execution reference

---

## 🤝 Best Practices

1. **Page Object Model:** Use page objects for all UI interactions
2. **Wait Strategies:** Use explicit waits instead of `sleep()`
3. **Data Management:** Use `employee.factory.js` for test data
4. **Assertions:** Clear and descriptive assertions
5. **Test Isolation:** Each test should be independent
6. **Error Handling:** Comprehensive error messages in logs

---

## 🐛 Troubleshooting

### Tests Timeout
- Increase timeout in `playwright.config.ts`
- Check application response time

### Selectors Not Found
- Verify selectors in page object files
- Update if application UI changes
- Use Playwright Inspector to locate elements

### Browser Install Issues
```bash
npx playwright install --with-deps
```

### Report Not Generating
```bash
npx playwright show-report
# or
open playwright-report/index.html
```

---

## 📧 Support & Contribution

For issues, feature requests, or improvements:
1. Review test logs and reports
2. Check [TEST-PLAN.md](employee_automation/TEST-PLAN.md) for scenario details
3. Update selectors if application UI changes
4. Run tests in UI mode for interactive debugging

---

## 📄 License

See LICENSE file for details.

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Install browsers: `npx playwright install`
3. ✅ Run tests: `npm run test:playwright`
4. ✅ View report: `npm run show-report`

Happy Testing! 🚀
