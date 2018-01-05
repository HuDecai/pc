import React from 'react';
import { Table } from 'antd';
import styles from './LotteryResultFirstCard.css';
const LotteryImg = require('../../assets/images/lottery-chart.png');
import TableFirst from './TableFirst.js';

const columnsTwo = [{
    title: '奖金',
    dataIndex: 'totalBonus',
    key: 'totalBonus',
  }, {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
}];
class LotteryResultFirstCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkedID: 1,
    };
  }
  showTableForID(checkedID) {
    const views = [];
    if(checkedID === 1) {
      const currentType = this.props.currentType;
      views.push(
        <TableFirst
            lId={this.props.lId}
            dataSource={this.props.lotteryResultList}
            currentType={currentType}
            checkedID={1}
        />
      );
    }else if(checkedID === 2) {
      views.push(
        <TableFirst
            lId={this.props.lId}
            dataSource={this.props.winningRanking}
            checkedID={2}
        />
      );
    }else if(checkedID === 3) {
      views.push(
        <div />
      );
    }
    return views;
  }
  render() {
    const lId = this.props.lId;
    return (
      <div className={styles.lotteryResultFirstCard}>
        <div className={styles.cardTabs}>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 1 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 1 })}}>{lId == 11 || lId== 12 ? '最近开奖' : '今天开奖'}</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 2 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 2 })}}>中奖排行榜</div>
          <div className={styles.cardTab} />
          {/*<div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 3 ? '#fff': ''}}
          onClick={() => { }}>中奖趋势
          <img src={LotteryImg} style={{ marginLeft: '2px', width: '20px'}}/>
          </div>*/}
        </div>
        <div style={{ backgroundColor: '#fff' }}>
            {this.showTableForID(this.state.checkedID)}
        </div>
      </div>
    );
  }
}

export default LotteryResultFirstCard;
