import { axe, render } from '@ccs-frontend/helpers/puppeteer'
import { getExamples } from '@ccs-frontend/lib/components'

describe('/components/contact-us', () => {
  describe('component examples', () => {
    let axeRules

    beforeAll(() => {
      axeRules = {
        /**
         * Ignore 'Element has insufficient color contrast' for WCAG Level AAA
         */
        'color-contrast-enhanced': { enabled: false }
      }
    })

    it('passes accessibility tests', async () => {
      const examples = await getExamples('contact-us')

      for (const exampleName in examples) {
        await render(page, 'contact-us', examples[exampleName])
        await expect(axe(page, axeRules)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
