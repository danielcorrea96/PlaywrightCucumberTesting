import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function login(page: Page, username = 'admin', password = 'password') {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  // wait for redirect to employee create or employee list
  await expect(page).toHaveURL(/\/Employee(\/Create)?/);
}
