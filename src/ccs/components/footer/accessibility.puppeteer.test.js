/**
 * @jest-environment jsdom
 */
const { render, getExamples, axe } = require('../../../../lib/jest')

describe('/components/footer', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('footer')

      for (const exampleName in examples) {
        const page = render('footer', examples[exampleName]).html()

        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
