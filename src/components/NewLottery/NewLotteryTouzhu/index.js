import React, { PropTypes } from 'react';
import { Input, Modal } from 'antd';
import * as NewLotteryAction from '../../../actions/NewLotteryAction';
import Immutable from 'immutable';
import styles from './styles.css';

export default class NewLotteryTouZhu extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      touZhuMoney: '',
      visible: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.playKindId !== nextProps.playKindId &&  nextProps.playKindId) {
      this.setState({touZhuMoney: ''});
    }
  }
  changeMoney(money) {
    let touZhuMoney = this.state.touZhuMoney;
    this.setState({ touZhuMoney: Number(touZhuMoney) + money });
  }
  touZhuAction() {
    if(!this.state.touZhuMoney || !this.props.touzhuDetail.length) {
      alert('请先选号或填写金额！');
      return false;
    }
    this.setState({ visible: true });
  }
  submitAction() {
    NewLotteryAction.hongKongTouzhu({
      singleMoney: this.state.touZhuMoney,
      playKindId: this.props.playKindId, // 那种玩法
      detail: this.props.touzhuDetail.join('-'), // 选择的号码
      expect: this.props.openExpect, //当前期数
    });
    this.setState({ touZhuMoney: '', visible: false });
  }
  cancelAction() {
    this.setState({ touZhuMoney: '', visible: false });
    NewLotteryAction.xiaZhuNumber({numbers: []});
  }
  render() {
    const touZhuMoney = this.state.touZhuMoney;
    const keyinMoney = () => {
      const peilv = [];
      [...this.props.hongKongTeMa.toJS(), ...this.props.hongKongTwoSide.toJS()].map((item) => {
        if(this.props.touzhuDetail.indexOf(item.number) !== -1 || this.props.touzhuDetail.indexOf(`0${item.number}`.substr(-2)) !== -1) {
          peilv.push(`${item.bonus}`);
        }
      });
      peilv.sort(function (x,y) {
          return y-x;
      });
      return peilv[0] && (parseFloat(peilv[0])*touZhuMoney).toFixed(3);
    }
  
    return (
      <div className={styles.newLotteryTouZhu}>
         <div className={styles.newLotteryTouZhu1}>
            <div className={styles.content}>
               <div>可用余额：</div>
               <div>￥{this.props.useMoney && this.props.useMoney.toFixed(3)}</div>
            </div>
            <div className={styles.content}>
               <div>下注金额</div>
               <div>
                  <input value={touZhuMoney} 
                     onChange={(e) => {
                       const value = e.target.value;
                       if(!isNaN(Number(value))) {
                         this.setState({ touZhuMoney: value })
                       }
                     }}
                     style={{ width:140,height:28}}/>
                </div>
            </div>
            <div className={styles.contents}>
               <div className={styles.content1} onClick={() => this.changeMoney(5)}>5</div>
               <div className={styles.content2} onClick={() => this.changeMoney(10)}>10</div>
               <div className={styles.content3} onClick={() => this.changeMoney(50)}>50</div>
               <div className={styles.content4} onClick={() => this.changeMoney(100)}>100</div>
               <div className={styles.content5} onClick={() => this.changeMoney(500)}>500</div>
            </div>
            <div className={styles.content}>
               <div>合计金额：</div>
               <div>￥{touZhuMoney && (touZhuMoney * this.props.touzhuDetail.length).toFixed(3)}</div>
            </div>
            <div className={styles.content}>
               <div>可赢金额：</div>
               <div>￥{keyinMoney()}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.submitButton} onClick={() => this.touZhuAction()}>确&nbsp;认</div>
              <div className={styles.calButton} onClick={() => this.cancelAction()}>取&nbsp;消</div>
            </div>
         </div>
         <div className={styles.newLotteryTouZhu2}>
             <div className={styles.content}>
                <div>下注限额：</div>
                <div>￥{this.props.playKind.get('maxBonus') && this.props.playKind.get('maxBonus').toFixed(3)}</div>
             </div>
             <div className={styles.content}>
                <div>下注总额：</div>
                <div>￥{touZhuMoney && (touZhuMoney * this.props.touzhuDetail.length).toFixed(3)}</div>
             </div>
         </div>
         {/* 确认投注提示  **/}
         <Modal
            visible={this.state.visible}
            onCancel={() => {
              this.setState({ visible: false });
            }}
            footer={null}
            style={{ marginTop: '130px' }}
          >
              <div style={{ padding: '20px'}}>
                <p style={{ fontSize: '20px', color: '#999', marginBottom: '5px' }}>友情提示: </p>
                <div style={{ border: '1px dashed #ccc', marginBottom: '5px' }}/>
                <p style={{ fontSize: '15px', padding: '15px'}}>
                  投注期数：<span style={{ color: 'red' }}>{this.props.openExpect}</span><br />
                  总投注金额为：<span style={{ color: 'red' }}>￥{touZhuMoney && (touZhuMoney * this.props.touzhuDetail.length).toFixed(3)}</span>
                </p>
                
                <div className={styles.buttons}>
                  <div
                      onClick={() => {
                        this.cancelAction();
                      }}
                      style={{ marginRight: '30px' }}
                      className={styles.calButton}
                  >取消投注</div>
                  <div
                      onClick={() => {
                        this.submitAction();
                      }}
                      className={styles.submitButton}
                  >确认投注</div>
                </div>
              </div>
          </Modal>
      </div>
    );
  }
}
