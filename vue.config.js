const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 优化搭建速度
const path = require('path');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const resolve = filePath => path.resolve(__dirname, filePath);
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? '/www/' : '/';
const addCdn = [{
  module: 'Vue',
  entry: 'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
},
{
  module: 'Vuex',
  entry: 'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
}, {
  module: 'VueRouter',
  entry: 'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
}, {
  module: 'axios',
  entry: 'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
},
{
  module: 'vue-i18n',
  entry: 'https://cdn.bootcss.com/vue-i18n/8.14.1/vue-i18n.common.js',
},
];
module.exports = {
  // 打包后的路径
  publicPath: BASE_URL,

  outputDir: 'www',
  assetsDir: 'static',

  configureWebpack: (config) => { // 相当于merge
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'vue-i18n': 'i18n',
      };
      config.plugins.push(new BundleAnalyzerPlugin());
      config.plugins.push(new HtmlWebpackExternalsPlugin({ externals: addCdn }));
    }
    // 优化搭建速度
    config.plugins.push(new HardSourceWebpackPlugin());
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
    // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
    }
  },

  devServer: {

  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
// module.exports = {
//   configureWebpack: {
//     plugins: [new BundleAnalyzerPlugin()],
//   },
//   chainWebpack: (config) => { // 更改webpack原配置
//     // 别名
//     config.resolve.alias.set('@', resolve('src'));
//     config.resolve.alias.set('_c', resolve('src/components'));
//     config.resolve.alias.set('_v', resolve('src/views'));
//     config.resolve.alias.set('_img', resolve('src/assets/imgs'));
//     if (isProduction) {
//       config.optimization.splitChunks({
//         chunks: 'async', // 默认支持异步代码分割
//         minSize: 30000, // 文件超过30k就抽离
//         maxSize: 0, // 没限制
//         minChunks: 1, // 模块至少被引用几次就抽离
//         maxAsyncRequests: 5, // 最大抽离几个模块
//         maxInitialRequests: 3, // 首页加载最多加载3个模块
//         automaticNameDelimiter: '~', // 抽离的名字中间的分隔符
//         automaticNameMaxLength: 30, // 模块最长的名字不能超过30个字节
//         name: true,
//         cacheGroups: {// 缓存组
//           vendors: {
//             test: /[\\/]node_modules[\\/]/,
//             priority: -10, // 优先级
//           },
//           default: {
//             minChunks: 2, // 至少几个模块引用再打包
//             priority: -20,
//             reuseExistingChunk: true,
//           },
//         },
//       });
//     }
//   },
//   pluginOptions: {
//     i18n: {
//       locale: 'zh',
//       fallbackLocale: 'zh',
//       localeDir: 'locales',
//       enableInSFC: false,
//     },
//   },
// };
