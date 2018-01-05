require('antd/dist/antd.min.css');
require('react-datepicker/dist/react-datepicker.css');
import { notification } from 'antd';
import { replace } from 'react-router-redux';
import { AppRegistry } from './AppRegistry';
import Tinker from './lib/tinker/src/index';
import { dispatch } from './store';
import Tool from './core/utils/tool';
import debounce from 'lodash.debounce';
Tinker.engine = fetch.bind(window);
Tinker.isSuccess = result => result.status === 0;
Tinker.isFailure = result => result.status !== 0;
// window.debounce = debounce;
window.alertDebounce = debounce(() => alert('您的账号在另一个地方登入，如有疑问请联系客服人员'), 1000);
Tinker.failure = result => {
  if (result.status === -2000) {
    dispatch(replace('/Login'));
    // if(result.msg == '登录超时') {
    //   var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    //    if(keys) {
    //        for(var i = keys.length; i--;)
    //            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    //    }
    //    dispatch(replace('./Login'));
    // } else {
    //   notification['error']({
    //     message: result.msg,
    //   });
    // }
  } else if (result.status === -3000) {

    // debounce(() => alert('您的账号在另一个地方登入，如有疑问请联系客服人员'), 1000)();
    window.alertDebounce();

    dispatch(replace('/Login'));
    return false;
    // notification['error']({
    //   message: result.msg,
    // });
  } else if (result.status === -10000) {
    notification['error']({
      message: result.msg,
    });
  } else {
    notification['error']({
      message: result.msg,
    });
  }
}
Tinker.config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    "Accept": "application/json",
  },
  credentials: 'include',
}
AppRegistry();
