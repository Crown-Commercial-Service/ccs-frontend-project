import { npm } from '@ccs-frontend/tasks'
import gulp from 'gulp'

import { assets, declarations, fixtures, scripts, styles, templates } from '../index.mjs'

/**
 * Build package task
 */
export default (options) =>
  gulp.series(
    npm.script('clean:package', [], options),

    assets(options),
    fixtures(options),
    scripts(options),
    declarations(options),
    styles(options),
    templates(options),
  )
