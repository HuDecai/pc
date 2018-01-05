import React from 'react';
import { connect } from 'react-redux';
import WhiteHeader from '../../components/WhiteHeader/';
import Carousel from '../../components/Carousel/';
import CarouselBottom from '../../components/CarouselBottom/';
import Entrys from '../../components/Entrys/';
import HomePageBottom from '../../components/HomePageBottom/';
import * as styles from './style.css';
import { checkStat, getUserInfo, invalidateSession } from '../../core/api/login';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as HomePageAction from '../../actions/HomePageAction';
import * as LotteryAction from '../../actions/LotteryAction';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class Shouye extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    // this.state = {
    //   userName: '',
    // };
  }
  componentWillMount() {
    // // 获取cookie的值
    // const value = document.cookie.split(";")[0].split("=")[1];
    // if(value) {
    //   this.setState({ userName: value });
    // }
    // 获取首页公告
    HomePageAction.getNotice({ signMessage: 3, pageNo: 1, pageSize: 11});
    // 获取顶部彩票种类菜单
    LotteryAction.getLotteryTypeList();
    LotteryAction.getUserCaptialInfo();
    BaseInfoAction.getBaseInfo();
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
        <Carousel />
        <CarouselBottom noticeList={this.props.noticeList} isShowNotice={this.props.isShowNotice} />
        <Entrys
           lotteryTypesList={this.props.lotteryTypesList}
           changeLotteryType={this._changeLotteryType}
        />
        <HomePageBottom />

      </div>
    );
  }
  componentWillUnmount() {
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
    isShowNotice: state.UserReducer.get('isShowNotice'),
    baseInfo: state.BaseInfoReducer.get('baseInfo'),
  };
};

export default connect(mapStateToProps)(Shouye);
