// vue.config.js
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        css: path.join(__dirname, 'src/assets/css'),
        '@': path.join(__dirname, 'src'),
      },
    },
  },
  productionSourceMap: false, // vue关闭sourceMap 
};