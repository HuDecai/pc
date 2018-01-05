// 投注单位倍数

import React from 'react';
import { Select, Button, InputNumber, Icon, Modal, message } from 'antd';
import styles from './LotteryOrder.css';
import ConfirmBet from './ConfirmBet';
import countNumbers from './core/countNumbers';
import checkNumbers from './core/checkNumbers';
import { addPickData, deleteNthPickData, updateBeiShu, updateMoshi, updateMode } from '../../actions/LotteryAction';
import { danshiId } from './core/fanshuiData.js';
const Option = Select.Option;

class LotteryOrder extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      optionValue: 0,
      optionName: '',
      linshiMoney: null,
      mode: 0,
    };
  }
  componentWillMount() {
    const percentage = this.props.percentage;
    if(percentage.toJS().length) {
      this.setState({ mode: percentage.toJS()[1].value, optionValue: percentage.toJS()[1].value, optionName:  percentage.toJS()[1].name})
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.percentage !== nextProps.percentage && nextProps.percentage.toJS().length) {
      const percentage = nextProps.percentage;
      this.setState({ mode: percentage.toJS()[1].value, optionValue: percentage.toJS()[1].value, optionName:  percentage.toJS()[1].name})
    }
  }
  changeSingleMoney() {
    const linshiMoney = this.state.linshiMoney;
    // 清空选号列表
    deleteNthPickData(-1);
    this.setState({ visible:false });
    updateMoshi({ singleMoney: linshiMoney });
  }
  render() {
    const showOption = (percentage, currentOption) => {
      const views = [];
      if(percentage) {
        percentage.map((item) => {
          if(item.get('value') != currentOption) {
            views.push(<Option value={`${item.get('value')},${item.get('name')}`}>{item.get('name')}</Option>)
          }
        })
      }
      return views;
    }
    const playKindId = this.props.playKind.get('id');
    const exp = countNumbers(this.props.selectLotteryNumbers, Number(playKindId));
    const lId = Number(this.props.lId);
    let buttonColor = null;
    if([2,5,13,14,19,20,24].indexOf(lId) !== -1) {
      buttonColor = styles.lotteryOrderUnitChange1;
    }else if([4,25].indexOf(lId) !== -1) {
      buttonColor = styles.lotteryOrderUnitChange2;
    }else if([7,9,10,26].indexOf(lId) !== -1) {
      buttonColor = styles.lotteryOrderUnitChange3;
    }else if([11,12].indexOf(lId) !== -1) {
      buttonColor = styles.lotteryOrderUnitChange4;
    }
    return (
      <div>
      <div className={styles.lotteryOrder}>
        <div className={styles.lotteryOrderSelect}>
          <Select value={this.state.optionName} destyle={{ width: 120 }}
             onSelect={(value) => {
               const valueArr = value.split(',');
               this.setState({ mode: valueArr[0], optionValue: valueArr[0], optionName: valueArr[1]})
               // 修改mode
               updateMode({ mode: valueArr[0] });
             }}
          >
            {showOption(this.props.percentage, this.state.optionValue)}
          </Select>
          <div style={{ marginLeft: '2px'}}>
            <span className={ this.props.singleMoney == 2 ? buttonColor : styles.lotteryOrderUnit}
               onClick={() => { this.setState({ linshiMoney: 2, visible: true })}}
            >
            元</span>
            <span className={ this.props.singleMoney == 0.2 ? buttonColor : styles.lotteryOrderUnit}
               onClick={() => { this.setState({ linshiMoney: 0.2, visible: true })}}
            >
            角</span>
            <span className={ this.props.singleMoney == 0.02? buttonColor : styles.lotteryOrderUnit}
                onClick={() => { this.setState({ linshiMoney: 0.02, visible: true })}}
            >
            分</span>
          </div>
        </div>
        {
          danshiId.indexOf(Number(playKindId)) !== -1 ?
          <div className={styles.lotteryOrderExp} /> :
          <div className={styles.lotteryOrderExp}>
             {exp}注 ,共 {(exp * this.props.singleMoney).toFixed(3)} 元
          </div>
        }
        <div className={styles.lotteryOrderMultiple}>
        倍数&nbsp;
           <input value={this.props.beishu}
             onChange={(e) => {
               if(e.target.value > 100000 || e.target.value < 0 ||  e.target.value === '0') {
                 updateBeiShu({ beishu: 1 });
               }else {
                 // 将倍数放在reducer中
                 updateBeiShu({ beishu: e.target.value  });
               }
             }}
             onBlur={() => {
               if(!this.props.beishu || this.props.beishu == 0) {
                 updateBeiShu({ beishu: 1 });
               }
             }}
             style={{ height: '28px', width: '60px', padding: '0 5px' }}
             className={styles.beishuInput}
           />
        </div>
        <div>
          <span
              onClick={() => {
                deleteNthPickData(-1);
              }}
              className={styles.clearButton}
              // style={{ fontSize: '14px', marginRight: '5px' }}
          ><Icon type="close-circle" style={{marginRight: 3, color: "#353535"}} />清空</span>
          <span
              onClick={() => {
                const playKind = this.props.playKind;
                const playKindId = this.props.playKind.get('id');
                const playCateId = this.props.playKind.get('playCateId');
                const name = this.props.playKind.get('name');
                const beishu = this.props.beishu;
                if (!exp) {
                  alert('号码有误,请检查并重新输入');
                } else if (checkNumbers(this.props.selectLotteryNumbers, playKindId, true)) {
                  addPickData({
                    way: name,
                    playId: playCateId,
                    playKindId: playKindId,
                    number: this.props.selectLotteryNumbers,
                    bet: exp,
                    beishu: Number(this.props.beishu) ? this.props.beishu : 1,
                    mode: this.state.mode,
                    bonus: playKind.get('bonus'),
                    leaveBonus: playKind.get('leaveBonus'),
                  });
                }
              }}
              className={styles.clearButton}
              style={{ width: 90 }}
          ><Icon type="check-circle" style={{marginRight: 3, color: "#353535"}}/>确认选号</span>
        </div>
      </div>
      <ConfirmBet
          profit={this.props.todyProfit}
          optionValue={this.state.optionValue}
          singleMoney={this.props.singleMoney}
          pickDataList={this.props.pickDataList}
          currentLotteryExpect={this.props.currentLotteryExpect}
          lId={this.props.lId}
          mode={this.props.mode}
          beishu={this.props.beishu}
          zhuihaoQishuList={this.props.zhuihaoQishuList}
      />
      <Modal
         visible={this.state.visible}
         footer={null}
         closable={false}
         style={{ marginTop: '130px' }}
       >
           <div style={{ padding: '20px'}}>
             <p style={{ fontSize: '20px', color: 'red', marginBottom: '5px' }}>友情提示: </p>
             <div style={{ border: '1px dashed #ccc', marginBottom: '5px' }}/>
             <p style={{ fontSize: '16px', textAlign: 'center'}}>改变元角分模式将清空已选择的号码。</p>
             <p style={{ fontSize: '16px', textAlign: 'center', marginTop: '5px' }}>请问要继续吗？</p>
             <div className={styles.buttons}>
               <div
                   onClick={() => {
                     this.setState({ visible: false });
                   }}
                   className={styles.calButton}
               >取消</div>
               <div
                   onClick={() => {
                     this.changeSingleMoney();
                   }}
                   className={styles.submitButton}
               >确认</div>
             </div>
           </div>
       </Modal>
      </div>
    );
  }
}

export default LotteryOrder;
