import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro

test.describe('Todo list functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('form > input').fill('New task')
    await page.locator('form > button').click()
  })

  test('Add task', async ({ page }) => {
    expect((await page.locator('ul > li:last-of-type').textContent())?.trim()).toBe('New task')
  })

  test('Remove task', async ({ page }) => {
    expect(await page.locator('ul > li').count()).toBe(1)
    await page.getByLabel('delete task').click()
    await page.waitForTimeout(550)
    expect(await page.locator('ul > li').count()).toBe(0)
  })

  test('Remove two tasks and remove the first one', async ({ page }) => {
    expect(await page.locator('ul > li').count()).toBe(1)
    await page.locator('form > input').fill('New task 2')
    await page.locator('form > button').click()
    expect(await page.locator('ul > li').count()).toBe(2)
    await page.locator('ul > li:first-of-type div > button:last-of-type').click()
    await page.waitForTimeout(550)
    expect(await page.locator('ul > li').count()).toBe(1)
    expect(await page.locator('ul > li').textContent()).toContain('New task 2')
  })
})
