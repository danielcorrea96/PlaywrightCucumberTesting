import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../tests/pages/ForgotPasswordPage';

test.describe('Forgot Password', () => {
  test('forgot password with valid email', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.submitEmail('admin@example.com');
    await expect(page.locator('body')).toContainText(/check your email|confirmation|sent/i);
  });

  test('forgot password with invalid email', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.submitEmail('invalid-email');
    await expect(page.locator('body')).toContainText(/not a valid e-?mail address|invalid email|enter a valid email/i);
  });
});
