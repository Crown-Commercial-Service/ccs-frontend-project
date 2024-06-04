import { npm } from '@ccs-frontend/tasks'
import gulp from 'gulp'

import { scripts, styles } from '../index.mjs'

/**
 * Build review app task
 * Prepare dist folder for review app
 */
export default (options) =>
  gulp.series(
    npm.script('clean', [], options),
    scripts(options),
    styles(options)
  )
