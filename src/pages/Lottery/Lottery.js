import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './Lottery.css';
import scrollStyle from '../../assets/css/scrollStyles.css';
import CommonStyles from '../../assets/css/common.css';
import * as LotteryAction from '../../actions/LotteryAction';
import LotteryHeader from './LotteryHeader';
import LotteryFooter from './LotteryFooter';
import LotteryHelp from './LotterHelp';
import MenuFirst from './MenuFirst';
import MenuSecond from './MenuSecond';
// import SelectDetail from './SelectDetail';
import LotteryOrder from './LotteryOrder';
import LotteryResult from './LotteryResult';
import LotteryResultFirstCard from './LotteryResultFirstCard';
import UserCard from './UserCard';
import LotteryResultSecondCard from './LotteryResultSecondCard';
import NewLottery from '../NewLottery';
const lotterySplitLine = require('../../assets/images/lottery-split-line.png');
import Loading from '../../core/decorators/Loading';
import { dispatch } from '../../store';
import { push } from 'react-router-redux';
import moment from 'moment';
import CountNum from './core/CountNum';
import checkNumbers from './core/checkNumbers';
import PlayKindComponents from './PlayKindComponents';
import { fanshui } from './core/fanshuiNumber.js';

@Loading(props => props.isFetching)
class Lottery extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    errMsg: PropTypes.string,
    lotteryResult: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    const lId = this.props.location.search.split('=')[1];
    const type = this.props.currentLotteryType.get('type');
    console.log(this.props.location,this.props.location.search,this.props.location.search.split('='),lId)
    if(type) {
      fanshui(type);
    }
    // if(this.props.currentLotteryType.get('lId')) {
    if(lId && lId != 15) {
      // 获取当前彩票
      LotteryAction.getCurrentLottery({ lId });
      // 获取当前开奖结果
      LotteryAction.getLotteryResult({ lId });
      // 获取开奖结果列表
      LotteryAction.getLotteryResultList({ lId, rowNumber: 10 });
      // 获取中奖结果
      LotteryAction.getLotteryWinList();
      // 获取期数和倒计时
      LotteryAction.getLotteryExpect({ lId });
    }
    // 获取顶部彩票种类菜单
    LotteryAction.getLotteryTypeList();
    // 获取盈亏
    LotteryAction.getLastWeekStatistic();
    LotteryAction.getThisWeekStatistic();
    // 获取今日投注
    LotteryAction.findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') });
    // 获取资金信息
    LotteryAction.getUserCaptialInfo();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLotteryType.get('lId') !== this.props.currentLotteryType.get('lId') && nextProps.currentLotteryType.get('lId') && nextProps.currentLotteryType.get('lId') != 15) {
      // 获取当前彩票
      LotteryAction.getCurrentLottery({ lId: nextProps.currentLotteryType.get('lId') });
      // 获取当前开奖结果
      LotteryAction.getLotteryResult({ lId: nextProps.currentLotteryType.get('lId') });
      // 获取开奖结果列表
      LotteryAction.getLotteryResultList({ lId: nextProps.currentLotteryType.get('lId'), rowNumber: 10 });
      LotteryAction.getLotteryWinList();
      // 获取期数和倒计时
      LotteryAction.getLotteryExpect({ lId: nextProps.currentLotteryType.get('lId') });
      LotteryAction.findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') });
      // LotteryAction.findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: "2017-09-27" });
    }
    if(nextProps.currentLotteryType.get('type') !== this.props.currentLotteryType.get('type') && nextProps.currentLotteryType.get('type')) {
        fanshui(nextProps.currentLotteryType.get('type'));
    }
  }

  _changeLotteryType(params) {
    LotteryAction.changeLotteryType(params);
    dispatch(push(`/lottery?lId=${params.lId}`));
  }
  /**
   * 根据playKind.id 渲染对应的界面
   * @return {[type]} [description]
   */
  renderPlayKindDetail() {
    return (
      <PlayKindComponents
        selectPlayInfo={this.props.selectPlayInfo}
        selectLotteryNumbers={this.props.selectLotteryNumbers}
        singleMoney={this.props.singleMoney}
        mode={this.props.mode}
      />
    );
  }
  render() {
    const lId = this.props.location.search.split('=')[1];
    return (
      <div className={styles.lotteryPage}>
        <LotteryHelp
          lId={lId}
          help={this.props.selectPlayInfo.get('playKind').get('help')}
          example={this.props.selectPlayInfo.get('playKind').get('example')}
          maxBonus={this.props.selectPlayInfo.get('playKind').get('maxBonus')}
        />
        <div className={styles.lotteryContainer}>
          <LotteryHeader
            isChaseNumber={this.props.isChaseNumber}
            lotteryTypesList={this.props.lotteryTypesList}
            currentLotteryType={this.props.currentLotteryType}
            currentLottery={this.props.currentLottery}
            changeLotteryType={this._changeLotteryType}
            currentLotteryExpect={this.props.currentLotteryExpect}
            getLotteryExpect={LotteryAction.getLotteryExpect}
            lId={this.props.location.search.split('=')[1]}
            isShow={0}
          />
          {lId == 15 ?
            <NewLottery
               location={this.props.location}
            />
            :
            <div className={styles.lotteryMain}>
              <div className={styles.lotteryMain2}>
                <div className={styles.lotteryMainLeft}>
                  <div>
                    <MenuFirst
                      listPlayCate={this.props.currentLottery.get('listPlayCate')}
                      currentLotteryFirstMenu={this.props.currentLotteryFirstMenu}
                      setCurrentLotteryFirstMenu={LotteryAction.setCurrentLotteryFirstMenu}
                    />
                    <MenuSecond
                      currentLotteryFirstMenu={this.props.currentLotteryFirstMenu}
                      listPlayKind={this.props.currentLottery.get('listPlayKind')}
                      selectPlayInfo={this.props.selectPlayInfo}
                      changePlayKind={LotteryAction.changePlayKind}
                      lId={this.props.location.search.split('=')[1]}
                    />
                  </div>
                  <div className={styles.PlayKindDetail}>
                    {this.renderPlayKindDetail()}
                  </div>
                  <LotteryOrder
                      checkNumbers={checkNumbers}
                      todyProfit={this.props.todyProfit}
                      playKind={this.props.selectPlayInfo.get('playKind')}
                      selectLotteryNumbers={this.props.selectLotteryNumbers}
                      percentage={this.props.percentage}
                      pickDataList={this.props.pickDataList}
                      currentLotteryExpect={this.props.currentLotteryExpect.get('openExpect')}
                      lId={this.props.location.search.split('=')[1]}
                      dispatch={this.props.dispatch}
                      beishu={this.props.beishu}
                      mode={this.props.mode}
                      singleMoney={this.props.singleMoney}
                      zhuihaoQishuList={this.props.zhuihaoQishuList}
                  />
                </div>
                <div className={styles.lotteryMainRight}>
                  <LotteryResult
                     lotteryResult={this.props.lotteryResult}
                     lId={this.props.location.search.split('=')[1]}
                  />
                  <LotteryResultFirstCard
                    lotteryResultList={this.props.lotteryResultList}
                    winningRanking={this.props.winningRanking}
                    currentType={this.props.currentLotteryType.get('type')}
                    lId={this.props.location.search.split('=')[1]}
                  />
                  <UserCard userCaptial={this.props.userCaptial}/>
                  <LotteryResultSecondCard
                      thisWeekStatistic={this.props.thisWeekStatistic}
                      lastWeekStatistic={this.props.lastWeekStatistic}
                      userBetList={this.props.userBetList}
                      orderInfo={this.props.orderInfo}
                      backBetClose={this.props.backBetClose}
                  />
                </div>
              </div>
              <div style={{ height: '10px', backgroundColor: '#dbdbdb'}}/>
              <LotteryFooter />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Lottery;
