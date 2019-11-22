const webpack = require('webpack')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: './dist',
  integrity: true,
  chainWebpack: (config) => {
    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@asset', resolve('src/assets'))
      .set('@component', resolve('src/components'))
      .set('@interface', resolve('src/interfaces'))
      .set('@lib', resolve('src/libs'))
      .set('@style', resolve('src/styles'))
  },
  css: {
    loaderOptions: {
      // 配置全局sass变量
      sass: {
        prependData: `@import "@/styles/common.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
