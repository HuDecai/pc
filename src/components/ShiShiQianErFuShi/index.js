import React from 'react';
import { Input } from 'antd';
import * as styles from '../styles.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class ShiShiQianErFuShi extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      status: [],
      statusTwo: [],
      type1: '',
      type2: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
        statusTwo: [],
        type1: '',
        type2: '',
      });
      changeSelectLotteryNumbers('');
    }
    if (!nextProps.selectLotteryNumbers) {
      this.setState({
        status: [],
        statusTwo: [],
        type1: '',
        type2: '',
      });
    }
  }
  remove(val) {
    const status = this.state.status
    const statusTwo = this.state.statusTwo
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    this.setState({ status: [...status], type1: '' });
    const numbersOne = [...status] && [...status].sort() && [...status].sort().join('-');
    const numbersTwo = [...statusTwo] && [...statusTwo].sort() && [...statusTwo].sort().join('-');
    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.state.status, value].sort();
      this.setState({ status, type1: '' });
      const numbersOne = status && status.join('-');
      const numbersTwo = [...this.state.statusTwo].sort().join('-');
      changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
    }
  }
  removeTwo(val) {
    const status = this.state.status
    const statusTwo = this.state.statusTwo
    var index = statusTwo.indexOf(val);
    if (index > -1) {
       statusTwo.splice(index, 1);
    }
    this.setState({ statusTwo: [...statusTwo], type2: '' });
    const numbersTwo = [...statusTwo] && [...statusTwo].sort() && [...statusTwo].sort().join('-');
    const numbersOne = [...status] && [...status].sort() && [...status].sort().join('-');
    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
  }
  changeStateTwo(value) {
    if(this.state.statusTwo.indexOf(value) !== -1) {
      // 删除
      const delData = this.removeTwo(value);
    } else {
      // 添加
      const numbersOne = [...this.state.status].sort().join('-');
      const statusTwo = [...this.state.statusTwo, value].sort();
      this.setState({ statusTwo, type2: '' });
      const numbersTwo = statusTwo && statusTwo.join('-');
      changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
      // changeSelectLotteryNumbers(statusTwo);
    }
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>万位</div>
              <div className={styles.selectDetailNumbers}>
                <div
                   onClick={() => {
                     this.changeState(0);
                   }}
                   className={ this.state.status.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeState(1);
                  }}
                   className={ this.state.status.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeState(2);
                  }}
                 className={ this.state.status.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
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
              <span className={this.state.type1 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,1,2,3,4,5,6,7,8,9];
                  const statusTwo = this.state.statusTwo;
                  this.setState({ status, type1: '全' });
                  const numbersOne = status && status.join('-');
                  const numbersTwo = statusTwo && statusTwo.sort().join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >全</span>
              <span className={this.state.type1 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [1,3,5,7,9];
                  const statusTwo = this.state.statusTwo;
                  this.setState({ status, type1: '奇' });
                  const numbersOne = status && status.join('-');
                  const numbersTwo = statusTwo && statusTwo.sort().join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,2,4,6,8];
                  const statusTwo = this.state.statusTwo;
                  this.setState({ status, type1: '偶' });
                  const numbersOne = status && status.join('-');
                  const numbersTwo = statusTwo && statusTwo.sort().join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const status = [5,6,7,8,9];
                    const statusTwo = this.state.statusTwo;
                    this.setState({ status, type1: '大' });
                    const numbersOne = status && status.join('-');
                    const numbersTwo = statusTwo && statusTwo.sort().join('-');
                    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,1,2,3,4];
                  const statusTwo = this.state.statusTwo;
                  this.setState({ status, type1: '小' });
                  const numbersOne = status && status.join('-');
                  const numbersTwo = statusTwo && statusTwo.sort().join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >小</span>
              <span className={this.state.type1 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [];
                  const statusTwo = this.state.statusTwo;
                  this.setState({ status, type1: '' });
                  const numbersOne = status && status.join('-');
                  const numbersTwo = statusTwo && statusTwo.sort().join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>千位</div>
              <div className={styles.selectDetailNumbers}>
                <div
                   onClick={() => {
                     this.changeStateTwo(0);
                   }}
                   className={ this.state.statusTwo.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeStateTwo(1);
                  }}
                   className={ this.state.statusTwo.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeStateTwo(2);
                  }}
                 className={ this.state.statusTwo.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
                <div onClick={() => {
                    this.changeStateTwo(3);
                  }}
                  className={ this.state.statusTwo.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeStateTwo(4);
                  }}
                 className={ this.state.statusTwo.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeStateTwo(5);
                  }}
                 className={ this.state.statusTwo.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeStateTwo(6);
                  }}
                 className={ this.state.statusTwo.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeStateTwo(7);
                  }}
                 className={ this.state.statusTwo.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeStateTwo(8);
                  }}
                 className={ this.state.statusTwo.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeStateTwo(9);
                  }}
                 className={ this.state.statusTwo.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type2 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = this.state.status;
                  const statusTwo = [0,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusTwo, type2: '全' });
                  const numbersOne = status && status.sort().join('-');
                  const numbersTwo = statusTwo && statusTwo.join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >全</span>
              <span className={this.state.type2 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = this.state.status;
                  const statusTwo = [1,3,5,7,9];
                  this.setState({ statusTwo, type2: '奇' });
                  const numbersOne = status && status.sort().join('-');
                  const numbersTwo = statusTwo && statusTwo.join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = this.state.status;
                  const statusTwo = [0,2,4,6,8];
                  this.setState({ statusTwo, type2: '偶' });
                  const numbersOne = status && status.sort().join('-');
                  const numbersTwo = statusTwo && statusTwo.join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const status = this.state.status;
                    const statusTwo = [5,6,7,8,9];
                    this.setState({ statusTwo, type2: '大' });
                    const numbersOne = status && status.sort().join('-');
                    const numbersTwo = statusTwo && statusTwo.join('-');
                    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = this.state.status;
                  const statusTwo = [0,1,2,3,4];
                  this.setState({ statusTwo, type2: '小' });
                  const numbersOne = status && status.sort().join('-');
                  const numbersTwo = statusTwo && statusTwo.join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >小</span>
              <span className={this.state.type2 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = this.state.status;
                  const statusTwo = [];
                  this.setState({ statusTwo, type2: '' });
                  const numbersOne = status && status.sort().join('-');
                  const numbersTwo = statusTwo && statusTwo.join('-');
                  changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo);
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShiShiQianErFuShi;
