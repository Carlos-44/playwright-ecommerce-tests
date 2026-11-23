# TC-002: Checkout link opens the basket (desktop and mobile)

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-01 AC-02
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/productPageAddItem.spec.js` ("Click All Submit Buttons, Verify Text Changes, Checkout, and Navigate to Basket").

## Preconditions
- At least one item in the basket.

## Test data
- Products on the store home page.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Click Checkout (desktop nav, or the burger menu on mobile). | The URL is `/basket`. |

**Pass criteria:** The URL is `/basket`.

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
