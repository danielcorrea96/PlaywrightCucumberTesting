# Setup & Build Guide

Complete setup instructions for building and running the Playwright Cucumber Testing project.

## 📦 System Requirements

### Minimum Requirements
- **Operating System:** macOS 10.15+, Windows 10+, or Linux (Ubuntu 18.04+)
- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher
- **Disk Space:** 1GB (including dependencies and browsers)
- **RAM:** 4GB minimum (8GB recommended)
- **Internet Connection:** Required for downloading Playwright browsers and accessing the test application

### Recommended
- **Node.js:** v18.0.0 or higher
- **npm:** v8.0.0 or higher
- **RAM:** 8GB or more for parallel test execution

---

## 🔧 Environment Setup

### Step 1: Verify Node.js and npm Installation

```bash
# Check Node.js version
node --version
# Expected output: v14.0.0 or higher

# Check npm version
npm --version
# Expected output: v6.0.0 or higher
```

If not installed, download from: https://nodejs.org/

### Step 2: Clone the Repository

```bash
git clone https://github.com/your-repo/PlaywightCucumberTesting.git
cd PlaywightCucumberTesting
```

### Step 3: Navigate to Project Directory

```bash
cd employee_automation
```

---

## 📥 Installation Steps

### Step 1: Install Project Dependencies

```bash
npm install
```

This installs:
- `@playwright/test` - Playwright testing framework
- All transitive dependencies

**Expected Output:**
```
added XX packages, and audited XX packages in XXs
found 0 vulnerabilities
```

### Step 2: Install Playwright Browsers

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers (~500MB).

**Expected Output:**
```
✓ Chromium 126.0.6478.63 (linux) 95MB
✓ Firefox 127.0 (linux) 65MB
✓ WebKit 17.4 (linux) 88MB
```

### Step 3: Verify Installation

```bash
npx playwright --version
# Expected output: Version XX.X.X
```

---

## 🚀 Building the Project

### TypeScript Compilation

The project uses TypeScript. Verify configuration:

```bash
# Check TypeScript configuration
cat tsconfig.json
```

### Build Before Running Tests (Optional)

```bash
# Install TypeScript globally (if needed)
npm install -g typescript

# Compile TypeScript
tsc --noEmit
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npm run test:playwright
```

**What this does:**
1. Launches Playwright
2. Runs all test files in `tests/` directory
3. Generates HTML and JUnit reports
4. Captures screenshots and videos on failure

### Run Tests with Options

#### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

#### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

#### Run Single Test File
```bash
npx playwright test tests/auth/login.spec.ts
```

#### Run Tests Matching Pattern
```bash
npx playwright test --grep "login"
```

#### Run Tests in Parallel (Default)
```bash
npx playwright test --workers=4
```

#### Run Tests Sequentially
```bash
npx playwright test --workers=1
```

#### Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate Test Report

```bash
npm run show-report
```

Opens HTML report in default browser showing:
- Test timeline
- Pass/fail status
- Screenshots on failure
- Video recordings
- Trace files

---

## 📊 Test Reports Location

After running tests, find reports in:

- **HTML Report:** `playwright-report/index.html`
- **JUnit XML:** `test-results/junit-results.xml`
- **Screenshots:** `test-results/` (on failure)
- **Videos:** `test-results/` (on failure)

---

## 🔧 Configuration Details

### playwright.config.ts Configuration

Current settings:
```typescript
{
  testDir: './tests',                           // Test file location
  timeout: 60 * 1000,                          // 60s per test
  expect: { timeout: 5000 },                   // 5s for assertions
  reporter: [
    'list',                                     // Console output
    'junit',                                    // JUnit XML
    'html'                                      // HTML report
  ],
  use: {
    baseURL: 'https://eaapp.somee.com',       // Application URL
    headless: true,                            // Run without UI
    viewport: { width: 1280, height: 720 },   // Screen size
    actionTimeout: 10000,                      // 10s for actions
    navigationTimeout: 30000,                  // 30s for navigation
    screenshot: 'only-on-failure',             // Screenshots
    video: 'retain-on-failure',                // Record on failure
    trace: 'retain-on-failure'                 // Trace on failure
  }
}
```

