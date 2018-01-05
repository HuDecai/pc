import React from 'react';
import styles from './style.css';
import moment from 'moment';
import * as LotteryAction from '../../actions/LotteryAction';
import { Input, InputNumber, Table, Checkbox, Button, Modal} from 'antd';
const closeImg = require('../../assets/images/lottery_close.png');
import { changeFandian } from '../../pages/AgentCenter/common/changFandian';
import Cookies from 'js-cookie';

class Additional extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkboxState: true,
      checkItem: 0,
      expect: 1, // 默认期数
      maxExpect: 120, // 最大期数
      beishu: this.props.beishu,
      beishuList: [this.props.beishu],
      totalMoney: 0, // 累计投入
      currentMomey: 0, // 当前投入
      selectExp: this.props.exp, // 当前选中期数
    };
  }
  // 追号
  submitAction() {
    let params = {};
    if(this.state.expect && this.props.pickDataList) {
      this.props.pickDataList.map((item, key) => {
        const expNum = [];
        for(let i=0; i < this.state.expect; i++) {
          expNum.push(
            {
                "exp": `${this.getExp(i)}`,
                "beishu": `${this.state.beishuList[i]}`,
            }
          );
        }
        params[key] = {
            SingleMoney: `${this.props.singleMoneys}`,
            playKind: `${item.get('playKindId')}`, // -------------玩法id
            detail: `${item.get('number')}`, // -------------投注详细
            lId: `${this.props.lId}`, // -------------彩票id
            place: "",
            winEnd: this.state.checkboxState ? 1 : 2,
            mode: `${this.props.mode}`,
            isChase: true,
            expNum: expNum,
        };
      })
    }
    LotteryAction.checkPlayKind(params);
    LotteryAction.deleteNthPickData(-1);
    this.props.cancel();
    this.cancelAction();
  }
  cancelAction() {
    this.setState({
      checkboxState: true,
      checkItem: 0,
      expect: 1, // 默认期数
      maxExpect: 120, // 最大期数
      beishu: this.props.beishu,
      beishuList: [this.props.beishu],
      totalMoney: 0, // 累计投入
      currentMomey: 0, // 当前投入
      selectExp: this.props.exp, // 当前选中期数
    });
    this.props.cancel();
  }
  
  // 显示期数
  getExp(i) {
    const exp = this.props.exp > this.state.selectExp ? this.props.exp : this.state.selectExp;
    let test = '';
    if(exp) {
      const expArr = exp.split('-');
      if(expArr.length === 2) {
        const leg = -expArr[1].length;
        const exp1 = Number(expArr[1]) + Number(i);
        test = `${expArr[0]}-${('0000' + String(exp1)).slice(leg)}`;
      }else {
        const exp1 = Number(expArr[0]) + Number(i);
        test = exp1;
      }
    }
    return test;
  }
  // 设置期数
  setExpect(checkItem, expect) {
    const beishuList = [];
    if(expect) {
      for(let i = 0; i < expect ; i++) {
        beishuList.push(this.state.beishu);
      }
    }
    const currentExpect = expect > this.state.maxExpect ? this.state.maxExpect : expect;
    if(currentExpect !== expect) {
      checkItem = 0;
    }
    this.setState({ checkItem, expect: currentExpect, beishuList })
  }
  // 获取最多可投期数
  getDiffExpect(selectExp, exp) {
    let maxExpect = 120;
    const selectExpArr = selectExp.split('-');
    const expArr = exp.split('-');
    if(expArr.length === 2) {
      maxExpect = 120 - (selectExpArr[1] - expArr[1]);
    }else {
      maxExpect = 120 - (selectExpArr[0] - expArr[0]);
    }
    const expect = this.state.expect > maxExpect ? maxExpect : this.state.expect;
    this.setState({ maxExpect, expect });
  }
  render() {
    const _renderDataSource2 = (expect) => {
      let beishuList = this.state.beishuList;
      const dataSource = [];
      let totalMoney = 0;
      if(expect) {
        if(!this.props.visible && beishuList[0]) {
          this.setState({ beishuList: [] });
          return false;
        }
        if(!beishuList[0] && expect == 1 && this.props.visible) {
          beishuList = [this.props.beishu];
          this.setState({ beishuList: [...beishuList]});
        }
        for(let i = 0; i<expect; i++) {
          const currentMoney = (this.props.singleMoneys * beishuList[i] * this.props.bet).toFixed(3);
          totalMoney = parseFloat(totalMoney) + parseFloat(currentMoney);
          dataSource.push(
            <div key={i} className={styles.tableTrStyle}
               style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : '#fff'}}
            >
              <div  className={styles.tableTrWidth} style={{ marginLeft:20}}>{this.getExp(i)}</div>
              <div  className={styles.tableTrWidth}>
                  <input value={beishuList[i] || 1} onChange={(e) => {
                     const value = e.target.value;
                     const beishuList = this.state.beishuList;
                      if(value > 9999 || value < 0 || value === '0') {
                        beishuList[i] = this.state.beishu;
                        this.setState({beishuList: [...beishuList] });
                        return false;
                      }else {
                        beishuList[i] = value;
                        this.setState({beishuList: [...beishuList] });
                      }
                     }}
                     onBlur={() => {
                       if(!beishuList[i] || beishuList[i] == 0) {
                          const beishuList = this.state.beishuList;
                          beishuList[i] = this.state.beishu;
                          this.setState({beishuList: [...beishuList] });
                       }
                     }}
                    style={{ height: '20px', width: '50px', padding: '0 5px' }}
                    className={styles.beishuInput}
                  />
                 &nbsp;倍
              </div>
              <div  className={styles.tableTrWidth}>{currentMoney}</div>
              <div  className={styles.tableTrWidth}>{totalMoney ? totalMoney.toFixed(3) : totalMoney}</div>
              <div  className={styles.tableTrWidth}>{changeFandian(Cookies.get('rebate'))}</div>
            </div>
          );
        }
        this.setState({ totalMoney });
      }
      return dataSource;
    }
    const showExpList = (expList) => {
      const views =[];
      if(expList) {
        expList.map((item,key) => {
          views.push(<option value={item} key={key}>{item}</option>)
        });
      }
      return views;
    }
    return (
      <div>
        <div className={styles.modalHeader}><div>追号</div>
        <div><img src={closeImg} onClick={() => this.cancelAction() }/></div></div>
      <div style={{ padding: '15px'}}>
        <div className={styles.item1}>
          {`单倍 ${this.props.bet} 注数，购买 ${this.state.expect} 期，合计 ${(this.state.totalMoney).toFixed(3)}`}
        </div>
        <div className={styles.item2}>快速选择:
          <span className={this.state.checkItem == 1 ? styles.checkedItems : styles.items} key="1" onClick={() => this.setExpect(1, 5)}>5期</span>
          <span className={this.state.checkItem == 2 ? styles.checkedItems : styles.items} key="2" onClick={() => this.setExpect(2, 10)}>10期</span>
          <span className={this.state.checkItem == 3 ? styles.checkedItems : styles.items} key="3" onClick={() => this.setExpect(3, 20)}>20期</span>
          <span className={this.state.checkItem == 4 ? styles.checkedItems : styles.items} key="4" onClick={() => this.setExpect(4, 30)}>30期</span>
          <span className={this.state.checkItem == 5 ? styles.checkedItems : styles.items} key="5" onClick={() => this.setExpect(5, 120)}>120期</span>
        </div>
        <div className={styles.item3}>
           <div className={styles.item31}>
               起始期号:
              <select style={{ width: '150px', marginLeft: '15px'}} 
                 value={this.state.selectExp}
                 onChange={(e) => {
                   this.setState({ selectExp: e.target.value, checkItem: 0 });
                   this.getDiffExpect(e.target.value, this.props.exp);
                 }}
              >
                 {showExpList(this.props.zhuihaoQishuList)}
              </select>
          </div>
           <div>
           追号期数: 
           <input value={this.state.expect} onChange={(e) => {
             const value = e.target.value;
             if(value > this.state.maxExpect || value < 0 || value === '0') {
                 this.setExpect(0, 1)
                 return false;
               }else {
                 this.setExpect(0, value)
               }
              }}
              onBlur={() => {
                if(!this.state.expect || this.state.expect == 0) {
                   this.setExpect(0, 1)
                }
              }}
             style={{ height: '28px', width: '60px', padding: '0 5px', marginLeft: '15px' }}
             className={styles.beishuInput}
           />
           &nbsp;期(最多追 120 期)</div>
        </div>
        <div className={styles.item4}>
          <div 
              style={{ display:'flex', backgroundColor: '#d1d1d1',
               height: '30px', fontSize: '12px',
               alignItems: 'center', fontWeight: 'blod' }}
          >
             <div className={styles.tableTrWidth} style={{ marginLeft:20}}>期号</div>
             <div className={styles.tableTrWidth}>倍数</div>
             <div className={styles.tableTrWidth}>当前投入</div>
             <div className={styles.tableTrWidth}>累计投入</div>
             <div className={styles.tableTrWidth}>奖金模式</div>
          </div>
          <div style={{ height: '165px', overflow: 'scroll', border: '1px solid #5b5b5b' }}>
            {_renderDataSource2(this.state.expect)}
          </div>
        </div>
        <div>
          <div className={styles.checkboxText}>
            <Checkbox 
               onChange={() => this.setState({ checkboxState: !this.state.checkboxState})}
               checked={this.state.checkboxState}
            >
                中奖后停止投注 投注多期时，当某期中奖后，自动放弃后面几期操作。
            </Checkbox>
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.confirmButtonRight}
              onClick={() => { this.submitAction()}}
            >确认追号</Button>
            <Button
              className={styles.confirmButtonLeft} 
              onClick={() => { this.cancelAction() }}
            >
               取消追号
            </Button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Additional;
