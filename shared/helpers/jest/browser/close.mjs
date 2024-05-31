import teardown from 'jest-environment-puppeteer/teardown'

/**
 * Close browser
 */
export default function browserClose(jestConfig) {
  // Close browser, stop server (also in watch mode)
  return teardown({ ...jestConfig, watch: false })
}
