import React from 'react';
import { Input } from 'antd';
import * as styles from '../chooseFiveStyle.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class ChooseFiveDingDanShuang extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      status: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
      });
      changeSelectLotteryNumbers('');
    }
    if (!nextProps.selectLotteryNumbers) {
      this.setState({
        status: [],
      });
    }
  }
  remove(val) {
    const status = this.state.status
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    this.setState({ status: [...status] });
    const numbers = [...status] && [...status].sort() && [...status].sort().join('-');
    changeSelectLotteryNumbers(numbers);
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.state.status, value].sort();
      this.setState({ status });
      const numbers = status && status.join('-');
      changeSelectLotteryNumbers(numbers);
    }
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                    this.changeState(1);
                  }}
                  className={ this.state.status.indexOf(1) !== -1 ? styles.onSelectDetailNumberCard : styles.selectDetailNumberCard}>{'0单5双'}</div>
                <div onClick={() => {
                    this.changeState(2);
                  }}
                 className={ this.state.status.indexOf(2) !== -1 ? styles.onSelectDetailNumberCard  : styles.selectDetailNumberCard }>{'1单4双'}</div>
                <div onClick={() => {
                    this.changeState(3);
                  }}
                 className={ this.state.status.indexOf(3) !== -1 ? styles.onSelectDetailNumberCard  : styles.selectDetailNumberCard }>{'2单3双'}</div>
                <div onClick={() => {
                    this.changeState(4);
                  }}
                 className={ this.state.status.indexOf(4) !== -1 ? styles.onSelectDetailNumberCard  : styles.selectDetailNumberCard }>{'3单2双'}</div>
                <div onClick={() => {
                    this.changeState(5);
                  }}
                 className={ this.state.status.indexOf(5) !== -1 ? styles.onSelectDetailNumberCard  : styles.selectDetailNumberCard }>{'4单1双'}</div>
                <div onClick={() => {
                    this.changeState(6);
                  }}
                 className={ this.state.status.indexOf(6) !== -1 ? styles.onSelectDetailNumberCard  : styles.selectDetailNumberCard }>{'5单0双'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChooseFiveDingDanShuang;
