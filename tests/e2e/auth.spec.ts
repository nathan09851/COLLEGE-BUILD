import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Sign in to your account')).toBeVisible()
    await expect(page.getByLabel('Email Address')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })

  test('should display signup page', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.getByText('Create your account')).toBeVisible()
    await expect(page.getByLabel('First Name')).toBeVisible()
    await expect(page.getByLabel('Last Name')).toBeVisible()
    await expect(page.getByLabel('Email Address')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByLabel('Confirm Password')).toBeVisible()
  })

  test('should navigate from login to signup', async ({ page }) => {
    await page.goto('/login')
    await page.getByText('create a new account').click()
    await expect(page).toHaveURL(/.*signup/)
  })

  test('should navigate from signup to login', async ({ page }) => {
    await page.goto('/signup')
    await page.getByText('Sign in').click()
    await expect(page).toHaveURL(/.*login/)
  })

  test('should redirect unauthenticated user from apply to login', async ({ page }) => {
    await page.goto('/apply')
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/)
  })

  test('should redirect unauthenticated user from admin to login', async ({ page }) => {
    await page.goto('/admin')
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/)
  })
})
