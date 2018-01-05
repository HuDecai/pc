import React from 'react';
import styles from '../OtherStyles.css';
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';


class OtherHeZhi3 extends React.PureComponent {
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
    const numbersOne = [...status] && [...status].sort() && [...status].sort(function(a, b) {return a-b }).join('-');
    changeSelectLotteryNumbers(numbersOne);
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.state.status, value];
      this.setState({ status });
      const numbersOne = [...status] && [...status].sort() && [...status].sort(function(a, b) {return a-b }).join('-');
      changeSelectLotteryNumbers(numbersOne);
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
                <div
                    onClick={() => {
                      this.changeState(10)
                    }}
                    className={ this.state.status.indexOf(10) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>10
                    </div>
              </div>
            </div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailYilouTitle}>{' '}</div>
              <div className={styles.selectDetailYilous}>
                <div className={styles.selectDetailyilou}>1</div>
                <div className={styles.selectDetailyilou}>3</div>
                <div className={styles.selectDetailyilou}>6</div>
                <div className={styles.selectDetailyilou}>10</div>
                <div className={styles.selectDetailyilou}>15</div>
                <div className={styles.selectDetailyilou}>21</div>
                <div className={styles.selectDetailyilou}>28</div>
                <div className={styles.selectDetailyilou}>36</div>
                <div className={styles.selectDetailyilou}>45</div>
                <div className={styles.selectDetailyilou}>55</div>
                <div className={styles.selectDetailyilou}>63</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{' '}</div>
              <div className={styles.selectDetailNumbers}>
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
                <div onClick={() => {
                    this.changeState(19)
                  }}
                 className={ this.state.status.indexOf(19) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>19</div>
                 <div
                    onClick={() => {
                      this.changeState(20)
                    }}
                    className={ this.state.status.indexOf(20) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>20</div>
                 <div onClick={() => {
                     this.changeState(21)
                   }}
                    className={ this.state.status.indexOf(21) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>21</div>
              </div>
            </div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailYilouTitleTwo}>{' '}</div>
              <div className={styles.selectDetailYilous}>
                <div className={styles.selectDetailyilou}>69</div>
                <div className={styles.selectDetailyilou}>73</div>
                <div className={styles.selectDetailyilou}>75</div>
                <div className={styles.selectDetailyilou}>75</div>
                <div className={styles.selectDetailyilou}>73</div>
                <div className={styles.selectDetailyilou}>69</div>
                <div className={styles.selectDetailyilou}>63</div>
                <div className={styles.selectDetailyilou}>55</div>
                <div className={styles.selectDetailyilou}>45</div>
                <div className={styles.selectDetailyilou}>36</div>
                <div className={styles.selectDetailyilou}>28</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.selectDetailCell}>
          <div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailTitle}>{' '}</div>
              <div className={styles.selectDetailNumbers}>
                <div onClick={() => {
                    this.changeState(22)
                  }}
                 className={ this.state.status.indexOf(22) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>22</div>
                <div onClick={() => {
                    this.changeState(23)
                  }}
                  className={ this.state.status.indexOf(23) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>23</div>
                <div onClick={() => {
                    this.changeState(24)
                  }}
                 className={ this.state.status.indexOf(24) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>24</div>
                <div onClick={() => {
                    this.changeState(25)
                  }}
                 className={ this.state.status.indexOf(25) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>25</div>
                <div onClick={() => {
                    this.changeState(26)
                  }}
                 className={ this.state.status.indexOf(26) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>26</div>
                <div onClick={() => {
                    this.changeState(27)
                  }}
                 className={ this.state.status.indexOf(27) !== -1 ? styles.onSelectDetailNumber : styles.selectDetailNumber}>27</div>
              </div>
            </div>
            <div className={styles.selectDetailCellLeft}>
              <div className={styles.selectDetailYilouTitleTwo}>{' '}</div>
              <div className={styles.selectDetailYilous}>
                <div className={styles.selectDetailyilou}>21</div>
                <div className={styles.selectDetailyilou}>15</div>
                <div className={styles.selectDetailyilou}>10</div>
                <div className={styles.selectDetailyilou}>6</div>
                <div className={styles.selectDetailyilou}>3</div>
                <div className={styles.selectDetailyilou}>1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OtherHeZhi3;
