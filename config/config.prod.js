const APIURL = ''; // 线上环境接口请求地址前缀
module.exports = {
  host: '0.0.0.0',
  port: '3000',
  // proxyURL: APIURL,
  app: {
      coustomServiceURL: JSON.stringify('http://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=920677&configID=70323&jid=2218668569'),
    ENV: JSON.stringify('production'),
    APIURL: JSON.stringify(APIURL),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
};
