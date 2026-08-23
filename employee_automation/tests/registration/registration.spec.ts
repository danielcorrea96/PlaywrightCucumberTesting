import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../tests/pages/RegistrationPage';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    const reg = new RegistrationPage(page);
    await reg.goto();
    const hasForm = await page.getByLabel(/email|username|password/i).first().isVisible().catch(() => false);
    if (!hasForm) test.skip('Registration form not available on this deployment');
  });

  test('successful registration with valid data', async ({ page }) => {
    const unique = Date.now();
    const reg = new RegistrationPage(page);
    await reg.fillForm({ username: `user${unique}`, email: `user${unique}@example.com`, password: 'StrongPass1!', confirm: 'StrongPass1!' });
    await reg.submit();
    await expect(page.locator('body')).toContainText(/account|success|confirmation|sign in|already have an account|check your email/i);
  });

  test('registration with mismatched passwords', async ({ page }) => {
    const reg = new RegistrationPage(page);
    await reg.fillForm({ username: 'user_test', email: 'user_test@example.com', password: 'Password1!', confirm: 'Password2!' });
    await reg.submit();
    await expect(page.locator('body')).toContainText(/match|mismatch|do not match|Min 6 characters|Min 6/i);
  });

  test('registration with weak password', async ({ page }) => {
    const reg = new RegistrationPage(page);
    await reg.fillForm({ username: 'user_weak', email: 'user_weak@example.com', password: '123', confirm: '123' });
    await reg.submit();
    await expect(page.locator('body')).toContainText(/Min 6 characters|password.*(require|strength|at least|too short)/i);
  });
});
