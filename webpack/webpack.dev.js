const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../node-server-heroku/dist')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/(node_modules)/, /\.spec\.js$/],
        include: [
          path.resolve(__dirname, './src/js')
        ],
        use: []
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            query: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: './src/css/style.css',
        to: 'src/css'
      },
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, '../node-server-heroku'),
    compress: true,
    historyApiFallback: true
  }
};