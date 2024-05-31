const configPaths = require('../../../../config/paths.js')
const { KnownDevices } = require('puppeteer')

const iPhone = KnownDevices['iPhone 6']
const PORT = configPaths.ports.test

// URLs
const BASE_URL = 'http://localhost:' + PORT
const DEFAULT_EXAMPLE_URL = BASE_URL + '/components/header/preview'
const WITH_BOTH_NAVIGATION_EXAMPLE_URL = BASE_URL + '/components/header/with-both-navigation/preview'

// SELECTORS
const MENU_BUTTON_SELECTOR = '.ccs-header__menu-button'
const MENU_TOGGLE_SELECTOR = '.ccs-js-header-toggle'
const NAVIGATION_LISTS_SELECTOR = '.ccs-header__navigation-lists'

describe('Header navigation', () => {
  beforeAll(async () => {
    await page.emulate(iPhone)
  })

  describe('when JavaScript is unavailable or fails', () => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(WITH_BOTH_NAVIGATION_EXAMPLE_URL, {
        waitUntil: 'load'
      })
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    it('shows the navigation', async () => {
      await expect(page).toMatchElement('.ccs-header__navigation', {
        visible: true,
        timeout: 1000
      })
    })
  })

  describe('when JavaScript is available', () => {
    describe('when no navigation is present', () => {
      it('exits gracefully with no errors', async () => {
        // Errors logged to the console will cause this test to fail
        await page.goto(DEFAULT_EXAMPLE_URL, {
          waitUntil: 'load'
        })
      })
    })

    describe('on page load', () => {
      beforeAll(async () => {
        await page.goto(WITH_BOTH_NAVIGATION_EXAMPLE_URL, {
          waitUntil: 'load'
        })
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(MENU_BUTTON_SELECTOR,
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })

    describe('when menu button is pressed', () => {
      beforeAll(async () => {
        await page.goto(WITH_BOTH_NAVIGATION_EXAMPLE_URL, {
          waitUntil: 'load'
        })
        await page.click(MENU_TOGGLE_SELECTOR)
      })

      it('adds the --open modifier class to the menu, making it visible', async () => {
        const hasOpenClass = await page.$eval(NAVIGATION_LISTS_SELECTOR,
          el => el.classList.contains('ccs-header__navigation-lists--open')
        )

        expect(hasOpenClass).toBeTruthy()
      })

      it('adds the --open modifier class to the menu button', async () => {
        const hasOpenClass = await page.$eval(MENU_BUTTON_SELECTOR,
          el => el.classList.contains('ccs-header__menu-button--open')
        )

        expect(hasOpenClass).toBeTruthy()
      })

      it('exposes the expanded state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(MENU_BUTTON_SELECTOR,
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('true')
      })
    })

    describe('when menu button is pressed twice', () => {
      beforeAll(async () => {
        await page.goto(WITH_BOTH_NAVIGATION_EXAMPLE_URL, {
          waitUntil: 'load'
        })
        await page.click(MENU_TOGGLE_SELECTOR)
        await page.click(MENU_TOGGLE_SELECTOR)
      })

      it('removes the --open modifier class from the menu, hiding it', async () => {
        const hasOpenClass = await page.$eval(NAVIGATION_LISTS_SELECTOR,
          el => el.classList.contains('ccs-header__navigation-lists--open')
        )

        expect(hasOpenClass).toBeFalsy()
      })

      it('removes the --open modifier class from the menu button', async () => {
        const hasOpenClass = await page.$eval(MENU_BUTTON_SELECTOR,
          el => el.classList.contains('ccs-header__menu-button--open')
        )

        expect(hasOpenClass).toBeFalsy()
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval(MENU_BUTTON_SELECTOR,
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })
  })
})
