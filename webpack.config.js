const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.DEV === '1'

const config = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  devtool: 'inline-source-map',

  entry: './playground/index.ts',

  output: {
    path: resolve(__dirname, 'build'),
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
      patterns: [{ from: 'static' }],
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
