import React from 'react';
import { Icon, Button } from 'antd';
import * as LotteryAction from '../../actions/LotteryAction.js';
import styles from './UserCard.css';
import Exchange from './Exchange';
import { dispatch } from '../../store';
import { push } from 'react-router-redux';

const duihuanIcon = require('../../assets/images/lottery_duihuan.png');
const tixianIcon = require('../../assets/images/lottery_small_phone.png');
const borderImg = require('../../assets/images/border-img.png');
var newWindow = null;
export default class UserCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10000);
  }
  tick() {
      LotteryAction.getUserCaptialInfo();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className={styles.userCard}>
        <div className={styles.userCardCell} style={{ borderBottom: '1px dashed #dbdbdb'}}>
          <div>账户余额：</div>
          <div className={styles.userCardRight}>
            <div className={styles.monery}><div>¥{this.props.userCaptial.get('useMoney') ? (this.props.userCaptial.get('useMoney')).toFixed(3) : 0}</div></div>
            <span className={styles.buttonStyle}
              onClick={() => {
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
              }}
            ><img src={tixianIcon} style={{marginRight: 3}}/>提现</span>
          </div>
        </div>
        <div className={styles.userCardCell}>
          <div>累计积分：</div>
          <div className={styles.userCardRight}>
            <div style={{ marginRight: '5px', fontSize: '13px', fontWeight: 'blod', color: '#2466d8' }}>{this.props.userCaptial.get('points')}</div>
            <span className={styles.buttonStyle}
               onClick={() => {this.setState({ visible: true })}}
              ><img src={duihuanIcon} style={{marginRight: 3}}/> 兑换
            </span>
          </div>
        </div>
        <div style={{ marginTop: '-5px', zIndex: '100' }}><img src={borderImg} width="101%"/></div>
        <Exchange
            visible={this.state.visible}
            points={this.props.userCaptial.get('points')}
            onChange={() => this.setState({ visible: false })}
        />
      </div>
    );
  }
}
