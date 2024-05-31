/**
 * @jest-environment jsdom
 */
const { render, getExamples, axe } = require('../../../../lib/jest')

describe('/components/header', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('header')

      for (const exampleName in examples) {
        const page = render('header', examples[exampleName]).html()

        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
