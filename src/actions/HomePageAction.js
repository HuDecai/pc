import { message } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';

/**
 * 公告信息
 * @type {String}
 */
export const GET_NOTICE_LIST = 'GET_NOTICE_LIST';
export const getNotice = (params) => {
  console.log('params:', params);
  const fetchHandler = new Tinker(
    `${APIURL}/web/userReMessage.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_NOTICE_LIST, dispatch).start();
};
