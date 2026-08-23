import { test, expect } from '../../tests/fixtures/authFixture';
import { EmployeePage } from '../pages/EmployeePage';

test.describe('Employee - Create', () => {
  test('create a new employee successfully', async ({ loggedInPage: page }) => {
    const unique = Date.now();
    const employee = {
      name: `AutoUser ${unique}`,
      age: '29',
      salary: '5500',
      durationWorked: '12',
      grade: 'Middle',
      email: `autouser+${unique}@example.com`
    };

    const emp = new EmployeePage(page);
    await emp.create(employee);
    await emp.searchByEmail(employee.email);
    const row = emp.rowByEmail(employee.email).first();
    await expect(row).toBeVisible({ timeout: 10000 });
    await expect(row).toContainText(employee.name);
  });
});
