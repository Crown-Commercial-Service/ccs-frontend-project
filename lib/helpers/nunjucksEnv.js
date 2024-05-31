const nunjucks = require('nunjucks')

const nunjucksEnv = (paths, options) => {
  const env = nunjucks.configure(
    paths,
    options
  )

  return env
}

module.exports = {
  nunjucksEnv
}
