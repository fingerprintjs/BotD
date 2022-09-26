import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { join } from 'path'

const inputFile = 'src/index.ts'
const outputDirectory = 'dist'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

const commonInput = {
  input: inputFile,
  plugins: [resolve(), commonjs(), jsonPlugin(), typescript(), commonBanner],
}

const commonOutput = {
  name: 'Botd',
  exports: 'named',
}

export default [
  {
    ...commonInput,
    output: [
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.cjs.js`,
        format: 'cjs',
      },
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.esm.js`,
        format: 'es',
      },
    ],
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
