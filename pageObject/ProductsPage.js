import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.sortDropDown = page.locator('[class="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  // Method to visit the homepage
  visit = async () => {
    await this.page.goto("/");
  };

  // Method to check if the current viewport is a desktop view
  isDesktopViewport = async () => {
    const viewportSize = await this.page.viewportSize();
    return viewportSize.width >= 768; // Assuming 768px width or greater is desktop
  };

  // Method to get the current basket count (only for desktop view)
  getBasketCount = async () => {
    if (await this.isDesktopViewport()) {
      await this.basketCounter.waitFor();
      const text = await this.basketCounter.innerText();
      return parseInt(text, 10);
    } else {
      return 0; // Return 0 or handle as necessary for mobile views
    }
  };

  // Method to add a product to the basket and verify the basket count
  addProductsToBasket = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    // Only check basket count if on desktop
    let basketCountBeforeAdding = 0;
    if (await this.isDesktopViewport()) {
      basketCountBeforeAdding = await this.getBasketCount();
    }

    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");

    // Only verify basket count if on desktop
    if (await this.isDesktopViewport()) {
      const basketCountAfterAdding = await this.getBasketCount();
      expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }
  };

  // Method to sort products by price (cheapest first)
  sortByCheapest = async () => {
    await this.sortDropDown.waitFor();
    await this.productTitle.first().waitFor();
    const productTitleBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropDown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitleBeforeSorting);
  };
}
