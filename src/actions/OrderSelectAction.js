import { message } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';

/**
 * 彩票订单列表信息
 * @type {String}
 */
export const GET_CAIPIAO_LIST = 'GET_CAIPIAO_LIST';
export const getCaiPiaoList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findUserBetList.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_CAIPIAO_LIST, dispatch).start();
};

/**
 * 香港彩订单列表
 * @type {String}
 */
export const GET_HONG_KONG_LIST = 'GET_HONG_KONG_LIST';
export const getHongKongList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findUserBetList.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_HONG_KONG_LIST, dispatch).start();
};

/**
 * 香港彩订单列表
 * @type {String}
 */
export const GET_MONEY_DETAIL_LIST = 'GET_MONEY_DETAIL_LIST';
export const getMoneyDetailList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryUserDebt.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_MONEY_DETAIL_LIST, dispatch).start();
};

/**
 * 交易类型
 * @type {String}
 */
export const GET_BARGAIN_TYPE = 'GET_BARGAIN_TYPE';
export const getBargainType = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/currentDebtType.do`,
        {
            method: 'GET',
        },
        params,
    );
    reduxTinker(fetchHandler, GET_BARGAIN_TYPE, dispatch).start();
};