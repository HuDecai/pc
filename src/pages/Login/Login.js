import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Speed from './Speed';
import LoginCard from './LoginCard.js';
import * as styles from './style.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import * as UserAction from '../../actions/UserAction';
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
class Login extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    errMsg: PropTypes.string,
    userInfo: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      i: 0,
    };
  }
  componentWillMount() {
    UserAction.clearSpeed();
    UserAction.getDomainList();
    // if(this.props.domainList && this.props.domainList.count()) {
    //   this.props.domainList.map(item => {
    //     UserAction.speedTest({ name: item.get('name'), url: item.get('url') });
    //   })
    // }
    this.setImg();
  }
    componentWillReceiveProps(nextProps) {
      if(this.props.domainList !== nextProps.domainList) {
        // console.log(JSON.stringify(nextProps.domainList))
        UserAction.clearSpeed();
        nextProps.domainList.map(item => {
          UserAction.speedTest({ name: item.get('name'), url: item.get('url') });
        })
      }
    }
  setImg() {
    const that = this;
    this.interval = setInterval(function(){
      let i = that.state.i;
      that.setState({ i: ++i % 3 });
    },5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
      const usernames = Cookies.get('username');
      const kflink=usernames?`${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1`:`${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1`;
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
                      <img src={logo} width="100%" />
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
                       <div style={{ marginLeft: '25px'}}  onClick={() => dispatch(push('/mobile-page?showNav=no'))}>
                         <img src={phone} />
                         <div style={{ color: '#fff', textAlign: 'center', fontSize: '11px', marginTop: '-4px'}}>手机</div>
                       </div>
                   </div>
               </div>
               <div className={styles.contentBody}>
                   <Speed timeSpeed={this.props.timeSpeed} domainList={this.props.domainList} />
                   <LoginCard
                     errMsg={this.props.errMsg}
                     dispatch={this.props.dispatch}
                   />
               </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Login;
