/**
 * @jest-environment jsdom
 */
const { render, getExamples, axe } = require('../../../../lib/jest')

describe('/components/logo', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('logo')

      for (const exampleName in examples) {
        const page = render('logo', examples[exampleName], false, false, true).html()

        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
