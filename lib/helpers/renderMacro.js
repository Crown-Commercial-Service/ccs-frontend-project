const { componentNameToMacroName } = require('../helpers/componentNameToMacroName')

const renderMacro = (nunjucksEnv, componentName, params, macros = false, children = false, mainWrap = false) => {
  if (typeof params === 'undefined') {
    throw new Error('Parameters passed to `render` should be an object but are undefined')
  }

  const macroName = componentNameToMacroName(componentName)
  const macroParams = JSON.stringify(params, null, 2)

  let macroString = `{%- from "${componentName}/macro.njk" import ${macroName} -%}`

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  if (children) {
    macroString += `{%- call ${macroName}(${macroParams}) -%}${children}{%- endcall -%}`
  } else {
    macroString += `{{- ${macroName}(${macroParams}) -}}`
  }

  // For any macros we need to call in the component view for example `url_for`
  // we add it to nunjucks environment
  if (macros) {
    Object.keys(macros).forEach(key => {
      nunjucksEnv.addGlobal(key, macros[key])
    })
  }

  // Any components not contained by an ARIA landmark will throw an Axe error
  // https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
  // We can wrap these components in a <main> to prevent this for testing
  return mainWrap ? nunjucksEnv.renderString('<main>' + macroString + '</main>') : nunjucksEnv.renderString(macroString)
}

module.exports = {
  renderMacro
}
