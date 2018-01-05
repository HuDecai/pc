import React, { PropTypes } from 'react';
import styles from './LotterHelp.css';
const looteryHelp =  require('../../assets/images/lottery_help.png');

class LotteryHelp extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      contentStyle: styles.noLotteryHelpContent,
    };
  }
  render() {
    let lengthL = this.props.lId == 15 ? 1 : 0;
    return (
      <div  className={styles.lotteryHelp}>
         <div
           className={styles.lotteryHelpImg}
           style={{ marginTop: lengthL === 1?'58px':'90px'}}
           onMouseEnter={() => this.setState({ contentStyle: styles.lotteryHelpContent })}
           onMouseLeave={() => this.setState({ contentStyle:  styles.noLotteryHelpContent })}
         >
            <img src={looteryHelp}/>
            <div className={this.state.contentStyle} style={{ top: lengthL === 1?'58px':'90px'}}>
              <div style={{ padding: '5px' }}>
                <div style={{ marginBottom: '5px'}}>【玩法说明】</div>
                <div>{this.props.help}</div>
                <div style={{ marginBottom: '5px'}}>【中奖举例】</div>
                <div>{this.props.example}</div>
                <div style={{ marginBottom: '5px', color: '#f2eb0c'}}>【奖金上限】</div>
                <div style={{ color: '#f2eb0c'}}>{this.props.maxBonus}</div>
              </div>
            </div>
         </div>
      </div>
    );
  }
}

LotteryHelp.propTypes = {
  help: PropTypes.string,
  example: PropTypes.string,
  maxBonus: PropTypes.string,
};

export default LotteryHelp;
