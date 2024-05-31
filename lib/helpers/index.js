const { componentNameToMacroName } = require('./componentNameToMacroName')
const { allComponents, getComponentData, writeComponentFixtures } = require('./file')
const { nunjucksEnv } = require('./nunjucksEnv')
const { renderMacro } = require('./renderMacro')

module.exports = {
  componentNameToMacroName,
  allComponents,
  getComponentData,
  writeComponentFixtures,
  nunjucksEnv,
  renderMacro
}
