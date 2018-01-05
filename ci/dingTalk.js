require('es6-promise').polyfill();
require('isomorphic-fetch');

function dingTalkTextMessage(webhook, content, isAtAll) {
  fetch(
    webhook,
    {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "msgtype": "text",
        "text": {
          "content": content,
        },
        "at": {
          "isAtAll": isAtAll,
        }
      }),
    }
  ).then(res => res.json())
  .then(res => {
    if (res.errcode === 0) {
      console.log(res)
    } else {
      throw new Error(res);
    }
  });
}
exports.dingTalkTextMessage = dingTalkTextMessage;
