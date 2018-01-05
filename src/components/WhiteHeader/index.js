import React, { PropTypes } from 'react';
import { dispatch } from '../../store';
import { replace, push } from 'react-router-redux';
import * as UserAction from '../../actions/UserAction';
const styles = require('./style.css');
const styles2 = require('../../pages/Lottery/LotteryHeader.css');
const logo = require('../../assets/images/home_page_logo.png');
const redArrow = require('../../assets/images/redArrow.png');
import NavIcon1 from '../../assets/images/nav_icon_01.png';
import NavIcon2 from '../../assets/images/nav_icon_02.png';
import NavIcon3 from '../../assets/images/nav_icon_03.png';
import NavIcon4 from '../../assets/images/nav_icon_04.png';
import NavIcon5 from '../../assets/images/nav_icon_05.png';
import NavIcon6 from '../../assets/images/nav_icon_06.png';
import NavIcon7 from '../../assets/images/nav_icon_07.png';
import NavIcon8 from '../../assets/images/nav_icon_08.png';
import NavIcon9 from '../../assets/images/nav_icon_09.png';
import LotteryHeader from '../../pages/Lottery/LotteryHeader';
import newWindows from '../../core/newWindow';
import Cookies from 'js-cookie';

var newWindow = null;
var customerWindow = null;

