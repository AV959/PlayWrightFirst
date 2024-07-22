import { test, expect } from '@playwright/test';

const generate = () => (Math.random() + 1).toString(36).substring(7);

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/cart.html');
  await page.getByRole('button', { name: 'Place Order' }).click();
  const randomUserName = generate();
  await page.getByLabel('Total:').fill()
  await page.getByLabel('Country:').click();
  await page.getByLabel('City:').click();
  await page.getByLabel('Credit card:').click();
  await page.getByLabel('Month:').click();
  await page.getByLabel('Year:').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
});