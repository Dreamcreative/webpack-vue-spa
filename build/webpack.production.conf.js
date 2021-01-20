// const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const glob = require("glob-all");
// const PurifyCSSPlugin = require('purifycss-webpack');
module.exports = {
  mode: 'production', // production development
  devtool: 'none',
  entry: './src/main.js',
  output: {
    filename: '[name][hash:6].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
    ]
  },
  plugins: [
    // 压缩css
    new OptimizeCSSAssetsPlugin(),
    // 将css从js文件中提取出来
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: '[id].[contenthash:5].css'
    }),
    // 处理css tree shaking 但是tree-shaking 之后，css的分离失效了  未完成

    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     // 要做CSS Tree Shaking的路径文件
    //     path.resolve(__dirname, "./*.html"),
    //     path.resolve(__dirname, "./dist/*.css"),
    //     path.resolve(__dirname, "./dist/*.js")
    //   ])
    // }),

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
      filename: 'common.js',
      minChunks: 1,
      maxSize: 0,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 已经打包过的模块不会再打包
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: 2,
      terserOptions: {
        warnings: false
      }
    })],
  },

}