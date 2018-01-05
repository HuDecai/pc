import { connect } from 'react-redux';
import Lottery from './Lottery';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LotteryReducer.get('errMsg'),
  isFetching: state.LotteryReducer.get('isFetching'),
  lotteryTypesList: state.LotteryReducer.get('lotteryTypesList'),
  currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
  currentLottery: state.LotteryReducer.get('currentLottery'),
  currentLotteryFirstMenu: state.LotteryReducer.get('currentLotteryFirstMenu'),
  selectPlayInfo: state.LotteryReducer.get('selectPlayInfo'),
  selectLotteryNumbers: state.LotteryReducer.get('selectLotteryNumbers'),
  lotteryResult: state.LotteryReducer.get('lotteryResult'),
  lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
  winningRanking: state.LotteryReducer.get('winningRanking'),
  // currentPlayInfo: state.LotteryReducer.get('currentPlayInfo'),
  currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
  thisWeekStatistic: state.LotteryReducer.get('thisWeekStatistic'),
  lastWeekStatistic: state.LotteryReducer.get('lastWeekStatistic'),
  userBetList: state.LotteryReducer.get('userBetList'),
  userCaptial: state.LotteryReducer.get('userCaptial'),
  percentage: state.LotteryReducer.get('percentage'),
  pickDataList: state.LotteryReducer.get('pickDataList'),
  orderInfo: state.LotteryReducer.get('orderInfo'),
  beishu: state.LotteryReducer.get('beishu'),
  mode: state.LotteryReducer.get('mode'),
  todyProfit: state.LotteryReducer.get('todyProfit'),
  backBetClose: state.LotteryReducer.get('backBetClose'),
  singleMoney: state.LotteryReducer.get('singleMoney'),
  zhuihaoQishuList: state.LotteryReducer.get('zhuihaoQishuList'),
  isChaseNumber: state.LotteryReducer.get('isChaseNumber'),
});

export default connect(mapStateToProps)(Lottery);
