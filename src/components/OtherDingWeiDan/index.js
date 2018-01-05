import React from 'react';
import { Input } from 'antd';
import * as styles from '../OtherStyles.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class OtherDingWeiDan extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      status: [],
      statusTwo: [],
      statusThree: [],
      type1: '',
      type2: '',
      type3: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
        statusTwo: [],
        statusThree: [],
        type1: '',
        type2: '',
        type3: '',
      });
      changeSelectLotteryNumbers('');
    }
    if (!nextProps.selectLotteryNumbers) {
      this.setState({
        status: [],
        statusTwo: [],
        statusThree: [],
        type1: '',
        type2: '',
        type3: '',
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
  selectLotteryNumbers(type, data) {
    let stateOne = null;
    let statusTwo = null;
    let statusThree = null;
    if(type == 1) {
      stateOne = data;
      statusTwo = this.state.statusTwo;
      statusThree = this.state.statusThree;
    }
    if(type == 2) {
      stateOne = this.state.status;
      statusTwo = data;
      statusThree = this.state.statusThree;
    }
    if(type == 3) {
      stateOne = this.state.status;
      statusTwo = this.state.statusTwo;
      statusThree = data;
    }
    const numbersOne = stateOne && stateOne.sort().join('-');
    const numbersTwo = statusTwo && statusTwo.sort().join('-');
    const numbersThree = statusThree && statusThree.sort().join('-');
    console.log(numbersOne + ',' + numbersTwo + ',' + numbersThree);
    changeSelectLotteryNumbers(numbersOne + ',' + numbersTwo + ',' + numbersThree);
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>百位</div>
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
                  this.setState({ status, type1: '全' });
                  this.selectLotteryNumbers(1, status);
                }}
              >全</span>
              <span className={this.state.type1 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [1,3,5,7,9];
                  this.setState({ status, type1: '奇' });
                  this.selectLotteryNumbers(1, status);
                }}
              >奇</span>
              <span className={this.state.type1 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,2,4,6,8];
                  this.setState({ status, type1: '偶' });
                  this.selectLotteryNumbers(1, status);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type1 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const status = [5,6,7,8,9];
                    this.setState({ status, type1: '大' });
                    this.selectLotteryNumbers(1, status);
                  }}
              >大</span>
              <span className={this.state.type1 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [0,1,2,3,4];
                  this.setState({ status, type1: '小' });
                  this.selectLotteryNumbers(1, status);
                }}
              >小</span>
              <span className={this.state.type1 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const status = [];
                  this.setState({ status, type1: '' });
                  this.selectLotteryNumbers(1, status);
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
                  const statusTwo = [0,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusTwo, type2: '全' });
                  this.selectLotteryNumbers(2, statusTwo);
                }}
              >全</span>
              <span className={this.state.type2 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [1,3,5,7,9];
                  this.setState({ statusTwo, type2: '奇' });
                  this.selectLotteryNumbers(2, statusTwo);
                }}
              >奇</span>
              <span className={this.state.type2 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [0,2,4,6,8];
                  this.setState({ statusTwo, type2: '偶' });
                  this.selectLotteryNumbers(2, statusTwo);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type2 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusTwo = [5,6,7,8,9];
                    this.setState({ statusTwo, type2: '大' });
                    this.selectLotteryNumbers(2, statusTwo);
                  }}
              >大</span>
              <span className={this.state.type2 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [0,1,2,3,4];
                  this.setState({ statusTwo, type2: '小' });
                  this.selectLotteryNumbers(2, statusTwo);
                }}
              >小</span>
              <span className={this.state.type2 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusTwo = [];
                  this.setState({ statusTwo, type2: '' });
                  this.selectLotteryNumbers(2, statusTwo);
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
                <div
                   onClick={() => {
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
                  const statusThree = [0,1,2,3,4,5,6,7,8,9];
                  this.setState({ statusThree, type3: '全' });
                  this.selectLotteryNumbers(3, statusThree);
                }}
              >全</span>
              <span className={this.state.type3 == '奇' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [1,3,5,7,9];
                  this.setState({ statusThree, type3: '奇' });
                  this.selectLotteryNumbers(3, statusThree);
                }}
              >奇</span>
              <span className={this.state.type3 == '偶' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [0,2,4,6,8];
                  this.setState({ statusThree, type3: '偶' });
                  this.selectLotteryNumbers(3, statusThree);
                }}
              >偶</span>
            </div>
            <div>
              <span className={this.state.type3 == '大' ? styles.onSelectDetailType : styles.selectDetailType}
                  onClick={() => {
                    const statusThree = [5,6,7,8,9];
                    this.setState({ statusThree, type3: '大' });
                    this.selectLotteryNumbers(3, statusThree);
                  }}
              >大</span>
              <span className={this.state.type3 == '小' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [0,1,2,3,4];
                  this.setState({ statusThree, type3: '小' });
                  this.selectLotteryNumbers(3, statusThree);
                }}
              >小</span>
              <span className={this.state.type3 == '清' ? styles.onSelectDetailType : styles.selectDetailType}
                onClick={() => {
                  const statusThree = [];
                  this.setState({ statusThree, type3: '' });
                  this.selectLotteryNumbers(3, statusThree);
                }}
              >清</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OtherDingWeiDan;
