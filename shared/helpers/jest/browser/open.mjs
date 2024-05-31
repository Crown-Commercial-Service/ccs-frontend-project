import setup from 'jest-environment-puppeteer/setup'

import { download } from './download.mjs'

/**
 * Open browser
 */
export default async function browserOpen(jestConfig) {
  await download() // Download browser
  return setup(jestConfig) // Open browser, start server
}
