import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  // Method 1: Using your approach with replace("$", "")
  removeCheapestProductWithReplace = async () => {
    await this.basketCards.first().waitFor();
    const itemBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();

    // Convert price texts using your approach: remove "$" and convert to number
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", ""); // Remove the dollar sign
      const number = parseFloat(withoutDollarSign); // Convert to float
      return number; // Return the parsed number
    });

    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton =
      this.basketItemRemoveButton.nth(smallestPriceIndex);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemBeforeRemoval - 1);
  };

  // Method 2: Using the regex approach to remove all non-numeric characters
  removeCheapestProductWithRegex = async () => {
    await this.basketCards.first().waitFor();
    const itemBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();

    // Convert price texts using regex approach
    const justNumbers = allPriceTexts.map((element) => {
      const number = parseFloat(element.replace(/[^\d.-]/g, "")); // Remove all non-numeric characters
      return number; // Return the parsed number
    });

    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton =
      this.basketItemRemoveButton.nth(smallestPriceIndex);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemBeforeRemoval - 1);
  };

  // Correct method to continue to checkout
  async continueToCheckout() {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/gm, { timeout: 3000 });
  }
}
