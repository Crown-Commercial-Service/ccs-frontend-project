import config from '@ccs-frontend/config'
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

/**
 * Rollup config for npm publish
 */
export default defineConfig(({ i: input }) => ({
  input,

  /**
   * Output options
   */
  output: [
    /**
     * ECMAScript (ES) modules for Node.js or bundler `import`
     */
    {
      entryFileNames: '[name].mjs',
      format: 'es',

      // Separate modules, not bundled
      preserveModules: true
    },

    /**
     * ECMAScript (ES) module bundles for browser <script type="module">
     * or using `import` for modern browsers and Node.js scripts
     */
    {
      format: 'es',

      // Bundled modules
      preserveModules: false
    },

    /**
     * Universal Module Definition (UMD) bundle for browser <script>
     * `window` globals and compatibility with CommonJS and AMD `require()`
     */
    {
      format: 'umd',

      // Bundled modules
      preserveModules: false,

      // Export via `window.CCSFrontend.${exportName}`
      name: 'CCSFrontend'
    }
  ],

  /**
   * Input plugins
   */
  plugins: [
    replace({
      include: '**/common/ccs-frontend-version.ts',
      preventAssignment: true,

      // Add CCS Frontend release version
      development: config.version
    }),
    babel({
      babelHelpers: 'bundled'
    }),
    typescript()
  ]
}))
