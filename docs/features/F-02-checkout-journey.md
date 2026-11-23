# F-02: New customer checkout journey
Status: Draft

## Summary (2 to 3 sentences)
A new customer sorts products by cheapest, adds three, removes the two cheapest in the basket, registers, enters delivery details, applies a discount and pays.

## User story
As a new customer, I want to register and complete checkout, so that I can make my first purchase.

## Preconditions
- The store binary is running.
- Signed out.

## Functional requirements (FR-NN)
- FR-01: Products can be sorted by cheapest and added to the basket.
- FR-02: Items can be removed from the basket.
- FR-03: "Continue to checkout" leads to login, with a link to signup.
- FR-04: Signup with a new email and password leads to `/delivery-details`.
- FR-05: Delivery details are saved and lead to payment.
- FR-06: A discount can be applied on the payment page.
- FR-07: Payment completes the order [INFERRED: there's no confirmation check in the spec].

## Acceptance criteria (AC-NN, each one testable)
- AC-01: After adding the 3 cheapest products and removing 2 in the basket, continuing to checkout opens the login page with a signup option.
- AC-02: Registering with a new unique email opens `/delivery-details`, showing "Delivery details".
- AC-03: Saving valid delivery details opens the payment page.
- AC-04: Applying the discount and completing payment with test card data confirms the order [INFERRED].

## Out of scope
- Returning-customer login during checkout.
- Real payment providers.

## Open questions
- Open question: What confirmation should the spec assert at the end of payment (gap G-2)?

## Source files this feature touches
- tests/newUserFullJourney.spec.js
- features/new-user-journey.feature
- pageObject/CheckoutPage.js
- pageObject/LoginPage.js
- pageObject/RegisterPage.js
- pageObject/DeliveryDetails.js
- pageObject/PaymentPage.js
- Data/countries.json
- Data/creditCards.json
