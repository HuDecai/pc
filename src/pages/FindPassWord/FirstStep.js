import React, { PropTypes } from 'react';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Col } from 'antd';
const see = require('../../assets/images/login-look.png');
const noSee = require('../../assets/images/noSee.png');

const FormItem = Form.Item;

class FirstStep extends React.PureComponent {
  static propTypes = {
    errMsg: PropTypes.string,
    form: PropTypes.any,
    changeAction: PropTypes.func,
    submitAction: PropTypes.func,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
    };
  }
  _handleSubmit() {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const params = {
        username: this.props.form.getFieldsValue().userName,
        safePassw: this.props.form.getFieldsValue().safePassw,
        step: this.props.step,
      };
      this.props.submitAction(params);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.LoginCard}>
        <div className={styles.LoginForm}>
          <Form className="login-form" onSubmit={() => this._handleSubmit()}>
            <Col span={8} offset={8} style={{height: '70px'}}>
                <div className={styles.labelText}>请输入登录账号</div>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: ' ' }],
                  })(
                    <Input />
                  )}
                </FormItem>
            </Col>
            <Col span={8} offset={8}>
                <div className={styles.labelText}>请输入资金密码</div>
                <FormItem>
                  {getFieldDecorator('safePassw', {
                    rules: [{ required: true, message: ' ' }],
                  })(
                    <Input
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
            </Col>
            <Col span={8} offset={8}>
                <Button htmlType="submit" className={styles.passButton}>
                  下 一 步
                </Button>
            </Col>
         </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(FirstStep);
