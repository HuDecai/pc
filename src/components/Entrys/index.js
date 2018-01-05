import React from 'react';
import { dispatch } from '../../store';
import { replace, push } from 'react-router-redux';
import * as UserAction from '../../actions/UserAction';
const styles = require('./style.css');
const pay1 = require('../../assets/images/pay_01.png');
const pay2 = require('../../assets/images/pay_02.png');
const pay3 = require('../../assets/images/pay_03.png');
const pay4 = require('../../assets/images/pay_04.png');
const ad1 = require('../../assets/images/ad_05.png');
const ad2 = require('../../assets/images/ad_04.png');
const ad3 = require('../../assets/images/ad_01.png');
const ad4 = require('../../assets/images/ad_03.png');
const ad5 = require('../../assets/images/ad_02.png');
var newWindow = null;

class BlackHeader extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      hover: 2,
    };
  }
  render() {
    return (
      <div className={styles.entrys}>
        <div className={styles.container}>
          <div className={styles.entryLeft}>
            <div className={styles.leftChild1}>
              <img src={pay1} />
            </div>
            <div className={styles.leftChild2}
              onClick={() => {
                let left = (screen.width - 1118) / 2;
                if(left < 0) left = 0;
                let top = (screen.height - 760) / 2;
                if(top < 0)top = 0;
                if (newWindow && !newWindow.closed) {
                  newWindow.location.href = '/?#/user-info?type=2&rigthType=1&payAction=1';
                  newWindow.focus();
                } else {
                  newWindow = window.open('/?#/user-info?type=2&rigthType=1&payAction=1', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                  newWindow.focus();
                  newWindow.onclose = () => {
                    newWindow = null;
                  };
                }
                UserAction.changeType({ type: 2, rightType: 1 })
              }}
            >
              <img src={pay2} />
            </div>
            <div className={styles.leftChild3}
                onClick={() => {
                  let left = (screen.width - 1118) / 2;
                  if(left < 0) left = 0;
                  let top = (screen.height - 760) / 2;
                  if(top < 0)top = 0;
                  if (newWindow && !newWindow.closed) {
                    newWindow.location.href = '/?#/user-info?type=2&payAction=1&payAction=2';
                    newWindow.focus();
                  } else {
                    newWindow = window.open('/?#/user-info?type=2&rigthType=1&payAction=2', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                    newWindow.focus();
                    newWindow.onclose = () => {
                      newWindow = null;
                    };
                  }
                  UserAction.changeType({ type: 2, rightType: 1 })
                }}
            >
              <img src={pay3} />
            </div>
            <div className={styles.leftChild4}
                onClick={() => {
                  let left = (screen.width - 1118) / 2;
                  if(left < 0) left = 0;
                  let top = (screen.height - 760) / 2;
                  if(top < 0)top = 0;
                  if (newWindow && !newWindow.closed) {
                    newWindow.location.href = '/?#/user-info?type=2&rigthType=1&payAction=3';
                    newWindow.focus();
                  } else {
                    newWindow = window.open('/?#/user-info?type=2&rigthType=1&payAction=3', "newWindow", `height=700, width=1118, top=${top}, left=${left}` );
                    newWindow.focus();
                    newWindow.onclose = () => {
                      newWindow = null;
                    };
                  }
                    UserAction.changeType({ type: 2, rightType: 1 })
                }}
            >
              <img src={pay4} />
            </div>
          </div>
          <div className={styles.entryRight}>
            <div
              className={`${styles.rightChild} ${this.state.hover === 0 ? styles.hoverRightChild : ''}`}
              onMouseEnter={() => {
                this.setState({ hover: 0 });
              }}
              onClick={() => this.props.changeLotteryType(
                this.props.lotteryTypesList.get('2').toJS()[0]
              )}
            >
              <img src={ad1} width="100%"/>
              <div className={styles.entryTextBg}>北京赛车PK10</div>
            </div>
            <div
              className={`${styles.rightChild} ${this.state.hover === 1 ? styles.hoverRightChild : ''}`}
              onMouseEnter={() => {
                this.setState({ hover: 1 });
              }}
            >
              <img src={ad2} width="100%"/>
              <div className={styles.entryTextBg}>捕鱼</div>
            </div>
            <div
              className={`${styles.rightChild} ${this.state.hover === 2 ? styles.hoverRightChild : ''}`}
              onMouseEnter={() => {
                this.setState({ hover: 2 });
              }}
            >
              <img src={ad3} width="100%"/>
              <div className={styles.entryTextBg}>真人</div>
            </div>
            <div
              className={`${styles.rightChild} ${this.state.hover === 3 ? styles.hoverRightChild : ''}`}
              onMouseEnter={() => {
                this.setState({ hover: 3 });
              }}
            >
              <img src={ad4} width="100%"/>
              <div className={styles.entryTextBg}>老虎机</div>
            </div>
            <div
              className={`${styles.rightChild} ${this.state.hover === 4 ? styles.hoverRightChild : ''}`}
              onMouseEnter={() => {
                this.setState({ hover: 4 });
              }}
              onClick={() => this.props.changeLotteryType(
                this.props.lotteryTypesList.get('1').toJS()[0]
              )}
            >
              <img src={ad5} width="100%"/>
              <div className={styles.entryTextBg}>彩票</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default BlackHeader;
