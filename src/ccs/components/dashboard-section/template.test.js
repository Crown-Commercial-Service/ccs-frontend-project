/**
 * @jest-environment jsdom
 */
const { render, getExamples } = require('../../../../lib/jest')

let examples

beforeAll(async () => {
  examples = await getExamples('dashboard-section')
})

describe('dashboard-section', () => {
  it('the default example matches the snapshot', () => {
    const $ = render('dashboard-section', examples.default)

    expect($.html()).toMatchSnapshot()
  })

  it('renders attributes correctly', () => {
    const $ = render('dashboard-section', examples.attributes)

    const $component = $('.ccs-dashboard-section')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('dashboard-section', examples.classes)

    const $component = $('.ccs-dashboard-section')
    expect($component.hasClass('app-dashboard-section--custom-modifier')).toBeTruthy()
  })

  it('renders with full width by default', () => {
    const $ = render('dashboard-section', examples.default)

    const $component = $('.ccs-dashboard-section > .govuk-grid-row > .govuk-grid-column-full')
    expect($component.length > 0).toBeTruthy()
  })

  it('renders with custom width modifier', () => {
    const $ = render('dashboard-section', examples['with dashboard width two-thirds'])

    const $component = $('.ccs-dashboard-section > .govuk-grid-row > .govuk-grid-column-two-thirds')
    expect($component.length > 0).toBeTruthy()
  })

  describe('when there is a title', () => {
    it('matches the snapshot', () => {
      const $ = render('dashboard-section', examples['with title text'])

      expect($.html()).toMatchSnapshot()
    })

    it('renders with the title', () => {
      const $ = render('dashboard-section', examples['with title text'])

      const $title = $('.ccs-dashboard-section h2.ccs-dashboard-section__heading')
      expect($title.text().trim()).toEqual('Framework dashboard')
    })

    it('renders with the section break', () => {
      const $ = render('dashboard-section', examples['with title text'])

      const $sectionBreak = $('.ccs-dashboard-section hr.ccs-dashboard-section__heading-section-break')
      expect($sectionBreak.length > 0).toBeTruthy()
    })
  })

  describe('dashboard section panel', () => {
    it('renders attributes correctly', () => {
      const $ = render('dashboard-section', examples['panel item with attributes'])

      const $panel = $('.ccs-dashboard-section .ccs-dashboard-section__panel')
      expect($panel.attr('data-test-attribute')).toEqual('value')
      expect($panel.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('dashboard-section', examples['panel item with classes'])

      const $panel = $('.ccs-dashboard-section .ccs-dashboard-section__panel')
      expect($panel.hasClass('app-dashboard-section-panel--custom-modifier')).toBeTruthy()
    })

    it('renders with one-third width by default', () => {
      const $ = render('dashboard-section', examples.default)

      const $panel = $('.ccs-dashboard-section .ccs-dashboard-section__panel')
      expect($panel.hasClass('govuk-grid-column-one-third')).toBeTruthy()
    })

    it('renders with custom width modifier', () => {
      const $ = render('dashboard-section', examples['with a panel width two-thirds'])

      const $panel = $('.ccs-dashboard-section .ccs-dashboard-section__panel')
      expect($panel.hasClass('govuk-grid-column-two-thirds')).toBeTruthy()
    })
  })
})
