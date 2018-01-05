
import Immutable from 'immutable';
import * as OrderSelectAction from '../actions/OrderSelectAction';
import * as RecordAction from '../actions/RecordAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  caiPiaoList: Immutable.Map({}),
  hongKongList: Immutable.Map({}),
  moneyDetailList: Immutable.Map({}),
    bargainType:Immutable.Map({}),
    rechargeRecordList:Immutable.Map({}),
    withdrawalsRecordList:Immutable.Map({}),
  caiZhongList: Immutable.List([
    // Immutable.Map({
    //   value: '',
    //   name: '所有彩种',
    // }),
    Immutable.Map({
      value: '2',
      name: '重庆时时彩',
    }),
    Immutable.Map({
      value: '19',
      name: '澳门时时彩',
    }),
      Immutable.Map({
          value: '13',
          name: '天津时时彩',
      }),

    Immutable.Map({
      value: '14',
      name: '新加坡分分彩',
    }),
      Immutable.Map({
          value: '20',
          name: '加拿大三分彩',
      }),

    Immutable.Map({
      value: '24',
      name: '黑龙江时时彩',
    }),
    Immutable.Map({
      value: '4',
      name: '北京赛车PK10',
    }),
    Immutable.Map({
      value: '25',
      name: '德国赛车PK10',
    }),
      Immutable.Map({
          value: '7',
          name: '广东11选5',
      }),
      Immutable.Map({
          value: '9',
          name: '江西11选5',
      }),
      Immutable.Map({
          value: '10',
          name: '山东11选5',
      }),
    Immutable.Map({
      value: '26',
      name: '香港11选5',
    }),

    Immutable.Map({
      value: '11',
      name: '福彩3D',
    }),
      Immutable.Map({
          value: '12',
          name: '体彩排列3',
      }),
      Immutable.Map({
          value: '15',
          name: '香港彩',
      }),
  ]),
  orderStatus: Immutable.List([
    Immutable.Map({
      value: '',
      name: '全部',
    }),
    Immutable.Map({
      value: '0',
      name: '未开奖',
    }),
    Immutable.Map({
      value: '6',
      name: '未中奖',
    }),
    Immutable.Map({
      value: '7',
      name: '已中奖',
    }),
    Immutable.Map({
      value: '2',
      name: '个人撤单',
    }),
    Immutable.Map({
      value: '5',
      name: '系统撤单',
    }),
    // Immutable.Map({
    //   value: '5',
    //   name: '无效订单',
    // }),
  ])
});

// 获取彩票订单列表
const getCaiPiaoListActionHandler = new ActionHandler.handleAction(OrderSelectAction.GET_CAIPIAO_LIST)
  .success((state, action) => {
    return state.set('caiPiaoList', Immutable.fromJS(action.payload.data))
    .set('isFetching', false).set('errMsg', '');
  });
  
// 获取香港彩订单列表
const getHongKongListActionHandler = new ActionHandler.handleAction(OrderSelectAction.GET_HONG_KONG_LIST)
    .success((state, action) => {
      return state.set('hongKongList', Immutable.fromJS(action.payload.data))
      .set('isFetching', false).set('errMsg', '');
    });
    
// 获取香港彩订单列表
const getMoneyDetailListActionHandler = new ActionHandler.handleAction(OrderSelectAction.GET_MONEY_DETAIL_LIST)
    .success((state, action) => {
          return state.set('moneyDetailList', Immutable.fromJS(action.payload.data))
          .set('isFetching', false).set('errMsg', '');
});
//获取交易类型
const getBargainTypeActionHandler = new ActionHandler.handleAction(OrderSelectAction.GET_BARGAIN_TYPE)
    .success((state, action) => {
        return state.set('bargainType', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
    });
//充值记录
const getRechargeRecordListActionHandler = new ActionHandler.handleAction(RecordAction.GET_RECHARGE_RECORD_LIST)
    .success((state, action) => {
        return state.set('rechargeRecordList', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
    });
//提现记录
const getWithdrawalsRecordListActionHandler = new ActionHandler.handleAction(RecordAction.GET_WITHDRAWALS_RECORD_LIST)
    .success((state, action) => {
        return state.set('withdrawalsRecordList', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
    });
export default ActionHandler.handleActions(
  [
    getCaiPiaoListActionHandler,
    getHongKongListActionHandler,
    getMoneyDetailListActionHandler,
      getBargainTypeActionHandler,
      getRechargeRecordListActionHandler,
      getWithdrawalsRecordListActionHandler
  ],
  defaultState,
  /^OrderSelectReducer\//,
);
