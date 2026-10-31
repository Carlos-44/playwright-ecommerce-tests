Feature: My Account Page
  As a registered user
  I want to access my account page using cookie injection
  So that I can view my account details without going through the full login flow

  Scenario: Access My Account page via API token injection
    Given I have obtained a login token via the API
    When I inject the token as a browser cookie
    And I navigate to the My Account page
    Then the My Account page heading should be visible
