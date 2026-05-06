import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display the homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check title
    await expect(page).toHaveTitle(/Xavier College/)
    
    // Check hero section
    await expect(page.getByText('Academic Excellence through')).toBeVisible()
    await expect(page.getByText('Modernist Clarity')).toBeVisible()
    
    // Check navigation
    await expect(page.getByText('Academics')).toBeVisible()
    await expect(page.getByText('Admissions')).toBeVisible()
    await expect(page.getByText('Apply Now')).toBeVisible()
  })

  test('should navigate to apply page', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Apply Now').first().click()
    await expect(page).toHaveURL(/.*apply/)
    await expect(page.getByText('Admissions Application')).toBeVisible()
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Contact').first().click()
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.getByText('Contact Us')).toBeVisible()
  })

  test('should display departments section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Our Departments')).toBeVisible()
    await expect(page.getByText('Theoretical Physics')).toBeVisible()
    await expect(page.getByText('Modern Philosophy')).toBeVisible()
    await expect(page.getByText('Architectural Design')).toBeVisible()
  })
})
