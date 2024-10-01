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

  fillDetails = async (
    firstName,
    lastName,
    street,
    postcode,
    city,
    country
  ) => {
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

    await this.countryDropdown.waitFor({ state: "visible" });
    await this.countryDropdown.selectOption({ label: country });
  };

  saveDetails = async () => {
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
    expect(savedFirstName).toBe(filledFirstName);

    await this.savedLastNameInput.first().waitFor();
    const savedLastName = await this.savedLastNameInput.first().innerText();
    const filledLastName = await this.lastNameInput.inputValue();
    expect(savedLastName).toBe(filledLastName);

    await this.savedStreetInput.first().waitFor();
    const savedStreet = await this.savedStreetInput.first().innerText();
    const filledStreet = await this.streetInput.inputValue();
    expect(savedStreet).toBe(filledStreet);

    await this.savedPostcodeInput.first().waitFor();
    const savedPostcode = await this.savedPostcodeInput.first().innerText();
    const filledPostcode = await this.postcodeInput.inputValue();
    expect(savedPostcode).toBe(filledPostcode);

    await this.savedCityInput.first().waitFor();
    const savedCity = await this.savedCityInput.first().innerText();
    const filledCity = await this.cityInput.inputValue();
    expect(savedCity).toBe(filledCity);

    await this.savedCountryDropdown.first().waitFor();
    const savedCountry = await this.savedCountryDropdown.first().innerText();
    const filledCountry = await this.countryDropdown.inputValue(); // Assuming inputValue() works for dropdowns
    expect(savedCountry).toBe(filledCountry);

    // Continue to the payment section
    await this.continueToPaymentButton.waitFor({ state: "visible" });
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/);
  };
}
