const configPaths = require('../../config/paths.js')

const fs = require('node:fs/promises')
const path = require('node:path')
const yaml = require('js-yaml')

const childDirectories = async (directory) => {
  return (await Promise.all((await fs.readdir(directory)).map(async (file) => {
    return {
      file: file,
      isDirectory: (await fs.stat(path.join(configPaths.components, file))).isDirectory()
    }
  }))).filter((value) => value.isDirectory).map((value) => value.file)
}

// Generate component list from source directory, excluding anything that's not
// a directory (for example, .DS_Store files)
const allComponents = async () => await childDirectories(configPaths.components)

const getComponentData = async (componentName) => {
  try {
    const yamlPath = path.join(configPaths.components, componentName, `${componentName}.yaml`)

    return yaml.safeLoad(
      await fs.readFile(yamlPath, { encoding: 'utf8' }),
      {
        json: true
      }
    )
  } catch (error) {
    return new Error(error)
  }
}

const writeComponentFixtures = async (componentName, fixturesJson) => {
  await fs.writeFile(
    path.join(
      configPaths.package,
      'ccs',
      'components',
      componentName,
      'fixtures.json'
    ),
    fixturesJson
  )
}

module.exports = {
  allComponents,
  getComponentData,
  writeComponentFixtures
}