class BlackHeader extends React.PureComponent {
  static propTypes = {
    userName: PropTypes.string,
  };
  state = {
    showLotteryTypeList: false,
  };
  renderLotteryTypeList() {
    if (this.state.showLotteryTypeList) {
      const currentLotteryTypeName = this.props.currentLotteryType.get('name');
      const shishicai = this.props.lotteryTypesList.get('1').toJS();
      const pk10 = this.props.lotteryTypesList.get('2').toJS();
      const xuan5 = this.props.lotteryTypesList.get('3').toJS();
      const other = this.props.lotteryTypesList.get('4').toJS();
      const hongKong = this.props.lotteryTypesList.get('5').toJS();
      return (
        <div className={styles.lotteryTypeList}>
          <div className={styles.lotteryType}>
            <div className={styles2.lotteryTypeName}><img src={redArrow} /> 时时彩系列</div>
            <div style={{ marginLeft: '5px'}}>
            {shishicai && shishicai.map(item =>
              item.isOpen ?
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                }}
              >
                {item.name}
              </div> : <div className={styles.lotteryTypeItemNo}/>
            )}
          </div>
          </div>
          <div className={styles.lotteryType}>
            <div className={styles2.lotteryTypeName}><img src={redArrow} /> PK10系列</div>
            <div style={{ marginLeft: '5px'}}>
            {pk10 && pk10.map(item =>
              item.isOpen ?
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                }}
              >
                {item.name}
              </div> : <div className={styles.lotteryTypeItemNo}/>
            )}
            </div>
          </div>
          <div className={styles.lotteryType}>
            <div className={styles2.lotteryTypeName}><img src={redArrow} /> 11选5系列</div>
            <div style={{ marginLeft: '5px'}}>
            {xuan5 && xuan5.map(item =>
              item.isOpen ?
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                }}
              >
                {item.name}
              </div> : <div className={styles.lotteryTypeItemNo}/>
            )}
            </div>
          </div>
          <div className={styles.lotteryType} style={{ borderBottom: '0' }}>
            <div className={styles2.lotteryTypeName}><img src={redArrow} /> 其他系列</div>
            <div style={{ marginLeft: '5px'}}>
            {other && other.map(item =>
              item.isOpen ?
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                }}
              >
                {item.name}
              </div> : <div className={styles.lotteryTypeItemNo}/>
            )}
            {hongKong && hongKong.map(item =>
              item.isOpen ?
              <div
                className={styles.lotteryTypeItem}
                key={item.name}
                onClick={() =>{
                  this.props.changeLotteryType(item);
                }}
              >
                {item.name}
              </div> : <div className={styles.lotteryTypeItemNo}/>
            )}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    const usernames = Cookies.get('username');
    const username = this.props.baseInfo.user ? (this.props.baseInfo.user.nickName ?  this.props.baseInfo.user.nickName : '-' ): '-';
    return (
      <div className={styles.whiteHeader}>
        <div className={styles.container}>
          <div className={styles.logo} >
            <img src={logo} onClick={() => dispatch(replace('/home-page'))}/>
          </div>
          <div className={styles.nav}>
            <div className={styles.navTop}>
              <li>
                <ul>您好: {username}</ul>
                <ul>余额: {this.props.userCaptial.get('useMoney') ? (this.props.userCaptial.get('useMoney')).toFixed(3) : 0}</ul>
                <ul style={{cursor: 'pointer'}}><div onClick={() => {
                  let left = (screen.width - 1118) / 2;
                  if(left < 0) left = 0;
                  let top = (screen.height - 760) / 2;
                  if(top < 0)top = 0;
                  /* TODO: 邮箱Icon 要能跳转，此处补充 */
                  if (newWindow && !newWindow.closed) {
                    newWindow.location.href = '/?#/user-info?type=1&rigthType=1&isSys=1';
                    newWindow.focus();

                    // newWindow.location.href = '';
                  } else {
                    newWindow = window.open('/?#/user-info?type=1&rigthType=1&isSys=1', "newWindow", `height=760, width=1118, top=${top}, left=${left}` );
                    newWindow.focus();

                    newWindow.onclose = () => {
                      newWindow = null;
                    };
                  }
                }}><img src={NavIcon2} /></div></ul>
                <ul className={styles.borderUl}></ul>
                <ul ><div onClick={() => {
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
                }}>充值</div></ul>
                <ul ><div onClick={() => {
                  let left = (screen.width - 1118) / 2;
                  if(left < 0) left = 0;
                  let top = (screen.height - 760) / 2;
                  if(top < 0)top = 0;
                  if (newWindow && !newWindow.closed) {
                    newWindow.location.href = '/?#/user-info?type=2&rigthType=2';
                    newWindow.focus();
                  } else {
                    newWindow = window.open('/?#/user-info?type=2&rigthType=2', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                    newWindow.focus();
                    newWindow.onclose = () => {
                      newWindow = null;
                    };
                  }
                }}>提现</div></ul>
                <ul><a onClick={()=>{
                    const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
                    Cookies.set('cc','');
                    newWindows(kflink, customerWindow);
                }}>客服</a></ul>
                <ul><div onClick={() => {
                  let left = (screen.width - 1118) / 2;
                  if(left < 0) left = 0;
                  let top = (screen.height - 760) / 2;
                  if(top < 0)top = 0;
                  if (newWindow && !newWindow.closed) {
                    newWindow.focus();
                    newWindow.location.href = '/?#/user-info?type=1&rigthType=1';
                  } else {
                    newWindow = window.open('/?#/user-info?type=1&rigthType=1', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                    newWindow.focus();
                    newWindow.onclose = () => {
                      newWindow = null;
                    };
                  }
                }}>个人管理</div></ul>
              {username ?
                  <ul
                     onClick={() => {
                       UserAction.loginOut();
                     }}
                  >
                     <div style={{cursor: 'pointer'}} >退出</div>
                  </ul>
                  : <ul onClick={() => { dispatch(replace('./Login'))}}><a>登录</a></ul>
                }
              </li>
            </div>
            <div className={styles.navBottom}>
              <li>
                <ul className={styles.img1Content} onClick={() => dispatch(replace('/home-page'))}><div style={{ marginLeft: '18px'}}>首页</div></ul>
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img3Content}
                  onMouseEnter={() => this.setState({ showLotteryTypeList: true })}
                  onMouseLeave={() => this.setState({ showLotteryTypeList: false })}
                >
                  <span style={{ marginLeft: '19px'}}>彩票</span>
                  {this.state.showLotteryTypeList ? <div className={styles.triangleUpDiv}><div className={styles.triangleUp} /></div> : ''}
                  {this.renderLotteryTypeList()}
                </ul>
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img4Content}><div style={{ marginLeft: '28px'}} onClick={()=>{alert('暂未开放！')}}>捕鱼</div></ul>
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img5Content}><div style={{ marginLeft: '26px'}} onClick={()=>{alert('暂未开放！')}}>老虎机</div></ul>
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img6Content}><div style={{ marginLeft: '20px'}} onClick={()=>{alert('暂未开放！')}}>真人</div></ul>
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img7Content}><div style={{ marginLeft: '19px'}} onClick={()=>{alert('暂未开放！')}}>体育</div></ul>
                {/*<ul className={styles.borderUl2}></ul>*/}
                {/*<ul className={styles.img8Content}><div style={{ marginLeft: '21px'}}>优惠</div></ul>*/}
                <ul className={styles.borderUl2}></ul>
                <ul className={styles.img9Content} onClick={() => dispatch(push('/mobile-page?showNav=yes'))}><div style={{ marginLeft: '15px'}}>手机</div></ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlackHeader;
