import configPaths from '../../../config/paths.js'

import { getComponentData, allComponents, writeComponentFixtures, nunjucksEnv, renderMacro } from '../../../lib/helpers/index.js'

const generateFixture = async (componentName) => {
  const componentData = await getComponentData(componentName)

  if (componentData instanceof Error) {
    throw componentData
  }

  const env = nunjucksEnv(
    [
      configPaths.src,
      configPaths.components
    ],
    {
      trimBlocks: true,
      lstripBlocks: true
    }
  )

  // Loop examples
  const fixtures = componentData.examples.map(
    async (example) => ({
      name: example.name,
      options: example.options,
      hidden: Boolean(example.hidden),

      // Add defaults to optional fields
      description: (example.description ?? ''),

      // Render Nunjucks example
      html: renderMacro(
        env,
        componentName,
        example.options ?? {}
      ).trim()
    })
  )

  return {
    component: componentName,
    fixtures: await Promise.all(fixtures),
    previewLayout: componentData.previewLayout
  }
}

const generateFixtures = async () => {
  const componentNames = await allComponents()

  // Loop component data paths
  const fixtures = componentNames.map(async (componentName) => {
    let fixture

    try {
      fixture = await generateFixture(componentName)
    } catch (error) {
      if (error.message === `Error: ENOENT: no such file or directory, open 'src/ccs/components/${componentName}/${componentName}.yaml'`) {
        return
      } else {
        throw error
      }
    }

    // Write to destination
    await writeComponentFixtures(
      componentName,
      JSON.stringify(fixture, null, 4)
    )
  })

  await Promise.all(fixtures)
}

const fixtures = generateFixtures

fixtures.displayName = 'Compile : Fixtures'

export { fixtures }
