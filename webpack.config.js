const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const webpack = require('webpack');
const minify = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          miniCss.loader,
          'css-loader?url=false',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new minify({}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new UglifyJsPlugin({}),
    ],
  },
  plugins: [
    new miniCss({
      filename: './css/style.css',
    }),
  ]
};
