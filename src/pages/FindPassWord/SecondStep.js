import React, { PropTypes } from 'react';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Icon, Col } from 'antd';
import Immutable from 'immutable';

const FormItem = Form.Item;

class SecondStep extends React.PureComponent {
  static propTypes = {
    form: PropTypes.any,
    passWordInfo: PropTypes.instanceOf(Immutable.Map),
    submitAction: PropTypes.func,
  };
  _handleSubmit() {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const params = {
        username: this.props.passWordInfo.get('username'),
        ques1: this.props.passWordInfo.get('ques1'),
        ques2: this.props.passWordInfo.get('ques2'),
        answerOne: this.props.form.getFieldsValue().answerOne,
        answerTwo: this.props.form.getFieldsValue().answerTwo,
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
                <div className={styles.labelText}>问题一: {this.props.passWordInfo.get('ques1')}</div>
                <FormItem>
                  {getFieldDecorator('answerOne', {
                    rules: [{ required: true, message: ' ' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
            </Col>
            <Col span={8} offset={8}>
                <div className={styles.labelText}>问题二: {this.props.passWordInfo.get('ques2')}</div>
                <FormItem>
                  {getFieldDecorator('answerTwo', {
                    rules: [{ required: true, message: ' ' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
            </Col>
            <Col span={8} offset={8}>
                <Button htmlType="submit" className={styles.passButton}>
                  下一步
                </Button>
            </Col>
         </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(SecondStep);
