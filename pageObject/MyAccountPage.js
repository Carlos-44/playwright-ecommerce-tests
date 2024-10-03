export class MyAccountPage {
    constructor(page) {
      this.page = page;
      // Locate the "My Account" heading by role
      this.pageHeading = page.getByRole('heading', { name: 'My Account' });
    }
  
    // Method to visit the My Account page
    async visit() {
      await this.page.goto('/my-account');
     
    }
  
    // Method to wait for the "My Account" heading to appear
    async waitForPageHeading() {
      await this.pageHeading.waitFor(); // Ensures heading is visible before proceeding
    }
  }
  