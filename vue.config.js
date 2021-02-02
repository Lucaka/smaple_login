const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  devServer: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8088/api/', //设置调用的接口域名和端口
        changeOrigin: true, //是否跨域
        ws:true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {

    config.module.rules.delete("svg"); //刪除默認配置處理的svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve('src/assets/svg')) //處理svg的目錄
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })

    let fs = require('fs');
    // eslint-disable-next-line no-undef
    fs.writeFile('chainWebpack.txt', config.toString(), err = () => {})
  }
}
