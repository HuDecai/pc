import React from 'react';
import { Input } from 'antd';
import * as styles from '../SelectDetail.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';

class WuXingWuXingFuShi extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
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
  componentWillUnmount() {
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
    })
  }
  remove(val) {
    const numbers = this.state.status
    var index = numbers.indexOf(val);
    if (index > -1) {
       numbers.splice(index, 1);
    }
    this.setState({ status: [...numbers], type1: '' });
    this.changeSelectLotteryNumbersAction([
      numbers,
      this.state.statusTwo,
      this.state.statusThree,
      this.state.statusFore,
      this.state.statusFive]);
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const numbers = [...this.state.status, value].sort();
      this.setState({ status: numbers, type1: '' });
      this.changeSelectLotteryNumbersAction([
        numbers,
        this.state.statusTwo,
        this.state.statusThree,
        this.state.statusFore,
        this.state.statusFive]);
    }
  }
  removeTwo(val) {
    const numbers = this.state.statusTwo;
    var index = numbers.indexOf(val);
    if (index > -1) {
       numbers.splice(index, 1);
    }
    this.setState({ statusTwo: [...numbers], type2: '' });
    this.changeSelectLotteryNumbersAction([
      this.state.status,
      numbers,
      this.state.statusThree,
      this.state.statusFore,
      this.state.statusFive]);
  }
  changeStateTwo(value) {
    if(this.state.statusTwo.indexOf(value) !== -1) {
      // 删除
      const delData = this.removeTwo(value);
    } else {
      // 添加
      const numbers = [...this.state.statusTwo, value].sort();
      this.setState({ statusTwo: numbers, type2: '' });
      this.changeSelectLotteryNumbersAction([
        this.state.status,
        numbers,
        this.state.statusThree,
        this.state.statusFore,
        this.state.statusFive]);
    }
  }
  removeThree(val) {
    const numbers = this.state.statusThree;
    var index = numbers.indexOf(val);
    if (index > -1) {
       numbers.splice(index, 1);
    }
    this.setState({ statusThree: [...numbers], type3: '' });
    this.changeSelectLotteryNumbersAction([
      this.state.status,
      this.state.statusTwo,
      numbers,
      this.state.statusFore,
      this.state.statusFive]);
  }
  changeStateThree(value) {
    if(this.state.statusThree.indexOf(value) !== -1) {
      // 删除
      const delData = this.removeThree(value);
    } else {
      // 添加
      const numbers = [...this.state.statusThree, value].sort();
      this.setState({ statusThree: numbers, type3: '' });
      this.changeSelectLotteryNumbersAction([
        this.state.status,
        this.state.statusTwo,
        numbers,
        this.state.statusFore,
        this.state.statusFive]);
    }
  }
  removeFore(val) {
    const numbers = this.state.statusFore;
    var index = numbers.indexOf(val);
    if (index > -1) {
       numbers.splice(index, 1);
    }
    this.setState({ statusFore: [...numbers], type4: '' });
    this.changeSelectLotteryNumbersAction([
      this.state.status,
      this.state.statusTwo,
      this.state.statusThree,
      numbers,
      this.state.statusFive]);
  }
  changeStateFore(value) {
    if(this.state.statusFore.indexOf(value) !== -1) {
      // 删除
      const delData = this.removeFore(value);
    } else {
      // 添加
      const numbers = [...this.state.statusFore, value].sort();
      this.setState({ statusFore: numbers, type4: '' });
      this.changeSelectLotteryNumbersAction([
        this.state.status,
        this.state.statusTwo,
        this.state.statusThree,
        numbers,
        this.state.statusFive]);
    }
  }
  removeFive(val) {
    const numbers = this.state.statusFive;
    var index = numbers.indexOf(val);
    if (index > -1) {
       numbers.splice(index, 1);
    }
    this.setState({ statusFive: [...numbers], type5: '' });
    this.changeSelectLotteryNumbersAction([
      this.state.status,
      this.state.statusTwo,
      this.state.statusThree,
      this.state.statusFore,
      numbers,
      ]);
  }
  changeStateFive(value) {
    if(this.state.statusFive.indexOf(value) !== -1) {
      // 删除
      const delData = this.removeFive(value);
    } else {
      // 添加
      const numbers = [...this.state.statusFive, value].sort();
      this.setState({ statusFive: numbers, type5: '' });
      this.changeSelectLotteryNumbersAction([
        this.state.status,
        this.state.statusTwo,
        this.state.statusThree,
        this.state.statusFore,
        numbers,
        ]);
    }
  }
  changeSelectLotteryNumbersAction(data) {
    const numbersOne = data[0] && data[0].sort() && data[0].sort().join('-');
    const numbersTwo = data[1] && data[1].sort() && data[1].sort().join('-');
    const numbersThree = data[2] && data[2].sort() && data[2].sort().join('-');
    const numbersFore = data[3] && data[3].sort() && data[3].sort().join('-');
    const numbersFive = data[4] && data[4].sort() && data[4].sort().join('-');
    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo + ',' + numbersThree + ',' + numbersFore + ',' + numbersFive);
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>万位</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
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
                  const numbers = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ status: numbers, type1: '全' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >全</span>
              <span className={this.state.type1 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ status: numbers, type1: '奇' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,0];
                  this.setState({ status: numbers, type1: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [5,6,7,8,9];
                    this.setState({ status: numbers, type1: '大' });
                    this.changeSelectLotteryNumbersAction([
                      numbers,
                      this.state.statusTwo,
                      this.state.statusThree,
                      this.state.statusFore,
                      this.state.statusFive ]);
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4];
                  this.setState({ status: numbers, type1: '小' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >小</span>
              <span className={this.state.type1 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ status: numbers, type1: '' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
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
                <div onClick={() => {
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
                  const numbers = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusTwo: numbers, type2: '全' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >全</span>
              <span className={this.state.type2 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusTwo: numbers, type2: '奇' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,0];
                  this.setState({ statusTwo: numbers, type2: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [5,6,7,8,9];
                    this.setState({ statusTwo: numbers, type2: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      numbers,
                      this.state.statusThree,
                      this.state.statusFore,
                      this.state.statusFive ]);
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4];
                  this.setState({ statusTwo: numbers, type2: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >小</span>
              <span className={styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusTwo: numbers, type2: '' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>百位</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                  this.changeStateThree(0);
                }}
                 className={ this.state.statusThree.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeStateThree(1);
                  }}
                   className={ this.state.statusThree.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeStateThree(2);
                  }}
                 className={ this.state.statusThree.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
                <div onClick={() => {
                    this.changeStateThree(3);
                  }}
                  className={ this.state.statusThree.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeStateThree(4);
                  }}
                 className={ this.state.statusThree.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeStateThree(5);
                  }}
                 className={ this.state.statusThree.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeStateThree(6);
                  }}
                 className={ this.state.statusThree.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeStateThree(7);
                  }}
                 className={ this.state.statusThree.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeStateThree(8);
                  }}
                 className={ this.state.statusThree.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeStateThree(9);
                  }}
                 className={ this.state.statusThree.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type3 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusThree: numbers, type3: '全' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >全</span>
              <span className={this.state.type3 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusThree: numbers, type3: '奇' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >奇</span>
              <span className={this.state.type3 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,2,4,6,8];
                  this.setState({ statusThree: numbers, type3: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type3 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [5,6,7,8,9];
                    this.setState({ statusThree: numbers, type3: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      this.state.statusTwo,
                      numbers,
                      this.state.statusFore,
                      this.state.statusFive ]);
                  }}
              >大</span>
              <span className={this.state.type3 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4];
                  this.setState({ statusThree: numbers, type3: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >小</span>
              <span className={this.state.type3 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusThree: numbers, type3: '' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                    this.state.statusFive ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>十位</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                  this.changeStateFore(0);
                }}
                 className={ this.state.statusFore.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeStateFore(1);
                  }}
                   className={ this.state.statusFore.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeStateFore(2);
                  }}
                 className={ this.state.statusFore.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
                <div onClick={() => {
                    this.changeStateFore(3);
                  }}
                  className={ this.state.statusFore.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeStateFore(4);
                  }}
                 className={ this.state.statusFore.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeStateFore(5);
                  }}
                 className={ this.state.statusFore.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeStateFore(6);
                  }}
                 className={ this.state.statusFore.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeStateFore(7);
                  }}
                 className={ this.state.statusFore.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeStateFore(8);
                  }}
                 className={ this.state.statusFore.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeStateFore(9);
                  }}
                 className={ this.state.statusFore.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type4 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusFore: numbers, type4: '全' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                    this.state.statusFive,
                   ]);
                }}
              >全</span>
              <span className={this.state.type4 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusFore: numbers, type4: '奇' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                    this.state.statusFive ]);
                }}
              >奇</span>
              <span className={this.state.type4 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,2,4,6,8];
                  this.setState({ statusFore: numbers, type4: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                    this.state.statusFive ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type4 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [5,6,7,8,9];
                    this.setState({ statusFore: numbers, type4: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      this.state.statusTwo,
                      this.state.statusThree,
                      numbers,
                      this.state.statusFive ]);
                  }}
              >大</span>
              <span className={this.state.type4 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4];
                  this.setState({ statusFore: numbers, type4: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                    this.state.statusFive ]);
                }}
              >小</span>
              <span className={this.state.type4 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusFore: numbers, type4: '' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                    this.state.statusFive ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>个位</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                  this.changeStateFive(0);
                }}
                 className={ this.state.statusFive.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeStateFive(1);
                  }}
                   className={ this.state.statusFive.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeStateFive(2);
                  }}
                 className={ this.state.statusFive.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
                <div onClick={() => {
                    this.changeStateFive(3);
                  }}
                  className={ this.state.statusFive.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeStateFive(4);
                  }}
                 className={ this.state.statusFive.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeStateFive(5);
                  }}
                 className={ this.state.statusFive.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeStateFive(6);
                  }}
                 className={ this.state.statusFive.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeStateFive(7);
                  }}
                 className={ this.state.statusFive.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeStateFive(8);
                  }}
                 className={ this.state.statusFive.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeStateFive(9);
                  }}
                 className={ this.state.statusFive.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type5 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusFive: numbers, type5: '全' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    numbers
                  ]);
                }}
              >全</span>
              <span className={this.state.type5 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusFive: numbers, type5: '奇' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    numbers ]);
                }}
              >奇</span>
              <span className={this.state.type5 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,2,4,6,8];
                  this.setState({ statusFive: numbers, type5: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    numbers ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type5 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [5,6,7,8,9];
                    this.setState({ statusFive: numbers, type5: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      this.state.statusTwo,
                      this.state.statusThree,
                      this.state.statusFore,
                      numbers ]);
                  }}
              >大</span>
              <span className={this.state.type5 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [0,1,2,3,4];
                  this.setState({ statusFive: numbers, type5: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    numbers ]);
                }}
              >小</span>
              <span className={this.state.type5 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusFive: numbers, type5: '' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                    numbers ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WuXingWuXingFuShi;
