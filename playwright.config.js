// @ts-check
const { devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests", // Directory where the test files are located
  /* Maximum time one test can run for. */
  timeout: 30 * 1000, // 30 seconds per test timeout
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000, // 5 seconds for assertions like expect(locator).toHaveText()
  },

  globalSetup: require.resolve("./globalSetup.js"),
  /* Run tests in files in parallel */
  fullyParallel: true, // All tests run in parallel, faster for larger suites
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // Retries tests up to 2 times in CI environment for flaky tests
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,  // Limit workers to 2 on CI to avoid race conditions
  /* Reporter to use. */
  reporter: "line", // Line reporter shows concise test status in console

  /* Shared settings for all the projects below. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0, // No action timeout by default
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:2221", // Default base URL for the tests

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry", // Collect trace only when retrying failed tests

    /* Ensure headless mode is used in all environments */
    headless: true, // Use headless mode for all tests

    /* Disable videos and screenshots to speed up test execution */
    video: 'off', // Disable video recording to reduce overhead
    screenshot: 'off', // Disable screenshots unless necessary for debugging
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

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',  // Command to start the server before tests
    port: 2221,  // The port where your application will run
    timeout: 120 * 1000,  // Max time to wait for the server to start (120 seconds)
    reuseExistingServer: !process.env.CI,  // Reuse the server for faster tests locally
  },

  /* Configure maximum workers */
  workers: process.env.CI ? 2 : 4, // Limits the number of workers to 2 on CI, 4 locally

  /* Save videos of test executions if needed */
  // use: {
  //   video: 'on',  // Enable video recording for every test run if necessary
  // },

  /* Configure custom reporter */
  // reporter: [['dot'], ['json', { outputFile: 'test-results.json' }]],  // Use multiple reporters
};

module.exports = config;
