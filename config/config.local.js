const host = '0.0.0.0';
const APIURL = '';
 // const proxyURL = 'http://192.168.0.199:8080'; // 本地代理请求地址
const proxyURL = 'http://front.covazsport.com';
module.exports = {
    host: host,
    port: '3030',
    proxyURL: proxyURL,
    app: {
        coustomServiceURL: JSON.stringify('http://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=920677&configID=70323&jid=2218668569'),
        ENV: JSON.stringify('local'),
        APIURL: JSON.stringify(''),
    },
};
