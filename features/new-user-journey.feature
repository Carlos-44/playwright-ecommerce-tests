Feature: New User Full End-to-End Journey
  As a new customer
  I want to browse products, add them to the basket, register, and complete checkout
  So that I can make my first purchase successfully

  Scenario: New user completes full purchase journey
    Given I am on the products page
    When I sort products by cheapest
    And I add the first 3 products to the basket
    And I navigate to checkout
    And I remove the cheapest product using replace method
    And I remove the next cheapest product using regex method
    And I continue to checkout
    And I move to the signup page
    And I register a new user with a unique email
    And I fill in delivery details for "United Kingdom"
    And I proceed to payment
    And I complete payment with test card details
    Then the order should be confirmed
