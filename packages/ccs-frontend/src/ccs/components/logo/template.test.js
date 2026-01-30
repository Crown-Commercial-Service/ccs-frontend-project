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

  it('renders the logo with only the crown', () => {
    const $ = render('logo', examples['with crown only'])

    const $componentSvg = $('.ccs-log__svg')

    expect($componentSvg.hasClass('ccs-logo__svg--stacked')).toBeFalsy()
    expect($componentSvg.hasClass('ccs-logo__svg--linear')).toBeFalsy()
  })

  it('renders the Government Commercial Agency logo when useGcaBranding is true', () => {
    const $ = render('logo', examples['use GCA branding'])

    const $logoText = $('.ccs-logo__text')
    const $svgTextGraphic = $('.ccs-logo__text-graphic')

    expect($logoText.text().trim()).toBe('Government Commercial Agency')
    expect($svgTextGraphic.text()).toContain('Government Commercial Agency')
  })
})
