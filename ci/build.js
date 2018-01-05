#!/usr/bin/env node

const webpack = require('webpack');

const APPENV = process.env.APPENV;
const webpackConfig = require(`../webpack.config.${APPENV}.js`);

const config = require(`../config/config.${APPENV}`);

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
  }
  // 处理完成
});
