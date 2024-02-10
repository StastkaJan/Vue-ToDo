import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator('form > input').fill('New task')
  await page.locator('form > button').click()
})

test('Add task', async ({ page }) => {
  expect(await page.locator('ul > li').count()).toBe(1)
  expect(await page.locator('ul > li:last-of-type').textContent()).toContain('New task')
})

test('Remove task', async ({ page }) => {
  await page.getByLabel('delete task').click()
  await page.waitForTimeout(550)
  expect(await page.locator('ul > li').count()).toBe(0)
})

test('Remove two tasks and remove the first one', async ({ page }) => {
  await page.locator('form > input').fill('New task 2')
  await page.locator('form > button').click()
  expect(await page.locator('ul > li').count()).toBe(2)

  await page.locator('ul > li:first-of-type div > button:last-of-type').click()
  await page.waitForTimeout(550)
  expect(await page.locator('ul > li').count()).toBe(1)
  expect(await page.locator('ul > li').textContent()).toContain('New task 2')
})

test('Complete task', async ({ page }) => {
  expect(await page.locator('ul > li').textContent()).not.toContain('(completed)')
  await page.locator('ul > li div > button:first-of-type').click()
  expect(await page.locator('ul > li').textContent()).toContain('(completed)')
})

test('Complete all tasks', async ({ page }) => {
  await page.locator('form > input').fill('New task 2')
  await page.locator('form > button').click()
  await page.locator('div.buttons > button:last-of-type').click()
  expect(await page.locator('ul > li:first-of-type').textContent()).toContain('(completed)')
  expect(await page.locator('ul > li:last-of-type').textContent()).toContain('(completed)')
})
