import { resolve } from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'
import 'webpack-dev-server'

const isDev = process.env.DEV === '1'
const port = process.env.BOTD_PORT || 3000
const host = process.env.BOTD_HOST

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  devtool: 'inline-source-map',

  entry: './playground/index.ts',

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `playground/index.html`,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'resources' }],
    }),
  ],

  // https://stackoverflow.com/questions/64993118/error-should-not-import-the-named-export-version-imported-as-version
  ignoreWarnings: [/only default export is available soon/],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json'],
  },

  devServer: {
    compress: !isDev,
    host: host,
    port: port,
  },

  performance: {
    hints: isDev ? false : 'error',
    maxAssetSize: Infinity,
    maxEntrypointSize: Infinity,
  },
}

module.exports = [config]
