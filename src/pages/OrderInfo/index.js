
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.UserReducer.get('errMsg'),
  isFetching: state.UserReducer.get('isFetching'),
  orderInfo: state.LotteryReducer.get('orderInfo'),
  beishu: state.LotteryReducer.get('beishu'),
  mode: state.LotteryReducer.get('mode'),
  todyProfit: state.LotteryReducer.get('todyProfit'),
  backBetClose: state.LotteryReducer.get('backBetClose'),
  singleMoney: state.LotteryReducer.get('singleMoney'),
  currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
  hongKongPeiLv: state.NewLotteryReducer.get('hongKongPeiLv'),
});

export default connect(mapStateToProps)(OrderInfo);
