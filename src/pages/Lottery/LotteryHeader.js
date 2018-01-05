import React from 'react';
import { dispatch } from '../../store';
import { push } from 'react-router-redux';
import * as UserAction from '../../actions/UserAction';
import * as LotteryAction from '../../actions/LotteryAction.js';
import styles from './LotteryHeader.css';
import moment from 'moment';
import { Modal } from 'antd';
import Cookies from 'js-cookie';

const logo = require('../../assets/images/lottery-logo.png');
const arrow = require('../../assets/images/lottery-down-arrow.png');
const clock = require('../../assets/images/lottery-clock.png');
const redArrow = require('../../assets/images/redArrow.png');
const chongqing = require('../../assets/images/chongqing.png'); // 2
const aomen = require('../../assets/images/aomen.png'); // 5
const tianjin = require('../../assets/images/tianjin.png'); // 13
const xinjiabo = require('../../assets/images/xinjiabo.png'); // 14
const jianada = require('../../assets/images/jianada.png'); //20
const heilongjiang = require('../../assets/images/heilongjiang.png'); // 24
const beijing = require('../../assets/images/beijing.png'); // 4
const deguo = require('../../assets/images/beijing.png'); // 25
const guangdong = require('../../assets/images/guangdong.png'); // 7
const jiangxi = require('../../assets/images/jiangxi.png'); // 9
const shandong = require('../../assets/images/shandong.png'); //10
const xianggang = require('../../assets/images/xianggang.png'); // 26
const fucai = require('../../assets/images/fucai.png'); // 11
const pailie = require('../../assets/images/pailie3.png'); // 12
const xianggangcai = require('../../assets/images/xianggangcai.png'); //15
import newWindows from '../../core/newWindow';

var customerWindow = null;
var newWindow = null;

