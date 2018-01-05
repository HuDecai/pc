import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as NewLotteryAction from '../../../actions/NewLotteryAction';
import styles from './Weishu.css';
const HongBo = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46];
const LanBo = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
const LvBo = [5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49];

export default class Weishu extends React.PureComponent {
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
  getNumber(number){
    return `0${number}`.substr(-2);
  }
  render() {
    const zodiac = this.props.zodiac;
    const weiZodiac = this.props.weiZodiac;
    const showNumber = (name) => {
      let views = [];
      if(name) {
        zodiac.map((item, key) => {
          if(name == key) {
            item.sort(function(a, b) {return a-b }).map((number, key) => {
              let Styles = null;
              if(HongBo.indexOf(Number(number)) !== -1) {
                Styles = styles.ballOne;
              }else if(LanBo.indexOf(Number(number)) !== -1) {
                Styles= styles.ballThree;
              }else if(LvBo.indexOf(Number(number)) !== -1) {
                Styles= styles.ballTwo;
              }
              
              views.push(<div className={Styles} key={key}>{this.getNumber(number)}</div>)
            })
          }
        })
      } 
      return views;
    }
    const showTwoSidesCard = (hongKongWeishu, type) => {
      const views = [];
      if(hongKongWeishu) {
         if(type == 1) {
           hongKongWeishu.map((item, key) => {
             if(item.get('number') < 93) {
               views.push(
                 <div 
                   key={key}
                   onClick={() => { this.changeState(item.get('number')) }}
                   className={ this.props.touzhuDetail.indexOf(item.get('number')) !== -1 ? styles.selectPlayContentCard : styles.playContentCard}
                 >
                    <div className={styles.leftCard}>
                       <div>{item.get('name').substr(item.get('name').length-1,1)}</div>
                       <div className={styles.leftCard}>{showNumber(item.get('name').substr(item.get('name').length-1,1))}</div>
                    </div>
                    <div>{item.get('bonus')}</div>
                 </div>
               )
             }
           })
         }
         if(type === 2) {
           hongKongWeishu.map((item, key) => {
             if(item.get('number') >= 93) {
               views.push(
                 <div 
                   key={key}
                   onClick={() => { this.changeState(item.get('number')) }}
                   className={ this.props.touzhuDetail.indexOf(item.get('number')) !== -1 ? styles.selectPlayContentCard1 : styles.playContentCard1}
                 >
                    <div>{item.get('name').substr(item.get('name').length-2,2)}</div>
                    <div>{item.get('bonus')}</div>
                 </div>
               )
             }
           })
         }
      }
      return views;
    }
    return (
      <div>
          <div className={styles.playContent}>
             {showTwoSidesCard(this.props.hongKongWeishu, 1)}
          </div>
          <div className={styles.playContent} style={{ marginTop: '20px' }}>
             {showTwoSidesCard(this.props.hongKongWeishu, 2)}
          </div>
      </div>
    );
  }
}
