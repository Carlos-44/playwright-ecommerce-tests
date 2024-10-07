// @ts-check
const { devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests", // Directory where the test files are located

  /* Maximum time one test can run for. */
  timeout: 60 * 1000, // Increased to 60 seconds per test timeout

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000, // Increased to 10 seconds for assertions
  },

  globalSetup: require.resolve("./globalSetup.js"),

  /* Run tests in files in parallel */
  fullyParallel: true, // All tests run in parallel, faster for larger suites

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, // Fail if test.only is in the code in CI

  /* Retry on CI only */
  retries: process.env.CI ? 3 : 1, // Retries tests up to 3 times in CI, 1 retry locally

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 4, // Limits workers to 2 on CI and 4 locally

  /* Reporter configuration with detailed options */
  reporter: [
    ["line"],  // Concise console output
    ["html", { outputFolder: "playwright-report", open: "never" }], // HTML report generation
    ["junit", { outputFile: "results.xml" }]  // JUnit XML report for CI
  ],

  /* Shared settings for all projects below. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 15000, // Increased action timeout to 15 seconds

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:2221", // Default base URL for the tests

    /* Collect trace when retrying the failed test for debugging */
    trace: "on-first-retry", // Collect trace only when retrying failed tests

    /* Ensure headless mode is used in all environments */
    headless: true, // Use headless mode for all tests

    /* Enable video and screenshots for failed tests */
    video: "retain-on-failure", // Keep videos only for failed tests
    screenshot: "only-on-failure", // Capture screenshots only for failed tests
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium", // Tests running in Google Chrome
      use: {
        ...devices["Desktop Chrome"],
        headless: true, // Enforcing headless mode for Chrome
      },
    },
    {
      name: "firefox", // Tests running in Firefox
      use: {
        ...devices["Desktop Firefox"],
        headless: true, // Enforcing headless mode for Firefox
      },
    },
    {
      name: "webkit", // Tests running in Safari (WebKit)
      use: {
        ...devices["Desktop Safari"],
        headless: true, // Enforcing headless mode for Safari
      },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome", // Tests running in a mobile Chrome environment (simulated)
      use: {
        ...devices["Pixel 5"],
        headless: true, // Enforcing headless mode for Mobile Chrome
      },
    },
    {
      name: "Mobile Safari", // Tests running in a mobile Safari environment (simulated)
      use: {
        ...devices["iPhone 12"], // Simulates iPhone 12 device
        headless: true, // Enforcing headless mode for Mobile Safari
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge", // Uses Microsoft Edge instead of Chromium
        headless: true, // Enforcing headless mode for Microsoft Edge
      },
    },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome", // Uses the actual Google Chrome browser
        headless: true, // Enforcing headless mode for Google Chrome
      },
    },
  ],

  webServer: {
    command: "npm run start", // Command to start the server before tests
    port: 2221, // The port where your application will run
    timeout: 180 * 1000, // Increased max time to wait for the server to start (180 seconds)
    reuseExistingServer: true, // Reuse the existing server if it's already running
  },
};

module.exports = config;
