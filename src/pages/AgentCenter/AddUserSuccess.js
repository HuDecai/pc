import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import Immutable from 'immutable';
const styles = require('./styles.css');
const close = require('../../assets/images/tuiguang-close.png');

class AddUserSuccess extends React.PureComponent {
  render() {
    return (
      <Modal
        width={'580px'}
        visible={this.props.visible}
        footer={null}
        maskClosable={false}
        closable={false}
        style={{ marginTop: '15vh' }}
      >
        <div style={{ minHeight: '30vh'}}>
            <div className={styles.modalHeader}>
                <div className={styles.modalTitle}>成功添加会员</div>
                <div style={{ marginTop: '-5px'}}><img src={close} onClick={() => this.props.closeAction()}/></div>
            </div>
            <div className={styles.modalLine} />
            <div className={styles.successModalContent}>
                <div style={{ margin: '77px 0 30px'}}>账号： {this.props.addUserName}</div>
                <div className={styles.successModalBottons}>
                    <div
                       className={styles.successModalBotton1}
                       onClick={() => { this.props.changeAction() }}
                    >继续添加</div>
                    <div
                      className={styles.userModalBotton1}
                      onClick={() => { this.props.closeAction() }}
                    >关 闭</div>
                </div>
            </div>
        </div>
      </Modal>
    );
  }
}

export default AddUserSuccess;
