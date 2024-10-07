const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",

  timeout: 60 * 1000, // Test timeout of 60 seconds

  expect: {
    timeout: 10000, // Timeout for expect assertions
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 3 : 1, // Retry failed tests 3 times in CI

  workers: process.env.CI ? 2 : 4,

  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "results.xml" }],
  ],

  use: {
    actionTimeout: 15000, // Action timeout of 15 seconds
    baseURL: "http://localhost:2221", // Local server URL
    trace: "on-first-retry",  // Enable trace on the first retry for debugging
    video: "on-first-retry",  // Record video on the first retry
    headless: true,  // Always run in headless mode
    screenshot: "only-on-failure", // Capture screenshots on failure
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        headless: true,
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        headless: true,
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        headless: true,
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge",
        headless: true,
      },
    },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
        headless: true,
      },
    },
  ],

  webServer: {
    command: "npm run start",
    port: 2221,
    timeout: 180 * 1000,  // Server timeout of 180 seconds
    reuseExistingServer: true,
  },

  globalSetup: require.resolve("./globalSetup"),
};

module.exports = config;
