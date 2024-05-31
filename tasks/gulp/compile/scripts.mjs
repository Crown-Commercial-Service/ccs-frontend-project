import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'

// Compile scripts task ----------------------
// --------------------------------------
const outputFiles = [
  'app/public/assets/javascript/all.js',
  'package/ccs/all.js'
]

const generateOutputs = async (bundle) => {
  for await (const outputFile of outputFiles) {
    await bundle.write({
      format: 'es',
      compact: true,
      file: outputFile,
      plugins: [
        terser()
      ]
    })
  }
}

const scripts = async (done) => {
  const inputOptions = {
    input: 'src/ccs/all.js'
  }

  let bundle
  let buildError
  try {
    // create a bundle
    bundle = await rollup(inputOptions)

    await generateOutputs(bundle)
  } catch (error) {
    buildError = error
  }
  if (bundle) {
    // closes the bundle
    await bundle.close()
  }
  if (buildError) {
    throw buildError
  }

  await done()
}

scripts.displayName = 'Compile : JavaScript'

export { scripts }
