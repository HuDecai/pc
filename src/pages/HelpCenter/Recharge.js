import React from 'react';
import * as styles from './styles.css';
import OnLine from './OnLine';
import WangYing from './WangYing';
import ZhiFuBaoZhuanKa from './ZhiFuBaoZhuanKa';
import WeChat from './WeChat';
import QQ from './QQ';
import ZhiFuBao from './ZhiFuBao';

class Recharge extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
    };
  }
  componentWillMount() {
  
  }
  render() {
    const showContent = (type) => {
      const views = [];
      if(type) {
        if(type === 1) {
          views.push(
            <div className={styles.helpContent}>
              <div className={styles.firstItem}><div className={styles.firstTitle}/><div>亿合娱乐支持充值方式:</div></div>
              <div className={styles.firstItemImg}><div>亿合目前支持的充值方式包括：银行转账，在线支付，支付宝转卡，微信扫码支付，支付宝扫码支付，QQ扫码支付6种充值方式。 目前支持银行和第三方机构：中国工商银行，中国建设银行，招商银行，中国农业银行，交通银行，中信银行，浦发银行，民生银行，光大银行，兴业银行，广东发展银行，华夏银行，中国银行，平安银行，中国邮政储蓄银行，上海银行，宁波银行 ，北京银行，在线支付微信支付，支付宝，QQ钱包。</div></div>
              <br/>
              <div className={styles.firstItem}><div className={styles.firstTitle}/><div>充值时间:</div></div>
              <div className={styles.firstItemImg}>
                <div>
                    <div>网银充值时间为早上10:00到凌晨02:00（限额最低1000元，最高限额49999元）</div>
                    <div>支付宝转卡充值时间为早上10:00到凌晨02:00（限额最低100，最高限额49999元）</div>
                    <div>在线支付充值时间为24小时（限额最低100元，最高限额50000元）</div>
                    <div>微信支付充值时间为24小时（最低限额50元，最高限额3000元）</div>
                    <div>QQ钱包充值时间为24小时（最低限额50元，最高限额5000元）</div>
                    <div>支付宝扫码充值时间为24小时（最低限额50元，最高限额5000元）</div>
                </div>
              </div>
              <br/>
              <div className={styles.firstItem}><div className={styles.firstTitle}/><div>充值注意事项:</div></div>
              <div className={styles.firstItemImg}>
                <div>
                  <div>1.在线支付的线路是系统随机切换的，部分线路不支持某些银行的充值方式，如果无法充值，请您使用选择网银转账或其他方式进行充值。</div>
                  <div>2.网银转账，充值信息（充值金额、收款方信息、充值附言）需要与申请时的一致，否则无法及时到账。网银转账收款方信息会不定时间更换，请充值时候查看最新收款方信息，务必将原来的收款方信息保存直接进行转账，否则充值后的损失平台不给予承担责任。</div>
                  <div>3.支付宝转卡，充值信息（充值金额，收款方信息，充值附言）需要与申请时的一致，否则无法及时到账。支付宝收款方信息会不定时间更换，请充值时候查看最新收款方信息，务必将原来的收款方信息保存直接进行转卡支付，否则充值后的损失平台不给予承担责任。</div>
                  <div>4.微信支付，支付宝扫码，QQ扫码收款二维码在申请时只限于5分钟内扫码支付有效。（务必保存收款二维码）</div>
                  <div>5.一个充值申请仅可使用一次。使用同一个申请存款多笔，将无法及时到账。</div>
                  <div>6.若充值长时间未到账或充值忘记填写附言等完整的信息，保留您的存款回执单，联系在线客服咨询处理。</div>
                  <div>7.平台不支持信用卡充值。</div>
                 </div>
                </div>
              <br/>
              <div className={styles.firstItem}><div className={styles.firstTitle}/><div>无法充值:</div></div>
              <div className={styles.firstItemImg}>
                <div>
                  <div>1.在线支付，打不开银行充值页面？</div>
                  <div>答：当地网络原因，或网上银行接口问题，建议更换您的浏览器，删除缓存，再尝试。若仍然存在问题，请联系亿合在线客服。</div>
                  <div>2.点击“充值”显示连接失败？</div>
                  <div>答：由于页面停留时间过长导致，请退出重新登录尝试。若仍然存在问题，请联系亿合在线客服。</div>
                  <div>3.充值时，提示“请安装插件或下载证书”？</div>
                  <div>答：需前往银行官网下载并安装进行尝试，若仍然存在问题，请咨询银行客服。</div>
                  <div>4.充值时，提示“订单数据有误”、“接口名称错误”或“请求不接受”？答：是银行端口问题，建议更换浏览器，或咨询银行客服。</div>
                </div>
              </div>
           </div>
          );
        }
        if(type === 2) {
          views.push(<OnLine />);
        }
        if(type === 3) {
          views.push(<WangYing />);
        }
        if(type === 4) {
          views.push(<ZhiFuBaoZhuanKa />);
        }
        if(type === 5) {
          views.push(<WeChat />);
        }
        if(type === 6) {
          views.push(<QQ />);
        }
        if(type === 7) {
          views.push(<ZhiFuBao />);
        }
      }
     return views;
    }
    return (
      <div>
        <div className={styles.helpRigthTitle}>
          <div className={this.state.type === 1 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :1 })}>充值说明</div>
           <div className={this.state.type === 2 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :2 })}>在线充值</div>
           <div className={this.state.type === 3 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :3 })}>网银充值</div>
           <div className={this.state.type === 4 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :4 })}>支付宝转卡</div>
           <div className={this.state.type === 5 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :5 })}>微信支付</div>
           <div className={this.state.type === 6 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :6 })}>QQ钱包</div>
           <div className={this.state.type === 7 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :7 })}>支付宝</div>
        </div>
        {showContent(this.state.type)}
      </div>
    );
  }
}
export default Recharge;
