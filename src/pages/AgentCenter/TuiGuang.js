import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import copy from 'copy-to-clipboard';
import Immutable from 'immutable';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
const close = require('../../assets/images/tuiguang-close.png');

class TuiGuang extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      rebate: this.props.caiPiaoFandianMax,
      type: 0,
      hkWater: this.props.hongKongCaiPiaoFandianMax,
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
  getLinkAction() {
    const rebate = this.state.rebate;
    const type = this.state.type;
    const hkWater = this.state.hkWater;
    const params = {
      rebate,
      type,
      hkWater,
    }
    console.log(!rebate,!hkWater,rebate,hkWater)
    if(!rebate && !hkWater || rebate == 100 && hkWater == 3.0) {
      AgentCenterAction.createNoTuiguangLink(params);

    }else {
      AgentCenterAction.createTuiguangLink(params);

    }
  }
  render() {
    const fandianTuiguangLink = this.props.fandianTuiguangLink;
    const wuFandianTuiguangLink = this.props.wuFandianTuiguangLink;
    const  currVal=fandianTuiguangLink?fandianTuiguangLink:wuFandianTuiguangLink;

      {/*<Modal*/}
          {/*width={'660px'}*/}
          {/*visible={this.props.visible}*/}
          {/*footer={null}*/}
          {/*maskClosable={false}*/}
          {/*closable={false}*/}
          {/*style={{ marginTop: '15vh' }}*/}
      {/*> */}
   {/*</Modal>*/}
    return (

        <div className={styles.tuiBox}>
            {/*<div className={styles.modalHeader}>*/}
                {/*<div className={styles.modalTitle}>推广链接</div>*/}
            <div className={styles.regTtileh1}>推广链接</div>
                {/*<div style={{ marginTop: '-5px', cursor: 'pointer'}}><img src={close} onClick={() => this.props.changeAction()}/></div>*/}
            {/*</div>*/}
            <div className={styles.modalLine} />
            <div className={`${styles.modalContent} ${styles.tuiModal}`}>
                 {/*<div>无返点推广链接</div>*/}
                 {/*<div className={styles.wufandian}>*/}
                     {/*<div><input style={{ height: '30px', width: '500px', fontSize: '12px' }} value={this.props.wuFandianTuiguangLink} readonly="readonly"/></div>*/}
                     {/*<div*/}
                        {/*className={wuFandianTuiguangLink ? `${styles.copyButton} ${styles.copyButtonDc}` : `${styles.noCopyButton} ${styles.copyButtonDc}`}*/}
                        {/*onClick={() => {*/}
                            {/*if(this.props.wuFandianTuiguangLink){*/}
                                {/*copy(wuFandianTuiguangLink);*/}
                                {/*alert('复制成功');*/}
                            {/*}*/}

                        {/*}}*/}
                     {/*>*/}
                        {/*复 制*/}
                     {/*</div>*/}
                 {/*</div>*/}
                 {/*<div>返点推广链接</div>*/}
                 <div className={styles.fandian}>
                   <div className={styles.fandian1}>
                     <div>彩票返点比例&nbsp;
                        <select
                          style={{ width: '100', height: '32px'}}
                          onChange={(e) => {
                            this.setState({ rebate: e.target.value })
                          }}
                          value={this.state.rebate}
                          className={`${styles.redSelect3} ${styles.regSelectOutline}`}
                        >
                           <option value={''}>空</option>
                           {this.showOption(this.props.caiPiaoFandian)}
                        </select>
                      </div>
                     <div>香港彩返点比例&nbsp;
                       <select
                          style={{ width: '100', height: '32px'}}
                          onChange={(e) => this.setState({ hkWater: e.target.value })}
                          value={this.state.hkWater}
                          className={`${styles.redSelect3} ${styles.regSelectOutline}`}
                       >
                         <option value={''}>空</option>
                         {this.showOption(this.props.hongKongCaiPiaoFandian)}
                       </select>
                     </div>
                     <div>类型&nbsp;
                         <select
                            className={`${styles.redSelect2} ${styles.regSelectOutline}`}
                            style={{ width: '60px', height: '32px'}}
                            value={this.state.type}
                            onChange={(e) => this.setState({ type: e.target.value })}
                         >
                             <option value={'0'}>会员</option>
                             <option value={'1'}>代理</option>
                         </select>
                     </div>
                   </div>
                   <div className={`${styles.copyButton} ${styles.copyButtonDc}`} onClick={() => this.getLinkAction()}>生成链接</div>
                 </div>
                 <div className={styles.wufandian}>
                     <div><input style={{ height: '30px', width: '500px', fontSize: '12px' }} value={currVal} readonly="readonly"/></div>
                     <div
                         className={currVal ? `${styles.copyButton} ${styles.copyButtonDc}`:`${styles.noCopyButton} ${styles.copyButtonDc}`}
                         onClick={() => {
                             console.log('you',this.props.fandianTuiguangLink,'wu',this.props.wuFandianTuiguangLink)
                             if(this.props.fandianTuiguangLink){
                                // copy(fandianTuiguangLink);
                                 //alert('复制成功');http://localhost:3652/?#/register?code=4F6ED7CD4B508441
                             }
                         }}
                     >复 制</div>
                 </div>
            </div>
        </div>

    );
  }
}

export default TuiGuang;
