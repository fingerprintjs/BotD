import { resolve } from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'
import 'webpack-dev-server'

const isDev = process.env.DEV === '1'

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  devtool: 'eval-source-map',

  entry: './playground/index.ts',

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
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

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json'],
  },

  devServer: {
    compress: !isDev,
    port: 3000,
  },

  performance: {
    hints: isDev ? false : 'error',
  },
}

module.exports = [config]