### Customize Configuration

Edit `playwright.config.ts` to modify:

```typescript
// Change timeout
timeout: 120 * 1000,  // 2 minutes

// Change headless mode
headless: false,      // Show browser

// Change base URL
baseURL: 'http://localhost:3000',

// Add new project configuration
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
]
```

---

## 🏗️ Project Structure Setup

Ensure the directory structure is correct:

```bash
# From project root, verify structure
tree -L 2 -I 'node_modules'
```

Should show:
```
employee_automation/
├── config/
├── data/
├── features/
├── tests/
├── playwright-report/
├── test-results/
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README_TESTS.md
```

---

## 🧪 Verifying Installation

### Run a Simple Test

```bash
npx playwright test tests/auth/login.spec.ts --headed
```

Should:
1. Launch browser
2. Navigate to login page
3. Verify login form elements
4. Generate report

### Check Test Report

```bash
npm run show-report
```

Should open HTML report in browser showing test results.

---

## 🐛 Troubleshooting Installation

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Playwright install fails

**Solution:**
```bash
# Install with dependencies
npx playwright install --with-deps

# For macOS specific issues
brew install playwright
```

### Issue: Port already in use

**Solution:**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Issue: Tests timeout

**Solution:**
```bash
# Increase timeout in playwright.config.ts
timeout: 120 * 1000  // 2 minutes

# Or run with specific timeout
npx playwright test --timeout 120000
```

### Issue: Cannot find module errors

**Solution:**
```bash
# Ensure you're in correct directory
pwd  # Should show .../PlaywightCucumberTesting/employee_automation

# Verify tsconfig.json exists
ls tsconfig.json

# Reinstall dependencies
npm install
```

---

## 🚀 Development Workflow

### Recommended Workflow

1. **Make code changes** in test files
2. **Run specific test** to validate:
   ```bash
   npx playwright test tests/your-file.spec.ts --headed
   ```
3. **Use debug mode** if issues:
   ```bash
   npx playwright test tests/your-file.spec.ts --debug
   ```
4. **Run full suite** before committing:
   ```bash
   npm run test:playwright
   ```
5. **Review report:**
   ```bash
   npm run show-report
   ```

---

## 📝 npm Scripts Available

```bash
# Run all tests
npm run test:playwright

# Alias for above
npm test

# View HTML report
npm run show-report

# Create new test file
npx playwright codegen https://eaapp.somee.com
```

---

## 🔐 Environment Variables

Create `.env` file if needed:

```bash
# .env
BASE_URL=https://eaapp.somee.com
TEST_USERNAME=admin
TEST_PASSWORD=password
```

Access in tests:
```typescript
const baseURL = process.env.BASE_URL || 'https://eaapp.somee.com';
```

---

## ✅ Final Verification Checklist

- [ ] Node.js v14+ installed
- [ ] npm v6+ installed
- [ ] Repository cloned
- [ ] `npm install` completed
- [ ] `npx playwright install` completed
- [ ] Can run `npx playwright --version`
- [ ] Can run `npm run test:playwright`
- [ ] Can generate reports with `npm run show-report`

---

## 🎯 Next Steps

1. ✅ Follow all setup steps above
2. ✅ Run sample test: `npx playwright test tests/auth/login.spec.ts --headed`
3. ✅ Review test reports
4. ✅ Read [TEST-PLAN.md](employee_automation/TEST-PLAN.md) for test scenarios
5. ✅ Customize configuration as needed

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Application Under Test: https://eaapp.somee.com

---

For issues or questions, refer to troubleshooting section or check test logs in `test-results/`.
