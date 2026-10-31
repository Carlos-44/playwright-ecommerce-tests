const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getLoginToken } = require('../../API-Calls/getLoginToken');
const { adminDetails } = require('../../Data/UserDetailAPI');
const { MyAccountPage } = require('../../pageObject/MyAccountPage');

Given('I have obtained a login token via the API', async function () {
  this.loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
});

When('I inject the token as a browser cookie', async function () {
  const myAccount = new MyAccountPage(this.page);
  await myAccount.visit();
  await this.page.evaluate((token) => {
    document.cookie = `token=${token}`;
  }, this.loginToken);
});

When('I navigate to the My Account page', async function () {
  const myAccount = new MyAccountPage(this.page);
  await myAccount.visit();
  this.myAccount = myAccount;
});

Then('the My Account page heading should be visible', async function () {
  await expect(this.myAccount.pageHeading).toBeVisible();
});
