/**
 * @jest-environment jsdom
 */
const { render, getExamples, axe } = require('../../../../lib/jest')

describe('/components/dashboard-section', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('dashboard-section')

      for (const exampleName in examples) {
        const page = render('dashboard-section', examples[exampleName], false, false, true).html()

        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
