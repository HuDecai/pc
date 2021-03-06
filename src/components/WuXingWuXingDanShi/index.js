import React from 'react';
import { Input } from 'antd';
import * as styles from './styles.css';
const { TextArea } = Input;
import { changeSelectLotteryNumbers } from '../../actions/LotteryAction';
import CountNum from '../../pages/Lottery/core/CountNum';

class WuXingWuXingDanShi extends React.PureComponent {
  state = {
    type1: '',
  };
  changeData(value) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？[A-z]");
    if (pattern.test(value)) {
    } else {
      this.setState({
        type1: value,
      });
      const re = new RegExp('[0-9]+','g')
      let numbers = '';
      try{
        if (this.props.playKindId === 426) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 2)
              {
                  numbers += tmp[0]+','+tmp[1]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
          console.warn(numbers);
        } else if (this.props.playKindId === 428) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 3)
              {
                  numbers += tmp[0]+','+tmp[1]+','+tmp[2]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
          console.warn(numbers);
        } else if (this.props.playKindId === 475) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 4)
              {
                  numbers += tmp[0]+','+tmp[1]+','+tmp[2]+','+tmp[3]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
          console.warn(numbers);
        } else if (this.props.playKindId === 493 || this.props.playKindId === 497) {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join(',');
        } else if (this.props.playKindId === 495 || this.props.playKindId === 499) {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join('-');
        } else {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join('#');
        }
      } catch(e){
        console.warn(e);
      }
      // 单式选号需要去重
      // if (this.props.playCateId == 10) {
      //   try {
      //     numbers = CountNum.unique(numbers);
      //   } catch(e) {
      //     console.error(e);
      //   }
      // }
      try {
        numbers = CountNum.unique(numbers);
      } catch(e) {
        console.error(e);
      }
      // console.log(numbers);
      try {
        changeSelectLotteryNumbers(numbers);
      } catch(e) {
      }
    }
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
  render() {
    const number = this.props.number;
    let text1 = '12345 67890';
    let text2 = '12345,67890';
    let text3 = '1+2+3+4+5 6+7+8+9+0';
    let text4 = '1,2,3,4,5 6,7,8,9,0';
    if(number == 4) {
      text1 = '1234 5678';
      text2 = '1234,5678';
      text3 = '1+2+3+4 5+6+7+8';
      text4 = '1,2,3,4 5,6,7,8';
    }
    if(number == 3) {
      text1 = '123 456';
      text2 = '123,456';
      text3 = '1+2+3 4+5+6';
      text4 = '1,2,3 4,5,6';
    }
    if(number == 2) {
      text1 = '12 34';
      text2 = '12,34';
      text3 = '1+2 3+4';
      text4 = '1,2 3,4';
    }
    if(number == 1) {
      text1 = '2 3';
      text2 = '2+3';
      text3 = '2,3';
      text4 = '';
    }
    if(number == 5) {
      text1 = '2 3 4';
      text2 = '2+3+4';
      text3 = '2,3,4';
      text4 = '';
    }
    if(number == 6) {
      text1 = '2 3 4 5';
      text2 = '2+3+4+5';
      text3 = '2,3,4,5';
      text4 = '';
    }
    if(number == 7) {
      text1 = '5 3 7';
      text2 = '10 8 11';
      text3 = '4,5,6';
      text4 = '';
    }
    return (
      <div style={{ padding: '10px 20px'}}>
         <TextArea rows={8}
            value={this.state.type1}
            onChange={(e) => { this.changeData(e.target.value) } }
         />
         <div className={styles.bottomText}>
             <div className={styles.bottomItem}>
                <div>【提示】</div>
                <div>例如:</div>
             </div>
             <div className={styles.bottomItem}>
                <div>请把您已有的大底号码复制或者输入到下边文本框中</div>
                <div>{text1}</div>
             </div>
             <div className={styles.bottomItem}>
                <div>每注号码之间必须用换行符号或者半形空格隔开</div>
                <div>{text2}</div>
             </div>
             <div className={styles.bottomItem}>
                <div>每注号码每位之间必须用空格，逗号或者加号分开</div>
                <div>{text3}</div>
             </div>
             <div className={styles.bottomItem}>
                <div>仅支持单式</div>
                <div>{text4}</div>
             </div>
         </div>
      </div>
    )
  }
}

export default WuXingWuXingDanShi;
