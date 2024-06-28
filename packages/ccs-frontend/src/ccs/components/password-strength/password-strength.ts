import { CCSFrontendComponent } from '../../ccs-frontend-component'

abstract class PasswordStrengthTest {
  abstract test: RegExp
  $passwordStrengthTest: JQuery<HTMLLIElement>

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>) {
    this.$passwordStrengthTest = $passwordStrengthTest
  }

  init () {
    this.$passwordStrengthTest.addClass('ccs-password-strength-tests__wrong')
  }

  testPasswordInput (passwordInputText: string) {
    const testPassed: boolean = this.test.test(passwordInputText)

    this.$passwordStrengthTest.toggleClass('ccs-password-strength-tests__wrong', !testPassed)
    this.$passwordStrengthTest.toggleClass('ccs-password-strength-tests__correct', testPassed)
  }
}

class PasswordStrengthTestLength extends PasswordStrengthTest {
  test: RegExp

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>, value: string) {
    super($passwordStrengthTest)
    this.test = new RegExp(`^.{${value},}`)
  }
}

class PasswordStrengthTestSymbol extends PasswordStrengthTest {
  test: RegExp

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>, value: string) {
    super($passwordStrengthTest)
    this.test = new RegExp(`^(?=.*?[${value}])`)
  }
}

class PasswordStrengthTestNumber extends PasswordStrengthTest {
  test: RegExp

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>) {
    super($passwordStrengthTest)
    this.test = new RegExp('^(?=.*[0-9])')
  }
}

class PasswordStrengthTestUppercase extends PasswordStrengthTest {
  test: RegExp

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>) {
    super($passwordStrengthTest)
    this.test = new RegExp('^(?=.*[A-Z])')
  }
}

class PasswordStrengthTestLowercase extends PasswordStrengthTest {
  test: RegExp

  constructor ($passwordStrengthTest: JQuery<HTMLLIElement>) {
    super($passwordStrengthTest)
    this.test = new RegExp('^(?=.*[a-z])')
  }
}

const passwordStrengthTestFactory = ($passwordStrengthTest: JQuery<HTMLLIElement>): PasswordStrengthTest | undefined => {
  const testType = $passwordStrengthTest.data('testType')
  const value = $passwordStrengthTest.data('testValue')

  switch (testType) {
    case 'length':
      return new PasswordStrengthTestLength($passwordStrengthTest, value)
    case 'symbol':
      return new PasswordStrengthTestSymbol($passwordStrengthTest, value)
    case 'number':
      return new PasswordStrengthTestNumber($passwordStrengthTest)
    case 'uppercase':
      return new PasswordStrengthTestUppercase($passwordStrengthTest)
    case 'lowercase':
      return new PasswordStrengthTestLowercase($passwordStrengthTest)
  }
}

class PasswordStrength implements CCSFrontendComponent {
  static moduleName = 'ccs-password-strength'
  $passwordStrength: JQuery<HTMLUListElement>
  $passwordInput: JQuery<HTMLInputElement>
  passwordStrengthTests: PasswordStrengthTest[]

  constructor ($passwordStrength: JQuery<HTMLElement>) {
    this.$passwordStrength = $passwordStrength as JQuery<HTMLUListElement>
    this.$passwordInput = $<HTMLInputElement>(`#${$passwordStrength.data('target')}`)
    this.passwordStrengthTests = this.$passwordStrength.find<HTMLLIElement>('.ccs-password-strength-test').get().map((passwordStrengthTest) => passwordStrengthTestFactory($(passwordStrengthTest)) as PasswordStrengthTest)
  }

  init () {
    if (this.$passwordInput.length) {
      this.$passwordStrength.addClass('ccs-password-strength-tests')
      this.passwordStrengthTests.forEach((passwordStrengthTest) => passwordStrengthTest.init())

      this.$passwordInput.on('keyup', () => { this.testPasswordInput() })
    }
  }

  private testPasswordInput () {
    const passwordInputText = String(this.$passwordInput.val())

    this.passwordStrengthTests.forEach((passwordStrengthTest) => passwordStrengthTest.testPasswordInput(passwordInputText))
  }
}

export { PasswordStrength }
