
const { goTo } = require('@ccs-frontend/helpers/puppeteer')
const { ports } = require('@ccs-frontend/config')

// URLs
const PASSWORD_PAGE_URL = `http://localhost:${ports.app}/full-page-examples/create-a-print-marketplace-buyer-account`

// SELECTORS
const PASSWORD_STRNEGTH_SELECTOR = '.ccs-password-strength'
const PASSWORD_STRNEGTH_TEST_SELECTOR = `${PASSWORD_STRNEGTH_SELECTOR} > .ccs-password-strength-test`
const PASSWORD_INPUT_SELECTOR = '#password'

const getPasswordStrengthTestsClasses = async () => {
  const passwordStrengthTests = await page.$$(PASSWORD_STRNEGTH_TEST_SELECTOR)
  return await Promise.all(passwordStrengthTests.map((el) => el.evaluate((el) => el.getAttribute('class'))))
}

const evaluatePasswordTests = async (expectedResults) => {
  const passwordStrengthTestsClasses = await getPasswordStrengthTestsClasses()

  return passwordStrengthTestsClasses.every((passwordStrengthTestClasses, index) => {
    if (expectedResults[index]) {
      return !passwordStrengthTestClasses.includes('ccs-password-strength-tests__wrong') && passwordStrengthTestClasses.includes('ccs-password-strength-tests__correct')
    } else {
      return passwordStrengthTestClasses.includes('ccs-password-strength-tests__wrong') && !passwordStrengthTestClasses.includes('ccs-password-strength-tests__correct')
    }
  })
}

describe('Cookie banner', () => {
  describe('when JavaScript is unavailable or fails', () => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(false)
      await goTo(page, PASSWORD_PAGE_URL)
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    it('does not have the test class', async () => {
      const passwordStrengthClasses = await page.$eval(
        PASSWORD_STRNEGTH_SELECTOR,
        (el) => el.getAttribute('class')
      )

      expect(passwordStrengthClasses).not.toContain('ccs-password-strength-tests')
    })

    it('does not have the correct or wrong class for the tests', async () => {
      const passwordStrengthTests = await page.$$(PASSWORD_STRNEGTH_TEST_SELECTOR)
      const passwordStrengthTestsClasses = await Promise.all(passwordStrengthTests.map((el) => el.evaluate((el) => el.getAttribute('class'))))

      passwordStrengthTestsClasses.forEach((passwordStrengthTestClasses) => {
        expect(passwordStrengthTestClasses).not.toContain('ccs-password-strength-tests__wrong')
        expect(passwordStrengthTestClasses).not.toContain('ccs-password-strength-tests__correct')
      })
    })
  })

  describe('when JavaScript is available', () => {
    beforeAll(async () => {
      await goTo(page, PASSWORD_PAGE_URL)
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    it('does have the test class', async () => {
      const passwordStrengthClasses = await page.$eval(
        PASSWORD_STRNEGTH_SELECTOR,
        (el) => el.getAttribute('class')
      )

      expect(passwordStrengthClasses).toContain('ccs-password-strength-tests')
    })

    it('does not have the correct class but has the wrong class', async () => {
      expect(await evaluatePasswordTests([false, false, false, false, false])).toBeTruthy()
    })
  })

  describe('when a password is entered', () => {
    beforeAll(async () => {
      await goTo(page, PASSWORD_PAGE_URL)
    })

    it('updates the password tests', async () => {
      expect(await evaluatePasswordTests([false, false, false, false, false])).toBeTruthy()

      await page.type(PASSWORD_INPUT_SELECTOR, 'P')

      expect(await evaluatePasswordTests([false, false, false, true, false])).toBeTruthy()

      await page.type(PASSWORD_INPUT_SELECTOR, 'a')

      expect(await evaluatePasswordTests([false, false, false, true, true])).toBeTruthy()

      await page.type(PASSWORD_INPUT_SELECTOR, 'ssword')

      expect(await evaluatePasswordTests([false, false, false, true, true])).toBeTruthy()

      await page.type(PASSWORD_INPUT_SELECTOR, '1')

      expect(await evaluatePasswordTests([false, false, true, true, true])).toBeTruthy()

      await page.type(PASSWORD_INPUT_SELECTOR, '!')

      expect(await evaluatePasswordTests([true, true, true, true, true])).toBeTruthy()

      await page.keyboard.press('Backspace')

      expect(await evaluatePasswordTests([false, false, true, true, true])).toBeTruthy()
    })
  })
})
