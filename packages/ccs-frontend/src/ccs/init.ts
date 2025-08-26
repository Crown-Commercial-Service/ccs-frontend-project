import { CCSFrontendComponent } from './ccs-frontend-component'
import { PasswordStrength } from './components/password-strength/password-strength'

const createAll = (Component: typeof CCSFrontendComponent) => {
  $(`[data-module="${Component.moduleName}"]`).each((_index, componentElement) => {
    new Component($(componentElement)).init()
  })
}

const initAll = () => {
  const components: Array<typeof CCSFrontendComponent> = [
    PasswordStrength,
  ]

  components.forEach((Component) => {
    createAll(Component)
  })
}

export { initAll, createAll }
