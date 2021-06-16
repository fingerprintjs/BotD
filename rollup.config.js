import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import { terser as terserPlugin } from 'rollup-plugin-terser'

const inputFile = 'src/index.ts'

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
        file: `dist/botd.min.js`,
        format: 'iife',
      },
      {
        ...min,
        ...common,
        file: 'dist/botd.umd.min.js',
        format: 'umd',
      },
      {
        ...min,
        ...common,
        file: 'dist/botd.cjs.min.js',
        format: 'cjs',
      },
      {
        ...min,
        ...common,
        file: 'dist/botd.esm.min.js',
        format: 'es',
      },
      {
        ...common,
        file: `dist_dev/botd.js`,
        format: 'iife',
      },
      {
        ...common,
        file: 'dist_dev/botd.umd.js',
        format: 'umd',
      },
      {
        ...common,
        file: 'dist_dev/botd.cjs.js',
        format: 'cjs',
      },
      {
        ...common,
        file: 'dist_dev/botd.esm.js',
        format: 'es',
      },
    ],
    plugins: [typescript(), jsonPlugin()],
  },
  {
    input: inputFile,
    output: {
      file: 'dist/botd.d.ts',
      format: 'es',
    },
    plugins: [dtsPlugin()],
  },
]
