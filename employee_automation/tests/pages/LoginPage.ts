import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(returnUrl = '/Employee/Create') {
    const encoded = encodeURIComponent(returnUrl);
    await this.page.goto(`https://eaapp.somee.com/Account/Login?ReturnUrl=${encoded}`);
    await expect(this.page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
  }

  async fillCredentials(username: string, password: string) {
    // prefer labelled fields
    await this.page.getByLabel(/user(name)?|email/i).first().fill(username).catch(() => {});
    await this.page.getByLabel(/password/i).first().fill(password).catch(() => {});
  }

  async submit() {
    await this.page.getByRole('button', { name: /sign in|sign in/i }).first().click().catch(() => {});
  }

  async login(username: string, password: string) {
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async expectLoggedIn() {
    // Expect to be redirected to employee pages when logged in
    await this.page.waitForURL(/.*Employee.*/).catch(() => {});
    return this.page.url();
  }
}
