import { test, expect } from '@playwright/test';


//tried to move my test over to a new sheet but they dont get regonised

test('product desc checker ',async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await expect(page.getByText('The Samsung Galaxy S6 is')).toBeVisible();
  })
  test('adding to cart', async ({ page }) =>{
    await page.goto('https://www.demoblaze.com/')
    await page.getByRole('link',{ name: 'Nokia lumia 1520'}).click();
    await page.getByRole('link', { name: 'Add to cart '}).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page.getByRole('cell', { name: 'Nokia lumia' })).toBeVisible();
  } )

  test('adding to cart codegen', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.getByRole('link', { name: 'Nokia lumia' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page.getByRole('cell', { name: 'Nokia lumia' })).toBeVisible();
  });