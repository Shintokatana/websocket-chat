const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const createHtmlPlugin = (chunkName, fileName) => new HTMLWebpackPlugin({
  filename: `${fileName}.html`,
  chunks: [chunkName],
  template: path.resolve(__dirname, `src/public/${fileName}.html`),
  minify: true
});

const createPolyfill = path => ['@babel/polyfill', path];

module.exports = {
  entry: {
    application: createPolyfill('./src/public/client.js')
  },
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    pathinfo: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new VueLoaderPlugin(),
    createHtmlPlugin('application', 'index')
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9012
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/
  },
  optimization: {
    minimize: false
  },
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  stats: {
    builtAt: true,
    colors: true
  }
};