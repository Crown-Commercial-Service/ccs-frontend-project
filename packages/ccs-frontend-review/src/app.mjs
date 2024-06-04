import { join } from 'path'

import { paths } from '@ccs-frontend/config'
import {
  getComponentsFixtures,
  getComponentNames,
  getComponentNamesFiltered,
  render
} from '@ccs-frontend/lib/components'
import { filterPath, hasPath } from '@ccs-frontend/lib/files'
import express from 'express'

import { getFullPageExamples } from './common/lib/files.mjs'
import * as middleware from './common/middleware/index.mjs'
import * as nunjucks from './common/nunjucks/index.mjs'
import * as routes from './routes/index.mjs'

export default async () => {
  const app = express()

  // Resolve GOV.UK Frontend from review app `node_modules`
  // to allow previous versions to be installed locally
  const packageOptions = { moduleRoot: paths.app }

  // Cache mapped components and examples
  const [
    componentsFixtures,
    componentNames,
    componentNamesWithJavaScript,
    fullPageExamples
  ] = await Promise.all([
    getComponentsFixtures(packageOptions),

    // Components list
    getComponentNames(packageOptions),

    // Components list (with JavaScript only)
    getComponentNamesFiltered(
      (componentName, componentFiles) =>
        componentFiles.some(filterPath([`**/${componentName}.mjs`])),
      packageOptions
    ),

    getFullPageExamples()
  ])

  // Feature flags
  const flags = /** @type {FeatureFlags} */ ({
    isDevelopment: !process.env.HEROKU_APP && !process.env.CI,

    // Check for JSDoc, SassDoc and Rollup stats
    hasDocsScripts: await hasPath(join(paths.app, 'dist/docs/jsdoc')),
    hasDocsStyles: await hasPath(join(paths.app, 'dist/docs/sassdoc')),
  })

  // Set up Express.js
  app.set('flags', flags)
  app.set('query parser', 'simple')

  // Set up middleware
  app.use('/docs', middleware.docs)
  app.use(middleware.assets)
  app.use(middleware.request)
  app.use(middleware.robots)
  app.use(middleware.banner)

  // Configure nunjucks
  const env = nunjucks.renderer(app)

  // Define parameters

  /**
   * Handle parameter :componentName
   *
   * Finds all component fixtures and default example
   */
  app.param(
    'componentName',

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response<{}, Partial<PreviewLocals>>} res
     * @param {import('express').NextFunction} next
     * @param {string} componentName
     */
    (req, res, next, componentName) => {
      const exampleName = 'default'

      // Find all fixtures for component
      const componentFixtures = componentsFixtures.find(
        ({ component }) => component === componentName
      )

      // Find default fixture for component
      const componentFixture = componentFixtures?.fixtures.find(
        ({ name }) => name === exampleName
      )

      // Add response locals
      res.locals.componentName = componentName
      res.locals.componentFixtures = componentFixtures
      res.locals.componentFixture = componentFixture
      res.locals.exampleName = 'default'

      next()
    }
  )

  /**
   * Handle parameter :exampleName
   *
   * Finds component fixture for example and updates locals
   */
  app.param(
    'exampleName',

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response<{}, Partial<PreviewLocals>>} res
     * @param {import('express').NextFunction} next
     * @param {string} exampleName
     */
    (req, res, next, exampleName) => {
      const { componentFixtures } = res.locals

      // Replace default fixture with named example
      const componentFixture = componentFixtures?.fixtures.find(
        ({ name }) => nunjucks.filters.slugify(name) === exampleName
      )

      // Update response locals
      res.locals.componentFixture = componentFixture
      res.locals.exampleName = exampleName

      next()
    }
  )

  /**
   * Review app home page
   */
  app.get('/', (req, res) => {
    res.render('index', {
      componentNames,
      componentNamesWithJavaScript,
      fullPageExamples
    })
  })

  /**
   * All components redirect
   */
  app.get('/components/all', function (req, res) {
    res.redirect('./')
  })

  /**
   * Component examples
   */
  app.get(
    '/components/:componentName?',

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response<{}, Partial<PreviewLocals>>} res
     * @param {import('express').NextFunction} next
     * @returns {void}
     */
    (req, res, next) => {
      const { componentName } = res.locals

      // Unknown component, continue to page not found
      if (componentName && !componentNames.includes(componentName)) {
        return next()
      }

      res.render(componentName ? 'component' : 'components', {
        componentsFixtures,
        componentName
      })
    }
  )

  /**
   * Component example preview
   */
  app.get(
    '/components/:componentName/:exampleName?/preview',

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response<{}, Partial<PreviewLocals>>} res
     * @param {import('express').NextFunction} next
     * @returns {void}
     */
    (req, res, next) => {
      const {
        componentName,
        componentFixtures: fixtures,
        componentFixture: fixture
      } = res.locals

      // Unknown component or fixture, continue to page not found
      if (!componentNames.includes(componentName) || !fixtures || !fixture) {
        return next()
      }

      // Render component using fixture
      const componentView = render(componentName, {
        context: fixture.options,
        env,
        fixture
      })

      let bodyClasses = 'app-template__body'

      for (const modifier of fixture.previewLayoutModifiers) {
        bodyClasses += ` app-template__body--${modifier}`
      }

      if ('iframe' in req.query) {
        bodyClasses += ' app-template__body--component-preview'
      }

      res.render('component-preview', {
        bodyClasses,
        componentView,
        previewLayout: fixtures.previewLayout
      })
    }
  )

  /**
   * Additional routes
   */
  app.use('/full-page-examples', routes.fullPageExamples)

  /**
   * Page not found handler
   */
  app.use((req, res) => {
    res.status(404).render('errors/404')
  })

  /**
   * Error handler
   */
  app.use((error, req, res) => {
    console.error(error)
    res.status(500).render('errors/500', {
      error
    })
  })

  return app
}
