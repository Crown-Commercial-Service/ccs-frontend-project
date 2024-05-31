import { join, relative } from 'path'

import { paths } from '@ccs-frontend/config'

/**
 * Default build paths
 */
export const options = {
  basePath: paths.package,
  srcPath: join(paths.package, 'src'),
  destPath: join(paths.package, 'dist'),
  workspace: relative(paths.root, paths.package)
}

/**
 * Customised build paths by target
 */
export const targets = {
  package: options
}
