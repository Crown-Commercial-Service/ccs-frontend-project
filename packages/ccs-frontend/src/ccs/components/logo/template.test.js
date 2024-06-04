const { render } = require('@ccs-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@ccs-frontend/helpers/tests')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('logo component', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('logo')
  })

  it('renders the logo', () => {
    const $ = render('logo', examples.default)

    expect(htmlWithClassName($, '.ccs-logo')).toMatchSnapshot()
  })
})
