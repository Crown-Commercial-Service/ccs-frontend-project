import { src, dest } from 'gulp'
import * as emoji from 'node-emoji'
import chalk from 'chalk'
import log from 'fancy-log'

// @params logMsg - string to log out to terminal
// @params - srcToCopy - array/string of folders/files to copy
// @params - destTo - string of destination to save the new folders/files to.
const copy = async (logMsg, srcToCopy, destTo) => {
  log(emoji.get('clipboard') + '  ' + chalk.green.bold(`- ${logMsg}`))
  await src(srcToCopy, { encoding: false })
    .pipe(dest(destTo))
}

const copyForDev = async (done) => {
  await copy('Copying GOV.UK Frontend to src directory for development',
    [
      'node_modules/govuk-frontend/dist/govuk/**'
    ],
    'src/govuk'
  )
  await done()
}

const copyCCSForPublishing = async (done) => {
  await copy('Copying CCS to package directory',
    ['src/ccs/**',
      '!**/*.test.js',
      '!src/**/__snapshots__/**',
      '!src/**/*.yaml'],
    'package/ccs'
  )
  await done()
}
copyCCSForPublishing.displayName = 'Copy: CCS for Publishing'

export {
  copyForDev as development,
  copyCCSForPublishing as forPublishing
}
