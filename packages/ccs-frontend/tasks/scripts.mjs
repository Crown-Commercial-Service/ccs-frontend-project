import { join } from 'path'

import { pkg } from '@ccs-frontend/config'
import { scripts, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * JavaScripts task (for watch)
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Compile CCS Frontend JavaScript for component entry points
     */
    task.name('compile:js \'components\'', () =>
      scripts.compile('**/components/*/!(*.test).ts', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        destPath: join(options.destPath, 'ccs'),
        configPath: join(options.basePath, 'rollup.publish.config.mjs')
      })
    ),

    /**
     * Compile CCS Frontend JavaScript for main entry point only
     */
    task.name('compile:js \'entry\'', () =>
      scripts.compile('**/all.ts', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        destPath: join(options.destPath, 'ccs'),
        configPath: join(options.basePath, 'rollup.publish.config.mjs')
      })
    ),

    /**
     * Compile CCS Frontend JavaScript (minified) for main entry point only
     */
    task.name('compile:js \'minified\'', () =>
      scripts.compile('**/all.ts', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        destPath: join(options.destPath, 'ccs'),
        configPath: join(options.basePath, 'rollup.release.config.mjs'),

        // Rename using package name and `*.min.js` extension due to
        // web server ES module `*.mjs` Content-Type header support
        filePath({ dir, name }) {
          return join(dir, `${name.replace(/^all/, pkg.name)}.min.js`)
        }
      })
    ),
  )
