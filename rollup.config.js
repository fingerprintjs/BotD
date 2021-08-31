import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import { terser as terserPlugin } from 'rollup-plugin-terser'
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

const min = {
  plugins: [
    terserPlugin({
      format: {
        comments: false,
      },
      safari10: true,
    }),
  ],
}

const commonInput = {
  input: inputFile,
  plugins: [jsonPlugin(), typescript(), commonBanner],
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
        file: `${outputDirectory}/botd.js`,
        format: 'iife',
      },
      {
        ...min,
        ...commonOutput,
        file: `${outputDirectory}/botd.min.js`,
        format: 'iife',
      },
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.umd.js`,
        format: 'umd',
      },
      {
        ...min,
        ...commonOutput,
        file: `${outputDirectory}/botd.umd.min.js`,
        format: 'umd',
      },
    ],
  },
  {
    ...commonInput,
    external: Object.keys(dependencies),
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
