const { render } = require('@ccs-frontend/helpers/puppeteer')
const { getExamples } = require('@ccs-frontend/lib/components')
const { KnownDevices } = require('puppeteer')

const iPhone = KnownDevices['iPhone 6']

describe('Header navigation', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('header')
  })

  beforeAll(async () => {
    await page.emulate(iPhone)
  })

  describe('when JavaScript is unavailable or fails', () => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(false)
      await render(page, 'header', examples['with both navigation'])
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    it('shows the navigation', async () => {
      const navDisplay = await page.$eval(
        '.ccs-header__navigation-lists',
        (el) => window.getComputedStyle(el).getPropertyValue('display')
      )

      expect(navDisplay).toBe('block')
    })

    it('does not show the mobile menu button', async () => {
      const buttonDisplay = await page.$eval('.ccs-js-header-toggle', (el) =>
        window.getComputedStyle(el).getPropertyValue('display')
      )

      expect(buttonDisplay).toBe('none')
    })
  })

  describe('when JavaScript is available', () => {
    describe('when no navigation is present', () => {
      it('exits gracefully with no errors', async () => {
        // Errors logged to the console will cause this test to fail
        return expect(
          render(page, 'header', examples.default)
        ).resolves.not.toThrow()
      })
    })

    describe('on page load', () => {
      beforeAll(async () => {
        await render(page, 'header', examples['with both navigation'])
      })

      it('reveals the menu button', async () => {
        const hidden = await page.$eval('.ccs-js-header-toggle', (el) =>
          el.hasAttribute('hidden')
        )

        const buttonDisplay = await page.$eval(
          '.ccs-js-header-toggle',
          (el) => window.getComputedStyle(el).getPropertyValue('display')
        )

        expect(hidden).toBe(false)
        expect(buttonDisplay).toBe('block')
      })

      it('hides the menu via the ccs-header__navigation-lists--open class', async () => {
        const hasOpenClass = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => el.classList.contains('ccs-header__navigation-lists--open')
        )

        const navDisplay = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => window.getComputedStyle(el).getPropertyValue('display')
        )

        expect(hasOpenClass).toBe(false)
        expect(navDisplay).toBe('none')
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(
          '.ccs-header__menu-button',
          (el) => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })

    describe('when menu button is pressed', () => {
      beforeAll(async () => {
        await render(page, 'header', examples['with both navigation'])

        await page.waitForSelector('.ccs-js-header-toggle')
        await page.click('.ccs-js-header-toggle')
      })

      it('shows the menu', async () => {
        const hasOpenClass = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => el.classList.contains('ccs-header__navigation-lists--open')
        )

        const navDisplay = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => window.getComputedStyle(el).getPropertyValue('display')
        )

        expect(hasOpenClass).toBe(true)
        expect(navDisplay).toBe('block')
      })

      it('exposes the expanded state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(
          '.ccs-header__menu-button',
          (el) => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('true')
      })
    })

    describe('when menu button is pressed twice', () => {
      beforeAll(async () => {
        await render(page, 'header', examples['with both navigation'])

        await page.waitForSelector('.ccs-js-header-toggle')
        await page.click('.ccs-js-header-toggle')
        await page.click('.ccs-js-header-toggle')
      })

      it('removes the ccs-header__navigation-lists--open from the the menu, hiding it', async () => {
        const hasOpenClass = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => el.classList.contains('ccs-header__navigation-lists--open')
        )

        const navDisplay = await page.$eval(
          '.ccs-header__navigation-lists',
          (el) => window.getComputedStyle(el).getPropertyValue('display')
        )

        expect(hasOpenClass).toBe(false)
        expect(navDisplay).toBe('none')
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(
          '.ccs-header__menu-button',
          (el) => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })
  })
})
