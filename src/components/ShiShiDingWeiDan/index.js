import React from 'react';
import { Input } from 'antd';
import * as styles from '../styles.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class ShiShiDingWeiDan extends React.PureComponent {
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
  changeState(value) {
    let status = null;
    if(this.state.status.indexOf(value) !== -1) {
       // 删除
        status = this.state.status;
        var index = status.indexOf(value);
        if (index > -1) {
           status.splice(index, 1);
        }
        status = [...status];
    } else {
      // 添加
      status = [...this.state.status, value];
    }
    this.setState({ status, type: '' });
    this.selectLotteryNumbers(1, status);
  }
  changeStateTwo(value) {
    let statusTwo = null;
    if(this.state.statusTwo.indexOf(value) !== -1) {
       // 删除
        statusTwo = this.state.statusTwo;
        var index = statusTwo.indexOf(value);
        if (index > -1) {
           statusTwo.splice(index, 1);
        }
        statusTwo = [...statusTwo];
    } else {
      // 添加
      statusTwo = [...this.state.statusTwo, value];
    }
    this.setState({ statusTwo, type2: '' });
    this.selectLotteryNumbers(2, statusTwo);
  }
  changeStateThree(value) {
    let statusThree = null;
    if(this.state.statusThree.indexOf(value) !== -1) {
       // 删除
        statusThree = this.state.statusThree;
        var index = statusThree.indexOf(value);
        if (index > -1) {
           statusThree.splice(index, 1);
        }
        statusThree = [...statusThree];
    } else {
      // 添加
      statusThree = [...this.state.statusThree, value];
    }
    this.setState({ statusThree, type3: '' });
    this.selectLotteryNumbers(3, statusThree);
  }
  changeStateFore(value) {
    let statusFore = null;
    if(this.state.statusFore.indexOf(value) !== -1) {
       // 删除
        statusFore = this.state.statusFore;
        var index = statusFore.indexOf(value);
        if (index > -1) {
           statusFore.splice(index, 1);
        }
        statusFore = [...statusFore];
    } else {
      // 添加
      statusFore = [...this.state.statusFore, value];
    }
    this.setState({ statusFore, type4: '' });
    this.selectLotteryNumbers(4, statusFore);
  }
  changeStateFive(value) {
    let statusFive = null;
    if(this.state.statusFive.indexOf(value) !== -1) {
       // 删除
        statusFive = this.state.statusFive;
        var index = statusFive.indexOf(value);
        if (index > -1) {
           statusFive.splice(index, 1);
        }
        statusFive = [...statusFive];
    } else {
      // 添加
      statusFive = [...this.state.statusFive, value];
    }
    this.setState({ statusFive, type5: '' });
    this.selectLotteryNumbers(5, statusFive);
  }
  selectLotteryNumbers(type, data) {
    let stateOne = null;
    let statusTwo = null;
    let statusThree = null;
    let statusFore = null;
    let statusFive = null;
    if(type == 1) {
      stateOne = data;
      statusTwo = this.state.statusTwo;
      statusThree = this.state.statusThree;
      statusFore = this.state.statusFore;
      statusFive = this.state.statusFive;
    }
    if(type == 2) {
      stateOne = this.state.status;
      statusTwo = data;
      statusThree = this.state.statusThree;
      statusFore = this.state.statusFore;
      statusFive = this.state.statusFive;
    }
    if(type == 3) {
      stateOne = this.state.status;
      statusTwo = this.state.statusTwo;
      statusThree = data;
      statusFore = this.state.statusFore;
      statusFive = this.state.statusFive;
    }
    if(type == 4) {
      stateOne = this.state.status;
      statusTwo = this.state.statusTwo;
      statusThree = this.state.statusThree;
      statusFore = data;
      statusFive = this.state.statusFive;
    }
    if(type == 5) {
      stateOne = this.state.status;
      statusTwo = this.state.statusTwo;
      statusThree = this.state.statusThree;
      statusFore = this.state.statusFore;
      statusFive = data;
    }
    const numbersOne = stateOne && stateOne.sort(function(a, b) {return a-b }).join('-');
    const numbersTwo = statusTwo && statusTwo.sort(function(a, b) {return a-b }).join('-');
    const numbersThree = statusThree && statusThree.sort(function(a, b) {return a-b }).join('-');
    const numbersFore = statusFore && statusFore.sort(function(a, b) {return a-b }).join('-');
    const numbersFive = statusFive && statusFive.sort(function(a, b) {return a-b }).join('-');
    console.log(numbersOne + ',' + numbersTwo + ',' + numbersThree + ',' + numbersFore + ',' + numbersFive);
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
                  const status = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ status, type1: '全' });
                  this.selectLotteryNumbers(1, status)
                }}
              >全</span>
              <span className={this.state.type1 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [1,3,5,7,9];
                  this.setState({ status, type1: '奇' });
                  this.selectLotteryNumbers(1, status)
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [2,4,6,8,0];
                  this.setState({ status, type1: '偶' });
                  this.selectLotteryNumbers(1, status)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const status = [5,6,7,8,9];
                    this.setState({ status, type1: '大' });
                    this.selectLotteryNumbers(1, status)
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,1,2,3,4];
                  this.setState({ status, type1: '小' });
                  this.selectLotteryNumbers(1, status)
                }}
              >小</span>
              <span className={this.state.type1 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [];
                  this.setState({ status, type1: '' });
                  this.selectLotteryNumbers(1, status)
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
                  const statusTwo = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusTwo, type2: '全' });
                  this.selectLotteryNumbers(2, statusTwo)
                }}
              >全</span>
              <span className={this.state.type2 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [1,3,5,7,9];
                  this.setState({ statusTwo, type2: '奇' });
                  this.selectLotteryNumbers(2, statusTwo)
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [2,4,6,8,0];
                  this.setState({ statusTwo, type2: '偶' });
                  this.selectLotteryNumbers(2, statusTwo)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusTwo = [5,6,7,8,9];
                    this.setState({ statusTwo, type2: '大' });
                    this.selectLotteryNumbers(2, statusTwo)
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [0,1,2,3,4];
                  this.setState({ statusTwo, type2: '小' });
                  this.selectLotteryNumbers(2, statusTwo)
                }}
              >小</span>
              <span className={this.state.type2 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [];
                  this.setState({ statusTwo, type2: '' });
                  this.selectLotteryNumbers(2, statusTwo)
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
                  const statusThree = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusThree, type3: '全' });
                  this.selectLotteryNumbers(3, statusThree)
                }}
              >全</span>
              <span className={this.state.type3 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [1,3,5,7,9];
                  this.setState({ statusThree, type3: '奇' });
                  this.selectLotteryNumbers(3, statusThree)
                }}
              >奇</span>
              <span className={this.state.type3 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [0,2,4,6,8];
                  this.setState({ statusThree, type3: '偶' });
                  this.selectLotteryNumbers(3, statusThree)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type3 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusThree = [5,6,7,8,9];
                    this.setState({ statusThree, type3: '大' });
                    this.selectLotteryNumbers(3, statusThree)
                  }}
              >大</span>
              <span className={this.state.type3 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [0,1,2,3,4];
                  this.setState({ statusThree, type3: '小' });
                  this.selectLotteryNumbers(3, statusThree)
                }}
              >小</span>
              <span className={this.state.type3 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [];
                  this.setState({ statusThree, type3: '' });
                  this.selectLotteryNumbers(3, statusThree)
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
                  const statusFore = [0,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusFore, type4: '全' });
                  this.selectLotteryNumbers(4, statusFore)
                }}
              >全</span>
              <span className={this.state.type4 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFore = [1,3,5,7,9];
                  this.setState({ statusFore, type4: '奇' });
                  this.selectLotteryNumbers(4, statusFore)
                }}
              >奇</span>
              <span className={this.state.type4 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFore = [0,2,4,6,8];
                  this.setState({ statusFore, type4: '偶' });
                  this.selectLotteryNumbers(4, statusFore)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type4 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusFore = [5,6,7,8,9];
                    this.setState({ statusFore, type4: '大' });
                    this.selectLotteryNumbers(4, statusFore)
                  }}
              >大</span>
              <span className={this.state.type4 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFore = [0,1,2,3,4];
                  this.setState({ statusFore, type4: '小' });
                  this.selectLotteryNumbers(4, statusFore)
                }}
              >小</span>
              <span className={this.state.type4 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFore = [];
                  this.setState({ statusFore, type4: '' });
                  this.selectLotteryNumbers(4, statusFore)
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
                  const statusFive = [1,2,3,4,5,6,7,8,9,0];
                  this.setState({ statusFive, type5: '全' });
                  this.selectLotteryNumbers(5, statusFive)
                }}
              >全</span>
              <span className={this.state.type5 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFive = [1,3,5,7,9];
                  this.setState({ statusFive, type5: '奇' });
                  this.selectLotteryNumbers(5, statusFive)
                }}
              >奇</span>
              <span className={this.state.type5 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFive = [0,2,4,6,8];
                  this.setState({ statusFive, type5: '偶' });
                  this.selectLotteryNumbers(5, statusFive)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type5 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusFive = [5,6,7,8,9];
                    this.setState({ statusFive, type5: '大' });
                    this.selectLotteryNumbers(5, statusFive)
                  }}
              >大</span>
              <span className={this.state.type5 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFive = [0,1,2,3,4];
                  this.setState({ statusFive, type5: '小' });
                  this.selectLotteryNumbers(5, statusFive)
                }}
              >小</span>
              <span className={this.state.type5 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusFive = [];
                  this.setState({ statusFive, type5: '' });
                  this.selectLotteryNumbers(5, statusFive)
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShiShiDingWeiDan;
