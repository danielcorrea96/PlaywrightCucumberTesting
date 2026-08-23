# Contributing Guide

Guidelines for contributing to the Playwright Cucumber Testing project.

## 🤝 Code of Conduct

- Be respectful and professional
- Provide clear, helpful feedback
- Focus on code quality and test coverage
- Help others learn and improve

---

## 📋 Before You Start

1. Review [README.md](README.md) for project overview
2. Check [SETUP.md](SETUP.md) for environment setup
3. Read [TEST-PLAN.md](employee_automation/TEST-PLAN.md) for test scenarios
4. Understand Page Object Model pattern used in project

---

## ✨ Writing Tests

### Test File Structure

```typescript
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login with valid credentials', async () => {
    // Arrange
    const username = 'admin';
    const password = 'password';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL('/Employee/Create');
  });
});
```

### Best Practices

#### 1. Use Page Object Model

```typescript
// ✅ Good - Using Page Object
await loginPage.login('admin', 'password');

// ❌ Bad - Direct page interaction
await page.fill('input[name="username"]', 'admin');
await page.fill('input[name="password"]', 'password');
await page.click('button[type="submit"]');
```

#### 2. Use Meaningful Test Names

```typescript
// ✅ Good
test('should successfully login with valid admin credentials', async () => {});

// ❌ Bad
test('test login', async () => {});
test('login test 1', async () => {});
```

#### 3. Use Explicit Waits

```typescript
// ✅ Good - Explicit wait
await page.waitForSelector('.success-message', { timeout: 5000 });

// ❌ Bad - Sleep
await page.waitForTimeout(3000);
```

#### 4. Clear Assertions

```typescript
// ✅ Good
await expect(page).toHaveURL('https://eaapp.somee.com/Employee/Create');
await expect(successMessage).toBeVisible();
await expect(employeeCount).toHaveText('Total: 42');

// ❌ Bad
expect(page.url()).toBe('https://eaapp.somee.com/Employee/Create');
```

#### 5. Test Isolation

```typescript
// ✅ Good - Independent tests
test('create employee', async () => {
  // Setup, execute, verify
  const newEmployee = await employeePage.createEmployee({
    name: 'John Doe',
    email: 'john@example.com'
  });
  await expect(successMessage).toBeVisible();
});

// ❌ Bad - Dependent tests
test('step 1: create employee', async () => {});
test('step 2: edit employee', async () => {}); // Depends on step 1
```

---

## 🏗️ Page Object Pattern

### Creating a New Page Object

```typescript
// pages/NewPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  // Selectors
  private readonly elementSelector = '#element-id';
  private readonly buttonSelector = 'button[name="action"]';

  constructor(page: Page) {
    super(page);
  }

  // Methods
  async clickButton() {
    await this.page.click(this.buttonSelector);
  }

  async fillElement(value: string) {
    await this.page.fill(this.elementSelector, value);
  }

  async getElementText(): Promise<string> {
    return await this.page.textContent(this.elementSelector) || '';
  }
}
```

### Using Locators (Playwright Recommended)

```typescript
// Preferred approach in Playwright 1.20+
export class NewPage extends BasePage {
  private readonly submitButton = this.page.locator('button[type="submit"]');
  private readonly errorMessage = this.page.locator('.error-message');

  async submit() {
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
```

---

## 🧪 Test Scenarios

### Adding New Test Scenario

1. **Create Feature File** (if using BDD reference):
   ```gherkin
   # features/employee/bulk-actions.feature
   Scenario: Bulk delete employees
     Given the user is logged in
     When the user selects multiple employees
     And the user clicks delete
     Then the selected employees are removed
   ```

2. **Create Test File**:
   ```typescript
   // tests/employee/bulk_actions.spec.ts
   test('should bulk delete employees', async () => {
     // Implementation
   });
   ```

