import React from 'react';
import { Input } from 'antd';
import * as styles from '../saiCheStyle.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class SaiCheQianSiFuShi extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      status: [],
      statusTwo: [],
      statusThree: [],
      statusFore: [],
      type1: '',
      type2: '',
      type3: '',
      type4: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
        statusTwo: [],
        statusThree: [],
        statusFore: [],
        type1: '',
        type2: '',
        type3: '',
        type4: '',
      });
      changeSelectLotteryNumbers('');
    }
    if (!nextProps.selectLotteryNumbers) {
      this.setState({
        status: [],
        statusTwo: [],
        statusThree: [],
        statusFore: [],
        type1: '',
        type2: '',
        type3: '',
        type4: '',
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      status: [],
      statusTwo: [],
      statusThree: [],
      statusFore: [],
      type1: '',
      type2: '',
      type3: '',
      type4: '',
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
    ]);
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
      ]);
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
    ]);
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
      ]);
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
    ]);
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
      ]);
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
    ]);
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
      ]);
    }
  }
  changeSelectLotteryNumbersAction(data) {
    const numbersOne = data[0] && data[0].sort() && data[0].sort(function(a, b) {return a-b }).join('-');
    const numbersTwo = data[1] && data[1].sort() && data[1].sort(function(a, b) {return a-b }).join('-');
    const numbersThree = data[2] && data[2].sort() && data[2].sort(function(a, b) {return a-b }).join('-');
    const numbersFore = data[3] && data[3].sort() && data[3].sort(function(a, b) {return a-b }).join('-');
    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo + ',' + numbersThree + ',' + numbersFore);
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>冠军</div>
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
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,10];
                  this.setState({ status: numbers, type1: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ status: numbers, type1: '大' });
                    this.changeSelectLotteryNumbersAction([
                      numbers,
                      this.state.statusTwo,
                      this.state.statusThree,
                      this.state.statusFore,
                    ]);
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ status: numbers, type1: '小' });
                  this.changeSelectLotteryNumbersAction([
                    numbers,
                    this.state.statusTwo,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>亚军</div>
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
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [2,4,6,8,10];
                  this.setState({ statusTwo: numbers, type2: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusTwo: numbers, type2: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      numbers,
                      this.state.statusThree,
                      this.state.statusFore,
                    ]);
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusTwo: numbers, type2: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    numbers,
                    this.state.statusThree,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>季军</div>
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
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >奇</span>
              <span className={this.state.type3 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,2,4,6,8];
                  this.setState({ statusThree: numbers, type3: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                  ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type3 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusThree: numbers, type3: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      this.state.statusTwo,
                      numbers,
                      this.state.statusFore,
                    ]);
                  }}
              >大</span>
              <span className={this.state.type3 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusThree: numbers, type3: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    numbers,
                    this.state.statusFore,
                  ]);
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
                  ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>第四名</div>
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
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
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
                  ]);
                }}
              >奇</span>
              <span className={this.state.type4 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [10,2,4,6,8];
                  this.setState({ statusFore: numbers, type4: '偶' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                  ]);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type4 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const numbers = [6,7,8,9,10];
                    this.setState({ statusFore: numbers, type4: '大' });
                    this.changeSelectLotteryNumbersAction([
                      this.state.status,
                      this.state.statusTwo,
                      this.state.statusThree,
                      numbers,
                    ]);
                  }}
              >大</span>
              <span className={this.state.type4 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const numbers = [1,2,3,4,5];
                  this.setState({ statusFore: numbers, type4: '小' });
                  this.changeSelectLotteryNumbersAction([
                    this.state.status,
                    this.state.statusTwo,
                    this.state.statusThree,
                    numbers,
                  ]);
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
                  ]);
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SaiCheQianSiFuShi;
