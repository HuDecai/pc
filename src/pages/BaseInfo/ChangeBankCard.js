/**
 * Created by hwh on 2017/10/25.
 */
/**
 * Created by hwh on 2017/10/24.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
// import LoginCard from './LoginCard.js';
import * as styles from './style.css';
import { push,replace } from 'react-router-redux';
import { dispatch } from '../../store';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import { Form, Input, Button, Checkbox, Icon ,Select ,message} from 'antd';
import Cookies from  'js-cookie';
const FormItem = Form.Item;

const Option = Select.Option;
const bankList = [{ICBC:'中国工商银行'},{BOC:'中国银行'},{CCB:'中国建设银行'},{ABC:'中国农业银行'},{CIB:'兴业银行'},{CMBC:'招商银行'}
,{CMBCS:'中国民生银行'},{PSBC:'邮政储蓄银行'},{BOCOM:'交通银行'}]
const children = bankList.map((item,index)=>{
  return (<Option placeholder="请选择银行" key={Object.keys(item)[0]}>{item[Object.keys(item)[0]]}</Option>)
})

// @Loading(props => props.isFetching)
class ChangeBankCard extends React.PureComponent {
  static propTypes = {
    errMsg: PropTypes.string,
    userInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      addCarMode:false,
      formMessage:[],
      cities: [],
      secondCity: '',
    }
  }

  _fetchData(){
    BaseInfoAction.getBankCard()
  }

  _addCard(){
    console.log('addaCar')
    this.setState({
      addCarMode:true
    })
  }

  _deleteCard(id){
    BaseInfoAction.deleteBankCard({id})
  }

  componentDidMount(){
    this._fetchData()
  }

  _textChange(e){

  }
_alertPop(){
    return (

        Cookies.get('hasSafePassword')==1?<div className={styles.alertBarRed} >您还没有绑定真实姓与名资金密码！请到资料修改绑定个人真实姓名与资金密码。</div>:<div className={styles.alertBar} >请如实填写以下信息，用于绑定银行卡</div>

    );
}
  _bindCard(e){
    e.preventDefault();
    const {validateFields} = this.props.form;
    console.log('validateFields', validateFields);
      if(Cookies.get('hasSafePassword')==1){
          dispatch(replace(`/user-info?type=1&rigthType=2`));
          return false;
      }
    validateFields((errors,values)=>{
      if (!!errors){
        console.log('error in Form');
        return;
      }
      var bankCardArea = '';
      var param = {}
      let keys = Object.keys(values)
      for (var key of keys) {
        switch (key) {
          // case 'province':
          //   bankCardArea += values[key]
          //   break
          // case 'city':
          //   bankCardArea += values[key]
          // 
          //   break
          case 'detail':
            bankCardArea += values[key]
            break
          default:
            param[key] = values[key]
            break
        }
      }
      let province;
      let city;
      let str;
      if(values['province'] && values['city']) {

        const result = this.props.provinceAndCity && this.props.provinceAndCity.toJS();
        result.map((res, index) => {
          if(res.id == values['province']) {
            province = res.name;
          }
          if(res.name == values['city']) city = res.id;
        });
          str = {[values['province'].toString()]:province,[city]:values['city']};
      }

      bankList.forEach((item,index)=>{
        if(item[values["userCardBankId"]]){
          param['userCardBankName'] = item[values["userCardBankId"]]
        }
      });
    
      param['bankCardArea'] = bankCardArea;
      param['areaJson'] = JSON.stringify(str);
      console.log('param', param);
      BaseInfoAction.addBankCard(param,()=>{
        message.info('绑定成功')
        this.setState({
          addCarMode:false
        })
      });
    })
  }
_bankImg(name){
      const bankimg=[];
      switch (name){
          case "中国银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_04.png')}/>);
              break;
          case "中国工商银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_icbc.png')}/>);
              break;
          case "中国建设银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_07.png')}/>);
              break;
          case "中国农业银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_02.png')}/>);
              break;
          case "兴业银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_08.png')}/>);
              break;
          case "招商银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_10.png')}/>);
              break;
          case "中国民生银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_05.png')}/>);
              break;
          case "邮政储蓄银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_yz.png')}/>);
              break;
          case "交通银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_09.png')}/>);
              break;
          case "平安银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_04.png')}/>);
              break;
          case "广发银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_01.png')}/>);
              break;
          case "中信银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_06.png')}/>);
              break;
          case "浦发银行":
              bankimg.push(<img className={styles.bankLogo} src={require('../../assets/images/cooperative_pf.png')}/>);
              break;
      }
      return bankimg;
}
  _renderBank(list){
    const {card_datas,editCard_index} = this.state
    // console.log('bankList',list)
    // console.log('edit_card',Array.prototype.slice.call(list[0].card,0).map((item,index)=>{
    //   return item + '1'
    // }).join(''))
    return list.map((item,index)=>{
      return(
          <div key={item.id} className={styles.bankContainer} style={{flexWarp:'wrap'}}>
            <div className={styles.titleView}>
              <div style={{display:'flex'}}>
                  {this._bankImg(item.attrName)}
                <div>{item.attrName}</div>
              </div>
              <div>已绑定</div>
            </div>
            <div className={styles.dashed} style={{marginTop:'0px'}}></div>
            <div className={styles.contentView}>
              <img className={styles.bankLogo} src={require('../../assets/images/cardIcon.png')}/>
              <div>{Array.prototype.slice.call(item.card,0).map((item,index)=>{
                if(index !== 0 && index % 4 === 0){
                  return item+' '
                }else{
                  return item
                }
              }).join('')}</div>
            </div>

            {editCard_index === index ?
            <div className={styles.bottomFuncView}>
              <span onClick={()=>{
                this._deleteCard(item.id)
              }} className={styles.bottomFuncText} style={{ width: 70 }}>删除该卡</span>
              <span onClick={()=>{
                this.setState({
                  editCard_index:undefined
                })
              }} className={styles.bottomFuncText}>取消</span>
            </div> : <div className={styles.bottomFuncView}><span onClick={()=>{
              console.log('index',index);
                  this.setState({
                    editCard_index:index
                  })
                }} className={styles.bottomFuncText}>管理</span></div>}

          </div>
      )
    })

  }

  _renderAddCard() {


      return (

            <div
                onClick={() => this._addCard()}
                className={styles.addCardContainer}>
              <img
                  src={require('../../assets/images/addCard.png')}/>
              <div
                  style={{
                      color: '#de3c4b',
                      fontSize: 14,
                      marginTop: 10
                  }}>
                添加银行卡
              </div>
            </div>
      )

  }

  _handleChange(){

  }
  _renderNormalForm(){
    return(
        <div>
          <div className={styles.formContainer}>
            <div>选择银行</div>
            <Select
                defaultValue="中国邮政储蓄银行"
                onChange={()=>this._handleChange()}
                style={{ width: '193px', height:'32px' ,marginLeft:'30px'}}
            >
              {children}
            </Select>
          </div>

          <div className={styles.formContainer}>
            <div>开户行 </div>
            <Input onChange={(e)=>this._textChange(e)} style={{width:'85px',height:'32px',marginLeft:'42px'}} placeholder={"省份"} />
            <div style={{marginLeft:8}}>省</div>
            <Input onChange={(e)=>this._textChange(e)} style={{width:'85px',height:'32px',marginLeft:'8px'}} placeholder={"城市"} />
            <div style={{marginLeft:8}}>省</div>
            <Input onChange={(e)=>this._textChange(e)} style={{width:'145px',height:'32px',marginLeft:'8px'}} placeholder={"xx分行"} />

          </div>

          <div className={styles.formContainer}>
            <div>银行卡卡号</div>
            <Input onChange={(e)=>this._textChange(e)} style={{width:'193px',height:'32px',marginLeft:'18px'}} placeholder={"请输入您的银行卡卡号"} />
          </div>

          <div className={styles.formContainer}>
            <div>资金密码</div>
            <Input onChange={(e)=>this._textChange(e)} style={{width:'193px',height:'32px',marginLeft:'30px'}} placeholder={"请输入您的姓名"} />
          </div>

          <div className={styles.bindBtn}>绑定</div>
        </div>
    )
  }
  handleProvinceChange = (value) => {
    const result = this.props.provinceAndCity && this.props.provinceAndCity.toJS();
    const cities = result.filter(item => item.level === 2).map(item => ({ pid: item.pid, label: item.name, value: item.id }));
    const cityData = cities.filter((city) => city.pid == value);
    const { getFieldValue, setFieldsValue } = this.props.form;
    setFieldsValue({city: cityData[0].label});
    this.setState({
      cities: cityData,
    });
  }
  _renderAddCardForm(names){
    const result = this.props.provinceAndCity && this.props.provinceAndCity.toJS();
    const provinces = result.filter(item => item.level === 1).map(item => ({ id: item.id, label: item.name, value: item.id }));
    const cities = result.filter(item => item.level === 2).map(item => ({ pid: item.pid, label: item.name, value: item.id }));
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const provinceOptions = provinces.map(province => <Option key={province.id}>{province.label}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city.label} title={city.label}>{city.label}</Option>);
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 17}
    };
    return(
      <div>
        <div className={styles.maskView}></div>
        <div className={styles.addCardForm}>
          <div className={styles.cardFormTitle}>添加银行卡
            <div
              onClick={()=>{
                this.setState({
                  addCarMode:false
                })
              }}
              className={styles.closeEditBtnBorder}
            >
              <img
                className={styles.closeEditBtn}
                src={require('../../assets/images/closeCardEdit.png')}
              />
            </div>
          </div>
          <div className={styles.dashed}></div>
            {this._alertPop()}

          <Form className={styles.sendMessageFormItem} onSubmit={() => this._handleSubmit()}>

            <FormItem>
              <view className={styles.provinceForm}>
                <view className={styles.formLabel}>
                  真实姓名
                </view>
                <div className={styles.provinceAndCity}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '\t' }],
                      initialValue:names
                  })(
                      <Input className={styles.bankFormInput}  disabled="true" />
                  )}
                </div>
              </view>
            </FormItem>

            <FormItem style={{marginTop:'-15px'}}>
              <view className={styles.provinceForm}>
                <view className={styles.formLabel}>
                  选择银行
                </view>
                <div className={styles.provinceAndCity}>
                  {getFieldDecorator('userCardBankId', {
                    rules: [{ required: true, message: '\t' }],
                  })(
                    <Select
                        placeholder="选择银行"
                      className={styles.bankFormInput}
                      style={{ width: '193px', height:'32px'}}
                    >
                      {children}
                    </Select>
                  )}
                </div>
              </view>
            </FormItem>
          </Form>
          <Form style={{width:'548px', height: 32, marginTop: '-15px' }}>
            <view
              className={styles.provinceForm}
            >
              <view className={styles.formLabel}>
                开户行
              </view>
              <div className={styles.province}>
                <FormItem>
                <div className={styles.provinceAndCity}  style={{ height: 32, width: 90, marginTop: 24 }}>
                  {getFieldDecorator('province', {
                    rules: [{ required: true, message: '\t' }],
                  })(
                    <Select
                      size="default"
                      placeholder="省份"
                      style={{ width:'86px' }}
                      onChange={this.handleProvinceChange}
                    >
                      {provinceOptions}
                    </Select>
                  )}
                </div>
                </FormItem>
                <div>省&nbsp;</div>
              </div>
              <FormItem>
              <div className={styles.provinceAndCity} style={{ height: 32, width: 90, marginTop: 24  }}>
                {getFieldDecorator('city', {
                  rules: [{ required: true, message: '\t' }]
                })(
                  <Select
                    placeholder="城市"
                    style={{width:'86px'}}
                  >
                    {cityOptions}
                  </Select>
                )}
              </div>
              </FormItem>
              <div>市&nbsp;</div>
              <FormItem>
              <div className={styles.provinceAndCity} style={{ height: 32, width: 90, marginTop: 24  }}>
                {getFieldDecorator('detail', {
                  rules: [{ required: true, whitespace: true,message: '\t' }],
                })(
                  <Input style={{width:'145px'}} className={styles.bankFormInput} placeholder={"XX分行"} />
                )}
              </div>
              </FormItem >
            </view>
          </Form>
          <Form className={styles.sendMessageFormItem} onSubmit={() => this._handleSubmit()}>
            <FormItem >
              <view className={styles.provinceForm}>
                <view className={styles.formLabel}>
                  银行卡号
                </view>
                <view className={styles.provinceAndCity}>
                {getFieldDecorator('cardNumber', {
                  rules: [{ required: true, whitespace: true, message: '\t' }],
                })(
                    <Input className={styles.bankFormInput} style={{width:'193px',height:'32px'}} placeholder={"请输入您的银行卡号"} />

                )}
                </view>
              </view>
            </FormItem>

            <FormItem style={{marginTop:'-15px'}}>
              <view className={styles.provinceForm}>
                <view className={styles.formLabel}>
                  资金密码
                </view>
                <view className={styles.provinceAndCity}>
                  {getFieldDecorator('safePassword', {
                    rules: [{ required: true, message: '\t' }],
                  })(
                      <Input type="password" className={styles.bankFormInput} style={{width:'213px',height:'32px'}} placeholder={"请输入您的资金密码"} />
                  )}
              </view></view>
            </FormItem>
            <div onClick={(e)=>{this._bindCard(e)}} className={styles.bindBtn2}>绑定</div>
          </Form>

        </div>
      </div>

    )
  }

  render() {
    const {bankCardList} = this.props;
    const {addCarMode} = this.state;
      const {user} = this.props;
      if (!user){
          return false
      }
      const parm=  window.location.hash.split('?')[1].split('&')[2];
      parm=="bankCardList"?window.scrollTo(0,0):{};
    return (
        <div className={styles.userContainer}>
          <div className={styles.infoType}>【我的银行卡】</div>
          <div className={styles.dashed}></div>

          <div className={styles.cardsContainer}>
            {bankCardList && bankCardList.length > 0 && this._renderBank(bankCardList)}
            {(bankCardList && bankCardList === 5) || this._renderAddCard()}
          </div>
          {addCarMode && this._renderAddCardForm(user.userRealName)}

        </div>
    );
  }
}

export default Form.create()(ChangeBankCard);
