const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const configPaths = require('../config/paths.js')

const helpers = require('../lib/helpers')

// Set up views
const appViews = [
  configPaths.layouts,
  configPaths.views,
  configPaths.examples,
  configPaths.fullPageExamples,
  configPaths.components,
  configPaths.src,
  configPaths.node_modules
]

module.exports = (options) => {
  const nunjucksOptions = options ? options.nunjucks : {}

  // Configure nunjucks
  const env = helpers.nunjucksEnv(
    appViews,
    {
      autoescape: true, // output with dangerous characters are escaped automatically
      express: app, // the express app that nunjucks should install to
      noCache: true, // never use a cache and recompile templates each time
      trimBlocks: true, // automatically remove trailing newlines from a block/tag
      lstripBlocks: true, // automatically remove leading whitespace from a block/tag
      watch: true, // reload templates when they are changed. needs chokidar dependency to be installed
      ...nunjucksOptions // merge any additional options and overwrite defaults above.
    }
  )

  // Add ccomponentNameToMacroName filter
  env.addFilter('componentNameToMacroName', helpers.componentNameToMacroName)

  // Set view engine
  app.set('view engine', 'njk')

  // Disallow search index indexing
  app.use((req, res, next) => {
    // none - Equivalent to noindex, nofollow
    // noindex - Do not show this page in search results and do not show a
    //   "Cached" link in search results.
    // nofollow - Do not follow the links on this page
    res.setHeader('X-Robots-Tag', 'none')
    next()
  })

  // Set up middleware to serve static assets
  app.use('/public', express.static('app/public/'))
  app.use('/public/assets/govuk-frontend', express.static('src/govuk/assets/'))
  app.use('/public/assets/govuk-frontend/manifest.json', express.static('src/govuk/assets/manifest.json'))
  app.use('/public/assets/govuk-frontend/javascript', express.static('src/govuk/'))
  app.use('/public/assets/jquery/javascript', express.static('node_modules/jquery/dist/'))

  app.use('/docs', express.static(configPaths.sassdoc))

  // serve html5-shiv from node modules
  app.use('/vendor/html5-shiv/', express.static('node_modules/html5shiv/dist/'))

  app.use('/assets', express.static(path.join(configPaths.src, 'assets')))

  // Turn form POSTs into data that can be used for validation.
  app.use(bodyParser.urlencoded({ extended: true }))

  // Handle the banner component serverside.
  require('./banner.js')(app)

  // Define routes

  // Index page - render the component list template
  app.get('/', async (req, res) => {
    const components = await helpers.allComponents()

    res.render('index', {
      componentsDirectory: components
    })
  })

  // Whenever the route includes a :component parameter, read the component data
  // from its YAML file
  app.param('component', async (req, res, next, componentName) => {
    res.locals.componentData = await helpers.getComponentData(componentName)
    next()
  })

  // All components view
  app.get('/components/all', async (req, res, next) => {
    const components = await helpers.allComponents()

    const componentsData = components.map(async (componentName) => {
      const componentData = await helpers.getComponentData(componentName)

      if (componentData instanceof Error) {
        return
      }

      const defaultExample = componentData.examples.find(
        example => example.name === 'default'
      )

      return {
        componentName,
        examples: [defaultExample]
      }
    })

    res.locals.componentData = await Promise.all(componentsData)

    res.render('all-components', (error, html) => {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })

  // Component 'README' page
  app.get('/components/:component', (req, res, next) => {
    // make variables available to nunjucks template
    res.locals.componentPath = req.params.component

    res.render('component', (error, html) => {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })

  // Component example preview
  app.get('/components/:component/:example*?/preview', (req, res, next) => {
    // Find the data for the specified example (or the default example)
    const componentName = req.params.component
    const requestedExampleName = req.params.example || 'default'

    const previewLayout = res.locals.componentData.previewLayout || 'layout'

    const exampleConfig = res.locals.componentData.examples.find(
      example => example.name.replace(/ /g, '-') === requestedExampleName
    )

    if (!exampleConfig) {
      next()
    }

    // Construct and evaluate the component with the data for this example
    const macroName = helpers.componentNameToMacroName(componentName)
    const macroParameters = JSON.stringify(exampleConfig.options, null, '\t')

    res.locals.componentView = env.renderString(
      `{% from '${componentName}/macro.njk' import ${macroName} %}
      {{ ${macroName}(${macroParameters}) }}`
    )

    let bodyClasses = ''
    if (req.query.iframe) {
      bodyClasses = 'app-iframe-in-component-preview'
    }

    res.render('component-preview', { bodyClasses, previewLayout })
  })

  // Example view
  app.get('/examples/:example', (req, res, next) => {
    res.render(`${req.params.example}/index`, (error, html) => {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })

  // Full page example views
  require('./full-page-examples.js')(app)

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })

  return app
}
