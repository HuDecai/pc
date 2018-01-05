import React from 'react';
import styles from './styles.css';
import TableShow from '../TableShow/';

class NewLotteryResultFirstCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkedID: 1,
    };
  }
  showTableForID(checkedID) {
    const views = [];
    if(checkedID === 1) {
      const currentType = this.props.currentType;
      views.push(
        <TableShow
            dataSource={this.props.lotteryResultList}
            currentType={currentType}
            checkedID={1}
        />
      );
    }else if(checkedID === 2) {
      views.push(
        <TableShow
            dataSource={this.props.winningRanking}
            checkedID={2}
        />
      );
    }
    return views;
  }
  render() {
    return (
      <div className={styles.lotteryResultFirstCard}>
        <div className={styles.cardTabs}>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 1 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 1 })}}>最近开奖</div>
          <div className={styles.cardTab}
          style={{  backgroundColor: this.state.checkedID === 2 ? '#fff': '' }}
          onClick={() => { this.setState({ checkedID: 2 })}}>中奖排行榜</div>
        </div>
        <div style={{ backgroundColor: '#fff'}}>
          {this.showTableForID(this.state.checkedID)}
        </div>
      </div>
    );
  }
}

export default NewLotteryResultFirstCard;
