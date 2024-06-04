const components = require('@ccs-frontend/lib/components')
const cheerio = require('cheerio')

/**
 * Render component HTML into cheerio
 */
function render(componentName, options) {
  return cheerio.load(components.render(componentName, options))
}

/**
 * Render template HTML into cheerio
 */
function renderTemplate(templatePath, options) {
  return cheerio.load(components.renderTemplate(templatePath, options))
}

module.exports = {
  render,
  renderTemplate
}
