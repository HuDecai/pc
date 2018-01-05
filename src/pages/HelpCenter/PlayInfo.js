import React from 'react';
import * as styles from './styles.css';
import SSC from './SSC.js';
import ChooseFive from './ChooseFive.js';
import PK10 from './PK10.js';
import Other from './Other.js';
import HongKong from './HongKong.js';
import KaiJiangTime from './KaiJiangTime';

class PlayInfo extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
    };
  }
  componentWillMount() {
  
  }
  render() {
    const showContent = (type) => {
      const views = [];
      if(type) {
        if(type === 1) {
          views.push(<SSC />);
        }
        if(type === 2) {
          views.push(<PK10 />);
        }
        if(type === 3) {
          views.push(<ChooseFive />);
        }
        if(type === 4) {
          views.push(<Other />);
        }
        if(type === 5) {
          views.push(<HongKong />);
        }
        if(type === 6) {
          views.push(<KaiJiangTime />);
        }
      }
     return views;
    }
    return (
      <div>
        <div className={styles.helpRigthTitle}>
          <div className={this.state.type === 1 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :1 })}>时时彩</div>
           <div className={this.state.type === 2 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :2 })}>PK10系列</div>
           <div className={this.state.type === 3 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :3 })}>11选5系列</div>
           <div className={this.state.type === 4 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :4 })}>其他系列</div>
           <div className={this.state.type === 5 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :5 })}>香港彩</div>
           <div className={this.state.type === 6 ? styles.onHelpRigthTitle : styles.noHelpRigthTitle}  onClick={() => this.setState({ type :6 })}>开奖时间</div>
        </div>
        {showContent(this.state.type)}
      </div>
    );
  }
}
export default PlayInfo;
