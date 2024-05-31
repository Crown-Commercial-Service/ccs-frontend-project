import { join } from 'path'

import { scripts, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * JavaScripts task (for watch)
 */
export const compile = (options) =>
  gulp.series(
    task.name('compile:js', () =>
      scripts.compile('**/*.mjs', {
        ...options,

        srcPath: join(options.srcPath, 'javascripts'),
        destPath: join(options.destPath, 'javascripts'),
        configPath: join(options.basePath, 'rollup.config.mjs')
      })
    )
  )
