import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export class RegistrationPage extends BasePage {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://eaapp.somee.com/Account/Register').catch(() => {});
    await this.waitForForm();
  }

  async fillForm(data: RegistrationData) {
    await this.page.getByLabel(/username/i).fill(data.username).catch(() => {});
    await this.page.getByLabel(/email/i).fill(data.email).catch(() => {});
    // password label may include rules; select the first password input for password
    const pwd = this.page.getByLabel(/password(?!.*confirm)/i).first();
    await pwd.fill(data.password).catch(() => {});
    await this.page.getByLabel(/confirm/i).fill(data.confirm).catch(() => {});
  }

  async submit() {
    const submit = this.page.getByRole('button', { name: /create account|register|sign up/i }).first();
    await submit.click().catch(() => {});
  }

  async getValidationMessages() {
    const body = await this.page.locator('body').innerText().catch(() => '');
    return body;
  }

  async register(data: RegistrationData) {
    await this.goto();
    await this.fillForm(data);
    await this.submit();
  }
}
