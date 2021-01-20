const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development', // production development
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   // 预处理
      //   enforce: 'pre'
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
    ]
  },
  plugins: [],
  optimization: {},
  devServer: {
    open: true,
    port: 8888,
    contentBase: path.join(__dirname, 'src')
  }
}