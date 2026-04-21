import { expect, test } from '@playwright/test';
import data from '../fixtures/data/credentials.json'
import loginPage from '../fixtures/pages/loginPage';
import inventoryPage from '../fixtures/pages/inventoryPage';


test('login + add two items + verify cart contains them', async ({ page }) => {
  const credentials = data;
  const login = new loginPage(page);
  const inventory = new inventoryPage(page);

  await page.goto('/');

  await login.logIn(credentials.login, credentials.password);

  await expect(page).toHaveURL(/.*\/inventory\.html/);

  await inventory.addBackpackToCart();
  await inventory.addBikeLightToCart();

  await expect(inventory.cartBadge()).toHaveText('2');

  await inventory.openCart();
  await expect(page).toHaveURL(/.*\/cart\.html/);

  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
});

