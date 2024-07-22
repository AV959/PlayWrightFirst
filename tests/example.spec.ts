import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

/// Start of my own tests


test('product desc checker ',async ({ page }) => {
  await page.goto('https://www.demoblaze.com/')
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await expect(page.getByText('The Samsung Galaxy S6 is')).toBeVisible();
})

//the tests below wont work on firefox, I made the first test by nphand and the other with codegen on firefox but it just doesnt add the item to the cart when I look at in UI mode


test('adding to cart', async ({ page }) =>{
  await page.goto('https://www.demoblaze.com/')
  await page.getByRole('link',{ name: 'Nokia lumia 1520'}).click();
  await expect(page.getByRole('link', { name: 'Add to cart', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Add to cart '}).click();
  await page.waitForResponse(res => res.status() === 200) // this waits for a response code 200 code (which is the request of pressing add to cart button)
  await page.waitForLoadState('networkidle'); // this waits for there to be no traffic in the network (press f12 and go look at network tab)
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page.getByRole('cell', { name: 'Nokia lumia' })).toBeVisible();
} )
