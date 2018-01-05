import React from 'react';
import { Table } from 'antd';
import styles from './LotteryResultSecondCard.css';
import * as LotteryAction from '../../actions/LotteryAction';
const LotteryImg = require('../../assets/images/lottery-excel.png');
import TableFirst from './TableFirst.js';
import { dispatch } from '../../store';
import { push } from 'react-router-redux';

var newWindow = null;
var newWindow2 = null;

class LotteryResultSecondCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkedID: 1,
    };
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.backBetClose) {
      this.setState({
        orderVisible: false,
      });
      LotteryAction.updateBackBetClose({ backBetClose: false, });
    }
  }
  showModal = (id, userChaseId) => {
    let left = (screen.width - 666) / 2;
    if(left < 0) left = 0;
    let top = (screen.height - 419) / 2;
    if(top < 0)top = 0;
    if (newWindow2 && !newWindow2.closed) {
      newWindow2.location.href = `/?#/order-info?id=${id}&userChaseId=${userChaseId}`;
      newWindow2.focus();
    } else {
      newWindow2 = window.open(`/?#/order-info?id=${id}&userChaseId=${userChaseId}`, "newWindow2", `height=419, width=666, top=${top}, left=${left}` );
      newWindow2.focus();
      newWindow2.onclose = () => {
        newWindow2 = null;
      };
    }
  }

  showBetList(userBetList) {
    const views = [];
    if(userBetList.toJS().length) {
     userBetList.map((item, key) => {
       views.push(
         <div key={key} className={styles.pickTableTd}
            onClick={() => this.showModal(item.get('id'), item.get('userChaseId'))}
         >
            <div className={styles.tableTd1}>{item.get('lotteryName')}</div>
            <div className={styles.tableTr2}>{item.get('totalMoney').toFixed(3)}</div>
            <div className={styles.tableTr3}>{item.get('status')}</div>
            <div className={styles.tableTr4}>{item.get('profit').toFixed(3)}</div>
         </div>
       );
     });
   }else {
     views.push(
       <div className={styles.pickTableTd}>
          <div className={styles.tableTr4}>暂时没有记录!</div>
       </div>
      );
   }
   return views;
  }
  showTableForID(checkedID) {
    const views = [];
    if(checkedID === 1) {
      views.push(
        <div>
            <div className={styles.pickTableHeader}>
              <div className={styles.tableTr1}>彩种</div>
              <div className={styles.tableTr2}>金额</div>
              <div className={styles.tableTr3}>状态</div>
              <div className={styles.tableTr4}>盈亏</div>
           </div>
           <div style={{ height: '115px', overflow: 'scroll'}}>
              {this.showBetList(this.props.userBetList)}
           </div>
       </div>
     );
    }else if(checkedID === 2) {
      views.push(
        <TableFirst
            dataSource={this.props.thisWeekStatistic}
            checkedID={3}
        />
      );
    }else if(checkedID === 3) {
      views.push(
        <TableFirst
            dataSource={this.props.lastWeekStatistic}
            checkedID={4}
        />
      );
    }
    return views;
  }
  render() {
    return (
      <div className={styles.lotteryResultFirstCard}>
        <div className={styles.cardTabs}>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 1 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 1 })}}>今日投注</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 2 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 2 })}}>本周盈亏</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 3 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 3 })}}>上周盈亏</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 4 ? '#fff': '',
          display: 'flex', alignItems: 'center' }}
          onClick={() => {
            console.warn(newWindow);
            let left = (screen.width - 1118) / 2;
            if(left < 0) left = 0;
            let top = (screen.height - 760) / 2;
            if(top < 0)top = 0;
            if (newWindow && !newWindow.closed) {
              newWindow.location.href = '/?#/user-info?type=3&rigthType=1';
              newWindow.focus();
            } else {
              newWindow = window.open('/?#/user-info?type=3&rigthType=1', "newWindow", `height=760, width=1118, top=${top}, left=${left}` );
              newWindow.focus();
              newWindow.onclose = () => {
                newWindow = null;
              };
            }
          }}>查询订单
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', height: '145px' }}>
          {this.showTableForID(this.state.checkedID)}
        </div>
      </div>
    );
  }
}

export default LotteryResultSecondCard;
