/**
 * Created by hwh on 2017/10/26.
 */
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './style.css';
import { push, replace } from 'react-router-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox, Icon , Select ,notification } from 'antd';
import Cookies from 'js-cookie';

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option defaultValue="ddq" key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
class ChangePassWord extends React.PureComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            type: 1,
            loginPassEdit:false,
            moneyPassEdit:false,
            passQueEdit:true,
            personalSettings:true,
            hasSafePassword:Cookies.get('hasSafePassword') === 0 ? true : false,
            lastQuestionInfo:{}

        };
    }

    componentDidMount(){
      this._fetchQuestionInfo();

    }
    componentWillMount(){
        var urlStr=window.location.hash.split('?')[1];

        if(urlStr){
            urlStr=urlStr.split("&");

            const   loginPassEdits= urlStr[2]=="loginPassEdit"?true:false;
            this.setState({loginPassEdit:loginPassEdits});
            if(Cookies.get("hasSafePassword")==0){
                const  moneyPassEdits= urlStr[2]=="moneyPassEdit"?true:false;
                this.setState({loginPassEdit:loginPassEdits,moneyPassEdit:moneyPassEdits});
            }
            //dispatch(replace('/user-info?type=1&rigthType=2'));
            if($("#"+urlStr[3]).length!=0){
                const currTop=$("#"+urlStr[3]).offset();
                window.scrollTo(0,currTop.top);
        }else{
                window.scrollTo(0,0);
        }

        }

    }
    _fetchQuestionInfo(){
        BaseInfoAction.getQuestionInfo({})
    }
