# 使用webpack自己配置一下vue项目

## mode
::: tip
  mode模式由webpack4 引入默认值为 development/production/none (开发模式/生产模式/无)
:::
### production 生产模式
当mode= production 时,webpack默认开启优化插件 比如 tree-shaking(摇树优化) ,uglifyJsPlugin(压缩JS)

### development 开发模式
当mode= development 时,webpack 默认启用NamedChunksPlugin和NamedModulesPlugin
NamedChunksPlugin作用：在打包时返回chunk的名称，而不是chunkId
NamedModulesPlugin作用：在打包时使用模块的路径，而不是数字标识符
:::tip
NamedChunksPlugin 和NamedModulesPlugin 只能在开发环境使用
:::

### none 
当mode=none 时，表示不使用webpack默认的配置

## entry
webpack的入口，webpack会根据entry的配置来作为构建内部依赖图的开始，

## output
webpack的出口，表示 webpack打包后的文件输出目录和命名规则

## loader
由于webpack默认只能处理JavaScript文件，而对于其他的文件，只能通过不同的loader来进行处理

## plugins
loader被用于转换其他类型的模块，而插件则可以用来对整个项目来做一些优化。从打包优化到压缩，再到重新定义环境的变量

## webpack 打包优化
1. 提取项目中引入的第三方库 (webpack4开始删除了commonChunkPlugin,而该为 optimization.splitChunks)
2. 压缩js文件(webpack4 不再使用uglifyJs-webpack-plugin，而使用 terser-webpack-plugin)
```javascript
module.exports = {
  ...
  optimization:{
    splitChunks: {
      chunks: 'all', // all async initial all最为强大，可以在同步/异步之间共享块
      name: 'common', //拆分块后生成文件的名称
      filename: 'common.js',
      minChunks: 1, // 拆分前被公共引用的最小次数
      minSize: 0  , // 生成块的最小大小 字节
      maxSize: 0, // 生成块的最大大小 字节
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配，表示只从匹配到的文件夹下筛选，进行拆分
          priority: -10 //拆分包的权重，为负数，越靠近0权重越大
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 已经打包过的模块不会再打包
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,// 开启js压缩
    minimizer: [new TerserPlugin({ // 使用terser-webpack-plugin进行js压缩
      parallel: 2, // 开启多核压缩，默认是 系统cpu的数量-1  (os.cpus().length - 1)
      terserOptions: {
        warnings: false
      }
    })],
  }
  ...
}
```

3. 使用 js tree-shaking 摇树优化(将代码中未使用的部分清除掉，只支持使用ES6 模块化编写的代码 import/export)
:::tips
当mode===production时，webpack默认开启了摇树优化和代码压缩
:::
4. 使用 css tree-shaking 样式的摇树优化(将代码中未使用的样式清除掉)
:::tips
开启css tree-shaking 需要使用到purifycss-webpack 、glob-all和 extract-text-webpack-plugin
:::
5. 开启多核打包任务
  1. 使用happypack插件开启多核任务
  2. 使用 terser-webpack 插件开启多核任务 
:::warning
注意：并不是所有的项目都适合开启多核任务，对于大型项目来说，开启多核任务会加快打包速度。但是对于小型项目来说，开启多核任务反而会减低打包速度
:::
6. 对于不经常变动的引入的第三方库，我们可以减少打包次数
  1. 使用DllPlugin呵DllReferencePlugin

[参考地址](https://www.cnblogs.com/tugenhua0707/p/9520780.html)

```javascript
{
  plugins:[
    new ExtractTextWebpackPlugin({ // 将js中引入的css文件提取到[name].min.css文件中
      filename: '[name].min.css' // 配置提取出来的css名称
    }),
    // purify 处理的是打包之后的文件
    new PurifyCSSPlugin({
      paths: glob.sync([
        // 要做CSS Tree Shaking的路径文件
        path.resolve(__dirname, "./*.html"),
        path.resolve(__dirname, "./dist/*.css"),
        path.resolve(__dirname, "./dist/*.js")
      ])
    }),
  ]
}
```

## webpack4 新特性

### mode属性 
新增mode属性 值为 development/production/node 默认为development ,分别启用不同的webpack默认配置，none为不启用默认配置

### 删除了部分插件，变为 webpack的内置API
删除了 CommonsChunkPlugin/noEmitOnErrorPlugin/ModuleConcatenationPlugin/NamedModulesPlugin
分别添加了optimization.splitChunks和 optimization.runtimeChunk/optimization.noEmitOnErrors/optimization.concatenateModules/optimization.namedModules
升级了uglifyjs-webpack-plugin

### 支持多种模块类型
1. javascript/auto: 在webpack3里，默认开启对所有模块系统的支持，包括CommonJS、AMD、ESM。
2. javascript/esm: 只支持ESM这种静态模块。
3. javascript/dynamic: 只支持CommonJS和AMD这种动态模块。
4. json: 只支持JSON数据，可以通过require和import来使用。
5. webassembly/experimental: 只支持wasm模块，目前处于试验阶段。

### 零配置，
受到了Parcel打包工具的启发，不需要添加webpack.config.js就能默认的进行打包

### 开箱即用WebAssembly
WebAssembly(wasm)会带来运行时性能的大幅度提升，由于在社区的热度，webpack4对它做了开箱即用的支持。你可以直接对本地的
wasm模块进行import或者export操作，也可以通过编写loaders来直接import C++、C或者Rust。

## webpack的设计原理
