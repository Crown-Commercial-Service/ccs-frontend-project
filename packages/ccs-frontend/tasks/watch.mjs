import { join } from 'path'

import { npm, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'
import slash from 'slash'

import { assets, fixtures, scripts, styles, templates } from './index.mjs'

/**
 * Watch task
 *
 * During development, this task will:
 *
 * - lint and run `gulp styles` when `.scss` files change
 * - lint and run `gulp scripts` when `.{cjs,js,mjs}` files change
 * - lint and run `gulp fixtures` when `.yaml` files change
 * - lint and run `gulp templates` when `.{md,njk}` files change
 * - lint and run `gulp assets` when assets change
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
        '**/*.scss',
        { cwd: options.srcPath },

        // Run Sass compile
        styles(options)
      )
    ),

    /**
     * JavaScripts lint watcher
     */
    task.name('lint:js watch', () =>
      gulp.watch(
        '**/*.{cjs,js,mjs,ts}',
        { cwd: options.srcPath, ignored: ['**/*.test.*'] },

        // Run ESLint checks
        gulp.parallel(
          npm.script('lint:js:cli', [
            slash(join(options.workspace, '**/*.{cjs,js,mjs}'))
          ]),
          npm.script('lint:ts:cli', [
            slash(join(options.workspace, '**/*.ts'))
          ])
        )
      )
    ),

    /**
     * JavaScripts build watcher
     */
    task.name('compile:js watch', () =>
      gulp.watch(
        '**/*.{cjs,js,mjs,ts}',
        { cwd: options.srcPath, ignored: ['**/*.test.*'] },

        // Run JavaScripts compile
        scripts(options)
      )
    ),

    /**
     * Component fixtures watcher
     */
    task.name('compile:fixtures watch', () =>
      gulp.watch(
        'ccs/components/*/*.yaml',
        { cwd: options.srcPath },

        // Run fixtures compile
        fixtures(options)
      )
    ),

    /**
     * Component template watcher
     */
    task.name('copy:templates watch', () =>
      gulp.watch(
        'ccs/**/*.{md,njk}',
        { cwd: options.srcPath },

        // Run templates copy
        templates(options)
      )
    ),

    // Copy GOV.UK Frontend static assets
    task.name('copy:assets watch', () =>
      gulp.watch(
        'ccs/assets/**',
        { cwd: options.srcPath },

        // Run assets copy
        assets(options)
      )
    )
  )
