import { CCSFrontendComponent } from './ccs-frontend-component'
import { Header } from './components/header/header'

const createAll = (Component: typeof CCSFrontendComponent) => {
  $(`[data-module="${Component.moduleName}"]`).each((_index, componentElement) => {
    new Component($(componentElement)).init()
  })
}

const initAll = () => {
  const components: Array<typeof CCSFrontendComponent> = [
    Header,
  ]

  components.forEach((Component) => {
    createAll(Component)
  })
}

export { initAll, createAll }
