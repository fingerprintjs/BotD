import typescript from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'BotDetector'
  },
  plugins: [
    typescript(),
    jsonPlugin(),
  ],
};