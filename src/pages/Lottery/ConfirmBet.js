// 确认投注

import React from 'react';
import { Table, Button, Icon, Modal, Tooltip, message } from 'antd';
import * as LotteryAction from '../../actions/LotteryAction';
import Additional from '../../components/Additional/';
import styles from './ConfirmBet.css';
const CheckImg = require('../../assets/images/lottery_check_circle.png');
const zhuihao = require('../../assets/images/zhuihao.png');
const closeImg = require('../../assets/images/lottery_close.png');
import { touZhuMaxMoney} from './core/fanshuiNumber.js';
import { chooseFiveLids, danshiId } from './core/fanshuiData.js';

class ConfirmBet extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      toolVisible: false,
      touzhuVisible: false,
      noteNum: 0,
      money: 0,
      singleMoneys: 0,
    };
  }
  betAction() {
    const noteNum = this.state.noteNum;
    const pickDataList = this.props.pickDataList;
    let params = {};
    if(pickDataList) {
      pickDataList.map((item, key) => {
        params[key] = {
            SingleMoney: `${this.props.singleMoney}`,
            playKind:  `${item.get('playKindId')}`,
            detail: item.get('number'),
            lId: this.props.lId,
            place: "",
            winEnd: 2,
            mode: `${this.props.mode}`,
            isChase: false,
            expNum: [
                {
                    "exp": this.props.currentLotteryExpect,
                    "beishu": `${this.props.beishu}`,
                }
            ]
        };
      });
    }
    LotteryAction.checkPlayKind(params);
    LotteryAction.deleteNthPickData(-1);
    this.setState({ noteNum: 0, touzhuVisible: false });
  }
  render() {
    const lId = Number(this.props.lId);
    let buttonColor = null;
    if([2,5,13,14,19,20,24].indexOf(lId) !== -1) {
      buttonColor = styles.confirmButtonRight1;
    }else if([4,25].indexOf(lId) !== -1) {
      buttonColor = styles.confirmButtonRight2;
    }else if([7,9,10,26].indexOf(lId) !== -1) {
      buttonColor = styles.confirmButtonRight3;
    }else if([11,12].indexOf(lId) !== -1) {
      buttonColor = styles.confirmButtonRight4;
    }
    const showTableData = (pickDataList) => {
      const views = [];
      if(pickDataList) {
        let noteNum = 0;
        let money = 0;
        let singleMoneys = 0;
        const beishu = this.props.beishu ? this.props.beishu : 1;
        pickDataList.map((item, key) => {
          noteNum = noteNum + item.get('bet');
          money = this.props.singleMoney * beishu * item.get('bet') + money;
          singleMoneys = singleMoneys + this.props.singleMoney * item.get('bet');
          // 计算最高奖金
          let maxMoney = touZhuMaxMoney(this.props.singleMoney, beishu, this.props.mode, item.get('bonus'), item.get('leaveBonus'), item.get('playId'), item.get('playKindId'), item.get('number'));
          let numbers = item.get('number');

          // 龙虎号码显示
          if (item.get('way') && item.get('way').indexOf('龙虎') > -1) {
            numbers = numbers && numbers.split('-');
            numbers = numbers && numbers.map(number => {
              if (number == '1') {
                return '龙';
              } else if (number == '2') {
                return '虎';
              } else if (number == '3') {
                return '和';
              }
            });
            numbers = numbers && numbers.join('-');
            console.warn(numbers);
          }


          //11选5 号码显示
          if(chooseFiveLids.indexOf(Number(this.props.lId)) !== -1) {
            if(danshiId.indexOf(Number(item.get('playKindId'))) !== -1) {
              if(item.get('playKindId') == 493 || item.get('playKindId') == 497) {
               numbers = numbers && numbers.split(',');
               numbers = numbers && numbers.map(number => {
                 return `0${number}`.substr(-2);
               });
               numbers = numbers && numbers.join(',');
             } else if(item.get('playKindId') == 495 || item.get('playKindId') == 499) {
               numbers = numbers && numbers.split('-');
               numbers = numbers && numbers.map(number => {
                 return `0${number}`.substr(-2);
               });
               numbers = numbers && numbers.join('-');
             } else {
               // 11选5 单式展示
               numbers = numbers && numbers.split('#');
               numbers = numbers && numbers.map(number => {
                 return `0${number}`.substr(-2);
               });
               numbers = numbers && numbers.join('#');
             }
            }else if(item.get('playKindId') == 345 ) {
              // 11选5 定单双
              numbers = numbers && numbers.split('-');
              numbers = numbers && numbers.map(number => {
                if (number == '1') {
                  return '0单5双';
                } else if (number == '2') {
                  return '1单4双';
                } else if (number == '3') {
                  return '2单3双';
                } else if (number == '4') {
                  return '3单2双';
                } else if (number == '5') {
                  return '4单1双';
                } else if (number == '6') {
                  return '5单0双';
                }
              });
              numbers = numbers && numbers.join('-');
            } else {
              // 11选5 其他
              numbers = numbers && numbers.split(',');
              numbers = numbers && numbers.map(number => {
                   number = number && number.split('-');
                   number = number && number.map(number => {
                     return `0${number}`.substr(-2);
                   });
                   return number && number.join('-');
              });
              numbers = numbers && numbers.join(',');
              console.log(numbers);
            }
          }
          let numberLength = numbers.length;
          views.push(
            <div key={key} className={styles.pickTableTd}>
               <div className={styles.tableTr1}>{item.get('way')}</div>
               { numberLength > 15 ?
                   <div className={styles.tableTr2}>
                     <div className={styles.toolTips}>
                        <div className={styles.toolTips1}>{numbers}</div>
                        <Tooltip placement="right"
                           title={numbers}
                         >
                           <div className={styles.toolTips2}>详情</div>
                        </Tooltip>
                     </div>
                   </div>
                 :
                 <div className={styles.tableTr2}>{numbers}</div>
               }
               <div className={styles.tableTr3}>{`${item.get('bet')}注`}</div>
               <div className={styles.tableTr4}>{`${beishu}倍`}</div>
               <div className={styles.tableTr5}>{`￥${(this.props.singleMoney * item.get('bet')).toFixed(3)}`}</div>
               <div className={styles.tableTr6}>
                 {`￥${maxMoney.toFixed(3)}`}
               </div>
               <div className={styles.tableTr7} style={{ marginLeft: '3px'}}>
                 <div onClick={() => {LotteryAction.deleteNthPickData(key)}}>
                   <Icon type="close" />
                 </div>
               </div>
            </div>
          );
        });
        this.setState({ noteNum, money: money.toFixed(3), singleMoneys });
      }
      return views;
    }
    return (
      <div className={styles.confirmBet}>
        {/********选号************/}
        <div className={styles.confirmBetLeft}>
          <div
             className={styles.confirmBetTable}
          >
             <div className={styles.tableTr1}>玩法</div>
             <div className={styles.tableTr2}>选号</div>
             <div className={styles.tableTr3}>注数</div>
             <div className={styles.tableTr4}>倍数</div>
             <div className={styles.tableTr5}>金额</div>
             <div className={styles.tableTr6}>最高奖金</div>
             <div className={styles.tableTr7}>删除</div>
          </div>
          <div className={styles.confirmBetTableData}>
            {showTableData(this.props.pickDataList)}
          </div>
        </div>
         {/******盈亏********/}
        <div className={styles.confirmBedivight}>
          <div className={styles.confirmBetToday}>今日盈亏<span>
            {this.props.profit >= 0 ? <span style={{ color: '#2466d8'}}>+{this.props.profit.toFixed(3)}</span> :
           <span style={{ color: '#de3c4b'}}>{this.props.profit.toFixed(3)}</span>}&nbsp;元</span></div>
          <div className={styles.confirmBetTotal}>合计注数 <span>{this.state.noteNum}</span> </div>
          <div className={styles.confirmBetTotal}>合计金额 <span><span style={{ color: '#2466d8'}}>{this.state.money}</span>&nbsp;元</span></div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '5px'
            }}
          >
          <span
            className={styles.confirmButtonLeft}
            onClick={() => {
              if(this.state.noteNum) {
                this.setState({ visible: true });
                LotteryAction.updateZhihaoState({ isChaseNumber: true });
              }else {
                alert('请先进行选号操作！');
              }
            }}
          ><img src={zhuihao} width={20} style={{ marginRight: '3px'}}/>追号</span>
          <span
             className={buttonColor}
             onClick={() => {
               if(this.state.noteNum) {
                 this.setState({ touzhuVisible: true })
               }else {
                 alert('请先选号再进行投注！');
               }
             }}
          >
             <img src={CheckImg} width="20" height="20" style={{ marginRight: 3 }} />
             立即投注
          </span>
        </div>
        </div>

        {/*****追号*******/}
        <Modal
          width={'700px'}
          visible={this.state.visible}
          closable={false}
          footer={null}
          maskClosable={false}
          style={{ marginTop: '10vh' }}
        >
          <div style={{ minHeight: '30vh'}}>
            <Additional
                bet={this.state.noteNum} // 总注数
                cancel={() => {
                  this.setState({ visible: false });
                  LotteryAction.updateZhihaoState({ isChaseNumber: false })
                }}
                exp={this.props.currentLotteryExpect} // 期号
                pickDataList={this.props.pickDataList} // 选号列表
                beishu={this.props.beishu} // 倍数
                singleMoneys={this.props.singleMoney}
                lId={this.props.lId}
                mode={this.props.mode}
                visible={this.state.visible}
                zhuihaoQishuList={this.props.zhuihaoQishuList}
            />
          </div>
        </Modal>

        {/* 确认投注提示  **/}
        <Modal
           visible={this.state.touzhuVisible}
           onCancel={() => {
             this.setState({ touzhuVisible: false });
           }}
           footer={null}
           style={{ marginTop: '130px' }}
         >
             <div style={{ padding: '20px'}}>
               <p style={{ fontSize: '20px', color: '#999', marginBottom: '5px' }}>友情提示: </p>
               <div style={{ border: '1px dashed #ccc', marginBottom: '5px' }}/>
               <p style={{ fontSize: '15px', padding: '15px'}}>总投注金额为<span style={{ color: 'red' }}>￥{this.state.money}</span></p>
               <div className={styles.buttons}>
                 <div
                     onClick={() => {
                       this.setState({ touzhuVisible: false });
                     }}
                     className={styles.calButton}
                 >取消投注</div>
                 <div
                     onClick={() => {
                       this.betAction();
                     }}
                     className={styles.submitButton}
                 >确认投注</div>
               </div>
             </div>
         </Modal>
      </div>
    );
  }
}

export default ConfirmBet;
