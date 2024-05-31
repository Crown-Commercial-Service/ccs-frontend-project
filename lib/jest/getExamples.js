const { getComponentData } = require('../helpers')

/**
 * Get examples from a component's metadata file
 * @param {string} componentName
 * @returns {object} returns object that includes all examples at once
 */
const getExamples = async (componentName) => {
  const componentData = await getComponentData(componentName)

  const examples = {}

  for (const example of componentData.examples) {
    examples[example.name] = example.options
  }

  return examples
}

module.exports = {
  getExamples
}
