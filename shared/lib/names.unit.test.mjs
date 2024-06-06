import { join } from 'path'

import { paths } from '@ccs-frontend/config'

import {
  componentNameToClassName,
  componentNameToConfigName,
  componentNameToMacroName,
  packageResolveToPath,
  packageTypeToPath,
  packageNameToPath
} from './names.js'

describe('componentNameToClassName', () => {
  const components = [
    {
      name: 'button',
      className: 'Button'
    },
    {
      name: 'radios',
      className: 'Radios'
    },
    {
      name: 'skip-link',
      className: 'SkipLink'
    },
    {
      name: 'character-count',
      className: 'CharacterCount'
    }
  ]

  it.each(components)(
    'transforms component \'$name\' to class \'$className\'',
    ({ name, className }) => {
      expect(componentNameToClassName(name)).toBe(className)
    }
  )
})

describe('componentNameToConfigName', () => {
  const components = [
    {
      name: 'button',
      configName: 'button'
    },
    {
      name: 'radios',
      configName: 'radios'
    },
    {
      name: 'skip-link',
      configName: 'skipLink'
    },
    {
      name: 'character-count',
      configName: 'characterCount'
    }
  ]

  it.each(components)(
    'transforms component \'$name\' to class \'$configName\'',
    ({ name, configName }) => {
      expect(componentNameToConfigName(name)).toBe(configName)
    }
  )
})

describe('componentNameToMacroName', () => {
  const components = [
    {
      name: 'button',
      macroName: 'ccsButton'
    },
    {
      name: 'radios',
      macroName: 'ccsRadios'
    },
    {
      name: 'skip-link',
      macroName: 'ccsSkipLink'
    },
    {
      name: 'character-count',
      macroName: 'ccsCharacterCount'
    }
  ]

  it.each(components)(
    'transforms component \'$name\' to macro \'$macroName\'',
    ({ name, macroName }) => {
      expect(componentNameToMacroName(name)).toBe(macroName)
    }
  )
})

describe('packageResolveToPath', () => {
  const packages = [
    {
      packageEntry: 'ccs-frontend/package.json',
      resolvedPath: join(paths.package, 'package.json')
    },
    {
      packageEntry: 'ccs-frontend/src/ccs/all.ts',
      resolvedPath: join(paths.package, 'src/ccs/all.ts')
    },
    {
      packageEntry: 'ccs-frontend/src/ccs/all.ts',
      options: { modulePath: 'components/header/header.ts' },
      resolvedPath: join(
        paths.package,
        'src/ccs/components/header/header.ts'
      )
    }
  ]

  it.each(packages)(
    'locates path for npm package entry \'$packageEntry\'',
    ({ packageEntry, options, resolvedPath }) => {
      expect(packageResolveToPath(packageEntry, options)).toBe(resolvedPath)
    }
  )
})

describe('packageTypeToPath', () => {
  const packages = [
    {
      packageName: 'ccs-frontend',
      resolvedPath: join(paths.package, 'dist/ccs/all.bundle.js')
    },
    {
      packageName: 'ccs-frontend',
      options: { type: 'module' },
      resolvedPath: join(paths.package, 'dist/ccs/all.mjs')
    },
    {
      packageName: 'ccs-frontend',
      options: { modulePath: 'components/header/header.bundle.js' },
      resolvedPath: join(
        paths.package,
        'dist/ccs/components/header/header.bundle.js'
      )
    },
    {
      packageName: 'ccs-frontend',
      options: {
        modulePath: 'components/header/header.bundle.mjs',
        type: 'module'
      },
      resolvedPath: join(
        paths.package,
        'dist/ccs/components/header/header.bundle.mjs'
      )
    }
  ]

  it.each(packages)(
    'locates path for npm package \'$packageName\' field \'$packageField\'',
    ({ packageName, options, resolvedPath }) => {
      expect(packageTypeToPath(packageName, options)).toBe(resolvedPath)
    }
  )
})

describe('packageNameToPath', () => {
  const packages = [
    {
      packageName: 'ccs-frontend',
      resolvedPath: paths.package
    },
    {
      packageName: '@ccs-frontend/review',
      resolvedPath: paths.app
    }
  ]

  it.each(packages)(
    'locates path for npm package \'$packageName\'',
    ({ packageName, resolvedPath }) => {
      expect(packageNameToPath(packageName)).toBe(resolvedPath)
    }
  )
})

describe('packageNameToPath (with custom \'node_module\' paths)', () => {
  const packages = [
    {
      packageName: 'ccs-frontend',
      options: { moduleRoot: paths.root },
      resolvedPath: paths.package
    },
    {
      packageName: '@ccs-frontend/review',
      options: { moduleRoot: paths.root },
      resolvedPath: paths.app
    },
    {
      packageName: 'autoprefixer',
      options: { moduleRoot: paths.package },
      resolvedPath: join(paths.root, 'node_modules/autoprefixer')
    },
    {
      packageName: 'postcss',
      options: { moduleRoot: paths.app },
      resolvedPath: join(paths.root, 'node_modules/postcss')
    }
  ]

  it.each(packages)(
    'locates path for npm package \'$packageName\'',
    ({ packageName, options = {}, resolvedPath }) => {
      expect(packageNameToPath(packageName, options)).toBe(resolvedPath)
    }
  )
})
