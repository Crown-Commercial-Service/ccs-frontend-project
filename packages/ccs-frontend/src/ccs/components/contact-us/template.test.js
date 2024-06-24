const { render } = require('@ccs-frontend/helpers/nunjucks')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('Contact us', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('contact-us')
  })

  it('has the default text', () => {
    const $ = render('contact-us', examples.default)

    const $contactUs = $('.ccs-contact-us')
    const $havingProblems = $('.ccs-contact-us .ccs-contact-us-body__problems')
    const $contactUsLink = $('.ccs-contact-us .govuk-link')

    expect($contactUs.text().replace(/\s+/g,' ').trim()).toEqual('Having problems with this service? Contact us (opens in a new tab) for support.')
    expect($havingProblems.text().replace(/\s+/g,' ').trim()).toEqual('Having problems with this service?')
    expect($contactUsLink.text().replace(/\s+/g,' ').trim()).toEqual('Contact us (opens in a new tab)')
  })

  it('has the expected link', () => {
    const $ = render('contact-us', examples.default)

    const $contactUsLink = $('.ccs-contact-us .govuk-link')

    expect($contactUsLink.attr('href')).toEqual('/contact-us')
  })

  it('renders attributes correctly', () => {
    const $ = render('contact-us', examples.attributes)

    const $component = $('.ccs-contact-us')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('contact-us', examples.classes)

    const $component = $('.ccs-contact-us')
    expect($component.hasClass('app-contact-us--custom-modifier')).toBeTruthy()
  })

  describe('with custom text', () => {
    it('has the custom text', () => {
      const $ = render('contact-us', examples['with custom text'])
  
      const $contactUs = $('.ccs-contact-us')
      const $havingProblems = $('.ccs-contact-us .ccs-contact-us-body__problems')
      const $contactUsLink = $('.ccs-contact-us .govuk-link')
  
      expect($contactUs.text().replace(/\s+/g,' ').trim()).toEqual('Are you having problems? Go on, contact us (opens in new tab) you know you want to.')
      expect($havingProblems.text().replace(/\s+/g,' ').trim()).toEqual('Are you having problems?')
      expect($contactUsLink.text().replace(/\s+/g,' ').trim()).toEqual('Go on, contact us (opens in new tab)')
    })

    it('has the expected link', () => {
      const $ = render('contact-us', examples['with custom text'])
  
      const $contactUsLink = $('.ccs-contact-us .govuk-link')
  
      expect($contactUsLink.attr('href')).toEqual('/contact-us-now')
    })
  })
})
