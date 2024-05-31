const cheerio = require('cheerio')

const configPaths = require('../../config/paths.js')
const { nunjucksEnv, renderMacro } = require('../helpers')

/**
 * Render a component's macro for testing
 * @param {string} componentName
 * @param {string} params parameters that are used in the component macro
 * @param {object} macros macros used in the component macro
 * @param {any} children any child components or text, pass the children to the macro
 * @param {boolean} mainWrap Wrap macro without an ARIA region with a <main> element.
 * @returns {function} returns cheerio (jQuery) instance of the macro for easy DOM querying
 */
const render = (componentName, params, macros = false, children = false, mainWrap = false) => {
  const env = nunjucksEnv(
    [
      configPaths.src,
      configPaths.components
    ],
    {
      trimBlocks: true,
      lstripBlocks: true
    }
  )

  return cheerio.load(renderMacro(env, componentName, params, macros, children, mainWrap))
}

module.exports = {
  render
}
