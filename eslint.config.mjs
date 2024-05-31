import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginJest from 'eslint-plugin-jest'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
        page: true
      }
    }
  },
  {
    ignores: [
      'src/govuk/*',
      'package/*',
      'app/public/assets/javascript/all.js'
    ]
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ]
    },
  },
  {
    files: [
      '**/*.test.js',
      'lib/jest/*.js'
    ],
    ...pluginJest.configs['flat/recommended']
  }
]
