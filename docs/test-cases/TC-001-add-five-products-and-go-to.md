# TC-001: Add five products and go to the basket

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-01 AC-01 ([F-01](../features/F-01-basket.md))
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/productPageAddItem.spec.js` ("[TC-001][TC-002] Click All Submit Buttons, Verify Text Changes, Checkout, and Navigate to Basket").

## Preconditions
- The store is running.
- The basket counter shows 0.

## Test data
- Products on the store home page.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Open `/`. | The step completes without an error. [INFERRED] |
| 2 | Click "Add to Basket" on products 1 to 5, one at a time. | Each button changes to "Remove from Basket", and the counter goes 1, 2, 3, 4, 5. |

**Pass criteria:** Each button changes to "Remove from Basket", and the counter goes 1, 2, 3, 4, 5.

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
