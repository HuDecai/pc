const fs = require('fs');
const path = require('path');
var FormData = require('form-data');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');
var form = new FormData();
form.append('file', fs.createReadStream(indexPath));
fetch('https://campustest.alipay-eco.com/upload.do', {
  method: 'POST',
    headers:{
      'Content-Type': 'multipart/form-data',
    },
    body: form,
}).then(res => res.text()).then(res => console.log(res));
// function uploadHtml() {
//   fs.readFile(indexPath, function(err, data) {
//     if (err) throw err;
//     console.log(data);
//   //   fetch(
//   //     'https://campustest.alipay-eco.com/upload.do',
//   //     {
//   //       method: 'POST',
//   //       headers:{
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //       body: `file=${data}`,
//   //     }
//   //   ).then(res => res.text())
//   //   .then(res => console.log(res))
//   });
// }
// uploadHtml();
