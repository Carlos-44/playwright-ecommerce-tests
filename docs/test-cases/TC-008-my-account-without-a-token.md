# TC-008: My Account without a token

- **Priority:** P3
- **Type:** negative
- **Linked criteria:** F-03 AC-02
- **Status:** Manual only
- **Automation:** Manual only: needs a system install. The store under test is a Linux-only binary (`binaries/shopping-store-linux-amd64`), which needs WSL or Docker on this Windows PC. In CI the test job runs only on manual (`workflow_dispatch`) runs. No automated test exists yet.

## Preconditions
- The store is running, with no token cookie.

## Test data
- Admin credentials from `Data/UserDetailAPI.js` or `.env` (not reproduced here).

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Open My Account. | Account details aren't shown (a redirect or an error) [INFERRED]. |

**Pass criteria:** Account details aren't shown (a redirect or an error) [INFERRED].
