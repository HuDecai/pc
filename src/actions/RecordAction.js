import { message, notification } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';

/**
 * 充值记录
 * @type {String}
 */
export const GET_RECHARGE_RECORD_LIST = 'GET_RECHARGE_RECORD_LIST';
export const getRechargeRecordList = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/findRechargeRecord.do`,
        {
            method: 'POST',
        },
        params,
    );
    reduxTinker(fetchHandler, GET_RECHARGE_RECORD_LIST, dispatch).start();
};
/**
 * 提现记录
 * @type {String}
 */
export const GET_WITHDRAWALS_RECORD_LIST = 'GET_WITHDRAWALS_RECORD_LIST';
export const getWithdrawalsRecordList = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/withdrawal/pageWithdrawal.do`,
        {
            method: 'POST',
        },
        params,
    );
    reduxTinker(fetchHandler, GET_WITHDRAWALS_RECORD_LIST, dispatch).start();
};

