import { axe, render } from '@ccs-frontend/helpers/puppeteer'
import { getExamples } from '@ccs-frontend/lib/components'

describe('/components/password-strength', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('password-strength')

      for (const exampleName in examples) {
        await render(page, 'password-strength', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
