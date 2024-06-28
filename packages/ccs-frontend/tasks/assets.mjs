import { task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * Copy CCS Frontend assets (for watch)
 */
export const assets = (options) =>
  gulp.series(
    task.name('copy:assets', () =>
      gulp
        .src('ccs/assets/**/*', {
          base: options.srcPath,
          cwd: options.srcPath,
          encoding: false
        })
        .pipe(gulp.dest(options.destPath))
    )
  )
