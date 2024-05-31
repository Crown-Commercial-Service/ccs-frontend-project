const { dirname, join } = require('path')

const { paths } = require('@ccs-frontend/config')

/**
 * Convert a kebab-cased string to a PascalCased one
 */
function kebabCaseToPascalCase(value) {
  return (
    value
      .toLowerCase()
      .split('-')
      // capitalize each 'word'
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  )
}

/**
 * Convert a kebab-cased string to a camelCased one
 */
function kebabCaseToCamelCase(value) {
  return kebabCaseToPascalCase(value).replace(/^./, (str) => str.toLowerCase())
}

/**
 * Convert component name to macro name
 */
function componentNameToMacroName(componentName) {
  return kebabCaseToCamelCase(`ccs-${componentName}`)
}

/**
 * Convert component name to its JavaScript class name
 */
function componentNameToClassName(componentName) {
  return kebabCaseToPascalCase(componentName)
}

/**
 * Convert component name to its config name as passed to initAll
 */
function componentNameToConfigName(componentName) {
  return kebabCaseToCamelCase(componentName)
}

/**
 * Resolve path to package entry from any npm workspace
 */
function packageResolveToPath(packageEntry, options = {}) {
  const { modulePath, moduleRoot } = options

  // Resolve full path from package entry or package name
  const packagePath = require.resolve(packageEntry, {
    paths: [moduleRoot ?? paths.root]
  })

  // Append optional module path
  return modulePath !== undefined
    ? join(dirname(packagePath), modulePath)
    : packagePath
}

/**
 * Return path to package entry from any npm workspace, by type
 */
function packageTypeToPath(packageName, options = {}) {
  const { modulePath, moduleRoot, type = 'commonjs' } = options

  // Assume package.json is always resolvable
  const packageEntry = `${packageName}/package.json`

  // Require package.json for access to main, module fields
  const packageJson = require(
    packageResolveToPath(packageEntry, { moduleRoot })
  )

  // Use package.json field for default entry path
  const packagePath = packageJson[type === 'module' ? 'module' : 'main']

  // Use package.json field to build child path
  const childPath =
    modulePath !== undefined
      ? join(dirname(packagePath), modulePath)
      : packagePath

  // Append optional module path
  return packageResolveToPath(packageEntry, {
    modulePath: childPath,
    moduleRoot
  })
}

/**
 * Resolve path to package from any npm workspace
 */
function packageNameToPath(packageName, options) {
  return packageResolveToPath(`${packageName}/package.json`, {
    modulePath: '',
    ...options
  })
}

module.exports = {
  componentNameToClassName,
  componentNameToConfigName,
  componentNameToMacroName,
  packageResolveToPath,
  packageTypeToPath,
  packageNameToPath
}
