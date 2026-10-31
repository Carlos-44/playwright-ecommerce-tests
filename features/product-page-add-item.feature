Feature: Product Page — Add Items to Basket
  As a shopper
  I want to add multiple products to my basket from the product listing page
  So that I can proceed to checkout with selected items

  Scenario: Add five products to basket and proceed to checkout
    Given I am on the product listing page
    When I add the first 5 products to the basket one by one
    Then each button should change to "Remove from Basket" after clicking
    And the basket counter should reflect the correct number of items
    When I navigate to checkout
    Then I should be on the checkout page
