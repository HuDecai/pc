import React, { PropTypes } from 'react';
import * as styles from './style.css';
import { dispatch } from '../../store';

class CardLine extends React.PureComponent {
  static propTypes = {
    step: PropTypes.number,
  };

  render() {
    const step = this.props.step ? this.props.step : 1;
    const firstColor = step == 1 ? '#E14A59' : '#FD9BA4';
    const secondColor = step == 2 ? '#E14A59' : (step < 2) ? '#c7c7c7' : '#FD9BA4';
    const threeColor = step == 3 ? '#E14A59' : '#c7c7c7';
    return (
      <div className={styles.lineStyle}>
        <div className={styles.lineColor} style={{ borderColor: `${firstColor}`}}>
           <div>
               <div className={styles.stepCard} style={{ backgroundColor: `${firstColor}` }}>1</div>
               <div className={styles.stepCard1}>验证资金密码</div>
           </div>
        </div>
        <div  className={styles.lineColor} style={{ borderColor: `${secondColor}`}}>
            <div>
                <div className={styles.stepCard} style={{ backgroundColor: `${secondColor}` }}>2</div>
                <div className={styles.stepCard1}>验证密保问题</div>
            </div>
        </div>
        <div className={styles.lineColor} style={{ borderColor: `${threeColor}`}}>
            <div>
                <div className={styles.stepCard} style={{ backgroundColor: `${threeColor}` }}>3</div>
                <div className={styles.stepCard1}>设置新密码</div>
            </div>
        </div>
      </div>
    );
  }
}

export default CardLine;
