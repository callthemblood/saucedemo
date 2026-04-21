import type { Locator, Page } from '@playwright/test';

class inventoryPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addBackpackToCart() {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  async addBikeLightToCart() {
    await this.page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  cartBadge(): Locator {
    return this.page.getByTestId('shopping-cart-badge');
  }

  names(): Locator {
    return this.page.locator('.inventory_item_name');
  }
}

export default inventoryPage;

