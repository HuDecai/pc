/**
 * Created by hwh on 2017/10/30.
 */

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as FundManagementAction from '../../actions/FundManagementAction'

class Transfer extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      selectMoney: '',
      password: '',
      userName: '',
    };
  }
  componentWillMount() {
    FundManagementAction.getXiajiList();
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
    const userName = this.state.userName;
    if(!money) {
      alert('请填写转账金额');
      return false;
    }
    if(!userName) {
      alert('请选择转出用户');
      return false;
    }
    if(!password) {
      alert('请填写密码');
      return false;
    }
    FundManagementAction.zhuanZhang({ money, password, userName });
    this.setState({
      selectMoney: '',
      password: '',
      userName: '',
    })
  }
  showUserList(xiajiList) {
    const views = [];
    if(xiajiList) {
      xiajiList.map((item, key) => {
        views.push(<option key={key} value={item}>{item}</option>);
      })
    }
    return views;
  }
  componentWillUnmount() {
    this.setState({
      selectMoney: '',
      password: '',
      userName: '',
    })
  }
  render() {
    return (
        <div className={styles.withContainer}>
          <div className={styles.withCards}>
            转账金额：
            <input
               name="trans_money"
               style={{height:'40px', width: '304px', padding: '0 5px',fontSize:18 }}
               value={this.state.selectMoney}
               onChange={(e) => this.setState({ selectMoney: e.target.value })}
            />
          </div>
          <div className={styles.withCards}>
              <div style={{ marginRight: '10px'}}>快选金额:</div>
              <div className={styles.quickSelectMoney}>
                   {this._renderMoneyItems()}
              </div>
          </div>
          <div className={styles.withCards}>
              转出用户：
              <select style={{ width: 304, height: 40 }} value={this.state.userName} 
                 onChange={(e) => this.setState({ userName: e.target.value })}
              >
                <option value={''}>请选择</option>
                {this.showUserList(this.props.xiajiList)}
              </select>
          </div>
          <div className={styles.withCards}>
             资金密码：
             <input
                 name="safe_pass"

                 type='password' style={{height:'40px', width: '304px' }}
                value={this.state.password}
                name="moneyPwd"
                onChange={(e) => this.setState({ password: e.target.value })}
             />
          </div>
          <div onClick={()=>this.transferAction()} 
             className={styles.submitBtn} 
             style={{marginTop:10, marginLeft: '-80px'}}
          >转&nbsp;&nbsp;&nbsp;账</div>  
        </div>
    );
  }
}

export default Transfer;
