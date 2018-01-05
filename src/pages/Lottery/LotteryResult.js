import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './LotteryResult.css';
import { chooseFiveLids } from './core/fanshuiData.js';

export default class LotteryResult extends React.PureComponent {
  static propTypes = {
    lotteryResult: PropTypes.instanceOf(Immutable.Map),
  };
  render() {
    const colors = ['#f2eb0c', '#0092dd', '#4b4b4b','#ff7600','#17e2e5','#5234ff','#b0b0b0','#ff2600','#780b00','#07bf00'];
    const showNum = (result) => {
      const views = [];
      if (result) {
        const resultArr = result.split(',');
        if(this.props.lId == 4 || this.props.lId == 25) {
          resultArr.map((item, key) => {
            views.push(<span style={{ background: `${colors[key]}`}}>{item}</span>);
          });
        }else if(this.props.lId !== 4 && this.props.lId !== 25){
          if(chooseFiveLids.indexOf(Number(this.props.lId)) !== -1 ) {
            resultArr.map((item, key) => {
              views.push(<div style={{ color: '#525252', fontSize: '40px', marginTop: '-15px' }}>{`0${item}`.substr(-2)}</div>);
            });
          }else {
            resultArr.map((item, key) => {
              views.push(<div style={{ color: '#525252', fontSize: '40px', marginTop: '-15px' }}>{item}</div>);
            });
          }
        }
      }
      return views;
    }
    return (
      <div className={styles.lotteryResult}>
        <div className={styles.lotteryResultDesc}>第 {this.props.lotteryResult.get('expect')} 期 开奖结果</div>
        <div className={styles.lotteryResultNumbers}>
          {showNum(this.props.lotteryResult.get('result'))}
        </div>
      </div>
    );
  }
}
