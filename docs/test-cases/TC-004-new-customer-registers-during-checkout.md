# TC-004: New customer registers during checkout

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-02 AC-02 ([F-02](../features/F-02-checkout-journey.md))
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/newUserFullJourney.spec.js` ("[TC-003][TC-004][TC-005][TC-006] New user full end to end journey").

## Preconditions
- On the login page from checkout.

## Test data
- A unique email (`user_<uuid>@gmail.com`) and an 8-character password generated at run time.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Go to signup. | The step completes without an error. [INFERRED] |
| 2 | Register with a unique email and password. | The URL is `/delivery-details`, and "Delivery details" is visible. |

**Pass criteria:** The URL is `/delivery-details`, and "Delivery details" is visible.

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
