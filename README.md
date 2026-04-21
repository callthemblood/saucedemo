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

Other configured scripts:

```json
  "scripts": {
    "test": "npx playwright test",
    "test:main": "npx playwright test",
    "test:mine": "npx playwright test tests/my-own-tasks",
    "test:headed": "npx playwright test --headed",
    "test:headed:1": "npx playwright test --headed --workers=1",
    "test:debug": "npx playwright test --debug"
  },
```
