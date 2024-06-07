const { render } = require('@ccs-frontend/helpers/nunjucks')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('Footer', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('footer')
  })

  it('renders attributes correctly', () => {
    const $ = render('footer', examples.attributes)

    const $component = $('.ccs-footer')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('footer', examples.classes)

    const $component = $('.ccs-footer')
    expect($component.hasClass('app-footer--custom-modifier')).toBeTruthy()
  })

  it('renders custom container classes', () => {
    const $ = render('footer', examples['with container classes'])

    const $component = $('.ccs-footer')
    const $container = $component.find('.govuk-width-container')

    expect($container.hasClass('app-width-container')).toBeTruthy()
  })

  describe('meta', () => {
    it('renders heading', () => {
      const $ = render('footer', examples['with meta'])

      const $component = $('.ccs-footer')
      const $heading = $component.find('h2.govuk-visually-hidden')
      expect($heading.text()).toEqual('Items')
    })

    it('renders default heading when none supplied', () => {
      const $ = render('footer', examples['with empty meta'])

      const $component = $('.ccs-footer')
      const $heading = $component.find('h2.govuk-visually-hidden')
      expect($heading.text()).toEqual('Support links')
    })

    it('doesn\'t render footer link list when no items are provided', () => {
      const $ = render('footer', examples['with empty meta items'])

      expect($('.ccs-footer__inline-list').length).toEqual(0)
    })

    it('renders links', () => {
      const $ = render('footer', examples['with meta'])

      const $list = $('ul.ccs-footer__inline-list')
      const $items = $list.find('li.ccs-footer__inline-list-item')
      const $firstItem = $items.find('a.ccs-footer__link:first-child')
      expect($items.length).toEqual(3)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Item 1')
    })

    it('renders custom meta text', () => {
      const $ = render('footer', examples['with custom meta'])

      const $custom = $('.ccs-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders custom meta html as text', () => {
      const $ = render('footer', examples['meta html as text'])

      const $custom = $('.ccs-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit <strong>v7.0.1</strong>')
    })

    it('renders custom meta html', () => {
      const $ = render('footer', examples['with meta html'])

      const $custom = $('.ccs-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders attributes on meta links', () => {
      const $ = render('footer', examples['with meta item attributes'])

      const $metaLink = $('.ccs-footer__inline-list .ccs-footer__link')
      expect($metaLink.attr('data-attribute')).toEqual('my-attribute')
      expect($metaLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })
  })

  describe('navigation', () => {
    it('no items displayed when no item array is provided', () => {
      const $ = render('footer', examples['with empty navigation'])

      expect($('.ccs-footer__navigation').length).toEqual(0)
    })

    it('renders headings', () => {
      const $ = render('footer', examples['with navigation'])

      const $firstSection = $('.ccs-footer__section:first-child')
      const $lastSection = $('.ccs-footer__section:last-child')
      const $firstHeading = $firstSection.find('h2.ccs-footer__heading')
      const $lastHeading = $lastSection.find('h2.ccs-footer__heading')
      expect($firstHeading.text()).toEqual('Two column list')
      expect($lastHeading.text()).toEqual('Single column list')
    })

    it('renders lists of links', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.ccs-footer__list')
      const $items = $list.find('li.ccs-footer__list-item')
      const $firstItem = $items.find('a.ccs-footer__link:first-child')
      expect($items.length).toEqual(9)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders attributes on links', () => {
      const $ = render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.ccs-footer__list .ccs-footer__link')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    it('renders lists in columns', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.ccs-footer__list')
      expect($list.hasClass('ccs-footer__list--columns-2')).toBeTruthy()
    })

    it('renders one-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (one column)'])

      const $section = $('.ccs-footer__section')
      expect($section.hasClass('govuk-grid-column-full')).toBeTruthy()
    })

    it('renders two-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (two columns)'])

      const $section = $('.ccs-footer__section')
      expect($section.hasClass('govuk-grid-column-full')).toBeTruthy()
    })

    it('renders section custom width when width specified', () => {
      const $ = render('footer', examples['with navigation'])

      const $section = $('.ccs-footer__section')
      expect($section.hasClass('govuk-grid-column-two-thirds')).toBeTruthy()
    })
  })

  describe('section break', () => {
    it('renders when there is a navigation', () => {
      const $ = render('footer', examples['with navigation'])

      const $sectionBreak = $('hr.ccs-footer__section-break')
      expect($sectionBreak.length).toBeTruthy()
    })

    it('renders nothing when there is only meta', () => {
      const $ = render('footer', examples['with meta'])

      const $sectionBreak = $('hr.ccs-footer__section-break')
      expect($sectionBreak.length).toBeFalsy()
    })
  })
})
