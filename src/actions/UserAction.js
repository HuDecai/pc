import { message, notification } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';
import debounce from 'lodash.debounce';

window.alertError = debounce(() => alert('账号或密码错误'), 1000);

/**
 * 登录获取用户信息
 * @type {String}
 */
 export const GET_USER_INFO = 'GET_USER_INFO';
 export const login = (params) => {
   const fetchHandler = new Tinker(
     `${APIURL}/user/weblogin.do?key=${Math.random()}`,
     {
       method: 'POST',
     },
     params,
   ).success(result => {
     dispatch({
       type: GET_USER_INFO,
     });
     dispatch(push('/home-page'));
   }).failure(result => {
     alert(result.msg);
     // window.alertError();
   });
   fetchHandler.start();
 }

/**
 * 退出登录
 * @type {String}
 */
export const LOGIN_OUT = 'LOGIN_OUT';
export const loginOut = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/outWeblogin.do`,
    {
      method: 'GET',
    },
    params,
  ).success(result => {
    // 清空cookie
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
     if(keys) {
         for(var i = keys.length; i--;)
             document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
     }
    dispatch(replace('/Login'));
  });
  reduxTinker(fetchHandler, LOGIN_OUT, dispatch).start();
};

// var startDate = null;
// var endDate = null;
// var timeSpeed = null;
// const testSpeed = (url) => {
//   startDate = new Date();
//   const testImage = new Image();
//   testImage.src = url;
//   testImage.onload = () => {
//     endDate = new date();
//     timeSpeed = endDate - startDate;
//   }
// }

/**
 * 测速
 * @type {String}
 */
var startDate = null;
var endDate = null;
var timeSpeed = null;
export const SPEED_TEST = 'SPEED_TEST';
export const speedTest = (params) => {
  const { name, url } = params;
  if (url) {
    startDate = new Date();
    const testImage = new Image();
    testImage.src = `http://${url}?r=${Math.random()}`;
    testImage.onload = () => {
        endDate = new Date();
        timeSpeed = endDate - startDate;
        console.warn(timeSpeed);
        dispatch({
          type: 'SPEED_TEST_SUCCESS',
          payload: {
            name,
            url,
            speed: timeSpeed,
          }
        });
    }
    testImage.onerror = () => {
        endDate = new Date();
        timeSpeed = endDate - startDate;
        console.warn(timeSpeed);
        dispatch({
          type: 'SPEED_TEST_SUCCESS',
          payload: {
            name,
            url,
            speed: timeSpeed,
          }
        });
    }
  }
  // const fetchHandler = new Tinker(
  //   `${APIURL}/user/getDomainSpeed.do`,
  //   {
  //     method: 'GET',
  //   },
  //   params,
  // ).request(() => {
  //   startDate = new Date();
  // }).success(() => {
  // }).convertResult((result) => ({
  //   ...result,
  //   timeSpeed: new Date() - startDate,
  //   ...params,
  // }))
  // reduxTinker(fetchHandler, SPEED_TEST, dispatch).start();
};

// 用户注册
export const USER_REGISTER = 'USER_REGISTER';
export const register = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/addUser.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    notification['success']({
      message: '注册成功',
    });
    dispatch(push('/Login'));
  }).failure(result => {
    notification['error']({
      message: result.msg,
    });
  });
  reduxTinker(fetchHandler, USER_REGISTER, dispatch).start();
};

// 获取验证码
export const GET_REGISTER_CODE = 'GET_REGISTER_CODE';
export const getRegisterCode = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/code.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_REGISTER_CODE, dispatch).start();
};

// 改变类型
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const changeType = (params) => {
  dispatch({
    type: CHANGE_TYPE,
    payload: params,
  });
};

// 改变类型
export const CHANGE_NOTICE = 'CHANGE_NOTICE';
export const changeNotice = (params) => {
  dispatch({
    type: CHANGE_NOTICE,
    payload: params,
  });
};

// 清空各域名速度
export const CLEAR_SPEED_SUCCESS = 'CLEAR_SPEED_SUCCESS';
export const clearSpeed = () => {
  dispatch({
    type: 'CLEAR_SPEED_SUCCESS'
  });
}


// 获取测速域名
export const GET_DOMAINLIST = 'GET_DOMAINLIST';
export const getDomainList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/domainList.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_DOMAINLIST, dispatch).start();
};
