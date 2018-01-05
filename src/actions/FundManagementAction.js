/**
 * Created by hwh on 2017/10/31.
 */
import { message ,notification } from 'antd';
import * as LotteryAction from './LotteryAction';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';

/**
* 获取用户支付类型
* @type {String}
*/
export const GET_PAY_TYPES = 'GET_PAY_TYPES';

export const getPayTypes = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/checkPayMethodOpen.do`,
      {
        method: 'GET',
      },
      params
  )
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  // fetchHandler.start()
  reduxTinker(fetchHandler, GET_PAY_TYPES, dispatch).start();
};

/**
 * 非网银充值接口
 * @type {String}
 */
export const RECHARGE = 'RECHARGE';

export const recharge = (params) => {
  console.log('params', params);
  const fetchHandler = new Tinker(
      `${APIURL}/web/rechargeMoney.do`,
      {
        method: 'POST'
      },
      params
  ).success(result => {
    LotteryAction.getUserCaptialInfo();
  })
  fetchHandler.start()
};

/**
 * 转账接收银行卡信息
 * @type {String}
 */
export const GET_BANK_INFO = 'GET_BANK_INFO';

export const getBankInfo = (params,callback) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/getReceiveBank.do`,
      {
        method: 'POST'
      },
      params
  ).success(result=>{
    callback(result)
  })
  // {pageNo:'1',pageSize:'4',signMessage:'2',isRead:false},

  // fetchHandler.start()
  reduxTinker(fetchHandler, GET_BANK_INFO, dispatch).start();
};


/**
 * 网银充值接口
 * @type {String}
 */
export const RECHARGE_BANK = 'RECHARGE_BANK';

export const rechargeBank = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/addRechargeBankResult.do`,
      {
        method: 'POST'
      },
      params
  ).success(result => {
    LotteryAction.getUserCaptialInfo();
  })
  reduxTinker(fetchHandler, RECHARGE_BANK, dispatch).start();
};


/**
* 转账操作
* @type {String}
*/
export const ZHUAN_ZHANG_ACTION = 'ZHUAN_ZHANG_ACTION';
export const zhuanZhang = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/zhuanzhang.do`,
      {
        method: 'POST',
      },
      params
  ).success(result => {
    notification['success']({
        message: '转账成功',
    });
    LotteryAction.getUserCaptialInfo();
  });
  reduxTinker(fetchHandler, ZHUAN_ZHANG_ACTION, dispatch).start();
};

/**
* 获取下级用户列表
* @type {String}
*/
export const GET_XIAJI_LIST = 'GET_XIAJI_LIST';
export const getXiajiList = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/queryUserChildMessage.do`,
      {
        method: 'POST',
      },
      params
  )
  reduxTinker(fetchHandler, GET_XIAJI_LIST, dispatch).start();
};


/**
* 提现操作
* @type {String}
*/
export const TI_XIAN_ACTION = 'TI_XIAN_ACTION';
export const tiXian = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/tixian.do`,
      {
        method: 'POST',
      },
      params
  ).success(result => {
    notification['success']({
        message: '提现成功',
    });
    tiXianInit();
    LotteryAction.getUserCaptialInfo();
  });
  reduxTinker(fetchHandler, TI_XIAN_ACTION, dispatch).start();
};

/**
* 提现初始化
* @type {String}
*/
export const TI_XIAN_INIT = 'TI_XIAN_INIT';
export const tiXianInit = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/initWithdraw.do`,
      {
        method: 'GET',
      },
      params
  )
  reduxTinker(fetchHandler, TI_XIAN_INIT, dispatch).start();
};