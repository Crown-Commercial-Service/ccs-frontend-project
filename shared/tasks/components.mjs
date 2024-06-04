import { basename, dirname, join } from 'path'

import { paths } from '@ccs-frontend/config'
import { nunjucksEnv, render } from '@ccs-frontend/lib/components'
import { getListing, getYaml } from '@ccs-frontend/lib/files'
import slug from 'slug'

import { files } from './index.mjs'

/**
 * Generate fixtures.json from component data
 */
export async function generateFixtures(pattern, { srcPath, destPath }) {
  const componentDataPaths = await getListing(pattern, {
    cwd: srcPath
  })

  // Loop component data paths
  const fixtures = componentDataPaths.map(async (componentDataPath) => {
    const fixture = await generateFixture(componentDataPath, { srcPath })

    // Write to destination
    await files.write(componentDataPath, {
      destPath,

      // Rename to fixtures.json
      filePath({ dir }) {
        return join(dir, 'fixtures.json')
      },

      // Add fixtures as JSON (formatted)
      async fileContents() {
        return JSON.stringify(fixture, null, 4)
      }
    })
  })

  await Promise.all(fixtures)
}

/**
 * Generate macro-options.json from component data
 */
export async function generateMacroOptions(pattern, { srcPath, destPath }) {
  const componentDataPaths = await getListing(pattern, {
    cwd: srcPath
  })

  // Loop component data paths
  const macroOptions = componentDataPaths.map(async (componentDataPath) => {
    const macroOption = await generateMacroOption(componentDataPath, {
      srcPath
    })

    // Write to destination
    await files.write(componentDataPath, {
      destPath,

      // Rename to 'macro-options.json'
      filePath({ dir }) {
        return join(dir, 'macro-options.json')
      },

      // Add macro options as JSON (formatted)
      async fileContents() {
        return JSON.stringify(macroOption, null, 4)
      }
    })
  })

  await Promise.all(macroOptions)
}

/**
 * Component fixtures YAML to JSON
 */
async function generateFixture(componentDataPath, options) {
  /** @type {ComponentData} */
  const json = await getYaml(join(options.srcPath, componentDataPath))

  if (!json?.examples) {
    throw new Error(`${componentDataPath} is missing "examples"`)
  }

  // Nunjucks environment
  const env = nunjucksEnv([options.srcPath])

  // Nunjucks template
  const componentName = basename(dirname(componentDataPath))

  // Loop examples
  const fixtures = json.examples.map(
    async (example) => {
      // Render Nunjucks example
      const html = render(componentName, {
        context: example.options,
        env
      })

      // Write rendered Nunjucks example for diff
      if (!example.hidden) {
        await files.write(`template-${slug(example.name)}.html`, {
          destPath: join(paths.package, 'dist/ccs/components', componentName),
          fileContents: async () => html.trimEnd()
        })
      }

      return {
        name: example.name,
        options: example.options,
        hidden: Boolean(example.hidden),

        // Add defaults to optional fields
        description: example.description ?? '',
        previewLayoutModifiers: example.previewLayoutModifiers ?? [],

        // Add rendered Nunjucks example to fixture
        html: html.trim()
      }
    }
  )

  return {
    component: componentName,
    fixtures: await Promise.all(fixtures),
    previewLayout: json.previewLayout
  }
}

/**
 * Macro options YAML to JSON
 */
async function generateMacroOption(componentDataPath, options) {
  /** @type {ComponentData} */
  const json = await getYaml(join(options.srcPath, componentDataPath))

  if (!json?.params) {
    throw new Error(`${componentDataPath} is missing "params"`)
  }

  return json.params
}
