/**
 * Created by hwh on 2017/10/24.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
// import LoginCard from './LoginCard.js';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import { Checkbox ,Input ,Select,Form, Radio,notification,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const detailTitleBg = require('../../assets/images/showDetailBG.png');
const titleBg = require('../../assets/images/sysMessageBG.png');


class SystemMessage extends React.PureComponent {
  static propTypes = {
    errMsg: PropTypes.string,
    userInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };
  /*
  * msgType
  * 1.收件箱
  * 2.发件箱
  * 3.系统消息
  * 4.发送新消息
  * */
  constructor(props: Object) {
    super(props);
    this.state = {
      messages:[1,2,3,4],
      showDetails:[],
      pageNo:1,
      isRead:false,
      msgType:3,
      isAllChecked:false,
      checkIds:[],
      selectedPeoples:[],
      showPeoples:[],
      showSysDetail: [],
    }
  }
  componentWillMount(){
    const {isPerson} = this.props
    if (isPerson == 1){
      this._selectPersonal()
    }else{
      this._selectSys();

    }
  }

  // _itemSelect(index){
  //   const {select_index} = this.state;
  //   if(index !== select_index){
  //     this.setState({
  //       select_index:index
  //     });
  //   }
  // }

  //收件箱发件箱切换
  _boxClick(type){
    if(this.state.msgType === type){
      return
    }
    if (type === 1){
      this.setState({
        msgType:1
      })
      this._fetchData(1,type,this.state.isRead)
    }else if(type === 2){
      this.setState({
        msgType:2
      })
      this._fetchData(1,type,this.state.isRead)
    }else if (type === 4){
      this.setState({
        msgType:4
      })
    }
  }

  _fetchData(pageNo,signMessage,isRead){
    BaseInfoAction.getSendMsgList({pageNo,pageSize:4,signMessage,isRead})
  }


  _selectSys(){
    const {pageNo} = this.state
    this.setState({
      msgType:3
    })
    this._fetchData(pageNo,3,this.state.isRead)
  }

  _selectPersonal(){
    const {pageNo} = this.state
    console.log('fetchPage',pageNo)

    this.setState({
      msgType:1
    })
    //点击先获取数据
    this._fetchData(pageNo,1,this.state.isRead)
  }

  _cancelModal(){
    this.setState({
      showModal:false
    })
  }

  _showModal(){
    this.setState({
      showModal:true
    })
  }

  _showMessageDetail(index){

    var showdetails_temp = this.state.showDetails.slice(0)
    if (showdetails_temp.indexOf(index) !== -1){
      showdetails_temp.splice(index,1);
      console.log('arrrrrr',showdetails_temp)
      this.setState({
        showDetails: showdetails_temp
      })

    }else{
      showdetails_temp = []
      showdetails_temp.push(index)
      this.setState({
        showDetails: showdetails_temp
      })
    }
  }

  _cancelSelectPeople(){
    this.setState({
      showAddPeople:false
    })
  }

  _filterMsgStatus(e){
    switch (e.target.value){
      case 'a':
        this.setState({
          isRead:false
        })
        this._fetchData(this.state.pageNo,this.state.msgType,false)
        break
      case 'b':
        this.setState({
          isRead:true
        })
        this._fetchData(this.state.pageNo,this.state.msgType,true)
        break
      case 'c':
        this.setState({
          isRead:true
        })
        this._fetchData(this.state.pageNo,this.state.msgType,false)
        break
    }
  }

  _filterPeople(e){
    const {user} = this.props
    console.log('event',e.target.value)
    if (e.target.value == 2){
      BaseInfoAction.getUnderling()
    }
    this.setState({
      filterValue:e.target.value
    })
  }

  _renderPeopleList(peoples){
    const {selectedPeoples} = this.state
    return(
        <CheckboxGroup options={peoples} value={selectedPeoples} onChange={(selectedPeoples)=>{
          this.setState({
            selectedPeoples
          })
        }}/>
    )

  }

  //回复消息表单
  _renderAddCardForm(){
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 17}
    };
    const longItemLayout = {
      labelCol: { span: 3},
      wrapperCol: { span: 20 }
    };
    const { getFieldDecorator } = this.props.form;

    return(
        <div>
          <div className={styles.maskView}></div>
          <div className={styles.addCardForm} style={{height:298}}>
            <div className={styles.cardFormTitle}>收件人：</div>
            <div className={styles.dashed}></div>

            <Form className={styles.sendMessageForm} onSubmit={() => this._handleSubmit()}>
              <FormItem className={styles.sendMessageFormItem} {...formItemLayout} label="收件人" >
                {getFieldDecorator('original_password', {
                  rules: [],
                  initialValue:"上级代理"
                })(
                    <Input disabled={true} className={styles.sendeMessageInput} placeholder="请输入原密码" />

                )}

              </FormItem>
              <FormItem className={styles.sendMessageFormItem} {...formItemLayout} label="消息标题" >
                {getFieldDecorator('original_password', {
                  rules: [{ required: true, message: '请填写你原密码!' }],
                })(
                    <Input className={styles.sendeMessageInput}   placeholder="所回消息的标题" />

                )}

              </FormItem>
              <FormItem className={styles.sendMessageFormItem} {...longItemLayout} label="内容" >
                {getFieldDecorator('original_password', {
                  rules: [{ required: true, message: '请填写你原密码!' }],
                })(
                    <Input type="textarea" className={styles.sendMessageTextArea} placeholder="请在此输入内容..." />

                )}

              </FormItem>
              <div className={styles.sendMessageFormBottonFunc}>
                <div className={styles.bindBtn} style={{width:'60px'}}>确定</div>
                <div onClick={()=>{this._cancelModal()}} className={styles.normalBtn} style={{width:'60px',marginLeft:5}}>取消</div>
              </div>
            </Form>

          </div>
        </div>

    )
  }

  _setPeopleClass(){
    const {showPeopleLists,dismissPeopleLists,filterValue} = this.state

    if (filterValue && filterValue == 2){
      return styles.peopleContainerShow
    }else if(dismissPeopleLists){
      return styles.peopleContainerDismiss
    }
    return styles.peopleContainer
  }

  //添加收件人表单
  _renderAddPeopleForm(){
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 17}
    };
    const longItemLayout = {
      labelCol: { span: 3},
      wrapperCol: { span: 20 }
    };
    const { getFieldDecorator } = this.props.form;
    const {underlings} = this.props
    return(
        <div>
          <div className={styles.maskView}></div>
          <div className={styles.addCardForm}>
            <div className={styles.cardFormTitle}>添加收件人
              <Input className={styles.sendNewMsgInput} style={{marginLeft:10}}/>
              <div className={styles.submitBtn} style={{marginLeft:10,marginTop:0}}>搜索</div>
            </div>
            <div className={styles.dashed}></div>

            <div className={styles.filterPeople}>
              <RadioGroup onChange={(e)=>this._filterPeople(e)} value={this.state.filterValue}>
                <Radio value={1}>上级代理</Radio>
                <Radio value={2}>直属下级会员</Radio>
                <Radio value={3}>在线客服</Radio>
              </RadioGroup>
            </div>

            <div className={this._setPeopleClass()} >
              <Checkbox onChange={(e)=>{
                this.setState({
                  selectedPeoples:e.target.checked ? underlings : []
                })
              }}>全选</Checkbox>
              <div className={styles.dashed} style={{marginTop:5,width:'100%'}}/>

              <div className={styles.peopleList}>
                {underlings && this._renderPeopleList(underlings)}
              </div>

            </div>

            <div className={styles.sendMessageFormBottonFunc}>
              <div onClick={()=>{
                const {filterValue,selectedPeoples} = this.state
                var peopleArr;
                switch (filterValue){
                  case 1:
                    peopleArr = ["上级代理"]
                    break
                  case 2:
                    peopleArr = selectedPeoples
                    break
                  case 3:
                    peopleArr = ["在线客服"]
                    break
                }

                this.setState({
                  showPeoples:peopleArr,
                  showAddPeople:false
                })
              }} className={styles.bindBtn} style={{width:'60px',marginTop:0,marginLeft:0}}>确定</div>
              <div onClick={()=>{this._cancelSelectPeople()}} className={styles.normalBtn} style={{width:'60px',marginLeft:5,marginTop:0}}>取消</div>
            </div>

          </div>
        </div>

    )
  }

  _showSysDetail (key) {
    var showSysDetail = [...this.state.showSysDetail];
    if(showSysDetail.indexOf(key) > -1) {
      showSysDetail.splice(showSysDetail.indexOf(key), 1);
    } else {
      showSysDetail = [key]
    }
    this.setState({ showSysDetail});
  }

  _renderSys(showSysDetail){
    const {msgList} = this.props
    if(!msgList) return;
    const view = [];
    msgList.map((item, key) => {
      view.push(
        <div key={key} className={styles.sysMessageContainer}>
          <div className={`${styles.sysTime} ${styles.sysTimeWidth}`}>{item.time.slice(0, 10)}</div>
          <div className={styles.sysContent}>
            {!item.is_read ? <div>
              <div className={styles.new}></div>
              <div className={styles.newText}>NEW</div>
            </div> : ''}
            <div
              className={`${styles.sysContentTitle} ${styles.sysContentTitleX}`}
              style={showSysDetail.indexOf(key) > -1 ?
                { background: `url(${detailTitleBg}) 100% -10% no-repeat`,
                } :
                { background: `url(${titleBg}) 100% 100% no-repeat`}}
            >
              <div className={styles.sysContentText}>
                {item.title}
              </div>
              <div className={styles.contentText} onClick={(e) => this._showSysDetail(key) }>
                查看详情
                {showSysDetail.indexOf(key) > -1 ?
                  <img className={styles.lookMore} src={require('../../assets/images/lookMoreUp.png')}/>
                  :
                  <img className={styles.lookMore} src={require('../../assets/images/lookMore.png')}/>
                }
              </div>
            </div>
            {showSysDetail.indexOf(key) > -1 ?
              <div className={`${styles.sysContentDetail} ${styles.sysContentDetailW}`}>
                {item.content}
                <div className={styles.sysKfb}>亿合客服部</div>
                <div className={styles.sysTime}>{item.time}</div>
              </div>
               : '' }
          </div>
        </div>
      )
    });
    return view;
  }

  _allSelectClick(e){
    const {msgList} = this.props
    let ids = msgList.map(item=>item.id)
    if(e.target.checked){
      this.setState({
        isAllChecked:true,
        checkIds:ids
      })
    }else{
      this.setState({
        isAllChecked:false,
        checkIds:[]
      })
    }

  }

  _singleSelectClick(e,id){
    var checkdArr_temp = this.state.checkIds.slice(0)
    if(e.target.checked){
      checkdArr_temp.push(id)
    }else{
      checkdArr_temp.removeByValue(id)
    }
    this.setState({
      checkIds:checkdArr_temp
    })
    console.log('checkClick',e)
  }

  _changePageClick(page){
    this._fetchData(page,this.state.msgType,this.state.isRead)
  }

  _sendMessage(){
    const {showPeoples} = this.state
    if(!showPeoples){
      message.info('请选择接收对象')
      return
    }

    const {validateFields} = this.props.form
    validateFields(['msg_title','msg_content'],(error,values)=>{
      console.log('error',error,values)
      if(!!error){
        return
      }
      BaseInfoAction.sendMessage({
        rePersonSign:showPeoples.join(';'),
        sendTitle:values['msg_title'],
        sendContent:values['msg_content']
      })
    })
  }

  _renderPersonalTop(){
    return(
        <div>
          <div className={styles.fillterView}>
            <div style={{display:'flex',height:45,alignItems:'center'}}>
              <Checkbox onChange={(e)=>this._allSelectClick(e)}/>
              <div style={{marginTop: 3}}>&nbsp;全选</div>
              <RadioGroup className={styles.checkClick} onChange={(e)=>this._filterMsgStatus(e)} style={{marginLeft:27}} defaultValue="a" size="small">
                <RadioButton  value="a">所有</RadioButton>
                <RadioButton value="b">已读</RadioButton>
                <RadioButton value="c">未读</RadioButton>
              </RadioGroup>
            </div>
            <div style={{display:'flex'}}>
              <div className={styles.sendMessageEditBtn}>删除</div>
              <div style={{marginLeft:10}} className={styles.sendMessageEditBtn}>刷新</div>
            </div>

          </div>
          <div className={styles.personalBorderLine}/>
        </div>
    )
  }

  _renderSendMessageList(){
    const {showDetails,checkIds} = this.state
    const {msgList} = this.props
    if(!msgList){
      return
    }
    return msgList.map((item,index)=>{
      return(
          <div key={item.id}>
            <div className={styles.fillterView}>
              <div style={{display:'flex',height:45,alignItems:'center'}}>
                <Checkbox onChange={(e)=>this._singleSelectClick(e,item.id)} checked={checkIds.indexOf(item.id) !== -1}/>
                <div onClick={()=>this._showMessageDetail(index)}>{item.title}</div>
              </div>
              <div style={{display:'flex'}}>
                <div onClick={()=>{this._showModal()}} style={{color:'#de3c4b',marginRight:36}}>回复</div>
                <div style={{color:'#878787',marginRight:36}}>{item.username || '暂无'}</div>
                <div style={{color:'#878787'}}>{item.time}</div>
              </div>
            </div>
            {showDetails.indexOf(index) !== -1 && <div className={styles.sendeMessageMoreContainer}>
              {item.content}
            </div>
            }
            <div className={styles.dashed} style={{marginTop:0,width:705,marginLeft:10}}/>
          </div>
      )
    })

  }


  //发送新消息表单
  _renderSendMessageForm(){
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 17}
    };
    const longItemLayout = {
      labelCol: { span: 3},
      wrapperCol: { span: 20 }
    };
    const { getFieldDecorator } = this.props.form;
    const {showPeoples} = this.state

    return(
      <div className={styles.sendMsgFormContainer}>
        <div className={styles.sendMsgFormItemContainer}>
          <div style={{marginLeft:-30}}>收件人：</div>
          <div className={styles.selectPeople}>{showPeoples && showPeoples.length > 0 && showPeoples.join(";")}</div>
          <div onClick={()=>{
            this.setState({
              showAddPeople:true
            })
          }} className={styles.submitBtn} style={{marginTop:0,marginLeft:5}}>添加收件人</div>
        </div>
        <Form>
          <FormItem className={styles.sendMessageFormItem} {...formItemLayout} label="消息标题" >
            {getFieldDecorator('msg_title', {
              rules: [{ required: true, message: '请填写消息标题!' }],
            })(
                <Input className={styles.sendeMessageInput} style={{marginLeft:8}}   placeholder="所回消息的标题" />

            )}

          </FormItem>

          <FormItem className={styles.sendMessageFormItem} {...longItemLayout} label="内容" >
            {getFieldDecorator('msg_content', {
              rules: [{ required: true, message: '请填写内容!' }],
            })(
                <Input type="textarea" className={styles.sendNewMsgTextArea} style={{marginLeft:8}} placeholder="请在此输入内容..." />
            )}

          </FormItem>
        </Form>
        <div className={styles.sendMessageFormBottonFunc}>
          <div onClick={()=>this._sendMessage()} className={styles.bindBtn} style={{width:'60px',marginLeft:66}}>确定</div>
          <div onClick={()=>{this._cancelModal()}} className={styles.normalBtn} style={{width:'60px',marginLeft:5}}>取消</div>
        </div>
      </div>
    )
  }

  _renderPersonal(){
    const {msgType} = this.state
    const {pageSize} = this.props
    return (
        <div className={styles.personalContainer}>
          <div className={styles.personalTopContainer}>
            <div onClick={()=>this._boxClick(1)} className={msgType === 1 ? styles.personalItemSelect : styles.personalItemNormal }><img className={styles.messageTopItemIcon} src={require('../../assets/images/receiveMessage.png')}/>收件箱（0）</div>
            <div onClick={()=>this._boxClick(2)} className={ msgType === 2 ? styles.personalItemSelect : styles.personalItemNormal}><img className={styles.messageTopItemIcon} src={require('../../assets/images/sendMessage.png')}/>发件箱（0）</div>

            <div onClick={()=>this._boxClick(4)} className={msgType === 4 ? styles.personalItemSelect : styles.personalItemNormal}><img className={styles.messageTopItemIcon} src={require('../../assets/images/sendNewMessage.png')}/>发送新消息（0）</div>
            <div className={styles.blank}/>
          </div>

          {msgType !==4 && this._renderPersonalTop()}
          {msgType !==4 && this._renderSendMessageList()}

          {msgType !== 4 && <div className={styles.pageTurningContainer}>
            <div onClick={()=>{
              if(this.state.pageNo === 1){
                notification.info('已是第一页')
              }else{
                this._changePageClick(this.state.pageNo-1)
                this.setState({
                  pageNo:this.state.pageNo-1
                })
              }
            }} className={styles.turningBtn}>上一页</div>
            <div onClick={()=>{
              if(this.state.pageNo === pageSize || !pageSize){
                notification.info('已是最后一页')
              }else{
                this._changePageClick(this.state.pageNo+1)
                this.setState({
                  pageNo:this.state.pageNo+1
                })
              }
            }} className={styles.turningBtn} style={{marginLeft:15}}>下一页</div>
          </div>}
          {msgType === 4 && this._renderSendMessageForm()}
        </div>
    )
  }

  render() {
    const {msgType,showModal,showAddPeople, showSysDetail} = this.state
    const {msgList} = this.props
    return (
        <div className={styles.userContainer}>
          <div className={styles.topItemContainer}>
            <div className={msgType !== 3?styles.topItemNormal:styles.topItemSelected} onClick={()=>this._selectSys()}>系统消息</div>
            <div className={msgType !== 3?styles.topItemSelected:styles.topItemNormal} style={{marginLeft:'15px'}} onClick={()=>{this._selectPersonal()}}>个人消息</div>
          </div>
          <div className={styles.redLine}></div>
          {msgType === 3 &&
            <div className={styles.timeLineContainer}>
              <div className={styles.sysTimeLine}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.timeLineSys}>
                {this._renderSys(showSysDetail)}
              </div>
            </div>
          }
          {msgType !== 3 && this._renderPersonal()}
          {showModal && this._renderAddCardForm()}
          {showAddPeople && this._renderAddPeopleForm()}
        </div>
    );
  }
}

export default Form.create()(SystemMessage);
