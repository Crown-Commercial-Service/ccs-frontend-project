import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const sass = gulpSass(dartSass)

// Compile CSS task ---------------------
// --------------------------------------

const scss = () => {
  return gulp.src('app/assets/scss/app.scss')
    .pipe(sass({ includePaths: 'src/' }))
    // minify css add vendor prefixes and normalize to compiled css
    .pipe(postcss([
      autoprefixer,
      cssnano
    ]))
    .pipe(gulp.dest('app/public/assets/styles/'))
}

scss.displayName = 'Compile : SCSS'

export { scss }
