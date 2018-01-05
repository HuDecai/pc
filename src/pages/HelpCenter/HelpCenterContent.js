import React from 'react';
import * as styles from './styles.css';
import Recharge from './Recharge';
import Tixian from './Tixian';
import PlayInfo from './PlayInfo';
import Guize from './Guize';
import AboutUs from './AboutUs';
import Safe from './Safe';


class HelpCenterContent extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 0,
      rightType: 1,
    };
  }
  componentWillMount() {
    // 获取type值
    const searchType = this.props.location.search.split('=')[1];
    this.setState({ type: Number(searchType) });
  }
  render() {
    const showContent = (type) => {
      const views = [];
      if(type) {
        if(type === 1) {
          views.push(<Recharge />);
        }
        if(type === 2) {
          views.push(<Tixian />);
        }
        if(type === 3) {
          views.push(<PlayInfo />);
        }
        if(type === 4) {
          views.push(<Guize />);
        }
        if(type === 5) {
          views.push(<Safe />);
        }
        if(type === 6) {
          views.push(<AboutUs />);
        }
      }
      return views;
    }
    return (
      <div className={styles.helpCenterBody}>
         <div className={styles.helpCenterContent}>
            <div className={styles.helpLeft}>
                <div className={styles.left1}>帮助中心</div>
                <div className={this.state.type === 1 ? styles.onLeft : styles.left}  onClick={() => this.setState({ type :1 })}>如何充值</div>
                <div className={this.state.type === 2 ? styles.onLeft : styles.left} onClick={() => this.setState({ type :2 })}>提现须知</div>
                <div className={this.state.type === 3 ? styles.onLeft : styles.left} onClick={() => this.setState({ type :3 })}>玩法介绍</div>
                <div className={this.state.type === 4 ? styles.onLeft : styles.left} onClick={() => this.setState({ type :4 })}>规则条款</div>
                  <div className={this.state.type === 5 ? styles.onLeft : styles.left} onClick={() => this.setState({ type :5 })}>安全须知</div>
                    <div className={this.state.type === 6 ? styles.onLeft : styles.left} onClick={() => this.setState({ type :6 })}>关于我们</div>
            </div>
            <div className={styles.helpRight}>
               {showContent(this.state.type)}
            </div>
         </div>
      </div>
    );
  }
}
export default HelpCenterContent;
