import { test, expect } from '@playwright/test';

test.describe('PeakFam App', () => {
  test('should display the app title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the title is displayed
    await expect(page.getByText('PeakFam')).toBeVisible();
    await expect(page.getByText('Macro and Calorie Tracking App')).toBeVisible();
  });

  test('should display initial calorie count of 0', async ({ page }) => {
    await page.goto('/');
    
    // Check if the initial calorie count is 0
    await expect(page.getByText('0')).toBeVisible();
  });

  test('should increment calories when +100 button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click the +100 button
    await page.getByRole('button', { name: '+100' }).click();
    
    // Check if the calorie count is updated to 100
    await expect(page.getByText('100')).toBeVisible();
  });

  test('should increment calories when +200 button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click the +200 button
    await page.getByRole('button', { name: '+200' }).click();
    
    // Check if the calorie count is updated to 200
    await expect(page.getByText('200')).toBeVisible();
  });

  test('should reset calories to 0 when reset button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // First add some calories
    await page.getByRole('button', { name: '+100' }).click();
    await expect(page.getByText('100')).toBeVisible();
    
    // Then reset
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByText('0')).toBeVisible();
  });

  test('should accumulate calories correctly', async ({ page }) => {
    await page.goto('/');
    
    // Add multiple calories
    await page.getByRole('button', { name: '+100' }).click();
    await page.getByRole('button', { name: '+200' }).click();
    await page.getByRole('button', { name: '+100' }).click();
    
    // Check if the total is correct (400)
    await expect(page.getByText('400')).toBeVisible();
  });
});
