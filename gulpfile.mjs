import gulp, { series, parallel } from 'gulp'
import * as clean from './tasks/gulp/clean.mjs'
import * as copy from './tasks/gulp/copy.mjs'
import { fixtures, scripts, scss } from './tasks/gulp/compile/index.mjs'
import { monitoring } from './tasks/gulp/nodemon.mjs'
import { watching } from './tasks/gulp/watch.mjs'

const postInstall = series(
  clean.all,
  copy.development
)

const compileAssets = parallel(
  scripts,
  scss
)

const build = series(
  clean.pkg,
  copy.forPublishing,
  compileAssets,
  fixtures
)

// Serve task ---------------------------
// Restarts node app when there is changed
// affecting js, css or njk files
// --------------------------------------
const serve = parallel(
  watching,
  monitoring.server,
  monitoring.browser
)

// Dev task -----------------------------
// Runs a sequence of task on start
// --------------------------------------
const dev = series(
  compileAssets,
  serve
)

gulp.task('build', build)
gulp.task('compile', compileAssets)
gulp.task('postinstall', postInstall)
gulp.task('dev', dev)
gulp.task('serve', serve)
