const { render } = require('@ccs-frontend/helpers/nunjucks')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('Password strength', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('password-strength')
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('password-strength', examples.attributes)

      const $component = $('.ccs-password-strength')
      expect($component.attr('data-test-attribute')).toEqual('value')
      expect($component.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('password-strength', examples.classes)

      const $component = $('.ccs-password-strength')
      expect($component.hasClass('app-password-strength--custom-modifier')).toBeTruthy()
    })
  })

  describe('length example', () => {
    it('has the correct attributes', () => {
      const $ = render('password-strength', examples.default)
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.attr('data-test-type')).toEqual('length')
      expect($passwordStrengthTest.attr('data-test-value')).toEqual('10')
    })

    it('has the correct text', () => {
      const $ = render('password-strength', examples.default)
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.text().trim()).toEqual('at least 10 characters')
    })
  })

  describe('symbol example', () => {
    it('has the correct attributes', () => {
      const $ = render('password-strength', examples['with symbol test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.attr('data-test-type')).toEqual('symbol')
      expect($passwordStrengthTest.attr('data-test-value')).toEqual('=+\\-^$*.[\\]{}()?"!@#%&/\\\\,><\':;|_~`')
    })

    it('has the correct text', () => {
      const $ = render('password-strength', examples['with symbol test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.text().trim()).toEqual('at least one symbol (eg ?, !, £, %)')
    })
  })

  describe('number example', () => {
    it('has the correct attributes', () => {
      const $ = render('password-strength', examples['with number test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.attr('data-test-type')).toEqual('number')
      expect($passwordStrengthTest.attr('data-test-value')).toBeUndefined()
    })

    it('has the correct text', () => {
      const $ = render('password-strength', examples['with number test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.text().trim()).toEqual('at least one number')
    })
  })

  describe('uppercase example', () => {
    it('has the correct attributes', () => {
      const $ = render('password-strength', examples['with uppercase test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.attr('data-test-type')).toEqual('uppercase')
      expect($passwordStrengthTest.attr('data-test-value')).toBeUndefined()
    })

    it('has the correct text', () => {
      const $ = render('password-strength', examples['with uppercase test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.text().trim()).toEqual('at least one capital letter')
    })
  })

  describe('lowercase example', () => {
    it('has the correct attributes', () => {
      const $ = render('password-strength', examples['with lowercase test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.attr('data-test-type')).toEqual('lowercase')
      expect($passwordStrengthTest.attr('data-test-value')).toBeUndefined()
    })

    it('has the correct text', () => {
      const $ = render('password-strength', examples['with lowercase test'])
      const $passwordStrengthTest = $('.ccs-password-strength-test')

      expect($passwordStrengthTest.text().trim()).toEqual('at least one lowercase letter')
    })
  })

  describe('when all the tests are there', () => {
    it('has the correct attributes for each test', () => {
      const $ = render('password-strength', examples['with all the tests'])
      const passwordStrengthTests = $('.ccs-password-strength-test').get().map((element) => $(element))

      expect(passwordStrengthTests[0].attr('data-test-type')).toEqual('length')
      expect(passwordStrengthTests[0].attr('data-test-value')).toEqual('10')

      expect(passwordStrengthTests[1].attr('data-test-type')).toEqual('symbol')
      expect(passwordStrengthTests[1].attr('data-test-value')).toEqual('=+\\-^$*.[\\]{}()?"!@#%&/\\\\,><\':;|_~`')

      expect(passwordStrengthTests[2].attr('data-test-type')).toEqual('number')
      expect(passwordStrengthTests[2].attr('data-test-value')).toBeUndefined()

      expect(passwordStrengthTests[3].attr('data-test-type')).toEqual('uppercase')
      expect(passwordStrengthTests[3].attr('data-test-value')).toBeUndefined()

      expect(passwordStrengthTests[4].attr('data-test-type')).toEqual('lowercase')
      expect(passwordStrengthTests[4].attr('data-test-value')).toBeUndefined()
    })

    it('has the correct text for each test', () => {
      const $ = render('password-strength', examples['with all the tests'])
      const passwordStrengthTests = $('.ccs-password-strength-test').get().map((element) => $(element))
      
      expect(passwordStrengthTests[0].text().trim()).toEqual('at least 10 characters')
      expect(passwordStrengthTests[1].text().trim()).toEqual('at least one symbol (eg ?, !, £, %)')
      expect(passwordStrengthTests[2].text().trim()).toEqual('at least one number')
      expect(passwordStrengthTests[3].text().trim()).toEqual('at least one capital letter')
      expect(passwordStrengthTests[4].text().trim()).toEqual('at least one lowercase letter')
    })
  })

  describe('when all the tests have custom text', () => {
    it('has the correct text for each test', () => {
      const $ = render('password-strength', examples['with custom text for all the tests'])
      const passwordStrengthTests = $('.ccs-password-strength-test').get().map((element) => $(element))
      
      expect(passwordStrengthTests[0].text().trim()).toEqual('Custom text for length')
      expect(passwordStrengthTests[1].text().trim()).toEqual('Custom text for symbol')
      expect(passwordStrengthTests[2].text().trim()).toEqual('Custom text for number')
      expect(passwordStrengthTests[3].text().trim()).toEqual('Custom text for uppercase')
      expect(passwordStrengthTests[4].text().trim()).toEqual('Custom text for lowercase')
    })
  })
})
