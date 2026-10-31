const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the product listing page', async function () {
  await this.page.goto('/');
});

When('I add the first {int} products to the basket one by one', async function (count) {
  this.submitButtons = [];
  for (let i = 1; i <= count; i++) {
    const button = this.page.locator(`(//button[@type='submit'])[${i}]`);
    this.submitButtons.push(button);
  }

  for (const button of this.submitButtons) {
    await expect(button).toHaveText('Add to Basket');
    await button.click();
  }
});

Then('each button should change to {string} after clicking', async function (expectedText) {
  for (const button of this.submitButtons) {
    await expect(button).toHaveText(expectedText);
  }
});

Then('the basket counter should reflect the correct number of items', async function () {
  const basketCounter = this.page.locator('[data-qa="header-basket-count"]');
  const count = this.submitButtons ? this.submitButtons.length : 0;
  await expect(basketCounter).toHaveText(String(count));
});

When('I navigate to checkout', async function () {
  const isMobile = await this.page.evaluate(() => window.innerWidth <= 768);
  if (isMobile) {
    await this.page.locator('[data-qa="burger-button"]').click();
    await this.page.getByRole('link', { name: 'Checkout' }).waitFor({ state: 'visible' });
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  } else {
    await this.page
      .locator('[data-qa="desktop-nav-link"]')
      .filter({ hasText: 'Checkout' })
      .click();
  }
});

Then('I should be on the checkout page', async function () {
  await expect(this.page).toHaveURL(/checkout/);
});
