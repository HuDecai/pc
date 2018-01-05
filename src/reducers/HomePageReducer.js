/**
 * @flow
 * Created by huliyou on 4/21/2017.
 */
import Immutable from 'immutable';
import * as HomePageAction from '../actions/HomePageAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  noticeList: Immutable.List([
    
  ]),
});
// 获取公告信息
const getNoticeActionHandler = new ActionHandler.handleAction(HomePageAction.GET_NOTICE_LIST)
  .success((state, action) => {
    return state.set('noticeList', Immutable.fromJS(action.payload.data.pageinfo.list))
      .set('isFetching', false).set('errMsg', '');
  });

export default ActionHandler.handleActions(
  [
    getNoticeActionHandler,
  ],
  defaultState,
  /^HomePageReducer\//,
);
