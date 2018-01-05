import React from 'react';
import { Input } from 'antd';
import * as styles from '../chooseFiveStyle.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class ChooseFiveCaiZhongWei extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      status: [],
      type: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
        type: '',
      });
      changeSelectLotteryNumbers('');
    }
    if (!nextProps.selectLotteryNumbers) {
      this.setState({
        status: [],
        statusTwo: [],
        statusThree: [],
        statusFore: [],
        statusFive: [],
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        type5: '',
      });
    }
  }
  remove(val) {
    const status = this.state.status
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    this.setState({ status: [...status], type: '' });
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
      this.setState({ status, type: '' });
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
              <div className={styles.selectDetailTitle}>猜中位</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                    this.changeState(3);
                  }}
                  className={ this.state.status.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeState(4);
                  }}
                 className={ this.state.status.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeState(5);
                  }}
                 className={ this.state.status.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeState(6);
                  }}
                 className={ this.state.status.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeState(7);
                  }}
                 className={ this.state.status.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeState(8);
                  }}
                 className={ this.state.status.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeState(9);
                  }}
                 className={ this.state.status.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [3,4,5,6,7,8,9];
                  this.setState({ status, type: '全' });
                  const numbers = status && status.join('-');
                  changeSelectLotteryNumbers(numbers);
                }}
              >全</span>
              <span className={this.state.type == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [3,5,7,9];
                  this.setState({ status, type: '奇' });
                  const numbers = status && status.join('-');
                  changeSelectLotteryNumbers(numbers);
                }}
              >奇</span>
              <span className={this.state.type == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [4,6,8];
                  this.setState({ status, type: '偶' });
                  const numbers = status && status.join('-');
                  changeSelectLotteryNumbers(numbers);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const status = [6,7,8,9];
                    this.setState({ status, type: '大' });
                    const numbers = status && status.join('-');
                    changeSelectLotteryNumbers(numbers);
                  }}
              >大</span>
              <span className={this.state.type == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [3,4,5];
                  this.setState({ status, type: '小' });
                  const numbers = status && status.join('-');
                  changeSelectLotteryNumbers(numbers);
                }}
              >小</span>
              <span className={this.state.type == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  this.setState({ status: [], type: '' });
                  changeSelectLotteryNumbers('');
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChooseFiveCaiZhongWei;
