import typescript from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';
import { terser as terserPlugin } from 'rollup-plugin-terser';
import dtsPlugin from 'rollup-plugin-dts';

const inputFile = 'src/index.ts';

export default [
  {
    input: inputFile,
    output: {
      file: 'dist/botd.umd.min.js',
      format: 'umd',
      name: 'BotDetector'
    },
    plugins: [
      typescript(),
      jsonPlugin(),
      terserPlugin({
        format: {
          comments: false,
        },
        safari10: true,
      }),
    ],
  },
  {
    input: inputFile,
    output: {
      file: 'dist/botd.d.ts',
      format: 'es',
    },
    plugins: [
      dtsPlugin(),
    ],
  },
];
