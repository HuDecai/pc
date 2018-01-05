import React, { PropTypes } from 'react';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');

class TeamRemaining extends React.PureComponent {

  componentWillMount() {
      AgentCenterAction.teamRemaining({});
  }


  render() {
        const {teamRemaining}=this.props;
      if (!teamRemaining){
          return false
      }
console.log(teamRemaining.get('totalMoney'),"data")

    return (
        <div className={styles.userModalContent}>

            <div className={styles.regTtileh1}>团队余额</div>
            <div className={styles.modalLine} />
      <div className={styles.teamBox}>
          <div className={styles.teamdcDiv}><span className={styles.teamdcTitle}>用户名：</span><span className={styles.teamTxt}>{teamRemaining.get('username')}</span></div>
          <div className={styles.teamdcDiv}><span className={styles.teamdcTitle}>昵称：</span><span className={styles.teamTxt}>{teamRemaining.get('nickName')}</span></div>
          <div className={styles.teamdcDiv}><span className={styles.teamdcTitle}>当前团队总余额：</span><span className={styles.teamTxt}>{teamRemaining.get('totalMoney')}&nbsp;元</span></div>
      </div>
        </div>
    );
  }
}

export default TeamRemaining;
