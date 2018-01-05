/**
 * Created by hwh on 2017/10/23.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push,replace } from 'react-router-redux';
import * as UserAction from '../../actions/BaseInfoAction';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import Cookies from 'js-cookie';
const errImg = require('../../assets/images/error.png');
const see = require('../../assets/images/login-look.png');
const noSee = require('../../assets/images/noSee.png');
const FormItem = Form.Item;
Array.prototype.removeByValue = function (value) {
  var index = this.indexOf(value)
  if (index !== -1){
    this.splice(index,1)
  }
}
var textChangeValue = '';
class UserInfo extends React.PureComponent {

  static propTypes = {
    // errMsg: PropTypes.string,
    // form: PropTypes.any,
    dispatch: PropTypes.func
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      changeItemTitle:['昵称','邮箱','QQ号','微信号'],
      changeItemContent:['nickWang','27263sw@221.com','2726322912','weisschat'],
      changeStateIndexArr:[],
      changeMessageKeys:['nickName','email','qq','wx']
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isFetching){
      this.setState({
        changeStateIndexArr:[]
      })
    }
  }

  _changeEditState(index,isEdit){

    //isEdit true点击前现在为编辑状态 false 点击前为未编辑状态
    const {changeStateIndexArr,changeItemTitle} = this.state
    var temp_states = changeStateIndexArr.slice(0)

    if(isEdit){
      temp_states.removeByValue(index)
    }else{
      //console.log('push')
      temp_states.push(index)
    }
   // console.log('arrr_innn',temp_states,index,isEdit)
    this.setState({
      changeStateIndexArr:temp_states
    })
  }

  _changeSubmit(param){

    if(param){
      //console.log('1223123',param)
      UserAction.updateBaseInfo(param)
    }
    // if(textChangeValue){
    //   const {changeItemContent,changeStateIndexArr} = this.state;
    //   var temp_contents = changeItemContent.slice(0)
    //   var temp_states = changeStateIndexArr.slice(0)
    //   temp_contents[index] = textChangeValue
    // }
    // textChangeValue = ''
    // temp_states.removeByValue(index)
    // this.setState({
    //   changeStateIndexArr:temp_states,
    //   changeItemContent:temp_contents
    // })

  }

  _textChange(e,index){
    const {changeMessageKeys} = this.state
    //console.log('eeeeee,',e.target.value,index,changeMessageKeys)
    let key = changeMessageKeys[index]
    let value = e.target.value
    if (e.target.value){
      textChangeValue = {[key]:value}
      //console.log('textChangeValue',textChangeValue)
    }
  }

  // _renderChangeItem(user){
  //   var changeMessages = [user.nickName,user.email,user.qq,user.wx];
  //  // console.log('change',changeMessages)
  //   const {changeItemTitle,changeStateIndexArr,changeMessageKeys} = this.state
  //   return changeItemTitle.map((item,index)=>{
  //     return changeStateIndexArr.indexOf(index) === -1?(
  //         <div key={item}>
  //           <div className={styles.itemContentContainer}>
  //             <div className={styles.title}>{item}</div>
  //             <div className={styles.content}>{changeMessages[index] || ''}</div>
  //             <div onClick={()=>this._changeEditState(index,false)} className={styles.changeBtn}>修改</div>
  //           </div>
  //           <div className={styles.border}></div>
  //         </div>
  //     ):(
  //         <div key={item}>
  //           <div className={styles.itemContentContainer}>
  //             <div className={styles.title}>{item}</div>
  //             <div className={styles.updateInput}>
  //               <Input
  //                 onChange={(e)=>this._textChange(e,index)}
  //                 ref={changeMessageKeys[index]}
  //                 defaultValue={changeMessages[index] || ''}
  //                 className={styles.inputText}
  //                 style={{width:'193px',height:'32px',border: '1px solid #de3c4b;'}}
  //                 placeholder={"请输入"+changeItemTitle[index]}
  //               />
  //             </div>
  //             <div onClick={()=>this._changeSubmit(textChangeValue)} className={styles.inputBtn}>提交</div>
  //             <div onClick={()=>this._changeEditState(index,true)} className={styles.changeBtn}>取消</div>
  //           </div>
  //           <div className={styles.border}></div>
  //
  //         </div>
  //     )
  //   })
  //
  // }
    judgeNull(str,strtype){

      if(str==null||str==""){
        return (
            <span className={styles.setting} onClick={()=>{
                const url=`/user-info?type=1&rigthType=2&`+strtype;
                dispatch(replace(url));
            }}>设置</span>
        );
      }else{
          return (
              <span className={styles.green}>已绑定</span>
          );
      }
    }
  render() {
    const {user} = this.props;

      if (!user){
          return false
      }

      const uinfo=this.props.user.user||{};
    return (
        <div className={styles.userContainer}>
          <div className={styles.infoType}>【基本信息】</div>
          <div className={styles.dashed}></div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>用户名</div>
              <div className={styles.content}>{uinfo.username}</div>
              <div className={styles.pop}>不可修改</div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>昵称</div>
              <div className={styles.content}>{(uinfo.nickName==null?"尚未填写昵称":uinfo.nickName)}</div>
              <div className={styles.pop}>
                <span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=2&no`));
              }}>
                  {uinfo && uinfo.nickName==null?'设置':'修改'}
              </span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>真实姓名</div>
              <div className={styles.content}>{uinfo&&(uinfo.userRealName==null?"尚未填写真实姓名":uinfo.userRealName)}</div>
              <div className={styles.pop}>{this.judgeNull(uinfo.userRealName)}</div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>登入密码</div>
              <div className={styles.content}>登录网站时的验证密码</div>
              <div className={styles.pop}><span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=2&loginPassEdit&loginDiv`));
              }}>修改</span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>资金密码</div>
              <div className={styles.content}>提现时的验证密码</div>
              <div className={styles.pop}><span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=2&moneyPassEdit&safepassword`));
              }}>{Cookies.get('hasSafePassword')==1 ? '设置':'修改'}</span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>密保</div>
              <div className={styles.content}>重置密码时需要验证的问题</div>
              <div className={styles.pop}>{this.judgeNull(uinfo.secQuestions,"passQueEdit&mibao")}</div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>邮箱</div>
              <div className={styles.content}>{uinfo.email==null?"尚未填写邮箱":uinfo.email}</div>
              <div className={styles.pop}>{this.judgeNull(uinfo.email)}</div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>QQ号</div>
              <div className={styles.content}>{uinfo.qq==null||uinfo.qq==0||uinfo.qq=="0"?'尚未填写QQ号码':uinfo.qq}</div>
              <div className={styles.pop}><span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=2`));
              }}>{ uinfo.qq==null||uinfo.qq==0||uinfo.qq=="0" ? '设置':'修改'}</span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>微信号</div>
              <div className={styles.content}>{uinfo.wx==null?'尚未填写微信号':uinfo.wx}</div>
              <div className={styles.pop}><span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=2`));
              }}>{ uinfo && uinfo.wx==null ? '设置':'修改'}</span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>我的银行卡</div>
              <div className={styles.content}>{user.bank} 张</div>
              <div className={styles.pop}><span className={styles.setting} onClick={()=>{
                  dispatch(replace(`/user-info?type=1&rigthType=3&bankCardList`));
              }}>{user && user.bank==0 ? '添加':'管理'}</span></div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>返点等级</div>
               <div className={styles.content}>{this.props.user.userMode==null?'无':this.props.user.userMode}</div>
              <div className={styles.pop}>不可修改</div>
            </div>
            <div className={styles.border}></div>
          </div>
          <div>
            <div className={styles.itemContentContainer}>
              <div className={styles.title}>注册时间</div>
              <div className={styles.content}>{user.user && (new Date(user.user.createdAt)).format('yyyy-MM-dd h:m:s')}</div>
              <div className={styles.pop}>不可修改</div>
            </div>
          </div>
          {/*<div>*/}
            {/*<div className={styles.itemContentContainer}>*/}
              {/*<div className={styles.title}>最近IP</div>*/}
              {/*<div className={styles.content}>{user.ip}</div>*/}
            {/*</div>*/}
            {/*<div className={styles.border}></div>*/}
          {/*</div>*/}





          {/*<div className={styles.infoType} style={{marginTop:50}}>【可修改信息】</div>*/}
          {/*<div className={styles.dashed}></div>*/}


          {/*{this._renderChangeItem(user)}*/}


        </div>
    );
  }
}

export default UserInfo;
