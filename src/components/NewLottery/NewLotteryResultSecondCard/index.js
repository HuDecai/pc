import React from 'react';
import { Table } from 'antd';
import styles from './styles.css';
import OrderDetails from './OrderDetails';
import * as LotteryAction from '../../../actions/LotteryAction';
const LotteryImg = require('../../../assets/images/lottery-excel.png');
import TableShow from '../TableShow/';
import { push, replace } from 'react-router-redux';
import { dispatch } from '../../../store';
import * as UserAction from '../../../actions/UserAction';

let newWindow = null;
var newWindow2 = null;

class NewLotteryResultSecondCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkedID: 1,
      orderVisible: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.backBetClose) {
      this.setState({
        orderVisible: false,
      });
      LotteryAction.updateBackBetClose({ backBetClose: false, });
    }
  }
  showModal = (id) => {
    let left = (screen.width - 666) / 2;
    if(left < 0) left = 0;
    let top = (screen.height - 419) / 2;
    if(top < 0)top = 0;
    if (newWindow2 && !newWindow2.closed) {
      newWindow2.location.href = `/?#/order-info?id=${id}&userChaseId=null`;
      newWindow2.focus();
    } else {
      newWindow2 = window.open(`/?#/order-info?id=${id}&userChaseId=null`, "newWindow2", `height=419, width=666, top=${top}, left=${left}` );
      newWindow2.focus();
      newWindow2.onclose = () => {
        newWindow2 = null;
      };
    }
  }
  hideModal = () => {
    this.setState({
     orderVisible: false,
    });
  }
  chooseBackList(isChecked, index) {
    const backBetList = this.state.backBetList;
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    const listArr = [];
    if(isChecked) {
      // 将勾选后面的全部选中
      if(list) {
        list.map((item, key) => {
          if(key >= index) {
            listArr.push(item.get('id'));
          }
        })
      }
    } else {
      // 取消前面全部勾选
      if(list) {
        list.map((item, key) => {
          if(key > index) {
            listArr.push(item.get('id'));
          }
        })
      }
    }
    this.setState({
      backBetList: [...listArr]
    });
  }
  showBetListData(userBetList) {
    const views = [];
    if(userBetList.toJS().length) {
       userBetList.map((item, key) => {
         views.push(
           <div key={item.get('id')} className={styles.pickTableTd}
              onClick={() => this.showModal(item.get('id'))}
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
    _showModal = () => {
        let left = (screen.width - 1118) / 2;
        if(left < 0) left = 0;
        let top = (screen.height - 760) / 2;
        if(top < 0)top = 0;
        if (newWindow && !newWindow.closed) {
            newWindow.location.href = `/?#/user-info?type=3&rigthType=2`;
            newWindow.focus();
        } else {
            newWindow = window.open(`/?#/user-info?type=3&rigthType=2`, "_blank", `height=760, width=1118, top=${top}, left=${left}` );
            newWindow.focus();
            newWindow.onclose = () => {
                newWindow = null;
            };
        }
    }
  showTableForID(checkedID) {
    const views = [];
    if(checkedID === 1) {
      views.push(
        <div>
          <div className={styles.pickTableTd}>
            <div className={styles.tableTr1}>彩种</div>
            <div className={styles.tableTr2}>金额</div>
            <div className={styles.tableTr3}>状态</div>
            <div className={styles.tableTr4}>盈亏</div>
         </div>
         <div style={{ height: 155, overflow: 'scroll'}}>
           {this.showBetListData(this.props.userBetList)}
         </div>
       </div>
     );
    }else if(checkedID === 2) {
      views.push(
        <TableShow
            dataSource={this.props.thisWeekStatistic}
            checkedID={5}
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
          onClick={() => { this.setState({ checkedID: 1 })}}>今日注单</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 2 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 2 })}}>本周盈亏</div>
          <div className={styles.cardTab}
          onClick={() => {
            //dispatch(replace('/user-info?type=3&rigthType=2'));
              this._showModal();
            UserAction.changeType({ type: 3, rightType: 2 })
          }}>投注记录</div>
        </div>
        <div style={{ backgroundColor: '#fff' }}>
          {this.showTableForID(this.state.checkedID)}
        </div>
        <OrderDetails
          visible={this.state.orderVisible}
          hideModal={this.hideModal}
          orderInfo={this.props.orderInfo}
        />
      </div>
    );
  }
}

export default NewLotteryResultSecondCard;
