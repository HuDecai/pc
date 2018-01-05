import { message, notification } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';

/**
 * 重置密码
 * @type {String}
 */
export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/forgetUserPassWd.do`,
    {
      method: 'POST',
    },
    params,
  )
  .success(result => {
     if(params.step === 3) {
       notification['success']({
           message: result.msg,
       });
       dispatch(setData({ step: 0 }));
       dispatch(replace('./Login'));
     } else {
       dispatch(setData(params));
     }
  })
  reduxTinker(fetchHandler, SET_PASSWORD, dispatch).start();
};

export const PASSWORD_DATA = 'PASSWORD_DATA';
export function setData(params: Object) {
  return {
    payload: params,
    type: PASSWORD_DATA,
  };
}

