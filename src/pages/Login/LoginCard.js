import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import * as UserAction from '../../actions/UserAction';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
const errImg = require('../../assets/images/error.png');
const see = require('../../assets/images/login-look.png');
const noSee = require('../../assets/images/noSee.png');
const usernameIcon = require('../../assets/images/username.png');
const passwordIcon = require('../../assets/images/password.png');


const FormItem = Form.Item;

class LoginCard extends React.PureComponent {
  static propTypes = {
    errMsg: PropTypes.string,
    form: PropTypes.any,
    dispatch: PropTypes.func,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
    };
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      } else {
        // alert('no errors');
        const params = {
          name: this.props.form.getFieldsValue().userName,
          pwd: this.props.form.getFieldsValue().password,
        };
        UserAction.login(params);
        // setTimeout(() => UserAction.login(params), 500);
      }
    });
  }
  // const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$";
  render() {
    const { getFieldDecorator } = this.props.form;
    // 验证用户名是否存在
    const userValidate = (rule, value, callback) => {
      if (!value) {
        callback([new Error('用户名不能为空')]);
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if (!reg.test(value)) {
          callback([new Error('只能使用字母和数字，长度在6-12个字符之间')]);
        }
        callback([]);
      }
    };
    return (
      <div className={styles.LoginCard}>
        <div className={styles.LoginCardHeader}>
           用户登录LOGIN
        </div>
        <div className={styles.LoginCardHeaderLine} />
        <div className={styles.LoginForm}>
          <Form className="login-form" onSubmit={(e) => this._handleSubmit(e)} style={{ width: 310, margin: '0 auto'}}>
            {this.props.errMsg ?
            <div className={styles.error}><img src={errImg} width="18" /><div>&nbsp;{this.props.errMsg}</div></div>
          : <div className={styles.error} /> }
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                      { validator: userValidate },
                ],
                trigger: ['onBlur', 'onChange'],
              })(
                <Input prefix={<img src={usernameIcon} style={{ width: '17' }} />} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写你的密码!' }],
              })(
                <Input prefix={<img src={passwordIcon} style={{ width: '17' }} />}
                   type={this.state.type ? 'password' : 'text'}
                   suffix={
                     <img src={this.state.type ? noSee : see}
                      onClick={() => {
                        const type = this.state.type;
                        this.setState({ type: !type });
                      }}
                     />
                   }
                />
              )}
            </FormItem>
            <FormItem>
              <div style={{ textAlign: 'right', cursor: 'pointer', fontSize: '14px', margin: '-20px 0 8px 0' }} onClick={() => {
                this.props.dispatch(push('/find-password'));
              }}>忘记密码？</div>
              <Button htmlType="submit" className={styles.loginButton}>
                登 录
              </Button>
            </FormItem>
         </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginCard);
