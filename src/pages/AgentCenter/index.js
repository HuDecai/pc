
import { connect } from 'react-redux';
import AgentCenter from './AgentCenter';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.AgentCenterReducer.get('errMsg'),
  isFetching: state.AgentCenterReducer.get('isFetching'),
  userList: state.AgentCenterReducer.get('userList'),
  teamList: state.AgentCenterReducer.get('teamList'),
  teamTotal: state.AgentCenterReducer.get('teamTotal'),
  fandianTuiguangLink: state.AgentCenterReducer.get('fandianTuiguangLink'),
  caiPiaoFandian: state.AgentCenterReducer.get('caiPiaoFandian'),
  caiPiaoFandianMax: state.AgentCenterReducer.get('caiPiaoFandianMax'),
  hongKongCaiPiaoFandian: state.AgentCenterReducer.get('hongKongCaiPiaoFandian'),
  hongKongCaiPiaoFandianMax: state.AgentCenterReducer.get('hongKongCaiPiaoFandianMax'),
  wuFandianTuiguangLink: state.AgentCenterReducer.get('wuFandianTuiguangLink'),
  zhangbianList: state.AgentCenterReducer.get('zhangbianList'),
  jiaoyiType: state.AgentCenterReducer.get('jiaoyiType'),
  genRenList: state.AgentCenterReducer.get('genRenList'),
  genRenTotal: state.AgentCenterReducer.get('genRenTotal'),
  isAddUserSuccess: state.AgentCenterReducer.get('isAddUserSuccess'),
  addUserName: state.AgentCenterReducer.get('addUserName'),
  checkedRigthType: state.UserReducer.get('checkedRigthType'),
    teamRemaining:state.AgentCenterReducer.get('teamRemaining'),
getGeneralStatement:state.AgentCenterReducer.get('getGeneralStatement'),
    getTeamTotalUser:state.AgentCenterReducer.get('getTeamTotalUser'),
    LotterySumReport:state.AgentCenterReducer.get('LotterySumReport'),
    getHkSumReport:state.AgentCenterReducer.get('getHkSumReport'),
    bargainType:state.OrderSelectReducer.get('bargainType'),
    caiPiaoList: state.OrderSelectReducer.get('caiPiaoList'),
    orderStatus: state.OrderSelectReducer.get('orderStatus'),
    caiZhongList: state.OrderSelectReducer.get('caiZhongList'),
    orderInfo: state.LotteryReducer.get('orderInfo'),
    hongKongList: state.OrderSelectReducer.get('hongKongList'),
});

export default connect(mapStateToProps)(AgentCenter);