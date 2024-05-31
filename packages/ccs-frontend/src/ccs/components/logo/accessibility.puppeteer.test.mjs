import { axe, render } from '@ccs-frontend/helpers/puppeteer'
import { getExamples } from '@ccs-frontend/lib/components'

describe('/components/logo', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('logo')

      for (const exampleName in examples) {
        await render(page, 'logo', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
