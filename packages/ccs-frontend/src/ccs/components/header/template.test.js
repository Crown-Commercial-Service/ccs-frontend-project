const { render } = require('@ccs-frontend/helpers/nunjucks')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('Header', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('header')
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('header', examples.attributes)

      const $component = $('.ccs-header')
      expect($component.attr('data-test-attribute')).toEqual('value')
      expect($component.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('header', examples.classes)

      const $component = $('.ccs-header')
      expect($component.hasClass('app-header--custom-modifier')).toBeTruthy()
    })

    it('renders custom container classes', () => {
      const $ = render('header', examples['full width'])

      const $component = $('.ccs-header')
      const $container = $component.find('.ccs-header__container')

      expect($container.hasClass('ccs-header__container--full-width')).toBeTruthy()
    })

    it('renders home page URL', () => {
      const $ = render('header', examples['custom homepage url'])

      const $component = $('.ccs-header')
      const $homepageLink = $component.find('.ccs-header__link--homepage')
      expect($homepageLink.attr('href')).toEqual('/')
    })
  })
})
