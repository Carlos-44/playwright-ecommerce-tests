# Test cases: traceability

New IDs start at TC-001. Each acceptance criterion in `docs/features/` has at least one test case.

| Requirement | Test cases | Automated |
|---|---|---|
| F-01 AC-01 | [TC-001](TC-001.md) | No |
| F-01 AC-02 | [TC-002](TC-002.md) | No |
| F-02 AC-01 | [TC-003](TC-003.md) | No |
| F-02 AC-02 | [TC-004](TC-004.md) | No |
| F-02 AC-03 | [TC-005](TC-005.md) | No |
| F-02 AC-04 | [TC-006](TC-006.md) | No |
| F-03 AC-01 | [TC-007](TC-007.md) | No |
| F-03 AC-02 | [TC-008](TC-008.md) | No |

Totals: 8 test cases. 7 have an existing automated test, and 1 have none. None are marked Automated yet; statuses are set after a recorded test run.

Notes:
- Each Playwright test runs on 5 browser projects, so one test case maps to 5 runs.
- The Cucumber features in `features/` mirror TC-001 and TC-002, TC-003 to TC-006, and TC-007.
- No card numbers or credentials are reproduced in these docs.
- The workflow on this branch is pinned to `ubuntu-24.04` (Playwright 1.47.2 predates Ubuntu 26.04, which `ubuntu-latest` now uses).
