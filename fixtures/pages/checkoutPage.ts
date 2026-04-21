import type { Page } from '@playwright/test';

class checkoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(zip);
  }

  async continue() {
    await this.page.getByTestId('continue').click();
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }

}

export default checkoutPage;

