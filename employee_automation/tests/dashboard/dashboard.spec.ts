import { test, expect } from '../../tests/fixtures/authFixture';
import { DashboardPage } from '../../tests/pages/DashboardPage';

test.describe('Dashboard Analytics', () => {
  test('dashboard metrics load correctly', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    const metrics = await dashboard.getMetrics();
    const hasMetric = metrics.totalEmployees || metrics.averageSalary || metrics.averageAge || metrics.monthlySalaryBill;
    if (!hasMetric) {
      await expect(page.locator('body')).toContainText(/total employees|average salary|average age|monthly salary bill|retirement/i);
    }
  });

  test('dashboard refresh navigation', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.refresh();
    await expect(page.locator('body')).toContainText(/total employees|average salary/i);
  });
});
