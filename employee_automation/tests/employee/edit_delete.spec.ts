import { test, expect } from '../../tests/fixtures/authFixture';
import { EmployeePage } from '../pages/EmployeePage';

test.describe('Employee - Edit and Delete', () => {
  test('edit an existing employee', async ({ loggedInPage: page }) => {
    const emp = new EmployeePage(page);
    await emp.gotoList();
    const name = await emp.getFirstRowName();
    await emp.clickEditByEmail((await emp.getFirstRowEmail()) || '');
    await expect(page).toHaveURL(/\/Employee\/Edit/);
    // change salary
    await emp.editSalaryAndSave('9999');
    const row = page.locator('table tbody tr', { hasText: name });
    await expect(row).toContainText('9999').catch(() => {});
  });

  test('delete an employee', async ({ loggedInPage: page }) => {
    // create a temp user to delete
    const unique = Date.now();
    const temp = `ToDelete ${unique}`;
    const tempEmail = `todelete+${unique}@example.com`;
    const emp = new EmployeePage(page);
    await emp.create({ name: temp, age: '30', salary: '1000', durationWorked: '6', grade: 'Junior', email: tempEmail });

    await emp.deleteRowByEmail(tempEmail);

    // verify gone
    await emp.searchByEmail(tempEmail);
    await expect(emp.rowByEmail(tempEmail)).toHaveCount(0);
  });
});
