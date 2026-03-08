import { join } from 'path'

import { paths } from '@ccs-frontend/config'
import { npm, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'
import slash from 'slash'

import { scripts, styles } from './index.mjs'

/**
 * Watch task
 *
 * During development, this task will:
 *
 * - lint and run `gulp styles` when `.scss` files change
 * - lint and run `gulp scripts` when `.{cjs,js,mjs,ts}` files change
 */
export const watch = (options) =>
  gulp.parallel(
    /**
     * Stylesheets lint watcher
     */
    task.name('lint:scss watch', () =>
      gulp.watch(
        '**/*.scss',
        { cwd: options.srcPath },

        // Run Stylelint checks
        npm.script('lint:scss:cli', [
          slash(join(options.workspace, '**/*.scss'))
        ])
      )
    ),

    /**
     * Stylesheets build watcher
     */
    task.name('compile:scss watch', () =>
      gulp.watch(
        ['**/*.scss', join(paths.package, 'dist/ccs/index.scss')],
        {
          awaitWriteFinish: true,
          cwd: options.srcPath,

          // Prevent early Sass compile by ignoring delete (unlink) event
          // when GOV.UK Frontend runs the `clean` script before build
          events: ['add', 'change']
        },

        // Run Sass compile
        styles(options)
      )
    ),

    /**
     * JavaScripts lint watcher
     */
    task.name('lint:js watch', () =>
      gulp.watch(
        '**/*.{cjs,js,mjs}',
        { cwd: options.srcPath, ignored: ['**/*.test.*'] },

        // Run ESLint checks
        npm.script('lint:js:cli', [
          slash(join(options.workspace, '**/*.{cjs,js,mjs}'))
        ])
      )
    ),

    /**
     * JavaScripts build watcher
     */
    task.name('compile:js watch', () =>
      gulp.watch(
        'javascripts/**/*.mjs',
        { cwd: options.srcPath },

        // Run JavaScripts compile
        scripts(options)
      )
    )
  )
