import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display the homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check title
    await expect(page).toHaveTitle(/Xavier/)
    
    // Check hero section
    await expect(page.getByText('Academic Excellence through')).toBeVisible()
    await expect(page.getByText('Modernist Clarity')).toBeVisible()
    
    // Check navigation is present (now in shared Header)
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('link', { name: /Academics/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Apply Now/i }).first()).toBeVisible()
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Contact/i }).first().click()
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.getByText('Contact Us')).toBeVisible()
  })

  test('should display departments section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Our Departments')).toBeVisible()
  })
})
