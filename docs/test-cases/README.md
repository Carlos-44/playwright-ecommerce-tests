# Test cases: traceability

One manual test-case file per test case. They cover the 3 Playwright specs (`productPageAddItem`, `newUserFullJourney`, `myAccount`), which run on 5 browser projects each. Every case is Manual only on this PC, because the store is a Linux-only binary.

| TC ID | Feature | Status | Automation file — test name | Manual file |
|---|---|---|---|---|
| TC-001 | [F-01](../features/F-01-basket.md) | Manual only | `tests/productPageAddItem.spec.js` — [TC-001][TC-002] Click All Submit Buttons, Verify Text Changes, Checkout, and Navigate to Basket | [TC-001-add-five-products-and-go-to.md](TC-001-add-five-products-and-go-to.md) |
| TC-002 | [F-01](../features/F-01-basket.md) | Manual only | `tests/productPageAddItem.spec.js` — [TC-001][TC-002] Click All Submit Buttons, Verify Text Changes, Checkout, and Navigate to Basket | [TC-002-checkout-link-opens-the-basket-desktop.md](TC-002-checkout-link-opens-the-basket-desktop.md) |
| TC-003 | [F-02](../features/F-02-checkout-journey.md) | Manual only | `tests/newUserFullJourney.spec.js` — [TC-003][TC-004][TC-005][TC-006] New user full end to end journey | [TC-003-basket-edits-lead-to-login-and.md](TC-003-basket-edits-lead-to-login-and.md) |
| TC-004 | [F-02](../features/F-02-checkout-journey.md) | Manual only | `tests/newUserFullJourney.spec.js` — [TC-003][TC-004][TC-005][TC-006] New user full end to end journey | [TC-004-new-customer-registers-during-checkout.md](TC-004-new-customer-registers-during-checkout.md) |
| TC-005 | [F-02](../features/F-02-checkout-journey.md) | Manual only | `tests/newUserFullJourney.spec.js` — [TC-003][TC-004][TC-005][TC-006] New user full end to end journey | [TC-005-save-delivery-details.md](TC-005-save-delivery-details.md) |
| TC-006 | [F-02](../features/F-02-checkout-journey.md) | Manual only | `tests/newUserFullJourney.spec.js` — [TC-003][TC-004][TC-005][TC-006] New user full end to end journey | [TC-006-apply-discount-and-pay.md](TC-006-apply-discount-and-pay.md) |
| TC-007 | [F-03](../features/F-03-my-account.md) | Manual only | `tests/myAccount.spec.js` — [TC-007] My account using cookie injection | [TC-007-my-account-opens-with-an-api.md](TC-007-my-account-opens-with-an-api.md) |
| TC-008 | [F-03](../features/F-03-my-account.md) | Manual only | — | [TC-008-my-account-without-a-token.md](TC-008-my-account-without-a-token.md) |

Totals: 8 test cases — 0 Automated, 8 Manual only, 0 Not started.

Notes:
- Card data lives only in `Data/creditCards.json`, which uses published test-card numbers since 2026-11-23. No numbers are reproduced in these docs.
- Admin login values come from `Data/UserDetailAPI.js` or `ADMIN_PASSWORD` in `.env`, and aren't reproduced here.
