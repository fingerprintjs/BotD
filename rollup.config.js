import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'
import { terser as terserPlugin } from 'rollup-plugin-terser'
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

const min = {
  plugins: [
    terserPlugin({
      format: {
        comments: false,
      },
      safari10: true,
    }),
    commonBanner,
  ],
}

const common = {
  name: 'Botd',
  exports: 'named',
}

export default [
  {
    input: inputFile,
    output: [
      {
        ...min,
        ...common,
        file: `${outputDirectory}/botd.min.js`,
        format: 'iife',
      },
      {
        ...min,
        ...common,
        file: `${outputDirectory}/botd.umd.min.js`,
        format: 'umd',
      },
      {
        ...min,
        ...common,
        file: `${outputDirectory}/botd.cjs.min.js`,
        format: 'cjs',
      },
      {
        ...min,
        ...common,
        file: `${outputDirectory}/botd.esm.min.js`,
        format: 'es',
      },
      {
        ...common,
        file: `${outputDirectory}/botd.js`,
        format: 'iife',
      },
      {
        ...common,
        file: `${outputDirectory}/botd.umd.js`,
        format: 'umd',
      },
      {
        ...common,
        file: `${outputDirectory}/botd.cjs.js`,
        format: 'cjs',
      },
      {
        ...common,
        file: `${outputDirectory}/botd.esm.js`,
        format: 'es',
      },
    ],
    plugins: [typescript(), jsonPlugin()],
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
