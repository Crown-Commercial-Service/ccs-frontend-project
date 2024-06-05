import { join } from 'path'

import { pkg, version } from '@ccs-frontend/config'
import { files, npm, scripts, styles, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * Build dist task
 * Prepare dist folder for release
 */
export default (options) =>
  gulp.series(
    npm.script('clean:release', [], options),

    // Copy GOV.UK Frontend static assets
    task.name('copy:assets', () =>
      gulp
        .src('ccs/assets/**/*', {
          base: join(options.srcPath, 'ccs'),
          cwd: options.srcPath
        })
        .pipe(gulp.dest(options.destPath))
    ),

    // Compile GOV.UK Frontend JavaScript
    task.name('compile:js \'release\'', () =>
      scripts.compile('all.mjs', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        configPath: join(options.basePath, 'rollup.release.config.mjs'),

        // Rename using package name (versioned) and `*.min.js` extension due to
        // web server ES module `*.mjs` Content-Type header support
        filePath({ dir, name }) {
          return join(
            dir,
            `${name.replace(/^all/, pkg.name)}-${version}.min.js`
          )
        }
      })
    ),

    // Compile GOV.UK Frontend Sass
    task.name('compile:scss', () =>
      styles.compile('all.scss', {
        ...options,

        srcPath: join(options.srcPath, 'ccs'),
        configPath: join(options.basePath, 'postcss.config.mjs'),

        // Rename using package name (versioned) and `*.min.css` extension
        filePath({ dir }) {
          return join(dir, `${pkg.name}-${version}.min.css`)
        }
      })
    ),

    // Update GOV.UK Frontend version
    task.name('file:version \'VERSION.txt\'', () =>
      files.version('VERSION.txt', options)
    )
  )
