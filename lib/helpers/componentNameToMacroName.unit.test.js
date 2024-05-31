import { componentNameToMacroName } from './componentNameToMacroName'

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
