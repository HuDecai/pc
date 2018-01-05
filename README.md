# 亿合娱乐前端
yihe-fe

* Browser side rendering
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/reactjs/react-router)
* [Babel](https://github.com/babel/babel)
* [Webpack](https://github.com/webpack/webpack)
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/reactjs/redux)
* Redux Dev Tools
* [React Router Redux](https://github.com/reactjs/react-router-redux)
* ESLint
* [Airbnb style guide](https://github.com/airbnb/javascript)
* style-loader, sass-loader, css-loader
* [mocha](https://github.com/mochajs/mocha)

# Installation （安装依赖)
    npm install

# Running Dev Server (本地启动命令)
    npm run local

# Using Redux DevTools
[翻墙下载插件](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

# Running Production Server (线上环境打包)  打包的静态资源指向的是cdn服务资源
    npm run build-prod

# CDN  此处将静态资源上传到cdn服务上
    npm run cdn-prod

# Running Production Server (线上环境打包)  打包的静态资源指向的是本地
    npm run build-server，然后将dist目录里的静态资源，放置到服务器中，所有的资源均为服务器本地资源。

# Info
    node version: v8.4.0
    npm version: 5.3.0


# 请求环境
## 本地开发代理配置
本地开发时，代理配置文件路径在 ./config/config.local.js
proxyURL 指的是本地请求代理的地址
host，port分别指本地启动的地址和端口
APIURL 为请求地址hostname

## 线上环境配置
配置文件路径在 ./config/config.prod.js
APIURL 为请求地址hostname

## 网速测试配置
配置文件路径在 ./config/SpeedConfig.js

## 项目文件介绍
待写

## 项目打包结果介绍
待写
