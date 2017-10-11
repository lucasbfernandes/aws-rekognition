const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpackConfig.devtool = false;
webpackConfig.output.publicPath = '/';

module.exports = webpackConfig;