import { connect } from 'react-redux';
import NewLottery from './NewLottery';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LotteryReducer.get('errMsg'),
  isFetching: state.LotteryReducer.get('isFetching'),
  lotteryTypesList: state.LotteryReducer.get('lotteryTypesList'),
  lotteryResultExpectList: state.LotteryReducer.get('lotteryResultExpectList'),
  currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
  currentLottery: state.LotteryReducer.get('currentLottery'),
  currentLotteryFirstMenu: state.LotteryReducer.get('currentLotteryFirstMenu'),
  selectPlayInfo: state.LotteryReducer.get('selectPlayInfo'),
  selectLotteryNumbers: state.LotteryReducer.get('selectLotteryNumbers'),
  lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
  winningRanking: state.LotteryReducer.get('winningRanking'),
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
  
  // 香港彩
  hongKongTeMa: state.NewLotteryReducer.get('hongKongTeMa'),
  hongKongTwoSide: state.NewLotteryReducer.get('hongKongTwoSide'),
  touzhuDetail: state.NewLotteryReducer.get('touzhuDetail'),
  lotteryResult: state.NewLotteryReducer.get('lotteryResult'),
  twoSidesDetail: state.NewLotteryReducer.get('twoSidesDetail'),
  hongKongWeishu: state.NewLotteryReducer.get('hongKongWeishu'),
  zodiac: state.NewLotteryReducer.get('zodiac'),
  weiZodiac: state.NewLotteryReducer.get('weiZodiac'),
});

export default connect(mapStateToProps)(NewLottery);
