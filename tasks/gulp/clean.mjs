import { parallel } from 'gulp'
import del from 'del'
import * as emoji from 'node-emoji'
import chalk from 'chalk'
import log from 'fancy-log'

// @params - srcToClean - array/string of folders/files to delete
const cleanupFoldersOrFiles = async (srcToClean) => {
  const deletedPaths = await del(srcToClean)
  const colour = chalk.green.bold
  const logTitle = (deletedPaths.length) ? 'Deleted files and directories:\n' : 'No files/folders to clean'
  const logTitlePrefix = `${emoji.get('file_folder')}  - `

  if (deletedPaths.length) {
    log(colour(logTitlePrefix + logTitle), `          ${deletedPaths.join('\n           ')}`)
  } else {
    log(colour(logTitlePrefix + logTitle))
  }
}

const src = async (done) => {
  await cleanupFoldersOrFiles(['src/govuk', 'src/govuk-frontend'])
  await done()
}
src.displayName = 'clean:src'
src.description = 'Cleans `govuk` folder from src'

const pkg = async (done) => {
  await cleanupFoldersOrFiles(['package/govuk', 'package/ccs'])
  await done()
}
pkg.displayName = 'clean:package'
pkg.description = 'Cleans `govuk` and `ccs` folder from package'

const all = parallel(src, pkg)

export {
  src,
  pkg,
  all
}
