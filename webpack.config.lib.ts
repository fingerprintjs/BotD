import { resolve } from 'path'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

const INCLUDE = resolve(__dirname, 'src')

const baseConfig: Configuration = {
  mode: 'production',
  target: 'web',
  devtool: 'hidden-source-map',

  entry: './src/index.ts',

  output: {
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: INCLUDE,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: resolve(__dirname, 'tsconfig.lib.json'),
        },
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json'],
  },
}

const cjsConfig = merge(baseConfig, {
  output: {
    filename: '[name].cjs.js',
  },
} as Configuration)

const esmConfig = merge(baseConfig, {
  experiments: {
    outputModule: true,
  },

  output: {
    filename: '[name].esm.js',
  },
} as Configuration)

module.exports = [cjsConfig, esmConfig]
