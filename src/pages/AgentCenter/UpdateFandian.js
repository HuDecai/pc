import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import Immutable from 'immutable';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
const close = require('../../assets/images/tuiguang-close.png');
import { changeFandian } from './common/changFandian';

class UpdateFandian extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      rebate: '',
      water: '',
    };
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
  addUserAction() {
    const params = {
      rebate: this.state.rebate ? changeFandian(this.state.rebate) : changeFandian(this.props.item.get('rebate')),
      water: this.state.water || this.props.item.get('hk_water'),
      id: this.props.item.get('id'),
    }
    AgentCenterAction.updateLowerFandian({params, searchData: this.props.searchData});
    this.props.changeAction();
  }
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
                <div className={styles.modalTitle}>修改下级返点</div>
                <div style={{ marginTop: '-5px'}}><img src={close} onClick={() => this.props.changeAction()}/></div>
            </div>
            <div className={styles.modalLine} />
            <div className={styles.userModalContent}>
              <div style={{ color: '#de3c4b', fontSize: '11px', margin: '-11px 0 0 90px', height: '13px'}}>{this.state.errMsg}</div>
              <div style={{ marginLeft: '56px'}}>账号:&nbsp; <span>{this.props.item.get('username')}</span>
              </div>
              <div style={{ marginLeft: '28px'}}>彩票返点:&nbsp;
                 <select style={{ width: '190px', height: '32px'}} 
                   value={this.state.rebate || this.props.item.get('rebate')}
                   onChange={(e) => this.setState({ rebate: e.target.value}) } 
                 >
                    {this.showOption(this.props.caiPiaoFandian)}
                 </select>
              </div>
              <div style={{ marginLeft: '15px'}}>香港彩返点:&nbsp;
                 <select style={{ width: '190px', height: '32px'}} 
                   value={this.state.water || this.props.item.get('hk_water')}
                   onChange={(e) => {
                     this.setState({ water: e.target.value})
                   }} 
                 >
                    {this.showOption(this.props.hongKongCaiPiaoFandian)}
                 </select>
              </div>
              <div className={styles.userModalBottons}>
                  <div
                     className={styles.userModalBotton1}
                     onClick={() => this.addUserAction()}
                  >确定</div>
                  <div
                    className={styles.userModalBotton2}
                    onClick={() => this.props.changeAction()}
                  >取消</div>
              </div>
              
            </div>
        </div>
      </Modal>
    );
  }
}

export default UpdateFandian;
