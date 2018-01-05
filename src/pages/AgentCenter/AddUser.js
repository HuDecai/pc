import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import Immutable from 'immutable';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
const close = require('../../assets/images/tuiguang-close.png');
import newWindows from '../../core/newWindow';
import Cookies from 'js-cookie';
var customerWindow = null;

class AddUser extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      errMsg: '',
      username: '',
      password: '',
      password1: '',
      rebate: '',
      type: 0,
      hkWater: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isAddUserSuccess !== nextProps.isAddUserSuccess) {
      this.state = {
        errMsg: '',
        username: '',
        password: '',
        password1: '',
        rebate: '',
        type: 0,
        hkWater: '',
      };
    }
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={item.get('value')} key={key}>{item.get('name')}</option>)
      });
    }
    return view;
  }
  checkInfo(type) {
    if(type == 1) {
      // 验证用户名
      const username = this.state.username;
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$";
      if(username.match(regex)==null){
          this.setState({ errMsg: '用户名必须是字母、数字，且长度在6-12位之间' });
          return;
      };
    }
    if(type == 2) {
      // 验证密码
      const password = this.state.password;
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,14}$";
      if(password.match(regex)==null){
          this.setState({ errMsg: '密码必须是6~14位字母、数字、特殊符号组成' });
          return;
      };
    }
    if(type == 3) {
      // 密码是否一致
      const password = this.state.password;
      const password1 = this.state.password1;
      if(password !== password1) {
        this.setState({ errMsg: '密码不一致' });
        return;
      }
    }
    this.setState({ errMsg:'' });
  }
  addUserAction() {
    const params = {
      password: this.state.password,
      username: this.state.username,
      type: this.state.type,
      rebate: this.state.rebate,
      hkWater: this.state.hkWater,
    }
    AgentCenterAction.addUser(params);
  }
  render() {
      const usernames = Cookies.get('username');
      const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
    return (

        <div style={{ minHeight: '30vh'}}>

            <div className={styles.userModalContent}>

                <div className={styles.regTtileh1}>会员注册</div>
                <div className={styles.modalLine} />
                <div className={styles.regUserModalBox}>
              <div style={{ color: '#de3c4b', fontSize: '11px', padding: '0px 0 0 100px', height: '20px'}}>{this.state.errMsg}</div>
              <div>
                  <span className={styles.regtitle}>用户名</span>
                  <input style={{ width: '190px', height: '32px'}}
                     onChange={(e) => this.setState({ username: e.target.value}) }
                     onBlur={() => this.checkInfo(1) }
                     value={this.state.username}
                  />
              </div>
              <div>
                  <span className={styles.regtitle}>密码</span>
                  <input style={{ width: '190px', height: '32px'}}
                    onChange={(e) => this.setState({ password: e.target.value}) }
                     onBlur={() => this.checkInfo(2) }
                     value={this.state.password}
                  />
              </div>
              <div>
                  <span className={styles.regtitle}>确认密码</span>
                  <input style={{ width: '190px', height: '32px'}}
                      onChange={(e) => this.setState({ password1: e.target.value}) }
                      onBlur={() => this.checkInfo(3) }
                      value={this.state.password1}
                  />
              </div>

                <div>
                    <span className={styles.regtitle}>类型</span>
                    <select
                        className={`${styles.addUserSelect} ${styles.regSelectOutline}`}
                        value={this.state.type}
                        onChange={(e) => this.setState({ type: e.target.value })}
                    >
                        <option value={'0'}>会员</option>
                        <option value={'1'}>代理</option>
                    </select>
                </div>

              <div>
                  <span className={styles.regtitle}>彩票返点</span>
                 <select
                   onChange={(e) => this.setState({ rebate: e.target.value}) }
                   value={this.state.rebate}
                   className={`${styles.addUserSelect} ${styles.regSelectOutline}`}
                 >
                    <option value={''}></option>
                    {this.showOption(this.props.caiPiaoFandian)}
                 </select>
              </div>
              <div className={styles.userModalDiv}>
                 <div>
                     <span className={styles.regtitle}>香港彩票返点</span>
                    <select
                      onChange={(e) => this.setState({ hkWater: e.target.value}) }
                      value={this.state.hkWater}
                      className={`${styles.addUserSelect} ${styles.regSelectOutline}`}
                    >
                        <option value={''}></option>
                        {this.showOption(this.props.hongKongCaiPiaoFandian)}
                    </select>
                 </div>
                 <div style={{ marginLeft: '10px', marginTop: '5px'}}
                     onClick={()=>{
                         Cookies.set('cc','');
                         newWindows(kflink, customerWindow);
                     }}
                 >
                    需要帮助？
                    <span style={{ color: '#6daf60', cursor: 'pointer'}}>联系客服</span>
                 </div>
              </div>



              <div className={`${styles.userModalBottons} ${styles.regButn}`}>
                  <div
                     className={`${styles.userModalBotton1}`}
                     onClick={() => this.addUserAction()}
                  >创建下级</div>
                  {/*<div*/}
                    {/*className={styles.userModalBotton2}*/}
                    {/*onClick={() => this.props.changeAction()}*/}
                  {/*>取消</div>*/}
              </div>
                </div>
            </div>
        </div>

    );
  }
}

export default AddUser;
