import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface EmployeeData {
  name: string;
  age: string;
  salary: string;
  durationWorked: string;
  grade: string;
  email: string;
}

export class EmployeePage extends BasePage {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  async gotoCreate() {
    await this.page.goto('https://eaapp.somee.com/Employee/Create').catch(() => {});
    // some deployments redirect to login; handle by authenticating if needed
    if (this.page.url().includes('/Account/Login')) {
      const { LoginPage } = await import('./LoginPage');
      const login = new LoginPage(this.page);
      await login.login('admin', 'password');
      await this.page.waitForURL(/.*Employee.*/).catch(() => {});
    }
    await expect(this.page).toHaveURL(/\/Employee\/Create|\/Employee/);
  }

  async create(employee: EmployeeData) {
    await this.gotoCreate();
    await this.page.fill('#Name', employee.name);
    await this.page.fill('#Age', employee.age);
    await this.page.fill('#Salary', employee.salary);
    await this.page.fill('#DurationWorked', employee.durationWorked);
    await this.page.selectOption('#Grade', { label: employee.grade });
    await this.page.fill('#Email', employee.email);
    await Promise.all([
      this.page.waitForNavigation({ url: '**/Employee' }),
      this.page.click('button:has-text("Create")')
    ]);
  }

  async gotoList() {
    await this.page.goto('https://eaapp.somee.com/Employee');
    await expect(this.page).toHaveTitle(/Employee List|EAEmployee/i);
  }

  // pagination helpers
  async gotoPage(n: number) {
    await this.gotoList();
    const link = this.page.locator('a', { hasText: String(n) }).first();
    await link.click().catch(() => {});
  }

  async gotoLastPage() {
    await this.gotoList();
    const numericLinks = this.page.locator('a').filter({ hasText: /\d+/ });
    await numericLinks.last().click().catch(() => {});
  }

  // row helpers
  getFirstRow(): Locator {
    return this.page.locator('table tbody tr').first();
  }

  async getFirstRowName(): Promise<string> {
    const text = await this.getFirstRow().locator('td').first().innerText().catch(() => '');
    return text.split('\n')[0] || text;
  }

  async getFirstRowEmail(): Promise<string | null> {
    const rowText = await this.getFirstRow().innerText().catch(() => '');
    const match = rowText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    return match ? match[0] : null;
  }

  getRowByEmail(email: string) {
    return this.page.locator('table tbody tr', { hasText: email });
  }

  async clickDetailsByEmail(email: string) {
    const row = this.getRowByEmail(email).first();
    await expect(row).toBeVisible({ timeout: 5000 });
    await row.locator('a:has-text("Details")').click();
  }

  async clickEditByEmail(email: string) {
    const row = this.getRowByEmail(email).first();
    await expect(row).toBeVisible({ timeout: 5000 });
    await row.locator('a:has-text("Edit")').click();
  }

  async editSalaryAndSave(newSalary: string) {
    await this.page.locator('#Salary').fill(newSalary).catch(() => {});
    await Promise.all([this.page.click('button:has-text("Save")').catch(() => {}), this.page.waitForURL(/\/Employee/).catch(() => {})]);
  }

  async searchByEmail(email: string) {
    await this.gotoList();
    await this.page.fill('input[placeholder="Search by email..."]', email).catch(() => {});
    await this.page.click('button:has-text("Search")').catch(() => {});
  }

  async searchByName(name: string) {
    await this.gotoList();
    await this.page.fill('input[placeholder="Search by name..."]', name).catch(() => {});
    await this.page.click('button:has-text("Search")').catch(() => {});
  }

  async searchByGrade(grade: string) {
    await this.gotoList();
    await this.page.selectOption('select', { label: grade }).catch(() => {});
    await this.page.click('button:has-text("Search")').catch(() => {});
  }

  rowByEmail(email: string) {
    return this.page.locator('table tbody tr', { hasText: email });
  }

  async deleteRowByEmail(email: string) {
    await this.searchByEmail(email);
    const row = this.rowByEmail(email).first();
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator('a:has-text("Delete")').click();
    // attempt confirm
    await this.page.click('button:has-text("Delete")').catch(() => {});
  }
}
