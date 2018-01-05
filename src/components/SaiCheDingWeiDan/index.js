import React from 'react';
import { Input } from 'antd';
import * as styles from '../saiCheStyle.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

// FIXME:
class SaiCheDingWeiDan extends React.PureComponent {
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
    let text1 = '';
    let text2 = '';
    let text3 = '';
    let text4 = '';
    let text5 = '';
    if(this.props.type === '前') {
      text1 = '冠军';
      text2 = '亚军';
      text3 = '季军';
      text4 = '第四名';
      text5 = '第五名';
    }
    if(this.props.type === '后'){
      text1 = '第六名';
      text2 = '第七名';
      text3 = '第八名';
      text4 = '第九名';
      text5 = '第十名';
    }
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{text1}</div>
              <div className={styles.selectDetailNumbers}>
                
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
                 <div onClick={() => {
                   this.changeState(10);
                 }}
                    className={ this.state.status.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type1 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,10];
                  this.setState({ status: numbers, type1: '全' });
                  this.selectLotteryNumbers(1, numbers)
                }}
              >全</span>
              <span className={this.state.type1 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ status: numbers, type1: '奇' });
                  this.selectLotteryNumbers(1, numbers)
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,10];
                  this.setState({ status: numbers, type1: '偶' });
                  this.selectLotteryNumbers(1, numbers)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ status: numbers, type1: '大' });
                    this.selectLotteryNumbers(1, numbers)
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ status: numbers, type1: '小' });
                  this.selectLotteryNumbers(1, numbers)
                }}
              >小</span>
              <span className={this.state.type1 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ status: numbers, type1: '' });
                  this.selectLotteryNumbers(1, numbers)
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{text2}</div>
              <div className={styles.selectDetailNumbers}>
                
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
                 <div onClick={() => {
                   this.changeStateTwo(10);
                 }}
                  className={ this.state.statusTwo.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type2 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,10];
                  this.setState({ statusTwo: numbers, type2: '全' });
                  this.selectLotteryNumbers(2, numbers)
                }}
              >全</span>
              <span className={this.state.type2 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusTwo: numbers, type2: '奇' });
                  this.selectLotteryNumbers(2, numbers)
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,10];
                  this.setState({ statusTwo: numbers, type2: '偶' });
                    this.selectLotteryNumbers(2, numbers)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusTwo: numbers, type2: '大' });
                    this.selectLotteryNumbers(2, numbers)
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusTwo: numbers, type2: '小' });
                    this.selectLotteryNumbers(2, numbers)
                }}
              >小</span>
              <span className={styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusTwo: numbers, type2: '' });
                    this.selectLotteryNumbers(2, numbers)
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{text3}</div>
              <div className={styles.selectDetailNumbers}>
                
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
                 <div onClick={() => {
                   this.changeStateThree(10);
                 }}
                  className={ this.state.statusThree.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type3 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,10];
                  this.setState({ statusThree: numbers, type3: '全' });
                  this.selectLotteryNumbers(3, numbers)
                }}
              >全</span>
              <span className={this.state.type3 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusThree: numbers, type3: '奇' });
                  this.selectLotteryNumbers(3, numbers)
                }}
              >奇</span>
              <span className={this.state.type3 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,2,4,6,8];
                  this.setState({ statusThree: numbers, type3: '偶' });
                  this.selectLotteryNumbers(3, numbers)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type3 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusThree: numbers, type3: '大' });
                    this.selectLotteryNumbers(3, numbers)
                  }}
              >大</span>
              <span className={this.state.type3 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusThree: numbers, type3: '小' });
                  this.selectLotteryNumbers(3, numbers)
                }}
              >小</span>
              <span className={this.state.type3 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusThree: numbers, type3: '' });
                  this.selectLotteryNumbers(3, numbers)
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{text4}</div>
              <div className={styles.selectDetailNumbers}>
              
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
                 <div onClick={() => {
                   this.changeStateFore(10);
                 }}
                  className={ this.state.statusFore.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type4 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusFore: numbers, type4: '全' });
                  this.selectLotteryNumbers(4, numbers)
                }}
              >全</span>
              <span className={this.state.type4 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusFore: numbers, type4: '奇' });
                  this.selectLotteryNumbers(4, numbers)
                }}
              >奇</span>
              <span className={this.state.type4 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,2,4,6,8];
                  this.setState({ statusFore: numbers, type4: '偶' });
                  this.selectLotteryNumbers(4, numbers)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type4 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusFore: numbers, type4: '大' });
                    this.selectLotteryNumbers(4, numbers)
                  }}
              >大</span>
              <span className={this.state.type4 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusFore: numbers, type4: '小' });
                  this.selectLotteryNumbers(4, numbers)
                }}
              >小</span>
              <span className={this.state.type4 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusFore: numbers, type4: '' });
                  this.selectLotteryNumbers(4, numbers)
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{text5}</div>
              <div className={styles.selectDetailNumbers}>
              
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
                 <div onClick={() => {
                   this.changeStateFive(10);
                 }}
                  className={ this.state.statusFive.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.selectDetailTypes}>
            <div>
              <span className={this.state.type5 == '全' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5,6,7,8,9,10];
                  this.setState({ statusFive: numbers, type5: '全' });
                  this.selectLotteryNumbers(5, numbers)
                }}
              >全</span>
              <span className={this.state.type5 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,3,5,7,9];
                  this.setState({ statusFive: numbers, type5: '奇' });
                  this.selectLotteryNumbers(5, numbers)
                }}
              >奇</span>
              <span className={this.state.type5 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,2,4,6,8];
                  this.setState({ statusFive: numbers, type5: '偶' });
                  this.selectLotteryNumbers(5, numbers)
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type5 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusFive: numbers, type5: '大' });
                    this.selectLotteryNumbers(5, numbers)
                  }}
              >大</span>
              <span className={this.state.type5 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusFive: numbers, type5: '小' });
                  this.selectLotteryNumbers(5, numbers)
                }}
              >小</span>
              <span className={this.state.type5 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [];
                  this.setState({ statusFive: numbers, type5: '' });
                  this.selectLotteryNumbers(5, numbers)
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SaiCheDingWeiDan;
