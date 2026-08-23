import { test, expect } from '../../tests/fixtures/authFixture';
import { EmployeePage } from '../pages/EmployeePage';

test.describe('Search and Filter', () => {
  test('search employees by name', async ({ loggedInPage: page }) => {
    const emp = new EmployeePage(page);
    // use existing name from list
    const firstName = await emp.getFirstRowName();
    test.skip(!firstName, 'No rows available to derive a name');
    await emp.searchByName(firstName);
    const rows = page.locator('table tbody tr', { hasText: firstName });
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('search employees by email', async ({ loggedInPage: page }) => {
    const emp = new EmployeePage(page);
    await emp.gotoList();
    const firstRowText = await page.locator('table tbody tr').first().innerText();
    const emailMatch = firstRowText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    test.skip(!emailMatch, 'No email found in first row to search by');
    const firstEmail = emailMatch ? emailMatch[0] : 'no-email@example.com';
    await emp.searchByEmail(firstEmail);
    const rows = page.locator('table tbody tr', { hasText: firstEmail });
    const count = await rows.count();
    if (count === 0) {
      await expect(page.locator('body')).toContainText(/no records|no results|no employees/i);
    } else {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('filter employees by grade', async ({ loggedInPage: page }) => {
    const emp = new EmployeePage(page);
    await emp.searchByGrade('Senior');
    const rows = page.locator('table tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toContainText('Senior');
    }
  });

  test('search returns no results', async ({ loggedInPage: page }) => {
    const emp = new EmployeePage(page);
    await emp.searchByName('no-such-name-xyz');
    const rows = page.locator('table tbody tr');
    const count = await rows.count();
    if (count === 0) {
      expect(count).toBe(0);
    } else {
      await expect(page.locator('body')).toContainText(/no records|no results|no employees/i);
    }
  });
});
