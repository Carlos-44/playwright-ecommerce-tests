# TC-007: My Account opens with an API token cookie

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-03 AC-01 ([F-03](../features/F-03-my-account.md))
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. Automated spec: `tests/myAccount.spec.js` ("[TC-007] My account using cookie injection").

## Preconditions
- The store is running.
- Admin credentials available.

## Test data
- Admin credentials from `Data/UserDetailAPI.js` or `.env` (not reproduced here).

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | `POST /api/login` to get a token. | The step completes without an error. [INFERRED] |
| 2 | Open My Account. | The step completes without an error. [INFERRED] |
| 3 | Set `document.cookie = token=<token>`. | The step completes without an error. [INFERRED] |
| 4 | Open My Account again. | The My Account page heading is visible. |

**Pass criteria:** The My Account page heading is visible.

## Notes
- Evidence: the main CI push run 45242792325 (2026-11-23, ubuntu-24.04, before the binary job was limited to manual runs) ran the existing specs on 5 browser projects: 14 passed and 1 flaky ([webkit] myAccount timed out once, then passed on retry).
