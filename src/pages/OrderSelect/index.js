
import { connect } from 'react-redux';
import OrderSelect from './OrderSelect';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.OrderSelectReducer.get('errMsg'),
  isFetching: state.OrderSelectReducer.get('isFetching'),
  caiPiaoList: state.OrderSelectReducer.get('caiPiaoList'),
  caiPiaoTotal: state.OrderSelectReducer.get('caiPiaoTotal'),
  hongKongList: state.OrderSelectReducer.get('hongKongList'),
  hongKongTotal: state.OrderSelectReducer.get('hongKongTotal'),
  orderStatus: state.OrderSelectReducer.get('orderStatus'),
  caiZhongList: state.OrderSelectReducer.get('caiZhongList'),
  orderInfo: state.LotteryReducer.get('orderInfo'),
  moneyDetailList: state.OrderSelectReducer.get('moneyDetailList'),
  jiaoyiType: state.AgentCenterReducer.get('jiaoyiType'),
    bargainType:state.OrderSelectReducer.get('bargainType'),
    rechargeRecordList:state.OrderSelectReducer.get('rechargeRecordList'),
    withdrawalsRecordList:state.OrderSelectReducer.get('withdrawalsRecordList'),
});

export default connect(mapStateToProps)(OrderSelect);