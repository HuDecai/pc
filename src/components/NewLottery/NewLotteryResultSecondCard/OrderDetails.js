import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './OrderDetails.css';
import * as LotteryAction from '../../../actions/LotteryAction.js';
const lotterySplitLine = require('../../../assets/images/lottery-split-line.png');
import Loading from '../../../core/decorators/Loading';
import { dispatch } from '../../../store';
import { push } from 'react-router-redux';
import moment from 'moment';
import { Modal, Button, Table, Checkbox } from 'antd';
const closeImg = require('../../../assets/images/lottery_close.png');

class OrderDetals extends React.PureComponent {
  render() {
    const singleMoney = {'2': '元', '0.2': '角', '0.02': '分', '1': '元'};
    const showContent = () => {
      const views = [];
      // 没有追号
      if(this.props.orderInfo.get('userChaseId') === null) {
        views.push(
          <div>
          <div className={styles.lotteryName}>
            {this.props.orderInfo.get('lotteryName')}
          </div>
          <div className={styles.lotteryDashed} />
          <div className={styles.lotteryContent}>
            <div>订单编号：{this.props.orderInfo.get('id')}</div>
            <div>投注模式：{singleMoney[this.props.orderInfo.get('singleMoney')]}</div>
            <div>玩法名称：{this.props.orderInfo.get('playKindName')}</div>
            <div>投注倍数：{this.props.orderInfo.get('beishu')}</div>
            <div>投注期号：{this.props.orderInfo.get('expect')}</div>
            <div>合计注数：{this.props.orderInfo.get('num')}</div>
            <div>投注时间：{this.props.orderInfo.get('time') || this.props.orderInfo.get('betTime') ? moment(this.props.orderInfo.get('time') || this.props.orderInfo.get('betTime')).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            <div>投注总额：{this.props.orderInfo.get('totalMoney')}</div>
            <div>奖金模式：{this.props.orderInfo.get('bonusType')}</div>
            <div>中奖金额：{this.props.orderInfo.get('totalBonus')}</div>
            <div>订单状态：{this.props.orderInfo.get('status')}</div>
            <div>实际盈亏：{this.props.orderInfo.get('profit')}</div>
          </div>
          <div className={styles.lotteryDetails}>
            <div className={styles.lotteryDetailsTitle}>
              投注内容
            </div>
            <div className={styles.lotteryDetailsContent}>
              {this.props.orderInfo.get('detail')}
            </div>
          </div>
          <div className={styles.revokeFooter}>
           {this.props.orderInfo.get('status') == '未处理' ?
              <div
                onClick={() => {
                  LotteryAction.addBackBet1({id: this.props.orderInfo.get('id')});
                }}
                className={ styles.revokeButton}
              >撤&nbsp;销</div> : <div />
           }
          </div> 
          </div>
        );
      }
      return views;
    }
    return (
      <div className={styles.orderDetals}>
        <Modal
          width={700}
          closable={false}
          title={
            <div className={styles.modalHeader}><div>订单详情</div>
            <div><img src={closeImg} onClick={this.props.hideModal}/></div></div>
          }
          visible={this.props.visible}
          onOk={this.props.hideModal}
          onCancel={this.props.hideModal}
          footer={null}
          maskClosable={false}
        >
          <div style={{ minHeight: '320px' }}>
            {showContent()}
          </div>
        </Modal>
      </div>
    );
  }
}

export default OrderDetals;
