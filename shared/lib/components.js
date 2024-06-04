const { paths } = require('@ccs-frontend/config')

const { dirname, join } = require('path')
const { pathToFileURL } = require('url')

const nunjucks = require('nunjucks')
const { outdent } = require('outdent')

const { getListing, getDirectories } = require('./files')
const { packageTypeToPath, componentNameToMacroName } = require('./names')

// Nunjucks default environment
const env = nunjucksEnv()

// Paths to entry styles and scripts
const [stylesPath, scriptsPath, assetPath] = [
  'ccs-frontend.min.css',
  'ccs-frontend.min.js',
  'assets'
].map((modulePath) =>
  pathToFileURL(packageTypeToPath('ccs-frontend', { modulePath }))
)

const [jqueryPath] = [
  'jquery/dist/jquery.min.js'
].map((modulePath) => 
  pathToFileURL(join(paths.root, `node_modules/${modulePath}`))
)

/**
 * Nunjucks environment factory
 */
function nunjucksEnv(searchPaths = [], nunjucksOptions = {}, packageOptions) {
  const packagePath = dirname(
    packageTypeToPath('ccs-frontend', packageOptions)
  )

  // Add to Nunjucks search paths (without 'ccs' suffix)
  searchPaths.push(join(packagePath, '../'))

  // Add govuk frontend templates
  searchPaths.push(join(paths.root, 'node_modules/govuk-frontend/dist'))

  // Nunjucks environment
  return nunjucks.configure(searchPaths, {
    trimBlocks: true, // automatically remove trailing newlines from a block/tag
    lstripBlocks: true, // automatically remove leading whitespace from a block/tag,
    ...nunjucksOptions
  })
}

/**
 * Load single component fixtures
 */
const getComponentFixtures = async (componentName, packageOptions) => {
  return require(
    join(
      dirname(packageTypeToPath('ccs-frontend', packageOptions)),
      `components/${componentName}/fixtures.json`
    )
  )
}

/**
 * Load all components' data
 */
const getComponentsFixtures = async (packageOptions) => {
  const componentNames = await getComponentNames(packageOptions)
  return Promise.all(
    componentNames.map((componentName) =>
      getComponentFixtures(componentName, packageOptions)
    )
  )
}

/**
 * Get component files
 */
const getComponentFiles = (componentName = '*', packageOptions) =>
  getListing(
    join(
      dirname(packageTypeToPath('ccs-frontend', packageOptions)),
      `components/${componentName}/**/*`
    )
  )

/**
 * Get component names
 */
async function getComponentNames(packageOptions) {
  return getDirectories(
    join(
      dirname(packageTypeToPath('ccs-frontend', packageOptions)),
      'components/'
    )
  )
}

/**
 * Get component names, filtered
 */
async function getComponentNamesFiltered(filter, packageOptions) {
  const componentNames = await getComponentNames(packageOptions)
  const componentFiles = await getComponentFiles('*', packageOptions)

  // Apply component names filter
  return componentNames.filter((componentName) =>
    filter(componentName, componentFiles)
  )
}

/**
 * Get examples from component fixtures
 */
async function getExamples(componentName, packageOptions) {
  const { fixtures } = await getComponentFixtures(componentName, packageOptions)

  /** @type {{ [name: string]: MacroRenderOptions }} */
  const examples = {}

  for (const fixture of fixtures) {
    examples[fixture.name] = {
      context: fixture.options,
      fixture
    }
  }

  return examples
}

/**
 * Render component HTML
 */
function render(componentName, options) {
  const macroName = componentNameToMacroName(componentName)
  const macroPath = `ccs/components/${componentName}/macro.njk`

  // On Heroku / CI we know we're running against an up-to-date build so we can
  // use the generated HTML from the component JSON (where it exists) to make
  // things faster
  if ((process.env.HEROKU_APP || process.env.CI) && options?.fixture?.html) {
    return options.fixture.html
  }

  return renderMacro(macroName, macroPath, options)
}

/**
 * Render macro HTML
 */
function renderMacro(macroName, macroPath, options) {
  const paramsFormatted = JSON.stringify(options?.context ?? {}, undefined, 2)

  let macroString = `{%- from "${macroPath}" import ${macroName} -%}`

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  macroString += options?.callBlock
    ? `{%- call ${macroName}(${paramsFormatted}) -%}${options.callBlock}{%- endcall -%}`
    : `{{- ${macroName}(${paramsFormatted}) -}}`

  return renderString(macroString, options)
}

/**
 * Render component preview on boilerplate page
 */
function renderPreview(componentName, options) {
  return renderTemplate('govuk/template.njk', {
    blocks: {
      pageTitle: 'Test boilerplate - CCS',
      head: outdent`
        <link rel="stylesheet" href="${stylesPath}">

        <script type="importmap">
          { "imports": { "ccs-frontend": "${scriptsPath}" } }
        </script>
      `,

      // Remove default template blocks
      skipLink: '',
      bodyStart: '',
      header: '',
      footer: '',

      main: outdent`
        <div id="content" class="govuk-width-container">
          ${componentName ? render(componentName, options) : ''}
        </div>

        <!--
          Target for references in examples (e.g. aria-controls)
          https://dequeuniversity.com/rules/axe/4.8/aria-valid-attr-value
        -->
        <div id="test-target-element"></div>
      `,

      bodyEnd: outdent`
        <script src="${jqueryPath}"></script>
        <script type="module" src="${scriptsPath}"></script>
      `
    },
    context: {
      assetPath,
      mainClasses: 'govuk-main-wrapper--auto-spacing'
    }
  })
}

/**
 * Render string
 */
function renderString(string, options) {
  const nunjucksEnv = options?.env ?? env
  return nunjucksEnv.renderString(string, options?.context ?? {})
}

/**
 * Render template HTML
 */
function renderTemplate(templatePath, options) {
  let viewString = `{% extends "${templatePath}" %}`

  if (options?.blocks) {
    for (const [name, content] of Object.entries(options.blocks)) {
      viewString += outdent`

        {% block ${name} -%}
          ${content}
        {%- endblock %}`
    }
  }

  return renderString(viewString, options)
}

module.exports = {
  getComponentFixtures,
  getComponentsFixtures,
  getComponentFiles,
  getComponentNames,
  getComponentNamesFiltered,
  getExamples,
  nunjucksEnv,
  render,
  renderMacro,
  renderPreview,
  renderString,
  renderTemplate,
  stylesPath,
  scriptsPath,
  assetPath,
  jqueryPath
}
