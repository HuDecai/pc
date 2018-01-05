/**
 * Created by hwh on 2017/10/29.
 */

import { connect } from 'react-redux';
import FundManagement from './FundManagement';

export const mapStateToProps = (state) => {
  return ({
  dispatch: state.dispatch,
  errMsg: state.FundManagementReducer.get('errMsg'),
  isFetching: state.FundManagementReducer.get('isFetching'),
  payTypes:state.FundManagementReducer.get('payTypes'),
  bankInfos:state.FundManagementReducer.get('bankInfos'),
  bankCode:state.FundManagementReducer.get('bankCode'),
  bankUrl:state.FundManagementReducer.get('bankUrl'),
  leftMoney:state.LotteryReducer.get('userCaptial').get('useMoney'),
  xiajiList: state.FundManagementReducer.get('xiajiList'),
  tixianInit: state.FundManagementReducer.get('tixianInit'),
  payTypesList: state.FundManagementReducer.get('payTypesList'),
    baseInfo:state.BaseInfoReducer.get('baseInfo')
})};

export default connect(mapStateToProps)(FundManagement);