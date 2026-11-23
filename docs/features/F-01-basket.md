# F-01: Product list and basket
Status: Draft

## Summary (2 to 3 sentences)
Shoppers add products to the basket from the product list. Each button toggles to "Remove from Basket", the header counter updates, and Checkout opens the basket page.

## User story
As a shopper, I want to add several products to my basket, so that I can check out with them.

## Preconditions
- The store binary is running at http://localhost:2221.

## Functional requirements (FR-NN)
- FR-01: Each product has an "Add to Basket" button that toggles to "Remove from Basket" when clicked.
- FR-02: The header basket counter shows the number of items.
- FR-03: The Checkout link (desktop nav, or the mobile burger menu) opens `/basket`.
- FR-04: Products can be sorted by cheapest.

## Acceptance criteria (AC-NN, each one testable)
- AC-01: Starting from 0, clicking "Add to Basket" on 5 products changes each button to "Remove from Basket" and increments the counter to 1, 2, 3, 4 and 5.
- AC-02: Clicking Checkout opens `/basket` on desktop and mobile viewports.

## Out of scope
- Product detail pages.

## Open questions
- None.

## Source files this feature touches
- tests/productPageAddItem.spec.js
- features/product-page-add-item.feature
- pageObject/ProductsPage.js
- pageObject/NavigationPage.js
- Utility/isDesktopViewport.js
