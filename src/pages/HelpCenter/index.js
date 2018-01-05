import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WhiteHeader from '../../components/WhiteHeader/';
import HelpCenterContent from './HelpCenterContent';
import * as styles from './styles.css';
import { checkStat, getUserInfo, invalidateSession } from '../../core/api/login';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as HomePageAction from '../../actions/HomePageAction';
import * as LotteryAction from '../../actions/LotteryAction';

class HelpCenter extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  componentWillMount() {
    // 获取cookie的值
    const value = document.cookie.split(";")[0].split("=")[1];
    if(value) {
      this.setState({ userName: value });
    }
    // 获取顶部彩票种类菜单
    LotteryAction.getLotteryTypeList();
    LotteryAction.getUserCaptialInfo();
  }
  _changeLotteryType (params) {
    LotteryAction.changeLotteryType(params);
    dispatch(push(`/lottery?lId=${params.lId}`));
  }
  render() {
    return (
      <div className={styles.loginContainer}>
        <WhiteHeader
          lotteryTypesList={this.props.lotteryTypesList}
          currentLotteryType={this.props.currentLotteryType}
          changeLotteryType={this._changeLotteryType}
          getLotteryExpect={LotteryAction.getLotteryExpect}
          baseInfo={this.props.baseInfo}
          userCaptial={this.props.userCaptial}
        />
        <div className={`${styles.bodyContent} ${styles.bodyContentClear}`}>
           <HelpCenterContent location={this.props.location}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    isFetching: state.HomePageReducer.get('isFetching'),
    noticeList: state.HomePageReducer.get('noticeList'),
    lotteryTypesList: state.LotteryReducer.get('lotteryTypesList'),
    currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
    lotteryResult: state.LotteryReducer.get('lotteryResult'),
    lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
    winningRanking: state.LotteryReducer.get('winningRanking'),
    userCaptial: state.LotteryReducer.get('userCaptial'),
    baseInfo: state.BaseInfoReducer.get('baseInfo'),
  };
};

export default connect(mapStateToProps)(HelpCenter);
