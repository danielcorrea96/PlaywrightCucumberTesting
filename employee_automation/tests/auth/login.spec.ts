import { test, expect } from '@playwright/test';
import { LoginPage } from '../../tests/pages/LoginPage';

test.describe('Authentication - Login', () => {
  test('successful login with valid admin credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'password');
    await expect(page).toHaveURL(/\/Employee\/Create/);
  });

  test('failed login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await loginPage.login('admin', 'pasword');
    await expect(page.locator('body')).toContainText('Invalid login attempt.');
  });
});
