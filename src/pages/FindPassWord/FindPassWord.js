import React, { PropTypes } from 'react';
import * as FindPassWordAction from '../../actions/FindPassWordAction';
import CardLine from './CardLine';
import CardForm from './CardForm';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import * as styles from './style.css';
import { checkStat, getUserInfo, invalidateSession } from '../../core/api/login';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import Immutable from 'immutable';
const logo = require('../../assets/images/logo.png');
const phone = require('../../assets/images/login-phone.png');
const custom = require('../../assets/images/login-custom.png');
const login = require('../../assets/images/login.png');
const login1 = require('../../assets/images/login1.png');
const login2 = require('../../assets/images/login2.png');
const imgs = [login, login1, login2];
import Loading from '../../core/decorators/Loading';
import newWindows from '../../core/newWindow';
import Cookies from 'js-cookie';

var customerWindow = null;

@Loading(props => props.isFetching)
class FindPassWord extends React.PureComponent {
  static propTypes = {
    step: PropTypes.number,
    isFetching: PropTypes.bool,
    passWordInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      i: 0,
    };
  }
  componentWillMount() {
    this.setImg();
  }
  setImg() {
    const that = this;
    this.interval = setInterval(function(){
      let i = that.state.i;
      that.setState({ i: ++i % 3 });
    },5000);
  }
  submitAction = (dispatch: Function) => (params) => {
    FindPassWordAction.setPassword(params);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const usernames = Cookies.get('username');
      const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
    const showStepForm = (step) => {
      const views = [];
      if(step === 1){
        views.push(
          <FirstStep
             submitAction={this.submitAction(this.props.dispatch)}
             step={step}
          />);
      }else if(step === 2) {
        views.push(
          <SecondStep
              passWordInfo={this.props.passWordInfo}
              submitAction={this.submitAction(this.props.dispatch)}
              step={step}
          />);
      }else if(step === 3) {
        views.push(
          <CardForm
             submitAction={this.submitAction(this.props.dispatch)}
             step={step}
             passWordInfo={this.props.passWordInfo}
          />
        );
      }
      return views;
    }
    return (
      <div className={styles.loginContainer}>
      <div
         className={styles.bodyComponent}
         style={{ backgroundImage: `url(${imgs[this.state.i]})`,   backgroundSize: 'cover' }}
      >
           <div style={{ display: 'none' }}>
              <img src={login1} />
              <img src={login2} />
           </div>
           <div className={styles.content}>
           <div className={styles.header}>
               <div>
                  <img src={logo} width="100%" onClick={() => dispatch(push('/Login'))}/>
               </div>
                 <div className={styles.headerRight}>
                      <div
                         onClick={()=>{
                             Cookies.set('cc','');
                             newWindows(kflink, customerWindow);
                         }}
                      >
                         <img src={custom} />
                         <div style={{ color: '#fff', textAlign: 'center', fontSize: '11px', marginTop: '-4px'}}>客服</div>
                      </div>
                      <div style={{ marginLeft: '25px'}}>
                         <img src={phone} />
                         <div style={{ color: '#fff', textAlign: 'center', fontSize: '11px', marginTop: '-4px'}}>手机</div>
                      </div>
                 </div>
              </div>
               <div className={styles.contentBody}>
                   <div className={styles.contentHeader}>
                      密码重置 RESET PASSWORD
                   </div>
                   <div className={styles.contentHeaderLine}/>
                   <div className={styles.passContent}>
                       <CardLine
                          step={this.props.step}
                       />
                       {showStepForm(this.props.step)}
                   </div>
               </div>
           </div>
        </div>
      </div>
    );
  }
}

export default FindPassWord;
