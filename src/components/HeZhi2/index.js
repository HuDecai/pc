import React from 'react';
import styles from './style.css';
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';

class HeZhi2 extends React.PureComponent {
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
    changeSelectLotteryNumbers([...status].sort(function(a, b) {return a-b }).join('-'));
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      this.setState({ status: [...this.state.status, value] });
      changeSelectLotteryNumbers([...this.state.status, value].sort(function(a, b) {return a-b }).join('-'));
    }
  }
  render() {
    return (
      <div className={styles.selectDetail}>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>和值</div>
              <div className={styles.selectDetailNumbers}>
                <div
                   onClick={() => {
                     this.changeState(0)
                   }}
                   className={ this.state.status.indexOf(0) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>0</div>
                <div onClick={() => {
                    this.changeState(1)
                  }}
                   className={ this.state.status.indexOf(1) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>1</div>
                <div onClick={() => {
                    this.changeState(2)
                  }}
                 className={ this.state.status.indexOf(2) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>2</div>
                <div onClick={() => {
                    this.changeState(3)
                  }}
                  className={ this.state.status.indexOf(3) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>3</div>
                <div onClick={() => {
                    this.changeState(4)
                  }}
                 className={ this.state.status.indexOf(4) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>4</div>
                <div onClick={() => {
                    this.changeState(5)
                  }}
                 className={ this.state.status.indexOf(5) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>5</div>
                <div onClick={() => {
                    this.changeState(6)
                  }}
                 className={ this.state.status.indexOf(6) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>6</div>
                <div onClick={() => {
                    this.changeState(7)
                  }}
                 className={ this.state.status.indexOf(7) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>7</div>
                <div onClick={() => {
                    this.changeState(8)
                  }}
                 className={ this.state.status.indexOf(8) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>8</div>
                <div onClick={() => {
                    this.changeState(9)
                  }}
                 className={ this.state.status.indexOf(9) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>9</div>
              </div>
            </div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailYilouTitle}>{' '}</div>
              <div className={styles.selectDetailYilous}>
                <div className={styles.selectDetailyilou}>1</div>
                <div className={styles.selectDetailyilou}>2</div>
                <div className={styles.selectDetailyilou}>3</div>
                <div className={styles.selectDetailyilou}>4</div>
                <div className={styles.selectDetailyilou}>5</div>
                <div className={styles.selectDetailyilou}>6</div>
                <div className={styles.selectDetailyilou}>7</div>
                <div className={styles.selectDetailyilou}>8</div>
                <div className={styles.selectDetailyilou}>9</div>
                <div className={styles.selectDetailyilou}>10</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{' '}</div>
              <div className={styles.selectDetailNumbers}>
                <div
                   onClick={() => {
                     this.changeState(10)
                   }}
                   className={ this.state.status.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10</div>
                <div onClick={() => {
                    this.changeState(11)
                  }}
                   className={ this.state.status.indexOf(11) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>11</div>
                <div onClick={() => {
                    this.changeState(12)
                  }}
                 className={ this.state.status.indexOf(12) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>12</div>
                <div onClick={() => {
                    this.changeState(13)
                  }}
                  className={ this.state.status.indexOf(13) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>13</div>
                <div onClick={() => {
                    this.changeState(14)
                  }}
                 className={ this.state.status.indexOf(14) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>14</div>
                <div onClick={() => {
                    this.changeState(15)
                  }}
                 className={ this.state.status.indexOf(15) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>15</div>
                <div onClick={() => {
                    this.changeState(16)
                  }}
                 className={ this.state.status.indexOf(16) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>16</div>
                <div onClick={() => {
                    this.changeState(17)
                  }}
                 className={ this.state.status.indexOf(17) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>17</div>
                <div onClick={() => {
                    this.changeState(18)
                  }}
                 className={ this.state.status.indexOf(18) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>18</div>
              </div>
            </div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailYilouTitleTwo}>{' '}</div>
              <div className={styles.selectDetailYilous}>
                <div className={styles.selectDetailyilou}>9</div>
                <div className={styles.selectDetailyilou}>8</div>
                <div className={styles.selectDetailyilou}>7</div>
                <div className={styles.selectDetailyilou}>6</div>
                <div className={styles.selectDetailyilou}>5</div>
                <div className={styles.selectDetailyilou}>4</div>
                <div className={styles.selectDetailyilou}>3</div>
                <div className={styles.selectDetailyilou}>2</div>
                <div className={styles.selectDetailyilou}>1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeZhi2;
