import { routerReducer } from 'react-router-redux';
import * as rrr from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import UserReducer from './UserReducer';
import FindPassWordReducer from './FindPassWordReducer';
import HomePageReducer from './HomePageReducer';
import LotteryReducer from './LotteryReducer';
import NewLotteryReducer from './NewLotteryReducer';
import AgentCenterReducer from './AgentCenterReducer';
import BaseInfoReducer from './BaseInfoReducer';
import OrderSelectReducer from './OrderSelectReducer';
import FundManagementReducer from './FundManagementReducer'
// 状态入口
const appReducers = combineReducers({
  routing: routerReducer,
  UserReducer,
  FindPassWordReducer,
  HomePageReducer,
  LotteryReducer,
  NewLotteryReducer,
  AgentCenterReducer,
  BaseInfoReducer,
  OrderSelectReducer,
  FundManagementReducer
});

export default appReducers;
