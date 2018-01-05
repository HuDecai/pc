import { message } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';
import { notification } from 'antd';

/**
 * 登录获取用户信息
 * @type {String}
 */
export const GET_USER_INFO = 'GET_USER_INFO';
export const login = (params) => {
  $.ajax({
    url: `${APIURL}/user/weblogin.do?key=${Math.random()}`,
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    cache: false,
    method: 'POST',
    crossDomain: true,
    data: params,
  }).done(result => {
    if (result.status === 0) {
      // alert(result.msg);
      // window.location.replace(window.location.origin + window.location.pathname + '#/home-page');
      dispatch(push('/home-page'));
    } else {
      alert(result.msg);
    }
  });
};

/**
 * 获取用户信息
 * @type {String}
 */
export const BASE_INFO = 'BASE_INFO';
export const getBaseInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userBaseInfo.do`,
      {
        method: 'GET',
      },
      params,
  );
  reduxTinker(fetchHandler, BASE_INFO, dispatch).start();
};

/**
 * 更新用户信息
 * @type {String}
 */
export const BASE_INFO_UPDATE = 'BASE_INFO_UPDATE';
export const updateBaseInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/updateuserInfo.do`,
      {
        method: 'POST',
      },
      params,
  ).success(()=>{
    getBaseInfo({})
  });
  reduxTinker(fetchHandler, BASE_INFO_UPDATE, dispatch).start();
};

/**
 * 验证安全密码
 * @type {String}
 */

export const CHECK_PASS_WORD = 'CHECK_PASS_WORD';
export const checkSafePassword = (params,callback) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/checkSafePassword.do`,
      {
        method: 'POST',
      },
      params,
  ).success(()=>{
    callback(true);
      getBaseInfo({})
  }).failure(()=>{
    callback(false)
  });
  reduxTinker(fetchHandler, BASE_INFO_UPDATE, dispatch).start();
};

/**
 * 更改登录密码
 * @type {String}
 */
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD';
export const updateLoginPassword = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/updatePassword.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
      getBaseInfo({});
    notification.success(result.msg)
  })
  fetchHandler.start()
  // reduxTinker(fetchHandler, BASE_INFO_UPDATE, dispatch).start();
};

/**
 * 更改资金密码
 * @type {String}
 */
export const UPDATE_MONEY_PASSWORD = 'UPDATE_MONEY_PASSWORD';
export const updateMoneyPassword = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/updateSafePassword.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
      getBaseInfo({})
    notification.success(result.msg)
  })
  fetchHandler.start()
  // reduxTinker(fetchHandler, BASE_INFO_UPDATE, dispatch).start();
};

/**
 * 获取密保问题
 * @type {String}
 */
export const GET_QUESTION_INFO = 'GET_QUESTION_INFO';
export const getQuestionInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/secQuestionInfo.do`,
      {
        method: 'GET',
      },
      params,
  ).success(()=>{

  })
  // fetchHandler.start()
  reduxTinker(fetchHandler, GET_QUESTION_INFO, dispatch).start();
};
/**
 * 更改密保问题
 * @type {String}
 */
export const UPDATE_QUE_INFO = 'UPDATE_QUE_INFO';
export const updateQueInfo = (params) => {
  console.log('updateInfo',params)

  const fetchHandler = new Tinker(
      `${APIURL}/web/setSecQuestion.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
    console.log('result',result.msg)
        notification.success('成功')
      getBaseInfo({})
      }
  )
  console.log('updateInfo',params)
  fetchHandler.start()
  // reduxTinker(fetchHandler, UPDATE_QUE_INFO, dispatch).start();
};


/**
* 获取银行卡
* @type {String}
*/
export const GET_BANK_CARD = 'GET_BANK_CARD';
export const getBankCard = (params) => {

  const fetchHandler = new Tinker(
      `${APIURL}/web/getUserBankInfo.do
`,
      {
        method: 'GET',
      },
      params,
  )
  reduxTinker(fetchHandler, GET_BANK_CARD, dispatch).start();
};

/**
 * 添加银行卡
 * @type {String}
 */
export const addBankCard = (params,callback) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/insertUserCardBank.do`,
      {
        method: 'POST',
      },
      params,
  ).success(result=>{
    console.log('addCard',result)
    getBankCard()
    callback()
  })
  fetchHandler.start()

  // fetch(`${APIURL}/web/insertUserCardBank.do`, {
  //   method: 'POST'
  // }).then(data => data.json())
  // .then(res => {
  //   if (res.status === 0) {
  //     // notification['success']({
  //     //   message: res.data,
  //     // });
  //     // dispatch({
  //     //   type: ADD_BACK_BET,
  //     //   payload: { backBetClose: true },
  //     // })
  //     console.log('addCard',res)
  //     getBankCard()
  //   } else {
  //     notification['error']({
  //       message: res.msg,
  //     });
  //   }
  // })
  // const fetchHandler = new Tinker(
  //     `${APIURL}/web/insertUserCardBank.do`,
  //     {
  //       method: 'POST',
  //     },
  //     params,
  // ).success((result)=>{
  //   console.log('addCard',result)
  //   getBankCard()
  // })
  // fetchHandler.start()
  // reduxTinker(fetchHandler, GET_BANK_CARD, dispatch).start();
};

/**
 * 删除银行卡
 * @type {String}
 */
export const deleteBankCard = (params) => {

  const fetchHandler = new Tinker(
      `${APIURL}/web/deleteUserCardBank.do
`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
    getBankCard()
  })
  fetchHandler.start()
  // reduxTinker(fetchHandler, GET_BANK_CARD, dispatch).start();
};


/**
 * 获取发件箱列表
 * @type {String}
 */
export const GET_SENDMESSAGE_LIST = 'GET_SENDMESSAGE_LIST';

export const getSendMsgList = (params) => {
  console.log('1132',params)
  const fetchHandler = new Tinker(
      `${APIURL}/web/userReMessage.do`,
      {
        method: 'POST',
      },
      params
  )
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  // fetchHandler.start()
  reduxTinker(fetchHandler, GET_SENDMESSAGE_LIST, dispatch).start();
};


/**
 * 收件箱删除
 * @type {String}
 */
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const deleteMsg = (params) => {
  console.log('1132',params)
  const fetchHandler = new Tinker(
      `${APIURL}/web/deleteMessageRe.do

`,
      {
        method: 'POST',
      },
      params
  )
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  // fetchHandler.start()
  reduxTinker(fetchHandler, GET_SENDMESSAGE_LIST, dispatch).start();
};


/**
 * 获取用户直属下级
 * @type {String}
 */
export const GETUNDERLING = 'GETUNDERLING';
export const getUnderling = (params) => {
  console.log('getUnderling',params)
  const fetchHandler = new Tinker(
      `${APIURL}/web/queryUserChildMessage.do

`,
      {
        method: 'POST',
      },
      params
  )
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  // fetchHandler.start()
  reduxTinker(fetchHandler, GETUNDERLING, dispatch).start();
};

/**
 * 发送新消息
 * @type {String}
 */
export const sendMessage = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/sendMessage.do

`,
      {
        method: 'POST',
      },
      params
  ).success((result)=>{
    if(result.status === 0){
      message.success('发送成功')
    }
  })
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  fetchHandler.start()
  // reduxTinker(fetchHandler, GETUNDERLING, dispatch).start();
};