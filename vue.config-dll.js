const path = require('path');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const resolve = filePath => path.resolve(__dirname, filePath);
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? '/www/' : '/';
module.exports = {
  publicPath: BASE_URL, // 打包后的路径
  outputDir: 'www',
  assetsDir: 'static',
  configureWebpack: { // 相当于merge
    plugins: [
    //   new HardSourceWebpackPlugin(),
      new webpack.DllReferencePlugin({
        manifest: resolve('dll/vue.manifest.json'),
      }),
      new AddAssetHtmlPlugin({
        filepath: resolve('dll/vue.dll.js'),
      }),
      isProduction && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: (config) => { // 更改webpack原配置
    // 别名
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('_c', resolve('src/components'));
    config.resolve.alias.set('_v', resolve('src/views'));
    config.resolve.alias.set('_img', resolve('src/assets/imgs'));
    if (isProduction) {
      config.optimization.splitChunks({
        splitChunks: {
          chunks: 'async', // 默认支持异步代码分割
          minSize: 30000, // 文件超过30k就抽离
          maxSize: 0, // 没限制
          minChunks: 1, // 模块至少被引用几次就抽离
          maxAsyncRequests: 5, // 最大抽离几个模块
          maxInitialRequests: 3, // 首页加载最多加载3个模块
          automaticNameDelimiter: '~', // 抽离的名字中间的分隔符
          automaticNameMaxLength: 30, // 模块最长的名字不能超过30个字节
          name: true,
          cacheGroups: {// 缓存组
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10, // 优先级
            },
            default: {
              minChunks: 2, // 至少几个模块引用再打包
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      });
    }
  },
  devServer: {

  },
};