_fetchGetBaseInfo(){
    BaseInfoAction.getBaseInfo({})
}

    _textChange(e){
        textChangeValue = e.target.value
    }


    _handleSubmit(e,type,pass,emails){
        e.preventDefault()
        const {validateFields} = this.props.form;
        var tstemail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var tstqq=/^[1-9][0-9]{4,}$/;
        var tstwx=/^([-_a-zA-Z0-9]{5,19})+$/;
        switch (type){
            case 'personalSettings':

                    validateFields(['personal_name','personal_nikname','tx_password','tx_new_password','personal_email','personal_qq','personal_wx'],(error,values)=> {
                        if (!!error) return;
                        if(pass) {
                            if (!values['personal_name']) {
                                notification['error']({
                                    message: '请输入提现人姓名',
                                });
                                return
                            } else if (!values['tx_password']) {
                                notification['error']({
                                    message: '请输入提现密码',
                                });
                                return
                            } else if (values['tx_password'].length < 6) {
                                notification['error']({
                                    message: '密码长度必须大于6为',
                                });
                                return
                            } else if (!values['tx_new_password']) {
                                notification['error']({
                                    message: '请输入确认提现密码',
                                });
                                return
                            } else if (values['tx_new_password'] < 6) {
                                notification['error']({
                                    message: '密码长度必须大于6为',
                                });
                                return
                            }
                        }
                        if (values['personal_email'] == undefined || $.trim(values['personal_email']) == "") {
                        } else {
                            if (!tstemail.test(values['personal_email'])) {
                                notification['error']({
                                    message: '邮箱格式不正确',
                                });
                                return
                            }
                        }
                        if (values['personal_qq'] == undefined || $.trim(values['personal_qq']) == "") {
                        } else {
                            if (!tstqq.test(values['personal_qq'])) {
                                notification['error']({
                                    message: 'QQ号格式不正确',
                                });
                                return
                            }
                        }
                        if (values['personal_wx'] == undefined || $.trim(values['personal_wx']) == "") {
                        } else {
                            if (!tstwx.test(values['personal_wx'])) {
                                notification['error']({
                                    message: '微信号格式不正确',
                                });
                                return
                            }
                        }

                        const nikname=values['personal_nikname']?values['personal_nikname']:"";
                        const personalemail=values['personal_email']?values['personal_email']:"";
                        const personalqq=values['personal_qq']?values['personal_qq']:"";
                        const personalwx=values['personal_wx']?values['personal_wx']:"";
                        if(pass){
                            let param={realName:values['personal_name'],nickName:nikname,safePwd:values['tx_password'],email:personalemail,qq:personalqq,wx:personalwx,};
                            BaseInfoAction.updateBaseInfo(param);

                        }else{
                            if(emails){
                                let param={nickName:nikname,qq:personalqq,wx:personalwx,};
                                BaseInfoAction.updateBaseInfo(param);
                            }else{
                                let param={nickName:nikname,email:personalemail,qq:personalqq,wx:personalwx,};
                                BaseInfoAction.updateBaseInfo(param);
                            }
                        }

                    })
                break
            case 'loginPass':
                validateFields(['original_password','new_password','re_new_password'],(error,values)=>{
                    if(!!error){
                        return;
                    }
                    if(!values['re_new_password']){
                        notification['error']({
                            message: '请再次输入新密码',
                        });
                        return
                    }
                    let param = {oldPassword:values['original_password'],newPassword:values['new_password'],checkNewPassword:values['re_new_password']}
                    BaseInfoAction.updateLoginPassword(param);
                })
                break
            case 'moneyPass':
                validateFields(['money_original_password','money_new_password','money_re_new_password'],(error,values)=>{
                    if(!!error){
                        return;
                    }
                    if(!values['money_re_new_password']){
                        notification['error']({
                            message: '请再次输入新密码',
                        });
                        return
                    }
                    var param = {newPassword:values['money_new_password'],checkNewPassword:values['money_re_new_password']};
                    let oldPassword = values['money_original_password'];

                    if(oldPassword){
                        param.oldPassword = oldPassword;
                    }
                    BaseInfoAction.updateMoneyPassword(param);
                })
                break
            case 'passQue':
                validateFields(['question1','answer1','question2','answer2'],(error,values)=>{


                    if(!!error){
                        return;
                    }
                    if(!values['question1']){
                        notification['error']({message: '请选择密保问题一',}); return;
                    }else if(!values['answer1']){
                        notification['error']({message: '请输入密保问题一答案',}); return;
                    }else if(!values['question2']){
                        notification['error']({message: '请选择密保问题二',}); return;
                    }else if(!values['answer2']){
                        notification['error']({message: '请输入密保问题二答案',}); return;
                    }
                    let param = {question1:values['question1'],answer1:values['answer1'],question2:values['question2'],answer2:values['answer2']}
                    let json_param = {questionJson:JSON.stringify(param)}
                    BaseInfoAction.updateQueInfo(json_param);

                })
                break
        }
        this.props.form.resetFields();
    }

    _submitPassword(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            this.setState({ visible: false });
        });
    }

    _checkSafePass(rule,value,callback){
        if(value){
            BaseInfoAction.checkSafePassword({checkSafePassword:value},(bool)=>{
                if (!bool){
                    callback('原密码错误')
                }else{
                    callback()
                }
            })
        }
    }

    _checkPassQueCommon(rule,value,callback){
        const {form} = this.props;
       // console.log('check_value',value,form.getFieldValue('question2'))
        if(value && value === form.getFieldValue('question1')){

            callback('密保问题不能重复')
        }else{
            callback()
        }
    }

    checkPass(pass_ref,repass_ref,rule, value, callback) {
        const {form} = this.props;
        // this.getPassStrenth(value, 'pass');

        if (form.getFieldValue(pass_ref)) {
            form.validateFields([repass_ref], { force: true });
        }

        callback();
    }

    checkPass2(pass_ref,rule, value, callback) {

        const form = this.props.form;
        // this.getPassStrenth(value, 'rePass');

        if (value && value !== form.getFieldValue(pass_ref)) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    _renderQuestionChildren(){
        const {questionInfo} = this.props

        if (questionInfo && questionInfo.length > 0){

            return questionInfo.map((item,index)=>{
                return (<Option defaultValue={item.question} key={item.question} >{item.question}</Option>)
            })
        }
    }

    passQueDetail(){
        // if(!this.state.passQueEdit){
        //     this._fetchQuestionInfo()
        // }
        this.setState({
            passQueEdit:!this.state.passQueEdit
        })
    }
    userExisit(rule,value,callback){
        if(!value){
            callback();
        }
    }
    _renderSafePassword(user){
        // var urlStr=window.location.hash.split('?')[1];
        // if(urlStr){
        //     urlStr=urlStr.split("&");
        //     const  moneyPassEdits= urlStr[2]=="moneyPassEdit"?true:false;
        //     const   loginPassEdits= urlStr[2]=="loginPassEdit"?true:false;
        //     this.setState({moneyPassEdit:moneyPassEdits,loginPassEdit:loginPassEdits});
        //     //dispatch(replace('/user-info?type=1&rigthType=2'));
        //     const sss=$("#"+urlStr[3]).offset();
        //     window.scrollTo(0,sss.top)
        // }
    }

    render() {

        const { getFieldDecorator,getFieldProps,getFieldError,isFieldValidating } = this.props.form;
        const {questionInfo} = this.props;
        if (!questionInfo){
            return false
        }
        const {user} = this.props;
        if (!user){
            return false
        }
        const userEmail=user.email?true:false;
       const userRealNameBool=user.userRealName?true:false;
        const hasSafe=Cookies.get("hasSafePassword")!=1?true:false;
        const questionBool=user.secQuestions?true:false;


        const {passQueEdit,hasSafePassword, personalSettings,moneyPassEdit,loginPassEdit } = this.state;
        var lastQuestionInfo;
        if(user.secQuestions){
          lastQuestionInfo = JSON.parse(user.secQuestions);
        }
        try {


        }catch(e) {

        }
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 1,offset:0},
            style :{marginTop:10,marginBottom:1}
        };
        const longItemLayout = {
            labelCol: { span: 9},
            wrapperCol: { span: 1 ,offset:0},
            style :{marginTop:10,marginBottom:1}
        };
        const selectItemLayout = {
            labelCol: { span: 9},
            wrapperCol: { span: 1 ,offset:0},
            style :{marginTop:10,marginBottom:1}
        };
        const questionInfoLayout = {
            labelCol: { span: 9},
            wrapperCol: { span: 1 ,offset:0},
            style :{marginTop:10,marginBottom:1}
        };
        const personalSettingsFor = {
            labelCol: { span: 9 },
            wrapperCol: { span: 1,offset:0},
            style :{marginTop:10,marginBottom:0}
        };
        const personalSettingsFor1 = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14}
        };
        return (
            <div className={styles.userContainer}>

                <div className={styles.infoContent}>
                    <div className={styles.infoType}>个人设置</div>
                    {/*<div className={styles.pointer}*/}
                        {/*onClick={()=>{*/}

                           {/*//dispatch(replace('/user-info?type=1&rigthType=2'));*/}
                            {/*this.setState({*/}
                                {/*personalSettings:!this.state.personalSettings*/}
                            {/*});*/}

                        {/*}}*/}
                    {/*style={{color:'#de3c4b',width:40}}>{personalSettings?'取消':'修改'}</div>*/}
                </div>
                <div className={styles.dashed}></div>
                {/*{personalSettings &&*/}
                <Form horizontal className="dcsettings" onSubmit={() => this._handleSubmit()} style={{ width: '100%'}}>
                    {!userRealNameBool&&
                    <FormItem {...personalSettingsFor1} label="提现人姓名" >
                        {getFieldDecorator('personal_name', {
                            rules: [{ required: false, message: '请填写提现人姓名!' }]
                        })(

                            <Input type="text"   placeholder="请填写提现人姓名" />
                        )}

                    </FormItem>}

                    <FormItem {...personalSettingsFor1} label="昵称" >
                        {getFieldDecorator('personal_nikname', {
                            rules: [{ required: false, message: '昵称!' }]
                        })(
                            <Input type="text"   placeholder="昵称" />
                        )}

                    </FormItem>
                    {!hasSafe&&
                    <FormItem {...personalSettingsFor1} label="提现密码" >
                        {getFieldDecorator('tx_password', {
                            rules: [{ required: false, message: '请填写你的提现密码!' },
                                { validator: this.checkPass.bind(this,"tx_password",'tx_new_password') }],
                        })(
                            <Input type="password"  placeholder="请输入提现密码" />
                        )}

                    </FormItem>}
                    {!hasSafe&&
                    <FormItem {...personalSettingsFor1} label="确认提现密码" >
                        {getFieldDecorator('tx_new_password', {
                            rules: [
                                //{ required: false, message: '请再次输入新密码!' },
                                { validator: this.checkPass2.bind(this,"tx_password") }
                            ],

                        })(
                            <Input type="password"  placeholder="请输入确认提现密码" />
                        )}

                    </FormItem>}

                    {!userEmail&&
                    <FormItem {...personalSettingsFor1} label="邮箱账号" >
                        {getFieldDecorator('personal_email', {
                            rules: [
                                { required: false, message: '请再次输入邮箱账号!' }
                            ],

                        })(
                            <Input type="text"  placeholder="请输入邮箱账号" />
                        )}

                    </FormItem>}

                    <FormItem {...personalSettingsFor1} label="QQ号码" >
                        {getFieldDecorator('personal_qq', {
                            rules: [
                                { required: false, message: '请输入QQ号码!' }
                            ],

                        })(
                            <Input type="text"  placeholder="请输入QQ号码" />
                        )}

                    </FormItem>

                    <FormItem {...personalSettingsFor1} label="微信号码" >
                        {getFieldDecorator('personal_wx', {
                            rules: [
                                { required: false, message: '请输入微信号码!' }
                            ],

                        })(
                            <Input type="text"  placeholder="请输入微信号码" />
                        )}

                    </FormItem>
                        <div onClick={(e)=>this._handleSubmit(e,'personalSettings',!userRealNameBool,userEmail)} className={styles.submitBtn}>保存</div>

                </Form>


                {!questionBool&&<div>
                <div className={styles.infoContent} id="mibao">
                    <div className={styles.infoType} style={{marginTop:10}}>密保问题修改</div>

                </div>
                <div className={styles.dashed}></div>
                 <Form className="dcsettings" onSubmit={() => this._handleSubmit()} style={{ width: '100%'}}>
                    <FormItem {...personalSettingsFor1} label="密保问题一" >
                        {getFieldDecorator('question1', {
                            rules: [{ required: false, message: '请选择您的第一个密保问题!' }],
                            // initialValue:lastQuestionInfo && lastQuestionInfo.question1 || ''

                        })(
                            <Select
                                size="small"
                                placeholder="请选择"
                                style={{ width: '304px', height:'32px' }}
                            >
                                {this.props.questionInfo && this._renderQuestionChildren()}
                            </Select>
                        )}

                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="答案">
                        {getFieldDecorator('answer1', {
                            rules: [
                                { required: false, message: '请输入答案一' },
                                { validator: this.checkPass.bind(this,"money_new_password","money_re_new_password") }
                            ],
                            initialValue:lastQuestionInfo && lastQuestionInfo.answer1 || ''

                        })(
                            <Input type="text"  placeholder="请输入答案一" />
                            // <input style={{padding:'0 8px',height:'32px',width:304, marginLeft: '-2px'}} />

                        )}
                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="密保问题二" >
                        {getFieldDecorator('question2', {
                            rules: [
                                { required: false, whitespace:true, message: '请选择密保问题二' },
                                { validator: this._checkPassQueCommon.bind(this) }
                            ],
                            // initialValue:lastQuestionInfo && lastQuestionInfo.question2 || ''
                        })(
                            <Select
                                placeholder="请选择"

                                style={{ width: '304px', height:'32px' }}
                            >
                                {this.props.questionInfo && this._renderQuestionChildren()}
                            </Select>
                        )}

                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="答案" >
                        {getFieldDecorator('answer2', {
                            rules: [
                                { required: false, whitespace:true, message: '请输入答案!' }

                            ],
                            initialValue:lastQuestionInfo && lastQuestionInfo.answer2 || ''
                        })(
                            <Input type="text"  placeholder="请输入答案二" />
                            // <input style={{padding:'0 8px', height:'32px', width:304,marginLeft: '-2px'}} />
                        )}

                    </FormItem>
                    <div onClick={(e)=>this._handleSubmit(e,'passQue')} className={styles.submitBtn} >保存</div>
                </Form>

                </div>}

                <div className={styles.infoContent} id="loginDiv">
                    <div className={styles.infoType} style={{marginTop:10}}>【登入密码修改】</div>
                    <div className={styles.pointer} onClick={()=>
                    {
                        this.setState({loginPassEdit:!this.state.loginPassEdit});
                        //dispatch(replace('/user-info?type=1&rigthType=2'));
                    }

                    } style={{color:'#de3c4b',width:40}}>{loginPassEdit?'取消':'修改'}</div>          </div>
                <div className={styles.dashed}></div>
                {loginPassEdit &&
                <Form className="dcsettings" onSubmit={() => this._handleSubmit()} style={{ width: '100%'}}>
                    <FormItem {...personalSettingsFor1} label="原密码">
                        {getFieldDecorator('original_password', {
                            rules: [{ required: false, message: '请填写你原密码!' }]
                        })(

                            <Input type="password"  placeholder="请填写你原密码" />
                        )}

                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="新密码" >
                        {getFieldDecorator('new_password', {
                            rules: [
                                { required: false, message: '请填写你的新密码!' },
                                { validator: this.checkPass.bind(this,'new_password','re_new_password') }
                            ],
                        })(
                            <Input type="password"  placeholder="请填写你的新密码" />
                        )}
                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="再次输入新密码" >
                        {getFieldDecorator('re_new_password', {
                            rules: [
                                // { required: true, whitespace:true, message: '请再次输入新密码!' },
                                { validator: this.checkPass2.bind(this,"new_password") }
                            ],

                        })(
                            <Input type="password"  placeholder="请再次输入新密码" />
                        )}

                    </FormItem>

                    <div onClick={(e)=>this._handleSubmit(e,'loginPass')} className={styles.submitBtn}>提交</div>
                </Form>
                }
                {userRealNameBool&&<div>
                <div className={styles.infoContent} id="safepassword">
                    <div className={styles.infoType} style={{marginTop:10}}>【资金密码修改】</div>

                    <div className={styles.pointer} onClick={()=>{
                        this.setState({
                            moneyPassEdit:!this.state.moneyPassEdit
                        })

                   // dispatch(replace('/user-info?type=1&rigthType=2'));
                    }
                    } style={{color:'#de3c4b',width:40,marginTop:10}}>
                        {moneyPassEdit?'取消':'修改'}
                    </div>
                </div>
                <div className={styles.dashed}></div>

                {moneyPassEdit &&
                <Form className="dcsettings" onSubmit={() => this._handleSubmit()} style={{ width: '100%'}}>
                     <FormItem {...personalSettingsFor1} label="原密码：" >
                        {getFieldDecorator('money_original_password', {
                            rules: [{ required: false, message: '请填写你原密码!' }
                            ],

                        })(
                            <Input type="password"  placeholder="请填写你原密码" />

                        )}

                    </FormItem>



                    <FormItem {...personalSettingsFor1} label="新密码：" >
                        {getFieldDecorator('money_new_password', {
                            rules: [
                                { required: false, message: '请填写你的新密码!' },
                                { validator: this.checkPass.bind(this,"money_new_password","money_re_new_password") }
                            ],
                        })(
                            <Input type="password"  placeholder="请填写你的新密码" />

                        )}
                    </FormItem>


                    <FormItem {...personalSettingsFor1} label="再次输入新密码：" >
                        {getFieldDecorator('money_re_new_password', {
                            rules: [
                                // { required: true, whitespace:true, message: '请再次输入新密码!' },
                                { validator: this.checkPass2.bind(this,"money_new_password") }
                            ],

                        })(
                            <Input type="password"  placeholder="请再次输入新密码" />
                        )}

                    </FormItem>

                    <div onClick={(e)=>this._handleSubmit(e,'moneyPass')} className={styles.submitBtn} >提交</div>
                </Form>
                }
                </div>}

            </div>
        );
    }
}

export default Form.create()(ChangePassWord);