3. **Implement Using Page Objects**:
   ```typescript
   test('should bulk delete employees', async ({ page }) => {
     const employeePage = new EmployeePage(page);
     
     await employeePage.selectEmployees(['emp1', 'emp2']);
     await employeePage.clickDelete();
     await expect(successMessage).toContainText('Deleted successfully');
   });
   ```

---

## 🔍 Code Review Checklist

Before submitting changes, verify:

- [ ] Tests follow naming convention: `should [expected behavior]`
- [ ] Page Object Model used for all UI interactions
- [ ] No hardcoded waits (`waitForTimeout`)
- [ ] Descriptive assertion messages
- [ ] No sensitive data in code (usernames, passwords)
- [ ] Tests are independent and can run in any order
- [ ] Code follows TypeScript best practices
- [ ] No console errors in test execution
- [ ] HTML report shows all tests passing
- [ ] Commit messages are clear and descriptive

---

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): subject

body

footer
```

### Types
- `test`: Add or update tests
- `fix`: Fix test or test infrastructure
- `refactor`: Refactor test code
- `docs`: Documentation updates
- `chore`: Maintenance tasks

### Examples

```bash
# Add new test
git commit -m "test(auth): add password reset flow tests"

# Fix existing test
git commit -m "fix(employee): update selector for create employee button"

# Refactor
git commit -m "refactor(pages): extract common login logic to BasePage"

# Update docs
git commit -m "docs: update SETUP.md with troubleshooting section"
```

---

## 🚀 Submitting Changes

### 1. Create Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Make Changes

Follow code style and best practices listed above.

### 3. Run Tests

```bash
# Run all tests
npm run test:playwright

# Run specific test file
npx playwright test tests/path/to/test.spec.ts --headed

# Debug mode if needed
npx playwright test tests/path/to/test.spec.ts --debug
```

### 4. Verify Report

```bash
npm run show-report
```

All tests should pass. Fix any failures before proceeding.

### 5. Commit Changes

```bash
git add .
git commit -m "type(scope): clear description"
```

### 6. Push to Repository

```bash
git push origin feature/my-new-feature
```

### 7. Create Pull Request

- Clear title and description
- Link to related issues
- Reference test coverage
- Attach test report screenshot if relevant

---

## 🐛 Debugging Tips

### Use Debug Mode

```bash
npx playwright test tests/auth/login.spec.ts --debug
```

Opens Playwright Inspector showing:
- Step-by-step execution
- DOM inspection
- Action history

### Add Debug Logs

```typescript
test('login test', async ({ page }) => {
  console.log('Navigating to login page...');
  await loginPage.goto();

  console.log('Entering credentials...');
  await loginPage.login('admin', 'password');

  console.log('Verifying redirect...');
  await expect(page).toHaveURL('/Employee/Create');
});
```

### Use Page Screenshots

```typescript
await page.screenshot({ path: 'screenshot.png' });
```

### Trace Viewer

```bash
npx playwright show-trace test-results/trace.zip
```

---

## 📊 Performance Considerations

### Optimize Test Execution

```typescript
// ✅ Good - Parallel tests (default)
npm run test:playwright

// ✅ Good - Sequential if needed
npx playwright test --workers=1

// Limit workers based on system
npx playwright test --workers=2
```

### Efficient Selectors

```typescript
// ✅ Good - Specific
'button[data-testid="submit"]'

// ⚠️ Fair - Class based
'button.btn-submit'

// ❌ Avoid - Brittle
'body > div > div > div > button:nth-child(3)'
```

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- Project Test Plan: [TEST-PLAN.md](employee_automation/TEST-PLAN.md)
- Project Requirements: [REQUIREMENT.md](employee_automation/REQUIREMENT.md)

---

## ❓ Questions or Issues?

1. Check existing tests for similar scenarios
2. Review [TEST-PLAN.md](employee_automation/TEST-PLAN.md)
3. Debug using `--debug` flag
4. Check test reports in `playwright-report/`

---

Thank you for contributing! 🎉
