import base, { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.test.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillCredentials('admin', 'password');
    await loginPage.submit();
    await loginPage.expectLoggedIn();
    await use(page);
  }
});

export const expect = test.expect;
