const path = require('path')
const argv = require('yargs').argv
const CopyPlugin = require('copy-webpack-plugin')
let env = argv.env// 环境

function resolve (dir) {
  return path.join(__dirname, dir)
}
let config = {
  outputDir: 'build',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/views/components'))
      .set('@views', resolve('src/views'))
      .set('@models', resolve('src/models'))
  },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/css/common_v2.less')
      ]
    }
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    plugins: []
  },

  devServer: {
    open: true,
    proxy: {
      // 'webinar/info': {
      //   target: 'do.qutoutiao.net',
      //   changeOrigin: true
      // },
      '/api': {
        target: argv.api ? argv.api : 'http://dev.qdo.qutoutiao.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/web': {
      //   target: 'http://wing.qttcs3.cn/gateway/',
      //   changeOrigin: true,
      //   ws: false
      // },
      '/static/ueditor-1.4.3.3': {
        target: 'https://oa.innotechx.com',
        changeOrigin: true
      }
    }

  }
}

console.log('env:', env)
if (env === 'test') { // 只有上线上时会用到打包
  // config.publicPath = '/'
}
if (env === 'pro') { // 只有上线上时会用到打包
  // const WebpackZipPlugin = require('webpack-zip-plugin')
  // config.configureWebpack.plugins.push(
  //   new WebpackZipPlugin({
  //     initialFile: './dist/', // 需要打包的文件夹(一般为dist)
  //     endPath: './dist/', // 打包到对应目录（一般为当前目录'./'）
  //     zipName: 'dist.zip' // 打包生成的文件名
  //   })
  // )

  config.configureWebpack.plugins.push(
    new CopyPlugin([
      { from: resolve('static'), to: resolve('build/static') }
    ])
  )
}
module.exports = config
