import { mkdir, writeFile } from 'fs/promises'
import { dirname, join, parse } from 'path'

import config from '@ccs-frontend/config'

/**
 * Write `packages/ccs-frontend/package.json` version to file
 */
export async function version(assetPath, options) {
  await write(assetPath, {
    ...options,

    // Add package version
    async fileContents() {
      return config.version
    }
  })
}

/**
 * Write file task
 */
export async function write(assetPath, { destPath, filePath, fileContents }) {
  const assetDestPath = join(
    destPath,
    filePath ? filePath(parse(assetPath)) : assetPath
  )

  if (!destPath || !fileContents) {
    throw new Error('Options \'destPath\' and \'fileContents\' required')
  }

  await mkdir(dirname(assetDestPath), { recursive: true })
  await writeFile(assetDestPath, `${await fileContents()}\n`)
}
