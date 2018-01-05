import React from 'react';
import * as styles from './style.css';
import { checkStat, getUserInfo, invalidateSession } from '../../core/api/login';
import { push } from 'react-router-redux';
import * as UserAction from '../../actions/UserAction';
import { dispatch } from '../../store';
import { Button, Progress } from 'antd';
import * as speed from './SpeedConfig';
// import * as speed from '../../../config/SpeedConfig';
import Progress1 from './Progress';
import debounce from 'lodash.debounce';

class Speed extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      // percent: null,
      // percentName: '',
      // colorValue: '',
    };
  }
  showProgress(timeSpeed) {
    const view = [];
    if(timeSpeed && timeSpeed.count()) {
      timeSpeed.map(item => {
        const timeSpeed = item.get('speed');
        let percent = null;
        let percentName = null;
        let colorValue = null;
        const url = item.get('url');
        if(timeSpeed > speed.veryFast[0] && timeSpeed < speed.veryFast[1]) {
          percent = 100; percentName =  '极速'; colorValue =  '#509e1a';
        }else if(timeSpeed >=  speed.fast[0] && timeSpeed <= speed.fast[1]) {
          percent = 75 ; percentName= '高速'; colorValue= '#90d437';
        }else if(timeSpeed >= speed.normal[0] && timeSpeed <= speed.normal[1]) {
          percent= 50; percentName= '普通'; colorValue= '#cfcd50';
        }else if(timeSpeed >= speed.slow[0] && timeSpeed <= speed.slow[1]) {
          percent= 25; percentName= '卡顿'; colorValue= '#95933f';
        }else if(timeSpeed >= speed.block[0] || timeSpeed == 0) {
          percent= 0; percentName= '阻塞'; colorValue= '#a0a0a0' ;
        }
        view.push(
          <div className={url == window.location.hostname ? styles.speedCard1 : styles.speedCard}
             onClick={() => {
               window.location.replace('http://'+item.get('url'));
             }}
          >
              <div className={styles.twoItem}>{url == window.location.hostname ? '当前网址' : item.get('name')}</div>
              <div className={styles.firstItem} style={{ color: `${colorValue}` }}>{percentName}</div>
              <div>
                <Progress1 percent={percent} color={colorValue} timeSpeed={timeSpeed} />
              </div>
          </div>
        )
      })
    }
    return view;
  }
  render() {

    return (
      <div className={styles.speed}>
        <div className={styles.speedHeader}>
           网址测速 SPEED TEST
        </div>
        <div className={styles.speedHeaderLine} />
        <div className={styles.speedContent}>
            {this.showProgress(this.props.timeSpeed)}
        </div>
        <Button htmlType="submit" className={styles.speedButton} onClick={
          debounce(
          () => {
          // window.location.reload();
          if(this.props.domainList && this.props.domainList.count()) {
            UserAction.clearSpeed();
            this.props.domainList.map(item => {
              UserAction.speedTest({ name: item.get('name'), url: item.get('url') });
            })
          }
        }, 1000)}>
           重 新 测 速
        </Button>
      </div>
    );
  }
}

export default Speed;
