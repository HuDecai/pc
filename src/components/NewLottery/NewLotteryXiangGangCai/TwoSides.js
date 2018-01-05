import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as NewLotteryAction from '../../../actions/NewLotteryAction';
import styles from './TwoSides.css';

export default class NewLotteryHongLan extends React.PureComponent {
  remove(val) {
    const status = this.props.touzhuDetail
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    NewLotteryAction.xiaZhuNumber({numbers: [...status]});
  }
  changeState(value) {
    if(this.props.touzhuDetail.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.props.touzhuDetail, value].sort();
      NewLotteryAction.xiaZhuNumber({numbers: status });
    }
  }
  render() {
    const showTwoSidesCard = (hongKongTwoSide) => {
      const views = [];
      if(hongKongTwoSide) {
        hongKongTwoSide.map((item, key) => {
          if(['红波', '蓝波', '绿波'].indexOf(item.get('name')) === -1) {
            views.push(
              <div 
                key={key}
                onClick={() => { this.changeState(item.get('number')) }}
                className={ this.props.touzhuDetail.indexOf(item.get('number')) !== -1 ? styles.selectPlayContentCard : styles.playContentCard}
              >
                 <div>{item.get('name')}</div>
                 <div>{item.get('bonus')}</div>
              </div>
            )
          } else {
            views.push(
              <div onClick={() => { this.changeState(item.get('number')) }} 
              className={ this.props.touzhuDetail.indexOf(item.get('number')) !== -1 ? styles.selectPlayContentCard1 : styles.playContentCard1}
              >
                <div>{item.get('name')}</div>
                <div>{item.get('bonus')}</div>
              </div>
            )
          }
          
        })
      }
      return views;
    }
    return (
      <div>
          <div className={styles.playContent}>
             {showTwoSidesCard(this.props.hongKongTwoSide)}
          </div>
      </div>
    );
  }
}
