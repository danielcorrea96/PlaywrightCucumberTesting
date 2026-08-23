import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://eaapp.somee.com/Account/ForgotPassword').catch(() => {});
    await this.waitForForm();
  }

  async submitEmail(email: string) {
    // try label first
    await this.page.getByLabel(/email/i).fill(email).catch(async () => {
      await this.page.fill('#Email', email).catch(() => {});
    });
    await this.page.getByRole('button', { name: /send|send reset link|submit/i }).first().click().catch(() => {});
  }

  async getValidationMessages() {
    return await this.page.locator('body').innerText().catch(() => '');
  }
}
