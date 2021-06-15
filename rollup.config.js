import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import dtsPlugin from 'rollup-plugin-dts'
import { terser as terserPlugin } from 'rollup-plugin-terser'

const inputFile = 'src/index.ts'

export default [
  {
    input: inputFile,
    output: [
      {
        file: 'dist/botd.umd.min.js',
        format: 'umd',
        name: 'Botd',
        plugins: [
          terserPlugin({
            format: {
              comments: false,
            },
            safari10: true,
          }),
        ],
      },
      {
        file: 'dist/botd.cjs.min.js',
        format: 'cjs',
        plugins: [
          terserPlugin({
            format: {
              comments: false,
            },
            safari10: true,
          }),
        ],
      },
      {
        file: 'dist_dev/botd.umd.js',
        format: 'umd',
        name: 'Botd',
      },
      {
        file: 'dist_dev/botd.cjs.js',
        format: 'cjs',
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
