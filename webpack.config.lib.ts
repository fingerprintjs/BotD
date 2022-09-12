import { resolve } from 'path'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { LicenseWebpackPlugin } from 'license-webpack-plugin'

const INCLUDE = resolve(__dirname, 'src')

const baseConfig = (tsConfigPath: string): Configuration => ({
  mode: 'production',
  target: 'web',
  devtool: 'hidden-source-map',

  entry: './src/index.ts',

  output: {
    path: resolve(__dirname, 'dist'),
  },

  plugins: [
    new LicenseWebpackPlugin({
      addBanner: true,
      additionalChunkModules: {
        main: [
          {
            name: '@fpjs-incubator/botd-agent',
            directory: resolve(__dirname),
          },
        ],
      },
    }) as any,
  ],

  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: INCLUDE,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: tsConfigPath,
        },
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json'],
  },
})

const cjsConfig = merge(baseConfig(resolve(__dirname, 'tsconfig.lib.json')), {
  output: {
    filename: '[name].cjs.js',
    libraryTarget: 'commonjs',
  },
} as Configuration)

const esmConfig = merge(baseConfig(resolve(__dirname, 'tsconfig.lib.esm.json')), {
  experiments: {
    outputModule: true,
  },

  output: {
    filename: '[name].esm.js',
    module: true,
    libraryTarget: 'module',
  },
} as Configuration)

module.exports = [cjsConfig, esmConfig]
