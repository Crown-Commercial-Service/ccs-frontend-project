const { join, resolve } = require('path')

// Repository root directory
const rootPath = resolve(__dirname, '../')

const viewsPath = join(rootPath, 'app/views')

module.exports = {
  src: join(rootPath, 'src'),
  components: join(rootPath, 'src/ccs/components'),
  package: join(rootPath, 'package'),
  layouts: join(viewsPath, 'layouts'),
  views: viewsPath,
  examples: join(viewsPath, 'examples'),
  fullPageExamples: join(viewsPath, 'full-page-examples'),
  node_modules: join(rootPath, 'node_modules'),
  sassdoc: join(rootPath, 'sassdoc'),
  ports: {
    app: 3000,
    test: 8888
  }
}
