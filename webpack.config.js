const path = require('path')
const merge = require('webpack-merge')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoader = require('vue-loader/lib/plugin')
const WebpackProgressBar = require('webpack-progress-bar')
const devMode = process.env.NODE_ENV !== 'development' ? 'production' : 'development'
const _webpackConfig = require(`./build/webpack.${devMode}.conf.js`)
const webpackConfig = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // {
      //   test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
      //   use: [{
      //     loader: 'file-loader', // 处理静态资源问题 页面中图片路径
      //     options: {
      //       esModule: false,
      //       name: '[path][name].[ext]'
      //     }
      //   }]
      // }
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          // 处理html/img引入图片出现 [object Module] 的问题
          esModule: false,
          name: '[name].[ext]',
          outputPath: 'assets/images'
        }
      },
      {
        test: /\.bmp|ttf|eot|svg|woff|woff2$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/font'
        }
      }
    ]
  },
  plugins: [
    // 删除指定文件 默认 dist
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack Vue'
    }),
    // 处理vue-loader 的报错
    new VueLoader(),
    // 显示打包进度条
    new WebpackProgressBar()
  ],
  optimization: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      vue$: 'vue/dist/vue.esm.js'
    }
  }

}
module.exports = merge(webpackConfig, _webpackConfig)
