import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { join } from 'path'
import { dependencies } from './package.json'

const inputFile = 'src/index.ts'
const outputDirectory = 'dist'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

export const commonInput = {
  input: inputFile,
  plugins: [resolve(), commonjs(), jsonPlugin(), typescript(), commonBanner],
}

const commonOutput = {
  name: 'Botd',
  exports: 'named',
}

export const createBundle = (filename, format) => {
  return {
    ...commonOutput,
    file: `${outputDirectory}/${filename}`,
    format,
  }
}

// NPM bundles. They have all the dependencies excluded for end code size optimization.
export default [
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [createBundle('botd.cjs.js', 'cjs'), createBundle('botd.esm.js', 'es')],
  },
  {
    input: inputFile,
    output: {
      file: `${outputDirectory}/botd.d.ts`,
      format: 'es',
    },
    plugins: [dtsPlugin(), commonBanner],
  },
]
