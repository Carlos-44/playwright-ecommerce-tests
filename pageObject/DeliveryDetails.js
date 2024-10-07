import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First name");
    this.lastNameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postcodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.saveAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.continueToPaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });

    // Locators for the saved address elements
    this.savedFirstNameInput = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedLastNameInput = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedStreetInput = page.locator('[data-qa="saved-address-street"]');
    this.savedPostcodeInput = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedCityInput = page.locator('[data-qa="saved-address-city"]');
    this.savedCountryDropdown = page.locator(
      '[data-qa="saved-address-country"]'
    );
  }

  async fillDetails(firstName, lastName, street, postcode, city, country) {
    await this.firstNameInput.waitFor({ state: "visible" });
    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.waitFor({ state: "visible" });
    await this.lastNameInput.fill(lastName);

    await this.streetInput.waitFor({ state: "visible" });
    await this.streetInput.fill(street);

    await this.postcodeInput.waitFor({ state: "visible" });
    await this.postcodeInput.fill(postcode);

    await this.cityInput.waitFor({ state: "visible" });
    await this.cityInput.fill(city);

    // Wait for the country dropdown to become visible and enabled
    await this.countryDropdown.waitFor({ state: "attached", timeout: 60000 });
    await this.countryDropdown.waitFor({ state: "visible", timeout: 60000 });

    // Retry mechanism for selecting country
    let success = false;
    for (let i = 0; i < 3; i++) {
      try {
        await this.countryDropdown.selectOption({ label: country });
        success = true;
        break;
      } catch (error) {
        if (i < 2) {
          console.warn(
            `Attempt ${i + 1} failed to select country: ${country}, retrying...`
          );
          await this.page.waitForTimeout(1000); // Wait 1 second before retrying
        } else {
          console.error(
            `Failed to select country after ${i + 1} attempts: ${error}`
          );
          throw error;
        }
      }
    }

    if (!success) {
      throw new Error(`Failed to select country ${country} after 3 attempts.`);
    }
  }

  async saveDetails() {
    // Capture the initial count of saved address containers before saving the address
    const addressCountBeforeSaving = await this.saveAddressContainer.count();

    // Click the save address button
    await this.saveAddressButton.waitFor({ state: "visible" });
    await this.saveAddressButton.click();

    // Wait for the new address container to appear after saving
    await this.saveAddressContainer.waitFor({ state: "visible" });

    // Assert that the address count has increased by one
    await expect(this.saveAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );

    // Wait for the saved address elements and compare them with the filled input values
    await this.savedFirstNameInput.first().waitFor();
    const savedFirstName = await this.savedFirstNameInput.first().innerText();
    const filledFirstName = await this.firstNameInput.inputValue();
    expect(savedFirstName.trim()).toBe(filledFirstName.trim());

    await this.savedLastNameInput.first().waitFor();
    const savedLastName = await this.savedLastNameInput.first().innerText();
    const filledLastName = await this.lastNameInput.inputValue();
    expect(savedLastName.trim()).toBe(filledLastName.trim());

    await this.savedStreetInput.first().waitFor();
    const savedStreet = await this.savedStreetInput.first().innerText();
    const filledStreet = await this.streetInput.inputValue();
    expect(savedStreet.trim()).toBe(filledStreet.trim());

    await this.savedPostcodeInput.first().waitFor();
    const savedPostcode = await this.savedPostcodeInput.first().innerText();
    const filledPostcode = await this.postcodeInput.inputValue();
    expect(savedPostcode.trim()).toBe(filledPostcode.trim());

    await this.savedCityInput.first().waitFor();
    const savedCity = await this.savedCityInput.first().innerText();
    const filledCity = await this.cityInput.inputValue();
    expect(savedCity.trim()).toBe(filledCity.trim());

    await this.savedCountryDropdown.first().waitFor();
    const savedCountry = await this.savedCountryDropdown.first().innerText();
    const filledCountry = await this.countryDropdown.inputValue(); // Use the correct value extraction method
    expect(savedCountry.trim()).toBe(filledCountry.trim());

    // Continue to the payment section
    await this.continueToPaymentButton.waitFor({ state: "visible" });
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/);
  }
}
