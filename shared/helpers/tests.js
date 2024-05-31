const { join } = require('path')

const { paths } = require('@ccs-frontend/config')
const { compileAsync, compileStringAsync } = require('sass-embedded')

const sassPaths = [
  join(paths.package, 'src/ccs'),
  join(paths.root, 'node_modules')
]

/**
 * Render Sass from file
 */
async function compileSassFile(path, options = {}) {
  return compileAsync(path, {
    loadPaths: sassPaths,
    silenceDeprecations: ['slash-div'],
    quietDeps: true,
    ...options
  })
}

/**
 * Render Sass from string
 */
async function compileSassString(source, options = {}) {
  return compileStringAsync(source, {
    loadPaths: sassPaths,
    silenceDeprecations: ['slash-div'],
    quietDeps: true,
    ...options
  })
}

/**
 * Get the raw HTML representation of a component, and remove any other
 * child elements that do not match the component.
 * Relies on B.E.M naming ensuring that child components relating to a component
 * are namespaced.
 */
function htmlWithClassName($, className) {
  const $component = $(className)
  const classSelector = className.replace('.', '')
  // Remove all other elements that do not match this component
  $component.find(`[class]:not([class^=${classSelector}])`).remove()
  return $.html($component)
}

module.exports = {
  compileSassFile,
  compileSassString,
  htmlWithClassName
}
