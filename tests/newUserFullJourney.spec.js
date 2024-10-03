// Import necessary libraries and classes
import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../pageObject/ProductsPage";
import { NavigationPage } from "../pageObject/NavigationPage";
import { CheckoutPage } from "../pageObject/CheckoutPage";
import { LoginPage } from "../pageObject/LoginPage";
import { RegisterPage } from "../pageObject/RegisterPage";
import { DeliveryDetails } from "../pageObject/DeliveryDetails";
import { PaymentPage } from "../pageObject/PaymentPage"; // Use the correct path to PaymentPage.js
const fs = require('fs');
const countriesData = JSON.parse(fs.readFileSync('./Data/countries.json', 'utf8'));


test("New user full end to end journey", async ({ page }) => {
  // Initialize ProductsPage and perform product actions
  const productPage = new ProductsPage(page);
  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductsToBasket(0);
  await productPage.addProductsToBasket(1);
  await productPage.addProductsToBasket(2);

  // Navigate to Checkout
  const navigationPage = new NavigationPage(page);
  await navigationPage.goToCheckout();

  // Initialize CheckoutPage and test removing products with different methods
  const checkoutPage = new CheckoutPage(page);
  console.log("Testing with replace('$', '') approach:");
  await checkoutPage.removeCheapestProductWithReplace();

  console.log("Testing with regex approach:");
  await checkoutPage.removeCheapestProductWithRegex();

  await checkoutPage.continueToCheckout();

  // Move to the Signup page
  const login = new LoginPage(page);
  await login.moveToSignup();

  // Register a new user
  const registerPage = new RegisterPage(page);
  const email = `user_${uuidv4()}@gmail.com`;
  const password = uuidv4().slice(0, 8);
  await registerPage.signUpAsNewUser(email, password);

  // Wait for navigation to the delivery details page
  await page.waitForURL("/delivery-details", { timeout: 10000 });

  // Confirm page transition
  if (!page.url().includes("/delivery-details")) {
    console.error("Failed to navigate to the delivery details page.");
    return;
  }

  // Add element-specific wait to ensure you are on the correct page
  await page.waitForSelector("text=Delivery details", { timeout: 10000 });

  // Initialize DeliveryDetails and fill the form with random data
  const deliveryDetails = new DeliveryDetails(page);

  // Generate random data without numbers for first and last names
  const randomFirstName = `User_${uuidv4().replace(/[0-9]/g, "").slice(0, 6)}`;
  const randomLastName = `User_${uuidv4().replace(/[0-9]/g, "").slice(0, 6)}`;
  const randomStreet = `${uuidv4().slice(0, 8)} Street`;
  const randomPostcode = uuidv4().slice(0, 5);

  // Select a random country and its corresponding city from the imported JSON file
  const randomCountryObj =
    countriesData.countries[
      Math.floor(Math.random() * countriesData.countries.length)
    ];
  const randomCountry = randomCountryObj.name;
  const randomCity = randomCountryObj.city;

  // Use the generated data to fill the delivery details
  await deliveryDetails.fillDetails(
    randomFirstName,
    randomLastName,
    randomStreet,
    randomPostcode,
    randomCity,
    randomCountry
  );
  await deliveryDetails.saveDetails();

  const paymentPage = new PaymentPage(page); // Initialize PaymentPage class
  await paymentPage.activateDiscount(); // Call the method to apply discount
  // Fill payment details with the first card data from the JSON
  await paymentPage.completePayment(0); // Pass index to use different cards (0, 1, or 2)
});
