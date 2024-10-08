import { test, expect } from "@playwright/test";

test("Click All Submit Buttons, Verify Text Changes, Checkout, and Navigate to Basket", async ({
  page,
}) => {
  await page.goto("/");

  // Define constants for each button locator and basket counter
  const button1 = page.locator("(//button[@type='submit'])[1]");
  const button2 = page.locator("(//button[@type='submit'])[2]");
  const button3 = page.locator("(//button[@type='submit'])[3]");
  const button4 = page.locator("(//button[@type='submit'])[4]");
  const button5 = page.locator("(//button[@type='submit'])[5]");
  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  // Check if the browser is in mobile mode (you can also check viewport size or browserName)
  const isMobile = await page.evaluate(() => window.innerWidth <= 768);

  // If mobile view, click the burger button to reveal the mobile navigation menu
  if (isMobile) {
    const burgerButton = page.locator('[data-qa="burger-button"]');
    await burgerButton.click();
    // Wait for the mobile navigation to appear before interacting with the checkout button
    await page
      .getByRole("link", { name: "Checkout" })
      .waitFor({ state: "visible" });
  }

  // Locator for the Checkout button (same for both mobile and desktop)
  const checkoutButton = isMobile
    ? page.getByRole("link", { name: "Checkout" }) // Mobile selector
    : page
        .locator('[data-qa="desktop-nav-link"]')
        .filter({ hasText: "Checkout" }); // Desktop selector

  // Verify initial basket count and button text, then click each button
  await expect(basketCounter).toHaveText("0"); // Initial basket count
  await expect(button1).toHaveText("Add to Basket");
  await button1.click();
  await expect(button1).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("1"); // Verify basket count after clicking button 1

  await expect(button2).toHaveText("Add to Basket");
  await button2.click();
  await expect(button2).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("2"); // Verify basket count after clicking button 2

  await expect(button3).toHaveText("Add to Basket");
  await button3.click();
  await expect(button3).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("3"); // Verify basket count after clicking button 3

  await expect(button4).toHaveText("Add to Basket");
  await button4.click();
  await expect(button4).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("4"); // Verify basket count after clicking button 4

  await expect(button5).toHaveText("Add to Basket");
  await button5.click();
  await expect(button5).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("5"); // Verify basket count after clicking button 5

  // Click the Checkout button
  await checkoutButton.waitFor({ state: "visible" });
  await checkoutButton.click();

  // Assert the page has navigated to the basket page
  await expect(page).toHaveURL("/basket");
});
