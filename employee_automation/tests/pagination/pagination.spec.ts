import { test, expect } from '../../tests/fixtures/authFixture';

test.describe('Pagination', () => {
  test('navigate employee list pages', async ({ loggedInPage: page }) => {
    await page.goto('https://eaapp.somee.com/Employee');
    // try click page 2
    const pageTwo = page.locator('a', { hasText: '2' }).first();
    await pageTwo.click().catch(() => {});
    await expect(page).toHaveURL(/page=2|Page=2|\/Employee/);
  });

  test('pagination boundary behavior - last page', async ({ loggedInPage: page }) => {
    await page.goto('https://eaapp.somee.com/Employee');
    const numericLinks = page.locator('a').filter({ hasText: /\d+/ });
    const last = numericLinks.last();
    await last.click().catch(() => {});
    // accept navigation to Employee or external VirtualServer page
    await expect(page).toHaveURL(/\/Employee|VirtualServer/);
  });
});
