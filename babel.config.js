/**
 * Babel config
 */
module.exports = function (api) {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          browserslistEnv: 'node'
        }
      ]
    ]
  }
}
