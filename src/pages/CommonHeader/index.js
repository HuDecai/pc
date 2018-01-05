import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { dispatch } from '../../store';
const styles = require('./styles.css');
const styles2 = require('../../pages/Lottery/LotteryHeader.css');
const logo = require('../../assets/images/logo-text.png');
import BaseInfo from '../BaseInfo';
import OrderSelect from '../OrderSelect';
import AgentCenter from '../AgentCenter';
import FundManagement from '../FundManagement';
import * as UserAction from '../../actions/UserAction';
import { push, replace } from 'react-router-redux';
import Cookies from 'js-cookie';


class CommonHeader extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      userType: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    try {
      const type = this.props.location.search.split('&')[0].split('=')[1];
      const nextType = nextProps.location.search.split('&')[0].split('=')[1];
      const rightType = this.props.location.search.split('&')[1].split('=')[1];
      const nextRightType = nextProps.location.search.split('&')[1].split('=')[1];
      const userType = Cookies.get('type');
      if (type !== nextType || rightType !== nextRightType) {
        UserAction.changeType({ type: Number(nextType), rightType: Number(nextRightType) })
        this.setState({ userType });
      }
    } catch(e) {

    }
  }
  componentWillMount() {
    // 获取type值
    const type = this.props.location.search.split('&')[0].split('=')[1];
    const rightType = this.props.location.search.split('&')[1].split('=')[1];
    var isSys;
    var payAction;
    let serch_arr = this.props.location.search.split('&')[2]
    if(serch_arr){
      var search_dic = serch_arr.split('=')
      if(search_dic){
        if(search_dic[0] == 'isSys'){
          isSys = search_dic[1];
        }else if (search_dic[0] == 'payAction'){
          payAction = search_dic[1];
        }
      }
    }
    const userType = Cookies.get('type');
    UserAction.changeType({ type: Number(type), rightType: Number(rightType) })
    this.setState({ userType,isSys,payAction });
  }
  showContent(type) {
    const {isSys,payAction} = this.state
    const views = [];
    if(type === 1) {
      views.push(<BaseInfo rightType={this.props.checkedRigthType} isPerson={isSys}/>);
    }else if(type === 2) {
      views.push(<div key={2}><FundManagement payAction={payAction} rightType={this.props.checkedRigthType}/></div>);
    }else if(type === 3) {
      views.push(<div key={3}><OrderSelect rightType={this.props.checkedRigthType} /></div>);
    }else if(type === 4) {
      views.push(<div key={4}><AgentCenter rightType={this.props.checkedRigthType}/></div>);
    }
    return views;
  }
  render() {
    return (
      <div>
        <div className={styles.whiteHeader}>
          <div className={styles.container}>
            <div className={styles.logo} >
              <img src={logo} style={{ height: '33px'}} />
            </div>
            <div className={styles.nav}>
               <div className={this.props.checkedType === 1 ? styles.onUserCenter : styles.userCenter}
                  onClick={() => {
                    dispatch(replace('/user-info?type=1&rigthType=1'));
                    UserAction.changeType({ type: 1, rightType: 1 })
                  }}
                ><div style={{ marginLeft: '24px'}}>个人中心</div></div>
               <div className={this.props.checkedType === 2 ? styles.onMoneyGuanli : styles.moneyGuanli}
                  onClick={() => {
                    dispatch(replace('/user-info?type=2&rigthType=1'));
                    UserAction.changeType({ type: 2, rightType:1 })
                  }}
               ><div style={{ marginLeft: '24px'}}>资金管理</div></div>
               <div className={this.props.checkedType === 3 ? styles.onOrderSelect : styles.orderSelect}
                  onClick={() => {
                    dispatch(replace('/user-info?type=3&rigthType=1'));
                    UserAction.changeType({ type: 3, rightType: 1})
                  }}
               ><div style={{ marginLeft: '24px'}}>订单查询</div></div>
               {(this.state.userType == 1 || this.state.userType == 2|| this.state.userType == 5) ?
               <div className={this.props.checkedType === 4 ? styles.onDaili : styles.daili}
                  onClick={() => {
                    dispatch(replace('/user-info?type=4&rigthType=1'));
                    UserAction.changeType({ type: 4, rightType: 1 })
                  }}
               ><div style={{ marginLeft: '24px'}}>代理中心</div></div>: ''}
            </div>
          </div>
        </div>
        <div>
         {this.showContent(this.props.checkedType)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    checkedType: state.UserReducer.get('checkedType'),
    checkedRigthType: state.UserReducer.get('checkedRigthType'),
  };
};

export default connect(mapStateToProps)(CommonHeader);
