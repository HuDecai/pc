/**
 * Created by hwh on 2017/10/30.
 */

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as FundManagementAction from '../../actions/FundManagementAction'

import { Form, Input, Button, Checkbox, Icon , message} from 'antd';
import copy from 'copy-to-clipboard';
const errorImg = require('../../assets/images/fund-error.png');
const selectedImg = require('../../assets/images/new-lottery-selected.png');
const checkedCard = require('../../assets/images/checked-card.png');

const bankList = ['ICBC','CCB','ABC','BOC','CMBC','CMBCS','CIB','BOCOM','PSBC','SPABANK','CGB','ECITIC','SPDB']
const bankcode = ['01020000','01050000','0103000','01040000','03080000','03050000','03090000','03010000','PSBC','03070000','03060000','03020000','03100000']
class Recharge extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      money: '',
      selectMoney: '',
      aliname: '',
      type: 1,
        id:'',
      changeItemTitle:['昵称','邮箱','QQ号','微信号'],
      changeItemContent:['nickWang','27263sw@221.com','2726322912','weisschat'],
      changeStateIndexArr:[],
      changeMessageKeys:['nickName','email','qq','wx'],
      bankImgs:[require('../../assets/images/gongshang.png'),require('../../assets/images/jianshe.png'),require('../../assets/images/nonghang.png'),
        require('../../assets/images/zhongyin.png'),require('../../assets/images/zhaoshang.png'),require('../../assets/images/minsheng.png'),require('../../assets/images/xingye.png'),
        require('../../assets/images/jiaotong.png'),require('../../assets/images/youzheng.png'),require('../../assets/images/pingan.png'),require('../../assets/images/guangfa.png'),
        require('../../assets/images/zhongxin.png'),require('../../assets/images/pufa.png')],
      bankCardIndex:0,
      otherPayImg:{"微信扫码":require('../../assets/images/weichatPay_ico.png'),"qq钱包":require('../../assets/images/QQWallet_ico.png'),
        "支付宝":require('../../assets/images/aliPay_ico.png'),"支付宝支付":require('../../assets/images/aliPay_ico.png')},
        otherPayImgO:[require('../../assets/images/weichatPay_ico.png'),require('../../assets/images/QQWallet_ico.png'),
            require('../../assets/images/aliPay_ico.png')],
      isDetail:false,
      max_val:props.payInfos[0] && props.payInfos[0].max_val,
      min_val:props.payInfos[0] && props.payInfos[0].min_val,
      bankNames:["中国工商银行","中国建设银行","中国农业银行","中国银行","招商银行","中国民生银行","兴业银行","交通银行",
      "中国邮政储蓄","平安银行","广发银行","中信银行","浦发银行"]
  };
  }

  _bankCardSelect(index,item){
    console.log('item:', item);
    if (item){
      this.setState({bankCardIndex:index,max_val:item.max_val,min_val:item.min_val,id:item.id})
    }else{
      this.setState({bankCardIndex:index})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isFetching){
      this.setState({changeStateIndexArr:[]})
    }
    if(nextProps.rechargeItem !== this.props.rechargeItem){
      this.setState({
        isDetail:false,
        money: '',
        selectMoney: '',
        aliname: '',
        bankCardIndex:0,
        selectMoneyIndex: '',
      })
    }
    if(nextProps.types !== this.props.types) {
      const payInfoArr = nextProps.payInfos.filter(item => item.type == nextProps.types);
      this.setState({
        max_val:payInfoArr[0].max_val,
        min_val:payInfoArr[0].min_val,
      })
    }
  }

  _selectMoneyIndex(index,money){
    const {selectMoneyIndex} = this.state
    if (selectMoneyIndex === index){
      this.setState({ selectMoneyIndex: undefined, selectMoney:undefined });
    }else{
      this.setState({selectMoneyIndex: index,selectMoney:money,money });
    }
  }

  _rechargeClick(ids,types){
    const rechargeMoney = parseFloat(this.state.money);
    if (!rechargeMoney){
      alert('请输入金额');
      return
    }
    if(rechargeMoney > this.state.max_val || rechargeMoney < this.state.min_val){
      return;
    }
    const {rechargeItem,payInfos} = this.props;
    const {bankCardIndex,bankNames,momey,aliname,id} = this.state;
    var param = {}
    if(rechargeMoney){
      if(types == 5 && aliname){
        param['alipayName'] = aliname
      }
    }else{
      return
    }
    param['money'] = rechargeMoney;
    param['type'] = types;
    if(types == 2 ){
      param['rechargeBankName'] = bankNames[bankCardIndex]
      param['rechargeBankCode'] = bankList[bankCardIndex]
      param['bankCode'] = bankcode[bankCardIndex]
    }else if (types == 5){
      param['alipayName'] = aliname
    }else if (types == 1){
      param['rechargeBank'] = bankList[0];
      param['bankCode'] = bankcode[0];
    }
    if(types == 2 || types == 5){
      FundManagementAction.getBankInfo({},(result)=>{
        param.receiveBankId = result.data[0].id
        FundManagementAction.rechargeBank(param)
        // const rechargeWindow = window.open('', 'rechargeWindow');
        // window.rechargeWindow = rechargeWindow;
      })

      this.setState({
        isDetail:true,
        money: rechargeMoney
      })
    }else{
      const payId=id?id:ids;
      FundManagementAction.recharge({
        rechargeMoney,
        rechargeConfigId:payId,
        bankCode: bankcode[bankCardIndex],
      });
      const rechargeWindow = window.open('', 'rechargeWindow');
      window.rechargeWindow = rechargeWindow;
    }

  }

  _renderMoneyItems(){
    const {selectMoneyIndex} = this.state
    var moneys = [50000,5000,1000,500,100]
    return moneys.map((item,index)=>{
      return (
          <div key={item} onClick={()=>this._selectMoneyIndex(index,item)} style={{marginLeft:index===0?0:5}}
               className={selectMoneyIndex === index ? styles.moneyItemSelect : styles.moneyItemNormal}>{item}</div>
      )
    })
  }

    _renderBankList(payinfos,paytype,ty){
        const {bankImgs,bankCardIndex,otherPayImg} = this.state
        if(paytype == 2 || paytype == 1){
            return bankImgs.map((item,index)=>{
                return (
                    <div onClick={()=>this._bankCardSelect(index)} key={index}  className={index === bankCardIndex ? styles.bankImgSelect :styles.bankImgNormal} style={{marginLeft:index % 4 === 0 ? 0 : 15,marginTop:index / 4 >= 1 ? 15 : 0}}>
                      <img src={item} className={`${styles.cardItem} ${styles.cardItemZxian}`}/>
                        {index === bankCardIndex ?
                            <div className={styles.checkedCardBorder}></div>
                            : ''}
                        {index === bankCardIndex ?
                            <div className={styles.checkedCardTip}></div>
                            : ''}
                        {index === bankCardIndex ?
                            <img src={checkedCard} className={styles.checkedCard}/>
                            : ''}
                    </div>
                )
            })
        }else{
        
            return ty.map((item,index)=>{
                let imgs="";
                switch (item.type){
                    case 6:
                        imgs= this.state.otherPayImgO[1];
                        break;
                    case 5:
                        imgs= this.state.otherPayImgO[2];
                        break;
                    case 4:
                        imgs= this.state.otherPayImgO[2];
                        break;
                    case 3:
                        imgs= this.state.otherPayImgO[0];
                        break;
                    case 7:
                        imgs= this.state.otherPayImgO[2];
                        break;
                    case 8:
                        imgs= this.state.otherPayImgO[0];
                        break;

                }
                return(
                    <div key={item.id} onClick={()=>this._bankCardSelect(index,item)} className={index === bankCardIndex ? styles.bankImgSelect :styles.bankImgNormal} style={{marginLeft:index % 4 === 0 ? 0 : 15,marginTop:index / 4 >= 1 ? 15 : 0}}>

                            <span className={styles.cardItemnamebox}>
                            <img src={imgs} className={styles.cardItem}/><span className={styles.cardItemname}>{item.name}</span>
                            {index === bankCardIndex ?<div className={styles.checkedCardBorder}></div>: ''}
                            {index === bankCardIndex ?<div className={styles.checkedCardTip}></div>: ''}
                            {index === bankCardIndex ?<img src={checkedCard} className={styles.checkedCard}/>: ''}
                            </span>
                            </div> )
                            })
                      }
                      }



  _renderSubViews(){
    const {rechargeItem,payInfos,types} = this.props;
    if(!rechargeItem) {
      return;
    }
    const {selectMoney} = this.state;
    var select_type = payInfos.filter((item,index)=>{
        return item.type == types
    });
    this.setState({ id: '' });
    return (<div>
      <div className={styles.bankListContainer}>
        <div className={styles.title}>充值银行:</div>
        <div className={styles.bankList} style={{marginLeft:10}}>
          {this._renderBankList(payInfos,rechargeItem,select_type)}
        </div>
      </div>
      <div className={styles.rechargeInputContent}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
           充值金额：
           <input style={{ width: '304px', height: '40px', padding: '0 5px',fontSize:18}} value={this.state.money} onChange={(e) => this.setState({ money: e.target.value })}/>
           { (this.state.money > this.state.max_val || this.state.money < this.state.min_val && this.state.money ) ?
           <div className={styles.fundError}><img src={errorImg}/>&nbsp;{`可充值金额${this.state.min_val}元~${this.state.max_val}元`}</div>
           : <div /> }
        </div>
        <div className={styles.moneyListContainer}>
          快选金额：
          {this._renderMoneyItems()}
        </div>
        {rechargeItem == 6 &&
         <div style={{ marginLeft:'-15px',marginTop:'20px'}}>
           支付宝姓名：
           <input style={{ width: '304px', height: '40px'}} value={this.state.aliname} onChange={(e) => this.setState({aliname: e.target.value})}/>
         </div>
        }
        <div className={styles.showMoneyView}>
          到账金额：
          <div className={styles.yellowBack} style={{paddingLeft:5}}>{parseFloat(this.state.money) ? `￥${this.state.money}` : ''}</div>
        </div>
        <div onClick={()=>this._rechargeClick(select_type[0].id,types) } className={styles.submitBtn} style={{marginTop:20,marginLeft:70}}>开始充值</div>
      </div>
      </div>
    )
  }

  _renderRechargeDetail(){
    const { bankCardIndex,bankImgs,money } = this.state
    const {bankInfos,bankCode,bankUrl} = this.props
    console.log('bankInfos',bankUrl)
    if(!bankInfos || bankInfos.length == 0){
      return false
    }
    let bank1 = bankInfos[0]
    return(
    <div className={styles.rechargeDetailContainer}>
      <div className={styles.detailTopContainer}>
        <div className={styles.rechargeDetailTitle}>充值确认</div>
        <div className={styles.rechargeDetailBankContainer}>
          <div className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>充值银行</div>
          <img src={bankImgs[bankCardIndex]} className={styles.bankImgNormal} style={{marginLeft:10}}/>
        </div>
        <div className={styles.copyItemContainer}>
          <span className={styles.rechargeDetailSubTitle} style={{marginLeft:70,marginTop:10}}>充值金额：<span className={styles.detailMoney}>{money}</span>元</span>
          <div
              className={styles.copyButton}
              onClick={() => { copy(money);message.success('复制成功')}}
          >
            复 制
          </div>
        </div>

      </div>

      <div className={styles.detailTopContainer}>
        <div className={styles.rechargeDetailTitle}>收款方信息</div>
        <div className={styles.rechargeDetailBankContainer}>
          <div className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>收款银行</div>
          <img src={bankImgs[bankList.indexOf(bank1.code)]} className={styles.bankImgNormal} style={{marginLeft:10}}/>
        </div>
        <div className={styles.copyItemContainer}>
          <span className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>收款账户名：
            <span className={styles.rechargeDetailSubTitle}>{bank1.account_name}</span>
          </span>
          <div
              className={styles.copyButton}
              onClick={() => { copy(bank1.account_name);message.success('复制成功') }}
          >
            复 制
          </div>
        </div>

        <div className={styles.copyItemContainer}>
          <span className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>收款帐号：
            <span className={styles.rechargeDetailSubTitle}>{bank1.card_no}</span>
          </span>
          <div
              className={styles.copyButton}
              onClick={() => { copy(bank1.card_no);message.success('复制成功') }}
          >
            复 制
          </div>
        </div>

        <div className={styles.copyItemContainer}>
          <span className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>开户行：
            <span className={styles.rechargeDetailSubTitle}>{bank1.open_bank}</span>
          </span>
          <div
              className={styles.copyButton}
              onClick={() => { copy(bank1.open_bank);message.success('复制成功') }}
          >
            复 制
          </div>
        </div>

        {bankCode && <div className={styles.copyItemContainer}>
          <span className={styles.rechargeDetailSubTitle} style={{marginLeft:70}}>附言：
            <span className={styles.extraWord}>{bankCode}</span>
          </span>
          <div
              className={styles.copyButton}
              onClick={() => { copy(bankCode);message.success('复制成功') }}
          >
            复 制
          </div>
        </div>}
        <p style={{width:245,marginTop:12,marginLeft:110}}>
          附言在部分网站会以"备注"，"用途"等名词出现，请务必正确填写此项，填错或者不填会影响充值到账
        </p>
      </div>

      <div onClick={()=>{
        if(bankUrl){
            window.open(bankUrl)
        }

      }} className={styles.submitBtn} style={{width:232,marginTop:12}}>登录网上银行付款</div>
    </div>

    )
  }

  render() {
    const {rechargeItem} = this.props
    const {isDetail} = this.state
    return (
        <div className={styles.rechargeContainer}>
          {!isDetail && rechargeItem !== undefined  && this._renderSubViews()}
          {isDetail && rechargeItem && this._renderRechargeDetail()}
        </div>
    );
  }
}

export default Form.create()(Recharge);
