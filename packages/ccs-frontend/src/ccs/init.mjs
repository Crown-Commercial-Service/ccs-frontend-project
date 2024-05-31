import { Header } from './components/header/header.mjs'

const initAll = () => {
  const components = ([
    [Header],
  ])

  components.forEach(([Component]) => {
    createAll(Component)
  })
}

const createAll = (Component) => {
  $(`[data-module="${Component.moduleName}"]`).each((_index, componentElement) => {
    new Component($(componentElement)).init()
  })
}

export { initAll, createAll }
