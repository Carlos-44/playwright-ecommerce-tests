// Admin account of the local demo app. Values come only from environment
// variables (for example a gitignored .env file, loaded by globalSetup.js).
// Nothing is hardcoded: if a variable is missing, the test that needs the
// admin login fails with a message naming it.
const REQUIRED = ["ADMIN_USERNAME", "ADMIN_PASSWORD"];

export function getAdminDetails() {
  const missing = REQUIRED.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(
      `Missing environment variable(s): ${missing.join(", ")}. ` +
        "Set them (for example in .env) to run the admin login test (TC-007)."
    );
  }
  return { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };
}
