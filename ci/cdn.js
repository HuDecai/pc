var OSS = require('ali-oss').Wrapper;
var fs = require('fs');
var path = require('path');
var ENV = 'yihe';

var client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAIrxYSdioWVw6z',
  accessKeySecret: 'sakVV7bDxALIMIdzokKDdphwEpcdvA',
  bucket: 'qufenqipublicrw'
});

fs.readdir(path.resolve(__dirname, '..', 'dist'), function(err, files) {
  if (files) {
    files.map(fileName => {
      if (ENV) {
        client.put(`fe/${ENV}/${fileName}`, path.resolve(__dirname, '..', 'dist', fileName)).then(function (val) {
          console.log(val.url);
        }).then(function (val) {
        });
      } else {
        client.put(`fe/${fileName}`, path.resolve(__dirname, '..', 'dist', fileName)).then(function (val) {
          console.log(val.url);
        }).then(function (val) {
        });
      }
    });
  }
});
