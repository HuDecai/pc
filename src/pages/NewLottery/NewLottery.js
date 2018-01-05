import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './NewLottery.css';
import Loading from '../../core/decorators/Loading';
import * as NewLotteryAction from '../../actions/NewLotteryAction';
import * as LotteryAction from '../../actions/LotteryAction';
// left
import NewLotteryDetails from '../../components/NewLottery/NewLotteryDetails';
import NewLotteryTouzhu from '../../components/NewLottery/NewLotteryTouzhu';
// center
import NewLotteryXiangGangCai from '../../components/NewLottery/NewLotteryXiangGangCai';
// right
import NewLotteryResult from '../../components/NewLottery/NewLotteryResult';
import NewLotteryResultFirstCard from '../../components/NewLottery/NewLotteryResultFirstCard';
import NewLotteryResultSecondCard from '../../components/NewLottery/NewLotteryResultSecondCard';
import moment from 'moment';

import LotteryFooter from '../Lottery/LotteryFooter';

class NewLottery extends React.PureComponent {
  componentWillMount() {
    const lId = this.props.location.search.split('=')[1];
    if(lId) {
      // 获取当前彩票
      LotteryAction.getCurrentLottery({ lId });
      // 获取当前开奖结果
      NewLotteryAction.getNewLotteryResult({ lId });
      // 今日开奖
      LotteryAction.getLotteryResultList({ lId, rowNumber: 10 });
      // 中奖排行榜
      LotteryAction.getLotteryWinList();
      // 获取期数和倒计时
      LotteryAction.getLotteryExpect({ lId });
      // 获取本周盈亏
      LotteryAction.getThisWeekStatistic();
      // 获取今日投注
      LotteryAction.findUserBetList({ lId, pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') });
    }
    // 获取顶部彩票种类菜单
    LotteryAction.getLotteryTypeList();
    //  获取资金信息
    LotteryAction.getUserCaptialInfo();
    // 香港彩赔率
    NewLotteryAction.hongKongPeiLv();
    NewLotteryAction.getZodiac();
  }
  componentDidMount() {
    // header 的倒计时
    this.interval = setInterval(() => this.tick(), 5000);
  }
  tick() {
      NewLotteryAction.hongKongPeiLv();
  }
  componentWillUnmount() {
    NewLotteryAction.xiaZhuNumber({numbers: []});
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className={styles.lotteryMain}>
        <div className={styles.lotteryMain2}>
          <div className={styles.lotteryMainLeft}>
             <NewLotteryDetails
                touzhuDetail={this.props.touzhuDetail}
                twoSidesDetai={this.props.twoSidesDetail}
                playKindId={this.props.selectPlayInfo.get('playKind').get('id')}
             />
             <NewLotteryTouzhu
                hongKongTeMa={this.props.hongKongTeMa}
                hongKongTwoSide={this.props.hongKongTwoSide}
                hongKongWeishu={this.props.hongKongWeishu}
                useMoney={this.props.userCaptial.get('useMoney')}
                playKind={this.props.selectPlayInfo.get('playKind')}
                touzhuDetail={this.props.touzhuDetail}
                openExpect={this.props.currentLotteryExpect.get('openExpect')}
                playKindId={this.props.selectPlayInfo.get('playKind').get('id')}
             />
          </div>
          <div className={styles.lotteryMainCenter}>
             <NewLotteryXiangGangCai
                 hongKongTeMa={this.props.hongKongTeMa}
                 hongKongTwoSide={this.props.hongKongTwoSide}
                 hongKongWeishu={this.props.hongKongWeishu}
                 currentLotteryType={this.props.currentLotteryType}
                 selectPlayInfo={this.props.selectPlayInfo}
                 touzhuDetail={this.props.touzhuDetail}
                 zodiac={this.props.zodiac}
                 weiZodiac={this.props.weiZodiac}
             />
          </div>
          <div className={styles.lotteryMainRight}>
            <NewLotteryResult
               lotteryResult={this.props.lotteryResult}
               lotteryResultExpectList={this.props.lotteryResultExpectList}
               lId={this.props.location.search.split('=')[1]}
            />
            <NewLotteryResultFirstCard
              lotteryResultList={this.props.lotteryResultList}
              winningRanking={this.props.winningRanking}
              currentType={this.props.currentType}
            />
            <NewLotteryResultSecondCard
                thisWeekStatistic={this.props.thisWeekStatistic}
                userBetList={this.props.userBetList}
                orderInfo={this.props.orderInfo}
                backBetClose={this.props.backBetClose}
            />
          </div>
        </div>
        <div style={{ height: '10px', backgroundColor: '#dbdbdb'}}/>
        <LotteryFooter />
      </div>
    );
  }
}

export default NewLottery;
