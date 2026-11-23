# 00 Baseline spec: demo shopping store (local binary)

Status: Draft
Date: 2026-11-23
Source: read from `tests/*.spec.js`, `features/*.feature`, the page objects in `pageObject/`, `globalSetup.js`, `API-Calls/getLoginToken.js`, `playwright.config.js`, `.github/workflows/test.yml` and README.md. Items marked [INFERRED] were deduced, not read from a written spec.

## Purpose
This repo tests a **demo e-commerce store** that is shipped as a **prebuilt Linux binary** (`binaries/shopping-store-linux-amd64`) and served at http://localhost:2221. Shoppers browse and sort products, manage a basket, register, enter delivery details, apply a discount and pay. The repo contains the tests only, not the store's source code. Where the binary came from isn't documented [INFERRED: a course or demo app].

## User roles
| Role | Can do |
|---|---|
| Visitor | Browse products, sort by price, add to and remove from the basket, go to checkout |
| New customer | Register (email and password) during checkout, enter delivery details, pay |
| Admin | Log in through `POST /api/login` to get a token, and open My Account (the token goes in a `token` cookie) |

Credentials: the admin login comes from `Data/UserDetailAPI.js`, which falls back to a default when `ADMIN_PASSWORD` isn't set in `.env`. Payment test data is in `Data/creditCards.json`. **This document doesn't reproduce any credential or card values.**

## Main flows
1. **Products:** `/` lists products with "Add to Basket" buttons and can be sorted by cheapest. The header basket counter updates.
2. **Basket and checkout:** `/basket` lists the items, which can be removed. "Continue to checkout" leads to login or signup.
3. **Register:** the signup form (email and password) leads to `/delivery-details`.
4. **Delivery details:** first name, last name, street, postcode, city and country, then save.
5. **Payment:** apply a discount code, enter card details and complete the order.
6. **My Account:** an API token injected as a cookie leads to the My Account page heading.

## Data
- **Inputs:** generated emails and passwords (uuid), random delivery details, countries from `Data/countries.json`, and card data from `Data/creditCards.json` (values not reproduced here).
- **Outputs:** the basket count, button text toggling between "Add to Basket" and "Remove from Basket", page navigation and the order confirmation.

## Integrations
- **App under test:** the bundled binary, Linux-only. `globalSetup.js` fails fast if http://localhost:2221 isn't up.
- **API:** `POST /api/login` returns `{ token }`.
- **CI:** GitHub Actions (`test.yml`) runs on push and PR to main. It starts the binary, installs Playwright browsers with system dependencies, and runs 5 browser projects (Chromium, Firefox, WebKit, Pixel 5, iPhone 12).

## Existing tests
- **Playwright:** 3 specs (`myAccount`, `newUserFullJourney`, `productPageAddItem`), each running on 5 projects, so 15 runs.
- **Cucumber:** 3 matching scenarios in `features/` (`npm run test:bdd`). They aren't run in CI.

## Known gaps
- **G-1:** the store only runs on Linux (the binary), so it can't run locally on Windows without WSL or Docker.
- **G-2:** the new-user journey has no final assertion in the Playwright spec; it ends after `completePayment`. The Cucumber scenario expects "the order should be confirmed".
- **G-3:** the `start` script points at `shopping-store.exe`, which isn't in the repo.
- **G-4:** there are no negative tests (invalid payment, required delivery fields, wrong login).
