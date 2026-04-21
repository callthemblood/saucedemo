import { expect, test } from '@playwright/test';
import data from '../fixtures/data/credentials.json'
import loginPage from '../fixtures/pages/loginPage';
import inventoryPage from '../fixtures/pages/inventoryPage';
import cartPage from '../fixtures/pages/cartPage';
import checkoutPage from '../fixtures/pages/checkoutPage';

test('remove item deletes it from cart and allow continuing checkout', async ({ page }) => {
  const credentials = data;
  const login = new loginPage(page);
  const inventory = new inventoryPage(page);
  const cart = new cartPage(page);
  const checkout = new checkoutPage(page);

  await page.goto('/');
  await login.logIn(credentials.login, credentials.password);
  await expect(page).toHaveURL(/.*\/inventory\.html/);

  await inventory.addBackpackToCart();
  await inventory.addBikeLightToCart();
  await expect(inventory.cartBadge()).toHaveText('2');

  await inventory.openCart();
  await expect(page).toHaveURL(/.*\/cart\.html/);

  await expect(cart.cartItems()).toHaveCount(2);
  await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();

  await cart.removeBikeLight();

  await expect(cart.cartItems()).toHaveCount(1);
  await expect(cart.cartBadge()).toHaveText('1');
  await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).not.toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  await cart.checkout();
  await expect(page).toHaveURL(/.*\/checkout-step-one\.html/);

  await checkout.fillInformation(credentials.firstName, credentials.lastName, credentials.zip);
  await checkout.continue();

  await expect(page).toHaveURL(/.*\/checkout-step-two\.html/);

  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
});

