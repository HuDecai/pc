/**
 * Created by hwh on 2017/10/30.
 */

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as FundManagementAction from '../../actions/FundManagementAction'

class WithDrawals extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      selectMoney: '',
      password: '',
      id: '',
    };
  }
  componentWillMount() {
    FundManagementAction.tiXianInit();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.tixianInit.get('todayWithdraw') !== nextProps.tixianInit.get('todayWithdraw')) {
      this.setState({
        selectMoney: '',
        password: '',
        id: '',
      })
    }
  }
  _renderMoneyItems(){
    const views = [];
    const {selectMoney} = this.state
    var moneys = [50000,5000,1000,500,100]
    moneys.map((item,index)=>{
      views.push(
        <div key={index}
           onClick={()=>this.setState({ selectMoney: item })}
           style={{marginLeft:index===0?0:5}}
           className={selectMoney === item ? styles.moneyItemSelect : styles.moneyItemNormal}
        >
          {item}
        </div>
      )
    })
    return views;
  }
  transferAction() {
    const money = parseFloat(this.state.selectMoney);
    const password = this.state.password;
    const id = this.state.id;
    if(!this.props.tixianInit.get('todayWithdraw')) {
      alert('今日提现次数已到上限');
      return false;
    }
    if(!money || money < this.props.tixianInit.get('minMoney') || money > this.props.tixianInit.get('userMoney')) {
      alert('请正确填写提现金额');
      return false;
    }
    if(!id) {
      alert('请选择提现银行卡');
      return false;
    }
    if(!password) {
      alert('请填写密码');
      return false;
    }
    FundManagementAction.tiXian({ money, password, id });
    this.setState({
      selectMoney: '',
      password: '',
      id: '',
    });
  }
  showBankCardList(data) {
    const views = [];
    if(data) {
      data.map((item, key) => {
        views.push(
        <option key={key} value={item.get('id')}
          style={{ width:'304px'}}
          >
            <div>{item.get('attrName')}</div>
            <div>尾号{item.get('card') && item.get('card').slice(-4)}</div>
        </option>);
      })
    }
    return views;
  }
  componentWillUnmount() {
    this.setState({
      selectMoney: '',
      password: '',
      id: '',
    });
  }
  render() {
    return (
        <div className={styles.withContainer}>
            <div className={styles.withCards}>
              <div style={{ marginRight: '5px'}}>提现金额：</div>
              <input
                  name="withdraw_money"

                  style={{height:'40px', width: '304px', padding: '0 5px' ,fontSize:18}}
                 value={this.state.selectMoney}
                 onChange={(e) => this.setState({ selectMoney: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px'}}>
              <div className={styles.withText}><div className={styles.withTextFirst}/>提现金额不能小于&nbsp;<span>{this.props.tixianInit.get('minMoney')}</span></div>
              <div className={styles.withText}><div className={styles.withTextFirst}/>日累计最多提现&nbsp;<span>{this.props.tixianInit.get('maxMoney')}&nbsp;</span>, 今日还可以提现&nbsp;<span>{this.props.tixianInit.get('todayWithdraw')}</span>&nbsp;次</div>
            </div>
            <div className={styles.withCards}>
              <div style={{ marginLeft: '2px', marginRight: '14px'}}>快选金额:</div>
              <div className={styles.quickSelectMoney}>
                   {this._renderMoneyItems()}
              </div>
            </div>
            <div className={styles.withCards}>
              <div style={{ marginLeft: '-14px', marginRight: '6px'}}>提现银行卡：</div>
              <select style={{ width: 304, height: 40 }} value={this.state.id}
                 onChange={(e) => this.setState({ id: e.target.value })}
              >
                <option value={''}>请选择</option>
                {this.showBankCardList(this.props.tixianInit.get('bankLists'))}
              </select>
            </div>
            <div className={styles.withCards}>
               <div style={{ marginRight: '5px'}}>资金密码：</div>
               <input
                  name="safe_pass"
                  type='password' style={{height:'40px', width: '304px' }}
                  name="moneyPwd1"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
               />
            </div>
            <div onClick={()=>this.transferAction()}
               className={styles.submitBtn}
               style={{marginTop:10, marginLeft: '-80px'}}
            >提现申请</div>
        </div>
    );
  }
}

export default WithDrawals;
