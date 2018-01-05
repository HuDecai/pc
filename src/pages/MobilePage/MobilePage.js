import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.css';
import * as wstyles from '../../components/WhiteHeader/style.css';
import {replace, push } from 'react-router-redux';
import { dispatch } from '../../store';
import { checkStat, getUserInfo, invalidateSession } from '../../core/api/login';
import WhiteHeader from '../../components/WhiteHeader/';
import * as HomePageAction from '../../actions/HomePageAction';
import * as LotteryAction from '../../actions/LotteryAction';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
const headerIcon = require('../../assets/images/mobile-icon.png');
const leftImg = require('../../assets/images/mobile-left.png');
const showImg = require('../../assets/images/show.png');
const firstText = require('../../assets/images/mobile-text1.png');
const twoText = require('../../assets/images/monile-text2.png');
const iosQrCode = require('../../assets/images/ios-qrcode.png');
const androidQrCode = require('../../assets/images/android-icon.png');
const adIcon = require('../../assets/images/ad-icon.png');
const iosIcon = require('../../assets/images/ios-icon.png');
const logo = require('../../assets/images/home_page_logo.png');

class MobilePage extends React.PureComponent {
    state = {
        showDiv: false,
        showNav: '',
    };
    componentWillMount() {
        try{
          const showNav = window.location.hash.split('?')[1].split('=')[1];
          this.setState({ showNav });
          if(showNav == 'yes') {
            // 获取首页公告
            HomePageAction.getNotice({ signMessage: 3, pageNo: 1, pageSize: 11});
            // 获取顶部彩票种类菜单
            LotteryAction.getLotteryTypeList();
            LotteryAction.getUserCaptialInfo();
            BaseInfoAction.getBaseInfo();
          }
        }catch(e) {}
        
    }
    _changeLotteryType (params) {
        LotteryAction.changeLotteryType(params);
        dispatch(push(`/lottery?lId=${params.lId}`));
    }
    _showDvi(){
        return (this.state.showDiv?<div className={styles.showdiv}><img src={showImg}/></div>:'');
    }

  render() {
    return (
        <div>
            {this.state.showNav == 'yes' ? 
              <WhiteHeader
                  lotteryTypesList={this.props.lotteryTypesList}
                  currentLotteryType={this.props.currentLotteryType}
                  changeLotteryType={this._changeLotteryType}
                  getLotteryExpect={LotteryAction.getLotteryExpect}
                  baseInfo={this.props.baseInfo}
                  userCaptial={this.props.userCaptial}
              /> : 
              <div className={wstyles.whiteHeader}>
                <div className={wstyles.container}>
                  <div className={wstyles.logo} onClick={() => dispatch(replace('/Login'))}>
                    <img src={logo} />
                  </div>
                </div>
              </div>
            }
            
      <div className={styles.mobileBody}>

          <div className={styles.body}>
            <div className={styles.bodys}>
                <div className={styles.leftImg}><img src={leftImg} /></div>
                <div className={styles.bodyContent}>
                    <div><img src={twoText} /></div>
                    <div><img src={firstText} /></div>
                    <div className={styles.qrCodeContent}>
                        <div className={styles.qrCode}>
                           <div><img src={androidQrCode} className={styles.qrCodeImg} /></div>
                           <div style={{ marginTop:10}}><img src={adIcon} style={{ cursor: 'pointer' }} onClick={() => {window.open('https://fir.im/kzcm')}}/></div>
                        </div>
                        <div className={styles.qrCode}>
                           <div ><img src={iosQrCode} className={styles.qrCodeImg} /></div>
                           <div style={{ marginTop:10}}><img src={iosIcon} style={{ cursor: 'pointer' }} onClick={() => {window.open('https://fir.im/7rh5')}} /></div>
                           <div className={styles.iosText} onMouseEnter={() => this.setState({ showDiv: true })}
                                onMouseLeave={() => this.setState({ showDiv: false })}>IOS系统受信任设置教程{this._showDvi()}</div>
                        </div>
                    </div>
                </div>
            </div>
            
          </div>
          <div className={styles.bottom}>@ 2017 亿合娱乐  版权所有</div>
      </div></div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        dispatch: state.dispatch,
        lotteryTypesList: state.LotteryReducer.get('lotteryTypesList'),
        currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
        userCaptial: state.LotteryReducer.get('userCaptial'),
        baseInfo: state.BaseInfoReducer.get('baseInfo'),
    };
};

export default connect(mapStateToProps)(MobilePage);
