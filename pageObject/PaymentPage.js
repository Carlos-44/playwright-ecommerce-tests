import { expect } from "@playwright/test";
import creditCardData from "../Data/creditCards.json"; // Correct path matching your folder structure

export class PaymentPage {
  constructor(page) {
    this.page = page;
    // Define discount code element inside the iframe
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');

    // Define discount code input element
    this.discountInput = page.locator('[data-qa="discount-code-input"]');

    // Define submit button element
    this.submitDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );

    // Define total value and discount value elements
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountActivatedMessage = page.getByText("Discount activated!"); // Updated the locator

    // Define the total with discount value element
    this.totalDiscountValue = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    // Define locators
    this.creditCardOwnerName = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumber = page.locator('[data-qa="credit-card-number"]');
    this.creditCardValidUntilDate = page.locator('[data-qa="valid-until"]');
    this.creditCardCVC = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  // Method to handle applying the discount
  async activateDiscount() {
    // Wait for the discount code to be visible
    await this.discountCode.waitFor();
    const Code = await this.discountCode.innerText();

    // Fill the discount code into the input field
    await this.discountInput.waitFor();
    await this.discountInput.fill(Code);

    // Ensure the input has the correct value
    await expect(this.discountInput).toHaveValue(Code);

    // Click the submit button to apply the discount
    await this.submitDiscountButton.waitFor();
    await this.submitDiscountButton.click();

    // Wait for the discount activated message
    await this.discountActivatedMessage.waitFor();

    // Wait for the total and discount values to update
    await this.totalDiscountValue.waitFor();
    const discountValueText = await this.totalDiscountValue.innerText();
    const discountValueNumber = parseFloat(discountValueText.replace("$", "")); // Convert to number

    await this.totalValue.waitFor();
    const totalValueText = await this.totalValue.innerText();
    const totalValueNumber = parseFloat(totalValueText.replace("$", "")); // Convert to number

    // Ensure that the discount value is less than the total value
    expect(discountValueNumber).toBeLessThan(totalValueNumber);

    // Wait for the page to navigate to the payment page
    await this.page.waitForURL(/\/payment/);
  }

  // Method to fill the payment details using the JSON data
  async completePayment(cardIndex = 0) {
    const card = creditCardData.creditCards[cardIndex]; // Load data based on index (default: 0)

    // Wait for the credit card owner input to be visible and fill the form
    await this.creditCardOwnerName.waitFor();
    await this.creditCardOwnerName.fill(card.ownerName);

    // Wait for the credit card number input to be visible and fill the form
    await this.creditCardNumber.waitFor();
    await this.creditCardNumber.fill(card.cardNumber);

    // Wait for the valid until date input to be visible and fill the form
    await this.creditCardValidUntilDate.waitFor();
    await this.creditCardValidUntilDate.fill(card.validUntil);

    // Wait for the CVC input to be visible and fill the form
    await this.creditCardCVC.waitFor();
    await this.creditCardCVC.fill(card.cvc);

    // Optionally verify that the values have been filled correctly
    await expect(this.creditCardOwnerName).toHaveValue(card.ownerName);
    await expect(this.creditCardNumber).toHaveValue(card.cardNumber);
    await expect(this.creditCardValidUntilDate).toHaveValue(card.validUntil);
    await expect(this.creditCardCVC).toHaveValue(card.cvc);

    // Wait for the Pay button to be visible and click it
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  }
}
