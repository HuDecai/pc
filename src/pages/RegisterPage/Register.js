import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './styles.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox } from 'antd';
import * as UserAction from '../../actions/UserAction';
const logo = require('../../assets/images/logo.png');
const phone = require('../../assets/images/login-phone.png');
const custom = require('../../assets/images/login-custom.png');
const register1 = require('../../assets/images/register1.png');
const register2 = require('../../assets/images/register2.png');
const errImg = require('../../assets/images/error.png');
const imgs = [register1, register2];
import Loading from '../../core/decorators/Loading';
import newWindows from '../../core/newWindow';
import Cookies from 'js-cookie';

const FormItem = Form.Item;
var customerWindow = null;

class RegisterPage extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    errMsg: PropTypes.string,
    userInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
    form: PropTypes.any,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      i: 0,
      state1: false,
      state2: false,
      state3: false,
      state4: false,
      codeImg: '',
      yanzhengma1: '',
      code: '',
    };
  }
  componentWillMount() {
    const code = this.props.location.search.split('&')[0].split('=')[1];
    // var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // if(isAndroid || isiOS) {
    //   window.location.replace(`http://mobile.yihe777.com/#/register-page?code=${code}`);
    // }
    this.setImg();
    this.getCode();
    this.setState({ code });
  }
  setImg() {
    const that = this;
    this.interval = setInterval(function(){
      let i = that.state.i;
      that.setState({ i: ++i % 2 });
    },10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _handleSubmit() {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      } else {
        const params = {
          username: this.props.form.getFieldsValue().username,
          password: this.props.form.getFieldsValue().newPassword,
          code: this.state.code,
          vCode: this.state.yanzhengma1,
        };
        UserAction.register(params);
      }
    });
  }
  // 获取验证码
  getCode() {
    var that = this;
    fetch('./code.do',{
      headers: {
       'Content-Type': 'application/json; charset=UTF-8',
       "Accept": "application/json",
     },
     credentials: 'include',
    }).then(function(response) {
      return response.blob();
    }).then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      that.setState({ codeImg: objectURL });
    })
  }
  checkUserName() {
    const userName = this.props.form.getFieldsValue().username;
    if(userName) {
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$";
      if(userName.match(regex)==null){
          this.setState({ state1: true });
          return;
      };
    }
    this.setState({ state1: false });
  }
  checkPassword() {
    const newPassword = this.props.form.getFieldsValue().newPassword;
    if(newPassword) {
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$";
      if(newPassword.match(regex)==null){
          this.setState({ state2: true });
          return;
      };
    }
    this.setState({ state2: false });
  }
  checkTwoPassword() {
    const newPassword = this.props.form.getFieldsValue().newPassword;
    const newPassword1 = this.props.form.getFieldsValue().newPassword1;
    if(newPassword !== newPassword1) {
      this.setState({ state3: true });
      return;
    }
    this.setState({ state3: false });
  }
  checkYanzhengma() {
    const VCode = this.props.checkYanzhengma;
    const yanzhengma1 = this.state.yanzhengma1;
    if(VCode && yanzhengma1 && VCode.toLowerCase() !== yanzhengma1.toLowerCase()){
      this.setState({ state4: true });
      return;
    }
    this.setState({ state4: false });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
      const usernames = Cookies.get('username');
      const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    return (
      <div className={styles.loginContainer}>
        <div
           className={styles.bodyComponent}
           style={{ backgroundImage: `url(${imgs[this.state.i]})`,   backgroundSize: 'cover' }}
        >
           <div style={{ display: 'none' }}>
              <img src={register2} />
              <img src={register1} />
           </div>
           <div className={styles.content}>
               <div className={styles.header}>
                   <div>
                      <img src={logo} width="100%" />
                   </div>
                   <div className={styles.headerRight}>
                        <div
                          onClick={()=>{
                              Cookies.set('cc','');
                              newWindows(kflink, customerWindow);
                          }}
                        >
                           <img src={custom} />
                           <div style={{ color: '#fff', textAlign: 'center', fontSize: '11px', marginTop: '-4px'}}>客服</div>
                        </div>
                        <div style={{ marginLeft: '25px'}}>
                           <img src={phone} />
                           <div style={{ color: '#fff', textAlign: 'center', fontSize: '11px', marginTop: '-4px'}}>手机</div>
                        </div>
                   </div>
               </div>
               <div className={styles.contentBody}>
                   <div className={styles.title}>
                     <div className={styles.titleLeft}>新用户注册</div>
                     <div className={styles.titleRigth}>已有账号？请
                        <span style={{ color: '#e66d78', cursor: 'pointer' }} onClick={() => dispatch(push('./Login'))}>登录</span>
                     </div>
                   </div>
                   <div  style={{ paddingTop: '36px'}}>
                     <Form className="login-form" onSubmit={() => this._handleSubmit()}>
                     {/*用户名*/}
                       <div className={styles.items}>
                          <div className={styles.item1}>用户名&nbsp;<span>*</span></div>
                          <FormItem>
                              {getFieldDecorator('username', {
                                rules: [{ required: true, message: ' '}],
                              })(
                                <Input onBlur={() => this.checkUserName() } />
                              )}
                          </FormItem>
                          {this.state.state1 ? 
                          <div className={styles.errorMeg}>
                             <div><img src={errImg} style={{ width: '18px', margin: '13px 3px 0 0'}}/></div><div>只能使用字母和数字，长度在6-12个字符之间</div>
                          </div> : <div className={styles.normalMeg}>只能使用字母和数字，长度在6-12个字符之间</div> }
                       </div>
                       
                       {/*密码*/}
                       <div className={styles.items}>
                           <div className={styles.item2}>密码&nbsp;<span>*</span></div>
                           <FormItem>
                               {getFieldDecorator('newPassword', {
                                 rules: [{ required: true, message: ' '}],
                               })(
                                 <Input type="password" onBlur={() => this.checkPassword() } />
                               )}
                           </FormItem>
                          {this.state.state2 ? 
                          <div className={styles.errorMeg}>
                             <div><img src={errImg} style={{ width: '18px', margin: '13px 3px 0 0'}}/></div><div>密码长度8-16位，必须包含字母和数字</div>
                          </div> : <div className={styles.normalMeg}>密码长度8-16位，必须包含字母和数字（如：abc123）</div> }
                       </div>
                       
                       {/*确认密码*/}
                       <div className={styles.items}>
                         <div className={styles.item3}>确认密码&nbsp;<span>*</span></div>
                         <FormItem>
                             {getFieldDecorator('newPassword1', {
                               rules: [{ required: true, message: ' '}],
                             })(
                               <Input type="password" onBlur={() => this.checkTwoPassword() }  />
                             )}
                          </FormItem>
                          {this.state.state3 ? 
                          <div className={styles.errorMeg}>
                             <div><img src={errImg} style={{ width: '18px', margin: '13px 3px 0 0'}}/></div><div>两次密码不一致</div>
                          </div> : <div className={styles.normalMeg}>请再次输入密码</div> }
                       </div>
                       
                       {/*验证码*/}
                       <div className={styles.items}>
                         <div className={styles.item4}>验证码&nbsp;<span>*</span></div>
                         <div className={styles.yanzheng}>
                            <div>
                               <input 
                                   style={{ border: '1px solid #d9d9d9', width: '180px', height: '40px', borderRadius: '5px'}}
                                   onBlur={() => this.checkYanzhengma() }
                                   onChange={(e) => this.setState({ yanzhengma1: e.target.value })}
                               />
                            </div>
                            <div style={{ marginLeft: '15px', marginTop: '3px'}}><img src={this.state.codeImg} /></div>
                         </div>
                        <div className={styles.normalMeg}>看不清楚？
                           <span style={{ cursor: 'pointer' }} onClick={() => this.getCode()}>换一张</span>
                        &nbsp;验证码不区分大小写</div> 
                       </div>
                       
                       {/*提交*/}
                       <div className={styles.items}>
                           <Button htmlType="submit" className={styles.passButton}>
                             立 即 注 册
                           </Button>
                       </div>
                     </Form>
                   </div>
               </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(RegisterPage);
