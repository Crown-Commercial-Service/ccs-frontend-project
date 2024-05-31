import Header from './components/header/header'

const initAll = () => {
  const components = [
    [Header, 'ccs-header']
  ]

  components.forEach(([Component, dataModuleName]) => {
    $(`[data-module="${dataModuleName}"]`).each((_index, componentElement) => {
      new Component($(componentElement)).init()
    })
  })
}

export { initAll }
