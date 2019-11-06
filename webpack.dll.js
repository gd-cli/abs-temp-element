const path = require('path');
const webpack = require('webpack');

const resolve = filePath => path.resolve(__dirname, filePath);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    vue: ['vue', 'vue-router', 'vuex', 'axios'],
  },
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    // library:'',打包后接收项目的名字
    // libraryTarget: 'umd', // umd commonjs commonjs2 this var 打包后的格式
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('dll/[name].manifest.json'),
    }),
  ],
};
