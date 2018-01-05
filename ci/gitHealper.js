const Git = require("nodegit");
const path = require('path');
const { dingTalkTextMessage } = require('./dingTalk');


Git.Repository.open(path.resolve(__dirname, '..'))
  .then(repo => repo.getHeadCommit())
  .then(commit => dingTalkTextMessage('https://oapi.dingtalk.com/robot/send?access_token=6022ffb74b44fae4c56fe952c04f1ecb16bae156d0454ed27e04959ca202c335',`commit内容： ${commit.message()}`,true))
