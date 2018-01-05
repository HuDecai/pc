/**
 * Created by hwh on 2017/10/22.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
// import LoginCard from './LoginCard.js';
import * as styles from './style.css';
import { push, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as UserAction from '../../actions/UserAction';
import UserInfo from './UserInfo';
import SystemMessage from './SystemMessage'
import ChangeBankCard from './ChangeBankCard'
import ChangePassWord from './ChangePassWord'
// const logo = require('../../assets/images/logo.png');
// const phone = require('../../assets/images/login-phone.png');
// const custom = require('../../assets/images/login-custom.png');
// const login = require('../../assets/images/login.png');
// const login1 = require('../../assets/images/login1.png');
const avator = require('../../assets/images/avator.png');
// const imgs = [login, login1, login2];
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class BaseInfo extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    errMsg: PropTypes.string,
    baseInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };

  componentDidMount(){
    // console.log('cookie__',document.cookie)
    this._fetchData()
  }
  _fetchData(){
    BaseInfoAction.getBaseInfo({})
  }
  constructor(props: Object) {
    super(props);
    const {isPerson} = props
    this.state = {
      i: 0,
      selectBtnImages:[
        require('../../assets/images/itemBtnIconS-01.png'),
        require('../../assets/images/itemBtnIconS-02.png'),
        require('../../assets/images/itemBtnIconS-03.png'),
        require('../../assets/images/itemBtnIconS-04.png')
      ],
      normalBtnImages:[
        require('../../assets/images/itemBtnIcon-01.png'),
        require('../../assets/images/itemBtnIcon-02.png'),
        require('../../assets/images/itemBtnIcon-03.png'),
        require('../../assets/images/itemBtnIcon-04.png')
      ],
      item_texts:['基本信息','资料修改','我的银行卡','我的消息'],
      select_index:isPerson == 1 ? 3 : this.props.rightType-1,
      subComponents:[UserInfo,null,null,SystemMessage]
    };
  }

  componentWillReceiveProps(nextProps){
    const rightType = this.props.rightType;
    const nextRightType = nextProps.rightType;
    //console.log(rightType, nextRightType);
    if (rightType !== nextRightType) {
      this.setState({
        select_index: nextRightType - 1,
      });
    }
   //console.log('baseInfo_props',nextProps)
  }
  // componentWillMount() {
  //   UserAction.speedTest();
  //   this.setImg();
  // }
  // setImg() {
  //   const that = this;
  //   this.interval = setInterval(function(){
  //     let i = that.state.i;
  //     that.setState({ i: ++i % 3 });
  //   },5000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  _itemSelect(index){
    if (index == 0 ) { // 选择基本信息，请求用户信息
      this._fetchData()
    } else if (index == 1) { // 选择修改密码，请求用户信息
      this._fetchData()
    }
    const {select_index} = this.state;
    if(index !== select_index){
      this.setState({
        select_index:index
      });
    }
  }

  _renderItemBtn(){
    const {selectBtnImages,normalBtnImages,select_index,item_texts} = this.state;
    return normalBtnImages.map((item,index)=>{
      //console.log('itemImgs__',index)
      return select_index!==index?(
          <div key={item_texts[index]}
            onClick={()=> {
              this._itemSelect(index);
              dispatch(replace(`/user-info?type=1&rigthType=${index+1}`));
              UserAction.changeType({ type: 1, rightType: index+1 })
            }}
            className={styles.itemBtnNormal}
          >
            <img className={styles.itemBtnIcon} src={item}/>
            <div className={styles.itemBtnTitle}>{item_texts[index]}</div>
          </div>
      ):(
          <div key={item_texts[index]} onClick={()=>this._itemSelect(index)} className={styles.itemBtnSelected}>
            <img className={styles.itemBtnIcon} src={selectBtnImages[index]}/>
            <div className={styles.itemBtnTitle}>{item_texts[index]}</div>
          </div>
      )
    });

  }

  // _renderSubItem(){
  //   const {subComponents,select_index} = this.state
  //   console.log('_renderSubItem',subComponents[select_index])
  //   return <UserInfo>
  // }

  render() {
    //console.log('isPerson',this.props.isPerson)
    return (
        <div className={styles.BaseInfoContainer}>

          <div className={styles.contentContainer}>
            <div className={styles.leftContent}>
              <div className={styles.userInfoContainer}>
                <img className={styles.userIcon} src={avator}/>
                <div className={styles.nameContainer}>
                  <div className={styles.name}>Hi, {this.props.baseInfo.user ? this.props.baseInfo.user.nickName || '张三' : '张三'}</div>
                </div>
              </div>
              {this._renderItemBtn()}
            </div>
            {this.state.select_index == 0 && <UserInfo user={this.props.baseInfo} isFetching={this.props.isFetching}/>}
            {this.state.select_index == 1 && <ChangePassWord questionInfo={this.props.questionInfo} user={this.props.baseInfo.user}/>}
            {this.state.select_index == 2 && <ChangeBankCard bankCardList={this.props.bankCardList}  provinceAndCity={this.props.provinceAndCity} user={this.props.baseInfo.user} />}
            {this.state.select_index == 3 && <SystemMessage isPerson={this.props.isPerson}  msgList={this.props.msgList} user={this.props.baseInfo.user} underlings={this.props.underlings}/>}
          </div>
          <div className={styles.helpCenterBottom} />
        </div>
  );
  }
}

export default BaseInfo;
