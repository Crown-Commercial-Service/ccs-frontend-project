import { dirname, parse, relative } from 'path'
import { fileURLToPath } from 'url'

import slash from 'slash'

import { files } from './index.mjs'

/**
 * Write asset helper
 */
export async function write(filePath, result) {
  const { base, dir } = parse(filePath)

  const writeTasks = []

  // Files to write
  /** @type {SourceMap | undefined} */
  const map = result.map ? JSON.parse(result.map.toString()) : undefined
  const code = 'css' in result ? result.css : result.code

  // 1. Write code (example.js)
  writeTasks.push(
    files.write(base, {
      destPath: dir,

      // Add source code
      async fileContents() {
        return code
      }
    })
  )

  // 2. Write source map (example.js.map)
  if (map && 'sources' in map) {
    map.sources = map.sources

      /**
       * Make source file:// paths relative (e.g. for Dart Sass)
       * {@link https://sass-lang.com/documentation/js-api/interfaces/CompileResult#sourceMap}
       */
      .map((path) =>
        slash(
          path.startsWith('file://')
            ? relative(dirname(filePath), fileURLToPath(path))
            : path
        )
      )

    writeTasks.push(
      files.write(`${base}.map`, {
        destPath: dir,

        // Add source map as JSON
        async fileContents() {
          return JSON.stringify(map)
        }
      })
    )
  }

  await Promise.all(writeTasks)
}
