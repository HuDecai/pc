/**
 * Created by hwh on 2017/10/31.
 */
import Immutable from 'immutable';
import * as FundManagementAction from '../actions/FundManagementAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  tixianInit: Immutable.Map({}),
  xiajiList: [],
  payTypesList: [],
});

// 获取支付类型
const getPayTypeActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_PAY_TYPES)
    .success((state, action) => {
      const payTypesList = [];
      action.payload.data.map((item) => {payTypesList.push(item.type)});
      return state.set('payTypes', action.payload.data)
                  .set('payTypesList', payTypesList)
                  .set('isFetching', false);
    })


// 获取转账银行卡信息
const getBankInfoHandler = new ActionHandler.handleAction(FundManagementAction.GET_BANK_INFO)
    .success((state, action) => {
      return state.set('bankInfos', action.payload.data).set('isFetching', false);
    })

// 网银充值
const bankRecharge = new ActionHandler.handleAction(FundManagementAction.RECHARGE_BANK)
    .success((state, action) => {
      return state.set('bankCode', action.payload.data.code).set('bankUrl',action.payload.data.bankUrl).set('isFetching', false);
    })
    
// 提现初始化
const tiXianInit = new ActionHandler.handleAction(FundManagementAction.TI_XIAN_INIT)
        .success((state, action) => {
          return state.set('tixianInit', Immutable.fromJS(action.payload.data))
            .set('isFetching', false);
        })
// 提现初始化
const xiajiListActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_XIAJI_LIST)
          .success((state, action) => {
            return state.set('xiajiList', action.payload.data)
            .set('isFetching', false);
})

export default ActionHandler.handleActions(
    [
      getPayTypeActionHandler,
      getBankInfoHandler,
      bankRecharge,
      tiXianInit,
      xiajiListActionHandler
    ],
    defaultState,
    /^FundManagementReducer\//,
);