import type { Locator, Page } from '@playwright/test';

class cartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  cartItems(): Locator {
    return this.page.locator('.cart_item');
  }

  cartBadge(): Locator {
    return this.page.getByTestId('shopping-cart-badge');
  }

  async removeBikeLight() {
    await this.page.getByTestId('remove-sauce-labs-bike-light').click();
  }

  async checkout() {
    await this.page.getByTestId('checkout').click();
  }
}

export default cartPage;

