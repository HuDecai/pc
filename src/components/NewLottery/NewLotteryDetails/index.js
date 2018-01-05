import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './styles.css';
const detailIcon = require('../../../assets/images/new-lottery-left-icon.png');

export default class NewLotteryDetails extends React.PureComponent {
  render() {
    const showDetails = (playKindId) => {
      if(playKindId == 600) {
        return this.props.touzhuDetail.join(',');
      }else if(playKindId == 601) {
        return this.props.twoSidesDetai.join(',');
      }else if(playKindId == 602) {
        return this.props.twoSidesDetai.join(',');
      }
      return '';
    }
    return (
      <div className={styles.lotteryDetails}>
        <div className={styles.lotteryDetailTitle}>
           <div className={styles.lotteryDetailText}>下注详情</div>
        </div>
        <div className={styles.lotteryDetailContent}>
           选择内容：@{showDetails(this.props.playKindId)}
        </div>
      </div>
    );
  }
}
