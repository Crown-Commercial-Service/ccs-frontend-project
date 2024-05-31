import prettier from '@prettier/sync'
import { outdent } from 'outdent'

import { inspect, componentNameToMacroName } from '../filters/index.mjs'

/**
 * Component Nunjucks code (formatted)
 */
export function getNunjucksCode(componentName, options) {
  const macroName = componentNameToMacroName(componentName)

  // Allow nested HTML strings to wrap at `\n`
  const paramsFormatted = inspect(options.context)

  // Format Nunjucks safely with double quotes
  const macroFormatted = prettier.format(`${macroName}(${paramsFormatted})`, {
    parser: 'espree',
    semi: false,
    singleQuote: false,
    trailingComma: 'none'
  })

  return outdent`
    {% from "ccs/components/${componentName}/macro.njk" import ${macroName} %}

    {{ ${macroFormatted.trim()} }}
  `
}
