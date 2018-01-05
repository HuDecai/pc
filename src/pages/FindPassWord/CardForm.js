import React, { PropTypes } from 'react';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Col } from 'antd';
const errImg = require('../../assets/images/error.png');

const FormItem = Form.Item;

class CardForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.any,
    submitAction: PropTypes.func,
    step: PropTypes.number,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      status: 0,
      message: '',
    };
  }
  _handleSubmit() {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const newPassword = this.props.form.getFieldsValue().newPassword;
      const newPassword1 = this.props.form.getFieldsValue().newPassword1;
      // 判断两次输入密码是否正确
      if(newPassword !== newPassword1) {
        this.setState({ status: 1, message: '两次密码不一致' });
        return;
      }
      this.setState({ status: 0, message: '' });
      const params = {
        ques1: this.props.passWordInfo.get('ques1'),
        ques2: this.props.passWordInfo.get('ques2'),
        answerOne: this.props.passWordInfo.get('answerOne'),
        answerTwo: this.props.passWordInfo.get('answerTwo'),
        username: this.props.passWordInfo.get('username'),
        safePassw: this.props.passWordInfo.get('safePassw'),
        newPassword,
        step: this.props.step,
      };
      this.props.submitAction(params);
    });
  }
  getNewPassword() {
    const newPassword = this.props.form.getFieldsValue().newPassword;
    if(newPassword) {
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{12,}$";
      if(newPassword.match(regex)==null){
          this.setState({ status: 1, message: '密码需至少12位 包含数字和字母' });
          return;
      };
    }
    this.setState({ status: 0, message: '' });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.LoginCard}>
        <div className={styles.LoginForm}>
          <Form className="login-form" onSubmit={() => this._handleSubmit()}>
            <div>
              <Col span={8} offset={8} style={{height: '70px'}}>
                  <div className={styles.labelText}>请输入新密码</div>
                  <FormItem>
                    {getFieldDecorator('newPassword', {
                      rules: [{ required: true, message: ' '}],
                    })(
                      <Input type="password" onBlur={() => this.getNewPassword() }/>
                    )}
                  </FormItem>
              </Col>
              {this.state.status ? 
              <div className={styles.errorMeg}>
                 <div><img src={errImg} style={{ width: '18px', margin: '3px 3px 0 0'}}/></div><div>{this.state.message}</div>
              </div> : <div /> }
            </div>
            <Col span={8} offset={8}>
                <div className={styles.labelText}>请再次输入新密码</div>
                <FormItem>
                  {getFieldDecorator('newPassword1', {
                    rules: [{ required: true, message: ' '}],
                  })(
                    <Input type="password" />
                  )}
                </FormItem>
            </Col>
            <Col span={8} offset={8}>
                <Button htmlType="submit" className={styles.passButton}>
                  提交
                </Button>
            </Col>
         </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(CardForm);
