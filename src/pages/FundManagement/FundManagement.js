/**
 * Created by hwh on 2017/10/29.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import * as FundManagementAction from '../../actions/FundManagementAction';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as UserAction from '../../actions/UserAction';
import * as LotteryAction from '../../actions/LotteryAction';
import Recharge from './Recharge';
import Transfer from './Transfer';
import WithDrawals from './Withdrawals';
import Loading from '../../core/decorators/Loading';
const changeImg = require('../../assets/images/money-change.png');
import Cookies from 'js-cookie';

@Loading(props => props.isFetching)
class FundManagement extends React.PureComponent {
  componentWillMount() {
    LotteryAction.getUserCaptialInfo();
  }
  componentDidMount(){
    this._fetchData()
  }
  _fetchData(){
    FundManagementAction.getPayTypes()
    try{
      if (!this.props.baseInfo.user){
        BaseInfoAction.getBaseInfo()
      }
    }catch (e){
      console.log('error_in',e)
    }

  }
  constructor(props: Object) {
    super(props);
    var payType;
    const {payAction} = props
    switch (parseInt(payAction)){
      case 1:
        payType = 1
        break
      case 2:
        payType = 2
        break
      case 3:
        payType = 3
        break
        case 4:
            payType = 4
            break
        case 6:
            payType = 5
            break
        case 6:
            payType = 6
            break
      default:
        payType = 1
        break
    }
    this.state = {
      i: 0,
      selectBtnImages:[
        require('../../assets/images/fund-icon2.png'),
        require('../../assets/images/fund-icon2.png'),
        require('../../assets/images/fund-select-icon3.png'),
      ],
      normalBtnImages:[
        require('../../assets/images/fund-icon3.png'),
        require('../../assets/images/fund-icon3.png'),
        require('../../assets/images/fund-icon1.png')
      ],
      item_texts:['充值','提现','转账'],
      topItemDic:[{name:'在线支付',type:1,id:1},{name:'网银充值',type:2,id:2},{name:'微信支付',type:3,id:3},{name:'QQ钱包',type:6,id:4},{name:'支付宝',type:4,id:5},{name:'支付宝转卡',type:5,id:6},{name:'支付宝H5',type:7,id:7},{name:'微信H5',type:8,id:8}],
      select_index:this.props.rightType-1,
      itemTypeId:0,
      ids:0,
    };
  }

  componentWillReceiveProps(nextProps){
    
    const rightType = this.props.rightType;
    const nextRightType = nextProps.rightType;
    if (rightType !== nextRightType) {
      console.log('1111');
      this.setState({
        select_index: nextRightType - 1,
      });
    }
  }

  _itemSelect(index){
    const {select_index} = this.state;
    if(index !== select_index){
      this.setState({
        select_index:index
      });
    }
  }

  _topItemClick(id,ty){
    this.setState({
        ids:id,
      itemTypeId:ty
    })
  }

  _renderItemBtn(){
    const {selectBtnImages,normalBtnImages,select_index,item_texts} = this.state;
    const userType = Cookies.get('type');
    return normalBtnImages.map((item,index)=>{
      // 会员不显示转账功能
      if(userType === '0' && index === 2) {
        return '';
      }else {
        return select_index!==index?(
            <div key={item_texts[index]} 
                onClick={()=> {
                  this._itemSelect(index);
                  dispatch(replace(`/user-info?type=2&rigthType=${index+1}`));
                  UserAction.changeType({ type: 2, rightType: index+1 })
                }} 
                className={styles.itemBtnNormal}
            >
              <img className={styles.itemBtnIcon} src={item}/>
              <div className={styles.itemBtnTitle}>{item_texts[index]}</div>
            </div>
        ):(
            <div key={item_texts[index]} className={styles.itemBtnSelected}>
              <img className={styles.itemBtnIcon} src={selectBtnImages[index]}/>
              <div className={styles.itemBtnTitle}>{item_texts[index]}</div>
            </div>
        )
      }
    });
  }

  _renderSubContent(){
    const {select_index,itemTypeId,ids} = this.state
    const {payTypes,bankInfos} = this.props
    if(!payTypes){
      return
    }
    switch (select_index){
      case 0:
          return <Recharge payAction={this.props.payAction} rechargeItem={ids} types={itemTypeId} payInfos={payTypes} bankInfos={bankInfos} bankUrl={this.props.bankUrl} bankCode={this.props.bankCode}/>
      case 1:
          return <WithDrawals tixianInit={this.props.tixianInit} />;
      case 2:
          return <Transfer xiajiList={this.props.xiajiList} />;
    }
  }

  _renderTopItem(){
    const {itemTypeId,topItemDic,ids} = this.state;
    const topItem = [];
    const views = [];
    topItemDic.map((item,index)=>{
      if(this.props.payTypesList.indexOf(item.type) !== -1) {
        topItem.push({
          type: item.type,
          id: item.id,
        });
        views.push(<div key={item.id} style={{marginLeft:index===0?0:10}} className={ids === item.id?styles.topItemSelected:styles.topItemNormal} onClick={()=>this._topItemClick(item.id,item.type)}>{item.name}</div>)
      }
    })
    if(topItem.length && !itemTypeId ) {
      this.setState({
        itemTypeId: topItem[0].type,
        ids: topItem[0].id,
      })
    }
    return views;
  }
  render() {
    const {baseInfo} = this.props
    return (
        <div className={styles.BaseInfoContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.leftContent}>
              <div className={styles.userInfoContainer}>
                  <div className={styles.name}>您的余额：</div>
                  <div className={styles.money}>￥{this.props.leftMoney ? this.props.leftMoney.toFixed(1) : 0}</div>
              </div>
              {this._renderItemBtn()}
            </div>
            <div className={styles.moneyContainer}>
             {this.state.select_index === 0 ?
               <div>
                  <div className={styles.topItemContainer}>
                    {this._renderTopItem()}
                  </div>
                  {this.state.ids ? 
                  <div className={styles.redLine}></div> :  <div /> }
              </div>
              : <div /> }
              {this._renderSubContent()}
            </div>
          </div>
          <div className={styles.helpCenterBottom} />
        </div>
    );
  }
}

export default FundManagement;
