const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",

  timeout: 60 * 1000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 3 : 1,

  workers: process.env.CI ? 2 : 4,

  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "results.xml" }],
  ],

  use: {
    actionTimeout: 15000,

    baseURL: "http://localhost:2221",

    trace: "on-first-retry",

    headless: true,

    video: "retain-on-failure",
    screenshot: "only-on-failure",
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
    timeout: 180 * 1000,
    reuseExistingServer: true,
  },

  globalSetup: require.resolve("./globalSetup"),
};

module.exports = config;
