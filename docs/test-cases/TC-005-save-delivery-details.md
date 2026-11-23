# TC-005: Save delivery details

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-02 AC-03 ([F-02](../features/F-02-checkout-journey.md))
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/newUserFullJourney.spec.js` ("[TC-003][TC-004][TC-005][TC-006] New user full end to end journey").

## Preconditions
- On `/delivery-details` as a new customer.

## Test data
- Random delivery details. Country and city from `Data/countries.json`.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Fill in first name, last name, street, postcode, city and country. | The step completes without an error. [INFERRED] |
| 2 | Save. | The payment page opens. |

**Pass criteria:** The payment page opens.

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
