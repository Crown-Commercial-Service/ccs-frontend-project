import { watch, parallel } from 'gulp'
import configPaths from '../../config/paths.js'
import { scripts, scss } from './compile/index.mjs'

// Watch task ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------
const watching = () => {
  watch([`${configPaths.src}**/**/*.scss`, `${configPaths.app}assets/scss/**/*.scss`], parallel(scss))
  watch([`${configPaths.src}**/**/*.js`, `!${configPaths.src}**/**/*.test.js`], parallel(scripts))
}

export { watching }
