const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 每个子目录创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录入口文件 并且每个入口文件还引入了一个用于热更新的文件
   * entries 是一个对象 key 为目录名
   * {
   *   base: ['webpack-hot-middleware/client', __dirname/base/app.ts],
   *   simple: ['webpack-hot-middleware/client', __dirname/simple/app.ts]
   * }
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
  
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      // webpack-hot-middleware/client connects to the server to receive notifications
      // when the bundle rebuilds and then updates your client bundle accordingly.
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre', // 优先
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
