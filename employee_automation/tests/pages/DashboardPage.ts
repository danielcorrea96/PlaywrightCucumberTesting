import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface DashboardMetrics {
  totalEmployees?: string;
  averageSalary?: string;
  averageAge?: string;
  monthlySalaryBill?: string;
}

export class DashboardPage extends BasePage {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://eaapp.somee.com/Home/Dashboard').catch(() => {});
  }

  async getMetrics(): Promise<DashboardMetrics> {
    const body = await this.page.locator('body').innerText().catch(() => '');
    // best-effort extraction, return raw strings when possible
    const metrics: DashboardMetrics = {};
    const totalMatch = body.match(/Total employees\s*:\s*(\d+)/i) || body.match(/total employees[^\d]*(\d+)/i);
    if (totalMatch) metrics.totalEmployees = totalMatch[1];
    const avgSalary = body.match(/average salary\s*:\s*([\d,\.]+)/i);
    if (avgSalary) metrics.averageSalary = avgSalary[1];
    const avgAge = body.match(/average age\s*:\s*(\d+)/i);
    if (avgAge) metrics.averageAge = avgAge[1];
    const monthly = body.match(/monthly salary bill\s*:\s*([\d,\.]+)/i);
    if (monthly) metrics.monthlySalaryBill = monthly[1];
    return metrics;
  }

  async refresh() {
    await this.page.click('button:has-text("↻ Refresh")').catch(() => {});
  }
}
