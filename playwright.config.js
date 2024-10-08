const { devices } = require("@playwright/test");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const config = {
  testDir: "./tests", // Test directory

  // Global timeouts
  timeout: 60 * 1000, // Test timeout of 60 seconds
  expect: {
    timeout: 10000, // Timeout for expect assertions
  },

  fullyParallel: true, // Run tests in parallel

  // Fail the build if any test has .only left in code
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 3 : 1,

  // Number of workers (parallelism)
  workers: process.env.CI ? 2 : 4,

  // Reporters for different outputs
  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "results.xml" }],
  ],

  use: {
    // Global settings for all projects
    actionTimeout: 15000, // Timeout for actions like page.click()
    baseURL: process.env.SERVER_URL || "http://localhost:2221", // Use SERVER_URL from .env
    trace: "on-first-retry", // Enable trace for debugging on the first retry
    video: "on-first-retry", // Record video on the first retry
    headless: !!process.env.CI, // Headless mode in CI
    screenshot: "only-on-failure", // Take screenshots only on failures
  },

  // Configure browser environments
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: !!process.env.CI, // Headless only in CI
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: !!process.env.CI, // Headless only in CI
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        headless: !!process.env.CI, // Headless only in CI
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        headless: !!process.env.CI, // Headless only in CI
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        headless: !!process.env.CI, // Headless only in CI
      },
    },
    // Removed Microsoft Edge and Google Chrome configurations
  ],

  // Configure web server settings
  webServer: {
    command: "npm run start", // Command to start the app
    port: 2221, // Port where the app is served
    timeout: 300 * 1000, // Increased timeout to 5 minutes to ensure server starts
    reuseExistingServer: true, // Reuse server to avoid port conflicts
  },

  globalSetup: require.resolve("./globalSetup"), // Run global setup before tests
};

module.exports = config;
