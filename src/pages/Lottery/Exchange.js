import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import copy from 'copy-to-clipboard';
import Immutable from 'immutable';
import styles from './Exchange.css';
import * as LotteryAction from '../../actions/LotteryAction';
const close = require('../../assets/images/duihuan_close.png');

class Exchange extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <Modal
        width={'570px'}
        visible={this.props.visible}
        footer={null}
        maskClosable={false}
        closable={false}
        style={{ marginTop: '15vh' }}
      >
        <div style={{ minHeight: '30vh'}}>
            <div className={styles.duihuanHeader}>
               <div className={styles.duihuanText}>积分兑换</div>
               <div><img src={close} onClick={() => this.props.onChange()}/></div>
            </div>
            <div className={styles.duihuanContent}>
              <div className={styles.duihuanContent1}>累计积分：{this.props.points}&nbsp;&nbsp;&nbsp;&nbsp;(1000兑换1元，以整数兑换)</div>
               {this.props.points >= 1000 ? 
                 <div className={styles.duihuanContent1}>可兑换金额：￥{Math.floor(this.props.points/1000)}</div>
               : <div className={styles.duihuanContent1}>积分不足</div>
               }
              <div className={ this.props.points >= 1000 ? styles.duihuanButton : styles.noDuihuanButton}
                 onClick={() => {
                   if(this.props.points >= 1000) {
                     LotteryAction.pointerToMoney();
                     this.props.onChange();
                   }
                 }}
              >
                 立 即 兑 换
              </div>
            </div>
        </div>
      </Modal>
    );
  }
}

export default Exchange;
