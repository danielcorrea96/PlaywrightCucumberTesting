import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async safeFill(selector: string | Locator, value: string) {
    try {
      if (typeof selector === 'string') await this.page.fill(selector, value);
      else await selector.fill(value);
    } catch {
      // fallback to getByLabel if present
      const label = typeof selector === 'string' ? this.page.getByLabel(new RegExp(selector as string, 'i')) : null;
      if (label) await label.fill(value).catch(() => {});
    }
  }

  async safeClick(selector: string | Locator) {
    try {
      if (typeof selector === 'string') await this.page.click(selector);
      else await selector.click();
    } catch {
      // ignore
    }
  }

  async waitForForm(selector = 'form') {
    await this.page.waitForSelector(selector, { timeout: 5000 }).catch(() => {});
  }
}
