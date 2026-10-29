# Playwright E-Commerce Tests

> End-to-end Playwright test suite for a demo e-commerce web app, covering the basket, registration, checkout and account flows across desktop and mobile browsers.

![Tests](https://github.com/Carlos-44/playwright-ecommerce-tests/actions/workflows/test.yml/badge.svg)

## Tech Stack
- **Language:** JavaScript (Node.js)
- **Framework:** Playwright Test
- **Design:** Page Object Model (`pageObject/`), JSON test data (`Data/`)
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- **CI:** GitHub Actions

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Install
```bash
npm install
npx playwright install
```

### Start the demo app
The tests run against a local shop app on `http://localhost:2221`.
- **Linux:** `./binaries/shopping-store-linux-amd64`
- **Windows:** `npm run start` (needs `shopping-store.exe` in the project root)

Override the URL with `SERVER_URL` in a `.env` file if needed.

### Run Tests
```bash
# Run all tests
npm test

# Run with the Playwright UI
npm run test:ui

# Run a specific test file
npx playwright test tests/productPageAddItem.spec.js

# Open the last HTML report
npm run test:report
```

## What's Tested
- **Basket** (`productPageAddItem.spec.js`): adds 5 products, checks that each button toggles to "Remove from Basket" and the basket counter goes up, then navigates to `/basket` (uses the burger menu on mobile viewports)
- **New user journey** (`newUserFullJourney.spec.js`): sorts products by price, adds and removes basket items, registers a new user with generated data, fills and checks delivery details, applies a discount code and fills payment details from JSON data
- **My Account via API login** (`myAccount.spec.js`): gets a token from `/api/login`, injects it as a cookie and checks that the "My Account" page loads without the UI login

## CI/CD
Every push and pull request to `main` starts the demo app and runs the full suite in GitHub Actions (see `.github/workflows/test.yml`):
- Results appear as a GitHub Check through [dorny/test-reporter](https://github.com/dorny/test-reporter) (JUnit XML)
- The HTML report, failure screenshots and videos are uploaded as artifacts for 14 days
- npm packages and Playwright browsers are cached between runs

## Author
Carlos Ozoria — [LinkedIn](https://www.linkedin.com/in/carlos-ozoria-0a292030b)
