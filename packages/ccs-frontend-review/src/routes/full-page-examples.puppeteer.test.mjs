import { join } from 'path'

import { paths } from '@ccs-frontend/config'
import { getProperty, goTo } from '@ccs-frontend/helpers/puppeteer'
import { getDirectories } from '@ccs-frontend/lib/files'

import { getFullPageExamples } from '../common/lib/files.mjs'

describe('Full page examples', () => {
  it('should load correctly', async () => {
    const exampleNamesFullPage = await getDirectories(
      join(paths.app, 'src/views/full-page-examples')
    )

    // Full page examples have additional context
    const fullPageExamples = await getFullPageExamples()

    // Check the page responded correctly
    for (const exampleName of exampleNamesFullPage) {
      await goTo(page, `/full-page-examples/${exampleName}`)

      // Look for full page example context
      const example = fullPageExamples.find(
        (example) => example.path === exampleName
      )

      // Find title text
      const $title = await page.$('title')
      const titleText = await getProperty($title, 'textContent')

      // Check for matching title
      expect(titleText).toBe(`${example.title} - CCS`)
    }
  })
})
