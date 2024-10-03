import { test } from "@playwright/test";
import { MyAccountPage } from "../pageObject/MyAccountPage";
import { getLoginToken } from "../API-Calls/getLoginToken";
import { adminDetails } from "../Data/UserDetailAPI";

test("My account using cookie injection", async ({ page }) => {
  // Get login token from API
  const loginToken = await getLoginToken(
    adminDetails.username,
    adminDetails.password
  );

  // Inject the login token into the browser context
  const myAccount = new MyAccountPage(page);

  await myAccount.visit(); // First visit to load the page

  // Inject token into browser cookies
  await page.evaluate((token) => {
    document.cookie = `token=${token}`;
  }, loginToken);

  // Visit the My Account page again after setting the token
  await myAccount.visit();
  await myAccount.waitForPageHeading();
});
