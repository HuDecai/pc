/**
 * Created by hwh on 2017/10/28.
 */

import Immutable from 'immutable';
import * as BaseInfoAction from '../actions/BaseInfoAction';
import axe from '../lib/axe/src/index';
import ProvinceAndCity from './city';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  baseInfo: Immutable.Map(),
  questionInfo:Immutable.List([]),
  provinceAndCity: Immutable.fromJS(ProvinceAndCity.datas),
});

// 获取用户信息
const getBaseInfoActionHandler = new ActionHandler.handleAction(BaseInfoAction.BASE_INFO)
    .success((state, action) => {
      console.warn(action.payload);
      return state.set('baseInfo', action.payload.data).set('isFetching', false);
    })
    .failure((state, action) => {
      return state.set('isFetching', false).set('errMsg', action.payload.msg);
    })

//密保问题
const getQuestionInfo = new ActionHandler.handleAction(BaseInfoAction.GET_QUESTION_INFO)
    .success((state, action) => {
      return state.set('questionInfo', action.payload.data).set('isFetching', false);
    })
    .failure((state, action) => {
      return state.set('isFetching', false).set('errMsg', action.payload.msg);
    })

//银行卡列表
const getBankCards = new ActionHandler.handleAction(BaseInfoAction.GET_BANK_CARD)
    .success((state, action) => {
      return state.set('bankCardList', action.payload.data.bankLists).set('isFetching', false);
    })

//个人通知列表
const getPersonalMsgList = new ActionHandler.handleAction(BaseInfoAction.GET_SENDMESSAGE_LIST)
    .success((state, action) => {
      console.warn('msgReducer',action)
      return state.set('msgList', action.payload.data.pageinfo.list).set('isFetching', false)
          .set('pageSize',action.payload.data.pageinfo.pageSize);
    })

//用户直属下级
const getUnderling = new ActionHandler.handleAction(BaseInfoAction.GETUNDERLING)
    .success((state, action) => {
      return state.set('underlings', action.payload.data).set('isFetching', false);
    })

export default ActionHandler.handleActions(
    [
      getBaseInfoActionHandler,
      getQuestionInfo,
        getBankCards,
      getPersonalMsgList,
      getUnderling
    ],
    defaultState,
    /^BaseInfoReducer\//,
);
