import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './OrderDetials.css';
import * as LotteryAction from '../../actions/LotteryAction';
const lotterySplitLine = require('../../assets/images/lottery-split-line.png');
import Loading from '../../core/decorators/Loading';
import { dispatch } from '../../store';
import { push } from 'react-router-redux';
import moment from 'moment';
import { Modal, Button, Table, Checkbox } from 'antd';
const closeImg = require('../../assets/images/lottery_close.png');

class OrderDetals extends React.PureComponent {
  static propTypes = {
    hideModal: PropTypes.func,
    orderVisible: PropTypes.bool,
    dispatch: PropTypes.func,
    backBetList: PropTypes.any,
    chooseBackList: PropTypes.func,
  };
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  renderTable(list) {
    const view = [];
    list.map((item, index) => {
      view.push(
        <tr key={index} className={styles.OrderDetailsTr}>
          <td>{item.get('expect')}</td>
          <td>{item.get('result')}</td>
          <td>{item.get('status')}</td>
          <td>{item.get('beishu')}</td>
          <td>{item.get('totalMoney')}</td>
          <td>{item.get('totalBonus')}</td>
          <td>
             <Checkbox 
               onChange={(e) => {
                 this.props.chooseBackList(e.target.checked, index)
               }}
               checked={this.props.backBetList.indexOf(item.get('id'))===-1?false:true}
             />
          </td>
        </tr>
      );
    });
    return view;
  }
  checkedBackBetList () {
    const backBetList = this.props.backBetList;
    if(backBetList.length) {
      return true;
    }
    return false;
  }
  getTouZhuInfo() {
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    let num = 0;
    let beishu = 0;
    if(list) {
      list.map((item) => {
        num = num + item.get('num');
        beishu = beishu + item.get('beishu');
      })
    }
    return [num, beishu];
  }
  render() {
    const singleMoney = {'2': '元', '0.2': '角', '0.02': '分'};
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
            <div
              onClick={() => {
                LotteryAction.addBackBet1({id: this.props.orderInfo.get('id')});
              }}
              className={ styles.revokeButton}
            >撤&nbsp;销</div>
          </div> 
          </div>
        );
      }
      // 有追号
      if(this.props.orderInfo.get('userChaseId') !== null) {
        views.push(
          <div>
          <div className={styles.lotteryContent}>
            <div>彩种类型：{this.props.orderInfo.get('lotteryName')}</div>
            <div>玩法名称：{this.props.orderInfo.get('playKindName')}</div>
            <div>订单编号：{this.props.orderInfo.get('id')}</div>
            <div>追号期数：{this.props.orderInfo.get('userbetRecordDetailList') ? this.props.orderInfo.get('userbetRecordDetailList').count() : 0}</div>
            <div>投注时间：{this.props.orderInfo.get('time') ?  moment(this.props.orderInfo.get('time')).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            <div>奖金模式：{this.props.orderInfo.get('bonusType')}</div>
            <div>投注模式：{this.props.orderInfo.get('userbetRecordDetailList') ? singleMoney[this.props.orderInfo.get('userbetRecordDetailList').toJS()[0].singleMoney] : ''}</div>
            <div>单倍注数：{this.getTouZhuInfo()[0]}</div>
            <div>投注倍数：{this.getTouZhuInfo()[1]}</div>
            <div>中奖停止：{this.props.orderInfo.get('winEnd')}</div>
            <div>投注总额：{this.props.orderInfo.get('total')}</div>
            <div>中奖金额：{this.props.orderInfo.get('awardMoney')}</div>
            <div>状态：{this.props.orderInfo.get('status')}</div>
          </div>
          <div className={styles.lotteryDetails}>
            <div className={styles.lotteryDetailsTitle}>
              投注内容
            </div>
            <div className={styles.lotteryDetailsContent}>
              {this.props.orderInfo.get('detail')}
            </div>
          </div>
          {this.props.orderInfo.get('userbetRecordDetailList') ?
          <div className={styles.lotteryDetails}>
            <table cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th width="20%">追号期号</th>
                  <th width="23%">开奖</th>
                  <th width="10%">订单状态</th>
                  <th width="10%">投注倍数</th>
                  <th width="14%">购买金额</th>
                  <th width="14%">中奖金额</th>
                  <th width="10%">操作</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable(this.props.orderInfo.get('userbetRecordDetailList'))}
              </tbody>
            </table>
          </div> : ''}
            <div className={styles.revokeFooter}>
              <div
                onClick={() => {
                  if(this.checkedBackBetList()) {
                    LotteryAction.addBackBet(this.props.backBetList);
                  }
                }}
                className={ this.checkedBackBetList() ? styles.revokeButton : styles.disRevokeButton }
              >撤&nbsp;销</div>
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
