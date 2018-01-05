/**
 * @flow
 * Created by huliyou on 4/21/2017.
 */
import Immutable from 'immutable';
import * as UserAction from '../actions/UserAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  VCode: '', //验证码
  isLogin: false, // 是否登录
  checkedType: null,
  checkedRigthType: 1,
  isShowNotice: false, // 首页公告是否显示
  domainList: Immutable.List([
    // Immutable.Map({
    //   name: '地址1',
    //   url: 'front.covazsport.com'
    // }),
    // Immutable.Map({
    //   name: '地址2',
    //   url: 'front.covazsport.com'
    // }),
    // Immutable.Map({
    //   name: '地址3',
    //   url: 'front.covazsport.com'
    // }),
    // Immutable.Map({
    //   name: '地址4',
    //   url: 'front.covazsport.com'
    // }),
    // Immutable.Map({
    //   name: '地址5',
    //   url: 'front.covazsport.com'
    // }),
  ]),
  timeSpeed: Immutable.List([
    // Immutable.Map({
    //   name: '地址1',
    //   url: 'front.covazsport.com',
    //   speed: 23,
    // }),
    // Immutable.Map({
    //   name: '地址2',
    //   url: 'front.covazsport.com',
    //   speed: 23,
    // }),
    // Immutable.Map({
    //   name: '地址3',
    //   url: 'front.covazsport.com',
    //   speed: 423,
    // }),
    // Immutable.Map({
    //   name: '地址4',
    //   url: 'front.covazsport.com',
    //   speed: 233,
    // }),
    // Immutable.Map({
    //   name: '地址5',
    //   url: 'front.covazsport.com',
    //   speed: 123,
    // })
  ]),
});
// 获取用户信息
const getUserInfoActionHandler = new ActionHandler.handleAction('GET_USER_INFO')
  .success((state, action) => {
    return state.set('isLogin', true)
                .set('isShowNotice', true)
                .set('errMsg', '').set('isFetching', false);
  })
  .failure((state, action) => {
    return state.set('isFetching', false).set('errMsg', action.payload.msg);
  });

const loginOutActionHandler = new ActionHandler.handleAction(UserAction.LOGIN_OUT)
    .success((state, action) => {
      return state.set('isFetching', false)
                  .set('isLogin', false)
                  .set('errMsg', '');
    })
    .failure((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    });

const speedTestActionHandler = new ActionHandler.handleAction('SPEED_TEST_SUCCESS')
    .success((state, action) => {
      // console.log(action);
      const timeSpeed = state.get('timeSpeed').toJS();
      if (timeSpeed.length === 5) {
        timeSpeed.shift();
        timeSpeed.push({
          name: action.payload.name,
          url: action.payload.url,
          speed: action.payload.speed,
        });
      } else {
        timeSpeed.push({
          name: action.payload.name,
          url: action.payload.url,
          speed: action.payload.speed,
        });
      }
      return state.set('timeSpeed', Immutable.fromJS(timeSpeed));
    });

const clearSpeedActionHandler = new ActionHandler.handleAction('CLEAR_SPEED_SUCCESS')
  .success(state => {
    let timeSpeed = state.get('timeSpeed').toJS();
    if (timeSpeed.length === 5) {
      timeSpeed = timeSpeed.map(item => {
        return ({
          name: item && item.name,
          url: item && item.url,
          speed: 0,
        });
      });
      return state.set('timeSpeed', Immutable.fromJS(timeSpeed));
    }
    // return state.set('timeSpeed', Immutable.List([]));
    return state;
  })

const getCodeActionHandler = new ActionHandler.handleAction('GET_REGISTER_CODE')
      .success((state, action) => {
          return state.set('Vcode',  action.payload.data.code);
    });

// 改变个人中心的type 和 rigthType 和 titleType
const changeTypeActionHandler = new ActionHandler.handleAction('CHANGE_TYPE')
      .success((state, action) => {
          return state.set('checkedType', action.payload.type)
          .set('checkedRigthType', action.payload.rightType);
    });
// 改变首页公告显示状态
const changeNoticeActionHandler = new ActionHandler.handleAction('CHANGE_NOTICE')
          .success((state, action) => {
              return state.set('isShowNotice', action.payload.isShowNotice);
});

// 获取测速域
const getDomainListActionHandler = new ActionHandler.handleAction('GET_DOMAINLIST')
          .success((state, action) => {
              const data = action.payload.data;
              const domainList = [];
              if(data) {
                const keys = Object.keys(data);
                keys.map(item => {
                  domainList.push({
                    name: item,
                    url: data[item],
                  })
                })
              }
              // console.log('domainList', domainList);
              return state.set('domainList', Immutable.fromJS(domainList))
                          .set('isFetching', false);
});


export default ActionHandler.handleActions(
  [
    getUserInfoActionHandler,
    loginOutActionHandler,
    speedTestActionHandler,
    getCodeActionHandler,
    changeTypeActionHandler,
    changeNoticeActionHandler,
    getDomainListActionHandler,
    clearSpeedActionHandler
  ],
  defaultState,
  /^UserReducer\//,
);
