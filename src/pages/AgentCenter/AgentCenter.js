import React from 'react';
import * as styles from './styles.css';
import TuiGuang from './TuiGuang';
import AddUser from './AddUser';
import TeamRemaining from './TeamRemaining';
import AddUserSuccess from './AddUserSuccess';
import UserManage from './UserManage';
import TeamAgent from './TeamAgent';
import TeamZhangBian from './TeamZhangBian';
import LowerLevelBetting from './LowerLevelBetting';
import StatisticalReport from './StatisticalReport';
import Loading from '../../core/decorators/Loading';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import * as UserAction from '../../actions/UserAction';
import * as OrderSelectAction from '../../actions/OrderSelectAction';
import { push,replace } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

// 加loading
@Loading(props => props.isFetching)
class AgentCenter extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      // rightType1: this.props.checkedRigthType,  // 1是用户管理  2 是团队报表  3 团队帐变
      rightType2: 0,
      tuiguangVisible: false,
      addUserVisible: false,
      addSuccess: false,
    };
  }
  componentWillMount() {
    // 根据登录用户获取返点列表范围 和 香港彩返点列表
    AgentCenterAction.updateCaipiaoFandian({ rebate: Cookies.get('rebate') });
    AgentCenterAction.updateHongKongFandian({ hkRebate: Cookies.get('hk6Rebate')});
      OrderSelectAction.getBargainType({});

  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isAddUserSuccess !== nextProps.isAddUserSuccess) {
      this.setState({ addSuccess: nextProps.isAddUserSuccess, addUserVisible: false });
    }
  }
  changUrlType(rightType) {
    UserAction.changeType({ type: 4, rightType });
    dispatch(replace(`/user-info?type=4&rightType=${rightType}`));
  }
  render() {
    const rightType1 = this.props.checkedRigthType;
    const rightType2 = this.state.rightType2;
    const userInfo = {
      rebate: Cookies.get('rebate'),
      type: Cookies.get('type'),
      hkRebate: Cookies.get('hk6Rebate'),
    }
    const showContent = (rightType1) => {
      const views = [];
      if(rightType1 == 1) {
        views.push(
          <UserManage
            userList={this.props.userList}
            userInfo={userInfo}
            caiPiaoFandian={this.props.caiPiaoFandian}
            hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}
          />
        );
      }else if(rightType1 == 6) {
        views.push(
          <TeamAgent
             teamList={this.props.teamList}
             teamTotal={this.props.teamTotal}
             genRenList={this.props.genRenList}
             genRenTotal={this.props.genRenTotal}
          />
        );
      }else if(rightType1 == 2) {
          views.push(
              <AddUser
                  caiPiaoFandian={this.props.caiPiaoFandian}
                  hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}
                  isAddUserSuccess={this.props.isAddUserSuccess}

              />
          );
      }else if(rightType1 == 3) {
          views.push(
              <TuiGuang
                  visible={this.state.tuiguangVisible}
                  changeAction={() => { this.setState({ tuiguangVisible: false, rightType2: 0  })}}
                  caiPiaoFandian={this.props.caiPiaoFandian}
                  hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}
                  fandianTuiguangLink={this.props.fandianTuiguangLink}
                  wuFandianTuiguangLink={this.props.wuFandianTuiguangLink}
                  hongKongCaiPiaoFandianMax={this.props.hongKongCaiPiaoFandianMax}
                  caiPiaoFandianMax={this.props.caiPiaoFandianMax}
              />
          );
      }else if(rightType1 == 4) {
          views.push(
              <TeamRemaining
                  teamRemaining={this.props.teamRemaining}
              />
          );
      }else if(rightType1 == 5) {
          views.push(
              <StatisticalReport
                  getGeneralStatement={this.props.getGeneralStatement}
                  getTeamTotalUser={this.props.getTeamTotalUser}
                  LotterySumReport={this.props.LotterySumReport}
                  getHkSumReport={this.props.getHkSumReport}
              />
          );
      }else if(rightType1 == 7) {
          views.push(
              <LowerLevelBetting
                  caiPiaoList={this.props.caiPiaoList}
                  orderStatus={this.props.orderStatus}
                  caiZhongList={this.props.caiZhongList}
                  orderInfo={this.props.orderInfo}
                  hongKongList={this.props.hongKongList}
              />
          );
      }else if(rightType1 == 8) {
        views.push(
          <TeamZhangBian
             zhangbianList={this.props.zhangbianList}
             jiaoyiType={this.props.bargainType}

          />
        );
      }
      return views;
    }
    return (
      <div className={styles.angetBody}>
         <div className={styles.angetTop}>
             <div className={styles.angetTitle}>
                 <div className={styles.angetTitleLeft}>
                     <div className={rightType1 === 1 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(1)}>用户管理</div>
                     <div className={rightType1 === 2 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(2)}>会员注册</div>
                     <div className={rightType1 === 3 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(3)}>推广链接</div>
                     <div className={rightType1 === 4 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(4)}>团队余额</div>
                     <div className={rightType1 === 5 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(5)}>统计报表</div>
                     <div className={rightType1 === 6 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(6)}>团队报表</div>
                     <div className={rightType1 === 7 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(7)}>下级投注</div>
                     <div className={rightType1 === 8 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.changUrlType(8)}>团队帐变</div>
                 </div>
                 {/*<div className={styles.angetTitleRight}>*/}
                     {/*<div className={rightType2 === 1 ? styles.onAngetTitleRigthCard :styles.angetTitleRigthCard} onClick={() => this.setState({ rightType2: 1, addUserVisible: true })}>新增用户</div>*/}
                     {/*<div className={rightType2 === 2 ? styles.onAngetTitleRigthCard :styles.angetTitleRigthCard} onClick={() => this.setState({ rightType2: 2, tuiguangVisible: true })}>推广链接</div>*/}
                 {/*</div>*/}
             </div>
             {showContent(rightType1)}
         </div>
         <div className={styles.angetBottom} />
         {/* 推广链接Modal */}
         {/*<TuiGuang*/}
            {/*visible={this.state.tuiguangVisible}*/}
            {/*changeAction={() => { this.setState({ tuiguangVisible: false, rightType2: 0  })}}*/}
            {/*caiPiaoFandian={this.props.caiPiaoFandian}*/}
            {/*hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}*/}
            {/*fandianTuiguangLink={this.props.fandianTuiguangLink}*/}
            {/*wuFandianTuiguangLink={this.props.wuFandianTuiguangLink}*/}
            {/*hongKongCaiPiaoFandianMax={this.props.hongKongCaiPiaoFandianMax}*/}
            {/*caiPiaoFandianMax={this.props.caiPiaoFandianMax}*/}
         {/*/>*/}
         {/* 新增用户Modal */}
          {/*<AddUser*/}
              {/*visible={this.state.addUserVisible}*/}
              {/*changeAction={() => { this.setState({ addUserVisible: false, rightType2: 0 })}}*/}
              {/*caiPiaoFandian={this.props.caiPiaoFandian}*/}
              {/*hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}*/}
              {/*isAddUserSuccess={this.props.isAddUserSuccess}*/}
          {/*/>*/}
         {/* 新增成功Modal */}
         <AddUserSuccess
           visible={this.state.addSuccess}
           closeAction={() => {
               this.setState({ addSuccess: false })
               AgentCenterAction.clearUserData({addUserName: '', isAddUserSuccess: false });
           }}
           changeAction={() => {
               this.setState({ addUserVisible: true, addSuccess:false })
               AgentCenterAction.clearUserData({addUserName: '', isAddUserSuccess: false });
           }}
           addUserName={this.props.addUserName}
         />
      </div>
    );
  }
}
export default AgentCenter;