class LotteryHeader extends React.PureComponent {
  state = {
    showLotteryTypeList: false,
    secondsElapsed: this.props.currentLotteryExpect.get('time'), // 倒计时时间
    visible: false, // 显示弹窗
    times: 0, // 弹出倒计时
    isShow: 0, // 1显示   0 不显示
  };
  componentWillMount() {
    this.setState({
      secondsElapsed: Number(this.props.currentLotteryExpect.get('time')),
      isShow: this.props.isShow,
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.currentLotteryExpect.get('time') !== nextProps.currentLotteryExpect.get('time')) {
      this.setState({
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
    }
    if (this.props.currentLotteryExpect !== nextProps.currentLotteryExpect) {
      clearInterval(this.interval);
      // clearInterval(this.interval1);
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }
  changeTimes() {
    // 弹窗倒计时
    if(this.state.times > 0) {
      this.setState((prevState) => ({
        times: prevState.times - 1
      }));
    } else if(this.state.times === 0) {
        this.setState({ times: 0, visible: false, isShow: 0 });
        clearInterval(this.interval1);
    }
  }
  setTime() {
    // 弹窗的倒计时
    clearInterval(this.interval1);
    if (this.state.times) {
      this.interval1 = setInterval(() => this.changeTimes(), 1000);
    }
  }
  tick() {
    const expect = this.props.currentLotteryExpect;
    if(this.state.secondsElapsed > 0) {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed - 1
      }));
    } else if(this.state.secondsElapsed === 0 && expect.get('openExpect')) {
      // 倒计时到0的时候请求下一期
      LotteryAction.getLotteryExpect({ lId: this.props.lId });
      // LotteryAction.getLotteryResult({ lId: this.props.lId });
      if (this.props.isChaseNumber === true) {
        this.setState({ isShow: 1, visible: true, times: 0 });
      } else {
        this.setState({ isShow: 1, visible: true, times: 3 });
        this.setTime();
      }
    }
  }
  componentDidMount() {
    // header 的倒计时
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }
  renderLotteryTypeList() {
    if (this.state.showLotteryTypeList) {
      const currentLotteryTypeName = this.props.currentLotteryType.get('name') || this.props.currentLottery.get('name');
      const shishicai = this.props.lotteryTypesList.get('1').toJS();
      const pk10 = this.props.lotteryTypesList.get('2').toJS();
      const xuan5 = this.props.lotteryTypesList.get('3').toJS();
      const other = this.props.lotteryTypesList.get('4').toJS();
      const hongKong = this.props.lotteryTypesList.get('5').toJS();
      return (
        <div className={styles.lotteryTypeList}>
          <div className={styles.lotteryType}>
            <div className={styles.lotteryTypeName}><img src={redArrow} /> 时时彩系列</div>
            {shishicai && shishicai.map(item =>
              item.isOpen ? 
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                  // this.props.getLotteryExpect({ lid: item.lid });
                  this.setState({
                    showLotteryTypeList: false,
                  });
                }}
              >
                {item.name}
              </div>: <div className={styles.lotteryTypeItemNo}/>
            )}
          </div>
          <div className={styles.lotteryType}>
            <div className={styles.lotteryTypeName}><img src={redArrow} /> PK10系列</div>
            {pk10 && pk10.map(item =>
              item.isOpen ? 
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                  // this.props.getLotteryExpect({ lId: item.lId });
                  this.setState({
                    showLotteryTypeList: false,
                  });
                }}
              >
                {item.name}
              </div>: <div className={styles.lotteryTypeItemNo}/>
            )}
          </div>
          <div className={styles.lotteryType}>
            <div className={styles.lotteryTypeName}><img src={redArrow} /> 11选5系列</div>
            {xuan5 && xuan5.map(item =>
              item.isOpen ? 
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                  // this.props.getLotteryExpect({ lId: item.lId });
                  this.setState({
                    showLotteryTypeList: false,
                  });
                }}
              >
                {item.name}
              </div>: <div className={styles.lotteryTypeItemNo}/>
            )}
          </div>
          <div className={styles.lotteryType} style={{ borderBottom: '0' }}>
            <div className={styles.lotteryTypeName}><img src={redArrow} /> 其他系列</div>
            {other && other.map(item =>
              item.isOpen ? 
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                  this.setState({
                    showLotteryTypeList: false,
                  });
                }}
              >
                {item.name}
              </div>: <div className={styles.lotteryTypeItemNo}/>
            )}
            {hongKong && hongKong.map(item =>
              item.isOpen ? 
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                  this.setState({
                    showLotteryTypeList: false,
                  });
                }}
              >
                {item.name}
              </div>: <div className={styles.lotteryTypeItemNo}/>
            )}
          </div>
        </div>
      );
    }
  }
  formatTime(second) {
    return [parseInt(second / 60 / 60), parseInt(second / 60 % 60), parseInt(second % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
  }
  
  render() {
    const expect = this.props.currentLotteryExpect;
    const time = expect.get('time');
      const usernames = Cookies.get('username');
      const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
    const showLidImg = (lId) => {
      let imgurl= '';
      switch(Number(lId)) {
        case 2:
          imgurl = chongqing;
          break;
        case 5:
          imgurl = aomen;
          break;
        case 13:
            imgurl = tianjin;
            break;
        case 14:
            imgurl = xinjiabo;
            break;
        case 20:
            imgurl = jianada;
            break;
        case 24:
            imgurl = heilongjiang;
            break;
        case 4:
            imgurl = beijing;
            break;
        case 25:
            imgurl = deguo;
            break;
        case 7:
            imgurl = guangdong;
            break;
        case 9:
            imgurl = jiangxi;
            break;
        case 10:
            imgurl = shandong;
            break;
        case 26:
            imgurl = xianggang;
            break;
        case 11:
            imgurl = fucai;
            break;
        case 12:
            imgurl = pailie;
            break;
        case 15:
            imgurl = xianggangcai;
            break;
        defalut:
            imgurl = logo;
            break;
      }
      return <img src={imgurl} />;
    }
    return (
      <div className={styles.lotteryHeader}>
        <div className={styles.lotteryHeaderLeft}>
          <div
            className={styles.logoAndName}
            onMouseEnter={() => this.setState({ showLotteryTypeList: true })}
            onMouseLeave={() => this.setState({ showLotteryTypeList: false })}
          >
            <div className={styles.lotteryLogo}>
               {showLidImg(this.props.lId)}
            </div>
            <div className={styles.lotteryName}>
              <div>{this.props.currentLotteryType.get('name') || this.props.currentLottery.get('name')}</div>
              <img src={arrow} style={{ marginLeft: '4px'}}/>
            </div>
            {this.renderLotteryTypeList()}
          </div>
          <div className={styles.lotteryNumber}>当前注投 第 {expect.get('openExpect')} 期</div>
          <div className={styles.lotteryTime}>
            <img src={clock} />
            <div className={styles.lotteryTimeDes}>剩余</div>
          <div className={styles.lotteryTimer}>{this.formatTime(this.state.secondsElapsed)}</div>
          </div>
        </div>
        <div className={styles.lotteryHeaderRight}>
          <div className={styles.lotteryHeaderRightMenu}
            onClick={() => {
              let left = (screen.width - 1118) / 2;
              if(left < 0) left = 0;
              let top = (screen.height - 760) / 2;
              if(top < 0)top = 0;
              if (newWindow && !newWindow.closed) {
                newWindow.location.href = '/?#/user-info?type=2&rigthType=1';
                newWindow.focus();
              } else {
                newWindow = window.open('/?#/user-info?type=2&rigthType=1', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                newWindow.focus();
                newWindow.onclose = () => {
                  newWindow = null;
                };
              }
            }}
          >
            <div className={styles.chongzhiIcon} />
            <div>充值</div>
          </div>
          <div className={styles.lotteryHeaderRightMenu}
             onClick={() => {
                dispatch(push('/home-page'));
             }}
          >
            <div className={styles.homeIcon} />
            <div>首页</div>
          </div>
          <div className={styles.lotteryHeaderRightMenu}
              onClick={() => {
                let left = (screen.width - 1118) / 2;
                if(left < 0) left = 0;
                let top = (screen.height - 760) / 2;
                if(top < 0)top = 0;
                if (newWindow && !newWindow.closed) {
                  newWindow.location.href = '/?#/user-info?type=1&rigthType=1';
                  newWindow.focus();
                } else {
                  newWindow = window.open('/?#/user-info?type=1&rigthType=1', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                  newWindow.focus();
                  newWindow.onclose = () => {
                    newWindow = null;
                  };
                }
              }}
          >
            <div className={styles.meIcon} />
            <div>我的</div>
          </div>
          <div className={styles.lotteryHeaderRightMenu}
             onClick={()=>{
                 Cookies.set('cc','');
                 newWindows(kflink, customerWindow);
             }}
          >
            <div className={styles.kefuIcon} />
            <div>客服</div>
          </div>
          <div className={styles.lotteryHeaderRightMenu}
            onClick={() => {
              UserAction.loginOut();
            }}
          >
            <div className={styles.existIcon} />
            <div>退出</div>
          </div>
        </div>
        <Modal
           visible={this.state.visible}
           onCancel={() => {
             this.setState({ visible: false, times: 0, isShow: 0 });
             clearInterval(this.interval1);
           }}
           footer={null}
           style={{ marginTop: '130px' }}
         >
             <div style={{ padding: '20px'}}>
               <p style={{ fontSize: '20px', color: '#999', marginBottom: '5px' }}>友情提示: </p>
               <div style={{ border: '1px dashed #ccc', marginBottom: '5px' }}/>
               <p style={{ fontSize: '15px', padding: '5px'}}>您好，<span style={{ color: 'red'}}>{expect.get('closeExpect')}</span> 期已截止， 当前是 <span style={{ color: 'red'}}>{expect.get('openExpect')}</span>期， 投注时请确认您选择的期号。</p>
               <div className={styles.buttons}>
                 <div
                     onClick={() => {
                       this.setState({ visible: false, times: 0, isShow: 0 });
                       clearInterval(this.interval1);
                     }}
                     className={styles.calButton}
                 >
                   {this.props.isChaseNumber && <span style={{ color: '#2466d8'}}>确认</span>}
                   {!this.props.isChaseNumber && <span style={{ color: '#2466d8'}}>确认{'(' + this.state.times + ')'}</span>}
                 </div>
               </div>
             </div>
         </Modal>
      </div>
    );
  }
}

export default LotteryHeader;
