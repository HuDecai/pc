import React, { PropTypes } from 'react';
import * as NewLotteryAction from '../../../actions/NewLotteryAction';
import Immutable from 'immutable';
import styles from './styles.css';
const HongBo = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46];
const LanBo = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
const LvBo = [5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49];

export default class NewLotteryResult extends React.PureComponent {
  getResult(expect) {
    NewLotteryAction.getNewLotteryResult({ lId: this.props.lotteryResult.get('lId'), expect });
  }
  getNumberStyle(number) {
    let Styles = null;
    if(HongBo.indexOf(number) !== -1) {
      Styles = styles.ballOne;
    }else if(LanBo.indexOf(number) !== -1) {
      Styles= styles.ballThree;
    }else if(LvBo.indexOf(number) !== -1) {
      Styles= styles.ballTwo;
    }
    return Styles;
  }
  render() {
    const getNumber =(number) => {
      return `0${number}`.substr(-2);
    }
    const showNum = (result) => {
      const views = [];
      if (result) {
        const resultArr = result.split(',');
        const tema = resultArr.pop();
        resultArr.map((item, key) => {
          const items = item.split('-');
          const Styles = this.getNumberStyle(Number(items[0]));
          views.push(
            <div className={styles.resultCard}>
               <div className={Styles}>{getNumber(items[0])}</div>
               <div className={styles.cardBottom}>{items[1]}</div>
            </div>
          );
        });
        
        views.push(<div style={{ marginTop: '-20px', fontSize: '18px', fontWeight: 'blod' }}>+</div>);
        // 特码
        const temas = tema.split('-');
        const Styles = this.getNumberStyle(Number(temas[0]));
        views.push(
          <div className={styles.resultCard}>
             <div className={Styles}>{getNumber(temas[0])}</div>
             <div className={styles.cardBottom}>{temas[1]}</div>
          </div>
        );
      }
      return views;
    }
    const expect = this.props.lotteryResult.get('expect');
    return (
      <div className={styles.lotteryResult}>
        <div className={styles.lotteryResultDesc}>第 {expect} 期 开奖结果</div>
        <div className={styles.lotteryResultNumbers}>
          {showNum(this.props.lotteryResult.get('result'))}
        </div>
        <div className={styles.lotteryResultBottom}>
          <div onClick={() => {
            const index = this.props.lotteryResultExpectList.toJS().indexOf(expect);
            if(index !== -1 && index !== this.props.lotteryResultExpectList.toJS().length-1) {
              const data = this.props.lotteryResultExpectList.toJS()[index+1];
              this.getResult(data);
            }else {
              this.getResult(expect-1);
            }
            
          }}>上一期</div>
          <div onClick={() => {
            const index = this.props.lotteryResultExpectList.toJS().indexOf(expect);
            if(index !== -1 && index !== 0) {
              const data = this.props.lotteryResultExpectList.toJS()[index-1];
              this.getResult(data);
            }else {
              this.getResult(Number(expect)+1);
            }
          }}>下一期</div>
        </div>
      </div>
    );
  }
}
