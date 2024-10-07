export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("E-Mail");
    this.passwordInput = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  // Function to generate a unique email using UUID
  generateRandomEmail() {
    const uniqueId = uuidv4();
    return `user_${uniqueId}@gmail.com`;
  }

  // Function to generate a random password
  generateRandomPassword() {
    return `Pass${uuidv4().slice(0, 8)}!`;
  }

  // Accepts random email and password as parameters
  signUpAsNewUser = async (randomEmail, randomPassword) => {
    try {
      // Use the passed-in parameters for email and password
      await this.emailInput.waitFor();
      await this.emailInput.fill(randomEmail);
      await this.passwordInput.waitFor();
      await this.passwordInput.fill(randomPassword);
      await this.registerButton.waitFor();
      await this.registerButton.click();
    } catch (error) {
      throw new Error(`Error during user signup: ${error}`);
    } finally {
    }
  };
}
