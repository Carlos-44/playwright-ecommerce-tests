# TC-006: Apply discount and pay

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-02 AC-04 ([F-02](../features/F-02-checkout-journey.md))
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/newUserFullJourney.spec.js` ("[TC-003][TC-004][TC-005][TC-006] New user full end to end journey").

## Preconditions
- On the payment page.

## Test data
- Card data from `Data/creditCards.json` (published test-card numbers, not reproduced here).
- A discount code applied by `PaymentPage.activateDiscount()`.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Apply the discount. | The step completes without an error. [INFERRED] |
| 2 | Enter test card data from `Data/creditCards.json`. | The step completes without an error. [INFERRED] |
| 3 | Complete payment. | The order is confirmed [INFERRED]. |

**Pass criteria:** The order is confirmed [INFERRED].

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
- The Playwright spec has no confirmation assertion (gap G-2), so it can pass without the order being confirmed.
- Card values aren't reproduced in docs.
