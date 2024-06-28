import { CCSFrontendComponent } from './ccs-frontend-component'
import { Header } from './components/header/header'
import { PasswordStrength } from './components/password-strength/password-strength'

const createAll = (Component: typeof CCSFrontendComponent) => {
  $(`[data-module="${Component.moduleName}"]`).each((_index, componentElement) => {
    new Component($(componentElement)).init()
  })
}

const initAll = () => {
  const components: Array<typeof CCSFrontendComponent> = [
    Header,
    PasswordStrength,
  ]

  components.forEach((Component) => {
    createAll(Component)
  })
}

export { initAll, createAll }
