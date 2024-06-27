import { join } from 'path'
import { pkg } from '@ccs-frontend/config'
import { npm, task } from '@ccs-frontend/tasks'
import gulp from 'gulp'
import replace from 'gulp-replace'

/**
 * Emit Type Declarations Task
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Copy TypeScript files to temporary directory and rename version
     */
    task.name('copy:ts', () =>
      gulp.src(join(options.srcPath, 'ccs/**/!(*.test).ts'))
        .pipe(replace('development', pkg.version))
        .pipe(gulp.dest(join(options.destPath, 'tmp')))
    ),

    /**
     * Emit type declarations
     */
    npm.script(
      'build:types',
      [
        '-p',
        './tsconfig.declarations.json',
        '--outDir',
        join(options.destPath, 'ccs/@types')
      ],
      options
    ),

    /**
     * Remove the tempoary files
     */
    npm.script('clean:tmp', [], options),
  )
