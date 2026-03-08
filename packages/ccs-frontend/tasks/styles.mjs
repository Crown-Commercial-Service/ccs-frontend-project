import { join } from 'path'

import { pkg } from '@ccs-frontend/config'
import { styles, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * Stylesheets task (for watch)
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Compile CCS Frontend Sass
     */
    task.name('compile:scss', () =>
      styles.compile('index.scss', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        destPath: join(options.destPath, 'ccs'),
        configPath: join(options.basePath, 'postcss.config.mjs'),

        // Rename using package name and `*.min.css` extension
        filePath({ dir }) {
          return join(dir, `${pkg.name}.min.css`)
        }
      })
    ),

    /**
     * Apply CSS prefixes to CCS Frontend Sass
     */
    task.name('postcss:scss', () =>
      styles.compile('**/*.scss', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        destPath: join(options.destPath, 'ccs'),
        configPath: join(options.basePath, 'postcss.config.mjs')
      })
    ),
  )
