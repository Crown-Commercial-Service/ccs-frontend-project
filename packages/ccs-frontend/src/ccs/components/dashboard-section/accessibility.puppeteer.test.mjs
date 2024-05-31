import { axe, render } from '@ccs-frontend/helpers/puppeteer'
import { getExamples } from '@ccs-frontend/lib/components'

describe('/components/dashboard-section', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('dashboard-section')

      for (const exampleName in examples) {
        await render(page, 'dashboard-section', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
