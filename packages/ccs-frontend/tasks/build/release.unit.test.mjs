import { readFile } from 'fs/promises'
import { join } from 'path'

import { paths, pkg } from '@ccs-frontend/config'
import { getListing } from '@ccs-frontend/lib/files'

describe('dist/', () => {
  let listingSourceAssets
  let listingDistAssets

  beforeAll(async () => {
    listingSourceAssets = await getListing('**/*', {
      cwd: join(paths.package, 'src/ccs/assets')
    })

    listingDistAssets = await getListing('**/*', {
      cwd: join(paths.root, 'dist/assets')
    })
  })

  describe('assets/', () => {
    it('should include the same files as in src/assets', () => {
      expect(listingDistAssets).toEqual(listingSourceAssets)
    })
  })

  describe('ccs-frontend-[version].min.css', () => {
    let filename
    let stylesheet

    beforeAll(async () => {
      filename = `ccs-frontend-${pkg.version}.min.css`
      stylesheet = await readFile(join(paths.root, `dist/${filename}`), 'utf8')
    })

    it('should not contain current media query displayed on body element', () => {
      expect(stylesheet).not.toMatch(/body:before{content:/)
    })

    it('should not contain Sass variables', () => {
      expect(stylesheet).not.toContain('$ccs-')
    })

    it('should contain the copyright notice', () => {
      expect(stylesheet).toContain(
        '/*! Copyright (c) 2011 by Margaret Calvert & Henrik Kubel. All rights reserved. The font has been customised for exclusive use on gov.uk. This cut is not commercially available. */'
      )
    })

    it('should contain source mapping URL', () => {
      expect(stylesheet).toMatch(
        new RegExp(`/\\*# sourceMappingURL=${filename}.map \\*/\n$`)
      )
    })

    it('should contain CSS custom properties', () => {
      // CCS Frontend version number
      expect(stylesheet).toContain(`--ccs-frontend-version:"${pkg.version}"`)
    })
  })

  describe('ccs-frontend-[version].min.css.map', () => {
    let filename
    let sourcemap

    beforeAll(async () => {
      filename = `ccs-frontend-${pkg.version}.min.css.map`
      sourcemap = JSON.parse(
        await readFile(join(paths.root, `dist/${filename}`), 'utf8')
      )
    })

    it('should contain relative paths to sources', () => {
      expect(sourcemap.sources).toContain(
        '../packages/ccs-frontend/src/ccs/index.scss'
      )
      expect(sourcemap.sources).toContain(
        '../packages/ccs-frontend/src/ccs/core/_ccs-frontend-properties.scss'
      )
    })
  })

  describe('ccs-frontend-[version].min.js', () => {
    let filename
    let javascript

    beforeAll(async () => {
      filename = `ccs-frontend-${pkg.version}.min.js`
      javascript = await readFile(join(paths.root, `dist/${filename}`), 'utf8')
    })

    it('should have the correct version name', () => {
      expect(javascript).toBeTruthy()
    })

    it('should contain correct version number', () => {
      expect(javascript).toContain(`const version="${pkg.version}"`)
    })

    it('should contain source mapping URL', () => {
      expect(javascript).toMatch(
        new RegExp(`//# sourceMappingURL=${filename}.map\n$`)
      )
    })
  })

  describe('ccs-frontend-[version].min.js.map', () => {
    let filename
    let sourcemap

    beforeAll(async () => {
      filename = `ccs-frontend-${pkg.version}.min.js.map`
      sourcemap = JSON.parse(
        await readFile(join(paths.root, `dist/${filename}`), 'utf8')
      )
    })

    it('should contain relative paths to sources', () => {
      expect(sourcemap.sources).toContain(
        '../packages/ccs-frontend/src/ccs/init.ts'
      )
      expect(sourcemap.sources).toContain(
        '../packages/ccs-frontend/src/ccs/common/ccs-frontend-version.ts'
      )
    })
  })

  describe('VERSION.txt', () => {
    let filename
    let version

    beforeAll(async () => {
      filename = 'VERSION.txt'
      version = await readFile(join(paths.root, `dist/${filename}`), 'utf8')
    })

    it('should contain the correct version', () => {
      expect(version).toBe(`${pkg.version}\n`)
    })
  })
})
