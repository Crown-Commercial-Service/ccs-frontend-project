import { join, relative } from 'path'

import { paths } from '@ccs-frontend/config'

/**
 * Default build paths
 */
export const options = {
  basePath: paths.app,
  srcPath: join(paths.app, 'src'),
  destPath: join(paths.app, 'dist'),
  workspace: relative(paths.root, paths.app)
}
