# Ydin E2E Tests

End-to-end testing suite for the Ydin applications using Playwright.

> Part of the [Ydin](../../README.md) suite of health and wellness apps.

## Overview

This package contains cross-browser end-to-end tests that verify critical user journeys across the Ydin apps.

## Commands

Run from this directory (`packages/E2E`):

```bash
# Run all tests
pnpm test

# Run tests in headed mode (see the browser)
pnpm test:headed

# Run tests with Playwright UI
pnpm test:ui

# Debug tests
pnpm test:debug

# View HTML test report
pnpm report
```

## Configuration

Tests are configured in `playwright.config.ts`:

- **Test directory**: `./tests`
- **Base URL**: `http://localhost:5173`
- **Browsers**: Chromium, Firefox, WebKit
- **Dev server**: Automatically starts the Nutrition app before tests

## Writing Tests

Tests are located in `tests/`. Create new test files with `.spec.ts` extension:

```typescript
// tests/myFeature.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete action', async ({ page }) => {
  await page.goto('/');
  
  // Interact with the page
  await page.getByPlaceholder('Search food').fill('Apple');
  await page.getByText('Apple (100g)').click();
  
  // Assert results
  await expect(page.getByText('Added to diary')).toBeVisible();
});
```

### Best Practices

1. **Test user journeys, not implementation** - Focus on what users do, not how the code works
2. **Use accessible selectors** - Prefer `getByRole`, `getByText`, `getByPlaceholder` over CSS selectors
3. **Keep tests independent** - Each test should run in isolation
4. **Test critical paths** - Prioritize tests for core user flows

## Test Structure

```
tests/
├── app.spec.ts          # Main app tests
└── [feature].spec.ts    # Feature-specific tests
```

## CI Integration

On CI, tests run with:
- Single worker (`workers: 1`)
- Retries enabled (`retries: 2`)
- `test.only` detection (fails build if found)

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for testing strategy and guidelines.

