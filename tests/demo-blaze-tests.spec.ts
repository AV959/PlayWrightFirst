import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
});

const userEntry = [
  "Alex Example",
  "England",
  "Chesterfield",
  "01246261107",
  "May",
  "2024",
  "AV@EMAIL.COM"
] as const;

const purchaseLabels = [
  "Total:",
  "Country:",
  "City:",
  "Credit card:",
  "Month:",
  "Year:",
];

const generate = () => (Math.random() + 1).toString(36).substring(7);


test("product desc checker ", async ({ page }) => {
  await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
  await expect(page.getByText("The Samsung Galaxy S6 is")).toBeVisible();
});

test("adding to cart", async ({ page }) => {
  await page.getByRole("link", { name: "Nokia lumia 1520" }).click();
  await page.getByRole("link", { name: "Add to cart " }).click();
  await page.waitForResponse((res) => res.status() === 200); // this waits for a response code 200 code (which is the request of pressing add to cart button)
  await page.waitForLoadState("networkidle"); // this waits for there to be no traffic in the network (press f12 and go look at network tab)
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await expect(page.getByRole("cell", { name: "Nokia lumia" })).toBeVisible();
});

test("purching something", async ({ page }) => {
  await page.getByRole("link", { name: "Nokia lumia 1520" }).click();
  await page.getByRole("link", { name: "Add to cart " }).click();
  await page.waitForResponse((res) => res.status() === 200); // this waits for a response code 200 code (which is the request of pressing add to cart button)
  await page.waitForLoadState("networkidle"); // this waits for there to be no traffic in the network (press f12 and go look at network tab)
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await page.getByRole("button", { name: "Place Order" }).click();

  for (let i = 0; i < purchaseLabels.length; i++) {
    await page.getByLabel(purchaseLabels[i]).fill(userEntry[i]);
  }

  await page.getByRole("button", { name: "Purchase" }).click();
  await expect(page.getByText("Name: " + userEntry[0])).toBeVisible();
});

test("Loggin in", async ({ page }) => {
  await page.getByRole("link", { name: "Log in" }).click();
  await page.locator("#loginusername").fill("AV959");
  await page.locator("#loginpassword").fill("Password");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByRole("link", { name: "Welcome AV959" })).toBeVisible();
});

test("Creating an Account", async ({ page }) => {
  // this test should fail yet doesnt, I am messing up somewhere with the dialog prompts not being asserted correctly. 
  //I have looked at a few videos and my code seems to line up with theirs


  page.on("dialog", async (prompt) => {
    await expect(prompt.type()).toContain("alert");
    await expect(prompt.message()).toEqual("nothing");
    await prompt.accept();
  });

  const newUserName = generate();
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByLabel("Username:").fill(newUserName);
  await page.getByLabel("Password:").fill("Password1");
  await page.getByRole("button", { name: "Sign up" }).click();
});

test('Homepage carousel test', async ({ page }) => {
  //third slide doesnt get picked up but the others do, hard to debug because of autoslide feature
  await expect(page.getByRole('img', { name: 'First slide' })).toBeVisible();
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('img', { name: 'Second slide' })).toBeVisible();
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('img', { name: 'Third slide' })).toBeVisible();
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Previous' }).click();
  await expect(page.getByRole('img', { name: 'Second slide' })).toBeVisible();
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Previous' }).click();
  await expect(page.getByRole('img', { name: 'First slide' })).toBeVisible();
});

test('Monitor Test', async({ page }) => {
  await page.getByRole('link', { name: 'Monitors' }).click();
  await expect(page.getByRole('link', { name: 'ASUS Full HD' })).toBeVisible();
})

test('Laptop Test', async({ page }) => {
  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.getByRole('link', { name: 'MacBook air' })).toBeVisible();
})

test('contact test', async({ page }) =>{

  //this test agian has same issue as the other dailog prompt one

  page.on("dialog", async (prompt) => {
    await expect(prompt.type()).toContain("alert");
    await expect(prompt.message()).toEqual("nothing");
    await prompt.accept();
  });

  await page.getByRole('link', { name: 'Contact' }).click();
  await page.locator('#recipient-email').fill(userEntry[6]);
  await page.getByLabel('Contact Email:').fill(userEntry[0]);
  await page.getByLabel('Message:').fill("you stink");
})