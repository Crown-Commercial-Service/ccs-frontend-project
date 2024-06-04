import { task } from '@ccs-frontend/tasks'
import gulp from 'gulp'

/**
 * Copy GOV.UK Frontend template files (for watch)
 */
export const templates = (options) =>
  gulp.series(
    task.name('copy:templates', () =>
      gulp
        .src('ccs/**/*.{md,njk}', {
          base: options.srcPath,
          cwd: options.srcPath
        })
        .pipe(gulp.dest(options.destPath))
    )
  )
