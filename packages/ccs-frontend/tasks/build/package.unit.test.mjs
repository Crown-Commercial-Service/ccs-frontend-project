import { readFile } from 'fs/promises'
import { join } from 'path'

import { paths, pkg } from '@ccs-frontend/config'
import { compileSassFile } from '@ccs-frontend/helpers/tests'
import {
  getComponentNames,
  getComponentNamesFiltered
} from '@ccs-frontend/lib/components'
import { filterPath, getListing, mapPathTo } from '@ccs-frontend/lib/files'
import { componentNameToClassName } from '@ccs-frontend/lib/names'
import { outdent } from 'outdent'

describe('packages/ccs-frontend/dist/', () => {
  let listingPackage
  let listingSource
  let listingDist

  let componentsFilesSource
  let componentsFilesDist

  let componentNames
  let componentNamesWithJavaScript

  beforeAll(async () => {
    listingPackage = await getListing('*', {
      cwd: paths.package
    })

    listingSource = await getListing('**/*', {
      cwd: join(paths.package, 'src')
    })

    listingDist = await getListing('**/*', {
      cwd: join(paths.package, 'dist')
    })

    componentsFilesSource = await getListing('**/*', {
      cwd: join(paths.package, 'src/ccs/components')
    })

    componentsFilesDist = await getListing('**/*', {
      cwd: join(paths.package, 'dist/ccs/components')
    })

    // Components list
    componentNames = await getComponentNames()

    // Components list (with JavaScript only)
    componentNamesWithJavaScript = await getComponentNamesFiltered(
      (componentName, componentFiles) =>
        componentFiles.some(filterPath([`**/${componentName}.mjs`]))
    )
  })

  it('should contain the expected files', async () => {
    const filterPatterns = [
      '!**/.DS_Store',
      '!**/*.test.*',
      '!**/__snapshots__/',
      '!**/__snapshots__/**',
      '!**/tsconfig?(.declarations).json',
      '!**/ccs-frontend-component.*',
      '!README.md'
    ]

    // Build array of expected output files
    const listingExpected = listingSource
      .filter(filterPath(filterPatterns))

      // All source `**/*.ts` files compiled to ES modules
      .flatMap(
        mapPathTo(['**/*.ts'], ({ dir: requirePath, name }) => [
          join(requirePath, `${name}.mjs`),
          join(requirePath, `${name}.mjs.map`), // with source map
          join(requirePath.replace('ccs', 'ccs/@types'), `${name}.d.ts`), // with type declaration
          join(requirePath.replace('ccs', 'ccs/@types'), `${name}.d.ts.map`) // with type declaration source map
        ])
      )

      // Only package entries and components are compiled to ES module + UMD bundles
      .flatMap(
        mapPathTo(
          ['**/ccs/{all,components/**/*}.mjs'],
          ({ dir: requirePath, name }) => [
            join(requirePath, `${name}.mjs`),

            // UMD bundles for compatibility (e.g. Rails Asset Pipeline)
            join(requirePath, `${name}.bundle.js`),
            join(requirePath, `${name}.bundle.js.map`), // with source map

            // ES module bundles for browsers
            join(requirePath, `${name}.bundle.mjs`),
            join(requirePath, `${name}.bundle.mjs.map`) // with source map
          ]
        )
      )

      // Only main package entry is compiled to minified ES module bundle
      .flatMap(
        mapPathTo(['**/ccs/all.mjs'], ({ dir: requirePath }) => [
          join(requirePath, 'all.mjs'),

          // ES module bundles for browsers, minified
          join(requirePath, 'ccs-frontend.min.js'), // avoid .mjs extension MIME issues
          join(requirePath, 'ccs-frontend.min.js.map'), // with source map

          // Type declaraions for ccs-frontend-component
          join(requirePath.replace('ccs', 'ccs/@types'), 'ccs-frontend-component.d.ts'), // with type declaration
          join(requirePath.replace('ccs', 'ccs/@types'), 'ccs-frontend-component.d.ts.map') // with type declaration source map
        ])
      )

      // Only sass package entry is compiled to minified CSS bundle
      .flatMap(
        mapPathTo(['**/ccs/all.scss'], ({ dir: requirePath }) => [
          join(requirePath, 'all.scss'),

          // CSS bundle, minified
          join(requirePath, 'ccs-frontend.min.css'),
          join(requirePath, 'ccs-frontend.min.css.map') // with source map
        ])
      )

      // Add Autoprefixer prefixes to all source '*.scss' files
      .flatMap(
        mapPathTo(['**/*.scss'], ({ dir: requirePath, name }) => [
          join(requirePath, `${name}.scss`),
          join(requirePath, `${name}.scss.map`) // with source map
        ])
      )

      // Replaces source component '*.yaml' with:
      // - `fixtures.json` fixtures for tests
      // - `macro-options.json` component options
      .flatMap(
        mapPathTo(['**/*.yaml'], ({ dir: requirePath }) => [
          join(requirePath, 'fixtures.json'),
          join(requirePath, 'macro-options.json')
        ])
      )
      .sort()

    // Compare output files with '.npmignore' filter
    const listingDistIgnored = listingDist.filter(
      filterPath(['!**/*.html', '!**/*.test.*'])
    )

    expect(listingDistIgnored).toEqual(listingExpected)

    // Check top level package contents
    expect(listingPackage).toEqual([
      'README.md',
      'babel.config.js',
      'gulpfile.mjs',
      'package.json',
      'package.json.unit.test.mjs',
      'postcss.config.mjs',
      'postcss.config.unit.test.mjs',
      'rollup.publish.config.mjs',
      'rollup.release.config.mjs',
      'tsconfig.declarations.json',
      'tsconfig.json'
    ])
  })

  describe('Sass stylesheets', () => {
    describe('all.scss', () => {
      it('should compile without throwing an exception', async () => {
        const file = join(paths.package, 'dist/ccs/all.scss')
        await expect(compileSassFile(file)).resolves.not.toThrow()
      })
    })
  })

  describe('ECMAScript (ES) modules', () => {
    describe('all.mjs', () => {
      it('should export each module', async () => {
        const contents = await readFile(
          join(paths.package, 'dist/ccs/all.mjs'),
          'utf8'
        )

        // Look for ES import for each component
        expect(contents).toContain(outdent`
          export { Header } from './components/header/header.mjs';
          export { PasswordStrength } from './components/password-strength/password-strength.mjs';
          export { createAll, initAll } from './init.mjs';
        `)
      })
    })

    describe('common/ccs-frontend-version.mjs', () => {
      it('should have correct version number', async () => {
        const contents = await readFile(
          join(paths.package, 'dist/ccs/common/ccs-frontend-version.mjs'),
          'utf8'
        )

        // Look for ES modules `version` named export
        expect(contents).toContain(`const version = '${pkg.version}';`)
        expect(contents).toContain('export { version };')
      })
    })
  })

  describe('Universal Module Definition (UMD)', () => {
    describe('all.bundle.js', () => {
      it('should export each module', async () => {
        const contents = await readFile(
          join(paths.package, 'dist/ccs/all.bundle.js'),
          'utf8'
        )

        // Look for AMD module definition for 'CCSFrontend'
        expect(contents).toContain(
          '(global = typeof globalThis !== \'undefined\' ? globalThis : global || self, factory(global.CCSFrontend = {}));'
        )

        // Look for bundled components with CommonJS named exports
        for (const componentName of componentNamesWithJavaScript) {
          const componentClassName = componentNameToClassName(componentName)

          expect(contents).toContain(
            // Trailing space is important to not match `class ${componentClassName}Something`
            `class ${componentClassName} `
          )
          expect(contents).toContain(
            `exports.${componentClassName} = ${componentClassName};`
          )
        }

        // Look for CommonJS named exports for utilities
        expect(contents).toContain('exports.initAll = initAll;')
        expect(contents).toContain('exports.version = version;')
      })
    })
  })

  describe('Components', () => {
    it('should have macro-options.json that contains JSON', () => {
      const componentTasks = componentNames.map(async (componentName) => {
        const componentFilter = filterPath([`**/${componentName}/**`])

        const componentSource = componentsFilesSource.filter(componentFilter)
        const componentDist = componentsFilesDist.filter(componentFilter)

        // File not found at source
        expect(componentSource).toEqual(
          expect.not.arrayContaining([
            join(componentName, 'macro-options.json')
          ])
        )

        // File generated in dist
        expect(componentDist).toEqual(
          expect.arrayContaining([join(componentName, 'macro-options.json')])
        )

        const [optionsPath] = componentDist.filter(
          filterPath(['**/macro-options.json'])
        )

        // Component options
        const options = JSON.parse(
          await readFile(
            join(paths.package, 'dist/ccs/components', optionsPath),
            'utf8'
          )
        )
        expect(options).toBeInstanceOf(Array)

        // Component options requirements
        const optionTasks = options.map(async (option) =>
          expect(option).toEqual(
            expect.objectContaining({
              name: expect.stringMatching(/^[A-Z]+$/i),
              type: expect.stringMatching(
                /array|boolean|integer|string|object|nunjucks-block/
              ),
              required: expect.any(Boolean),
              description: expect.any(String)
            })
          )
        )

        // Check all component options
        return Promise.all(optionTasks)
      })

      // Check all component files
      return Promise.all(componentTasks)
    })
  })

  describe('Components with JavaScript', () => {
    it('should have component JavaScript file with correct module name', () => {
      const componentTasks = componentNamesWithJavaScript.map(
        async (componentName) => {
          const componentFilter = filterPath([`**/${componentName}/**`])

          const componentClassName = componentNameToClassName(componentName)

          const componentSource = componentsFilesSource.filter(componentFilter)
          const componentDist = componentsFilesDist.filter(componentFilter)

          // UMD bundle not found at source
          expect(componentSource).toEqual(
            expect.not.arrayContaining([
              join(componentName, `${componentName}.bundle.js`)
            ])
          )

          // ES modules and UMD bundle generated in dist
          expect(componentDist).toEqual(
            expect.arrayContaining([
              join(componentName, `${componentName}.mjs`),
              join(componentName, `${componentName}.bundle.js`)
            ])
          )

          const [modulePathESM] = componentDist.filter(
            filterPath([`**/${componentName}.mjs`])
          )

          const [modulePathUMD] = componentDist.filter(
            filterPath([`**/${componentName}.bundle.js`])
          )

          const moduleTextESM = await readFile(
            join(paths.package, 'dist/ccs/components', modulePathESM),
            'utf8'
          )
          const moduleTextUMD = await readFile(
            join(paths.package, 'dist/ccs/components', modulePathUMD),
            'utf8'
          )

          expect(moduleTextESM).toContain(`export { ${componentClassName} }`)
          expect(moduleTextUMD).toContain(
            `exports.${componentClassName} = ${componentClassName};`
          )
        }
      )

      // Check all component files
      return Promise.all(componentTasks)
    })
  })

  describe('Fixtures', () => {
    it('should have fixtures.json that contains JSON', () => {
      const componentTasks = componentNames.map(async (componentName) => {
        const componentFilter = filterPath([`**/${componentName}/**`])

        const componentSource = componentsFilesSource.filter(componentFilter)
        const componentDist = componentsFilesDist.filter(componentFilter)

        // File not found at source
        expect(componentSource).toEqual(
          expect.not.arrayContaining([join(componentName, 'fixtures.json')])
        )

        // File generated in dist
        expect(componentDist).toEqual(
          expect.arrayContaining([join(componentName, 'fixtures.json')])
        )

        const [fixturesPath] = componentDist.filter(
          filterPath([`**/${componentName}/fixtures.json`])
        )

        // Component fixtures
        const { component, fixtures } = JSON.parse(
          await readFile(
            join(paths.package, 'dist/ccs/components', fixturesPath),
            'utf8'
          )
        )
        expect(component).toEqual(componentName)
        expect(fixtures).toBeInstanceOf(Array)

        // Component fixtures requirements
        const optionTasks = fixtures.map(async (fixture) =>
          expect(fixture).toEqual(
            expect.objectContaining({
              name: expect.any(String),
              options: expect.any(Object),
              html: expect.any(String),
              hidden: expect.any(Boolean)
            })
          )
        )

        // Check all component fixtures
        return Promise.all(optionTasks)
      })

      // Check all component files
      return Promise.all(componentTasks)
    })
  })
})
