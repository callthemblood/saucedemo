# Specs

This is a directory for test plans.
Context (from this repo)

1. Project uses Playwright Test with TS config in playwright.config.ts (baseURL set), so tests should page.goto('/').
2. Existing page object: fixtures/pages using mostly data-testid selectors.
3. Test data exists in fixtures/data/credentials.json with login, password as a basic data and firstName, lastName, zip as a order-creatin part.

Conventions to follow
1. Keep tests under tests/ as *.spec.ts.
2. Reuse fixtures/data/credentials.json for credentials + checkout info.
3. Prefer getByTestId() selectors (SauceDemo supports these widely) and assert on URL changes and visible UI state.
4. Use deterministic item selection (pick 2 specific SKUs by data-testid), not "first item", to avoid flakiness.

---

# Test plan 1: Main autotest (login + add 2 + verify cart)
Goal: Validate core purchase funnel entry: user can login, add two specific items, and cart shows both.
Proposed spec file: tests/cart-add-verify.spec.ts
Steps + key assertions:
1. Navigate to login page: page.goto(credentials.url).
2. Login using loginPage.logIn(credentials.login, credentials.password).
3. Assert page is on inventory: expect(page).toHaveURL('https://www.saucedemo.com/inventory.html').
4. Add two specific items from inventory (example SKUs):
5. Click page.getByTestId('add-to-cart-sauce-labs-backpack').
6. Click page.getByTestId('add-to-cart-sauce-labs-bike-light').
7. Assert cart badge count is 2: expect(page.getByTestId('shopping_cart_badge')).toHaveText('2').
8. Open cart: click page.getByTestId('shopping_cart_link').
9. Assert cart URL: expect(page).toHaveURL(/.*\/cart\.html/).
10. Verify cart contains both items:
  - Assert both item names are visible within cart list (use getByText on known names, or use cart item testids if preferred).
  - Assert there are exactly 2 cart items: locator .cart_item count (fallback when no testid exists for list).

---

# Test plan 2: Add 2 + remove 1 (deletion) + checkout info + overview
Goal: Validate that removing an item deletes it from the cart, and the user can still proceed to the checkout overview.
Proposed spec file: tests/checkout-remove-price-change.spec.ts
Steps + key assertions:
1. Login (same as Test 1).
2. Add two specific items (same SKUs as Test 1 for reuse).
3. Go to cart.
8. Remove one item in cart:
9. Click page.getByTestId('remove-sauce-labs-bike-light') (or whichever you choose to remove).
10. Assert cart item count becomes 1 and cart badge becomes 1 (badge may disappear when 0; for 1 it should show 1).
11. Assert the removed item name is not visible in the cart anymore.
11. Continue checkout:
  - Click page.getByTestId('checkout').
  - Assert URL checkout-step-one.html.
  - Fill checkout information:
    -Fill first-name, last-name, postal-code using credentials.json.
  - Click continue.
12. Assert URL checkout-step-two.html (Overview).
13. Confirm overview:
  - Assert the remaining item name is shown in overview.
14. Optionally click finish and assert completion URL/text (checkout-complete.html and THANK YOU FOR YOUR ORDER) if you interpret “Confirm overview” as completing the order.

---

# How to run tests

From the project root:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Run only Chromium (faster):

```bash
npx playwright test --project=chromium
```