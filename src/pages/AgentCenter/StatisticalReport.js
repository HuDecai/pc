import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import {Input, Select } from 'antd';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
import DatePicker from 'react-datepicker';
import moment from 'moment';
let _arr={};
const defalutTime = {
  dateTimeStart: moment().format('YYYY-MM-DD'),
  dateTimeEnd: moment().format('YYYY-MM-DD'),
}

class StatisticalReport extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
        dateTimeStart: moment().format('YYYY-MM-DD'),
        dateTimeEnd: moment().format('YYYY-MM-DD'),
        sRrightType:1
    };
  }
    componentWillMount() {
        this.gStatement();
        AgentCenterAction.getTeamTotalUser({});
    }
    gStatement(){
      const sRrightType = this.state.sRrightType;
      const parmData={
          dateTimeStart: this.state.dateTimeStart,
          dateTimeEnd: this.state.dateTimeEnd,
      };
      if(sRrightType == 1) {
        AgentCenterAction.getGeneralStatement(parmData);
      }else if(sRrightType == 2) {
        AgentCenterAction.getLotterySumReport(parmData);
      }else if(sRrightType == 3) {
        AgentCenterAction.getHkSumReport(parmData);
      }
      
    }
    _itmeDiv(lottery){
       let  htmlDiv=[];
        let array=['重庆时时彩','澳门时时彩','天津时时彩','新加坡分分彩','加拿大三分彩','黑龙江时时彩','北京赛车PK10','德国赛车PK10','广东11选5','江西11选5','山东11选5','香港11选5','福彩3D',' 体彩排列3',];
        if(lottery && lottery.toJS().length) {
          for(let i = 0; i < 14; i ++) {
            const name = array[i];
            let bet = '0.000';
            let money = '0.000';
            lottery.map((item,key) => {
                if(item.get('lotteryName') == array[i]) {
                    bet = item.get('bet') ? item.get('bet').toFixed(3) : '0.000';
                    money = item.get('money') ? item.get('money').toFixed(3) : '0.000';
                }
            })
            htmlDiv.push(<div className={styles.gSitemLeftPaddingRtopItem}>
                <span className={styles.gSspanTitle}>{name}：</span>
                <span className={styles.gSspanContent}>
                            投注{bet}元/中奖{money}元
                </span></div>
            );
          }
          
        }else {
              array.map((item, key) => {
                htmlDiv.push(<div className={styles.gSitemLeftPaddingRtopItem} key={key}>
                    <span className={styles.gSspanTitle}>{array[key]}：</span>
                    <span className={styles.gSspanContent}>
                                投注0.000元/中奖0.000元
                            </span></div>);
              })
        }
      
       return htmlDiv;
    }
    showContent(ty,gStatement,teamTotalUser,lottery,hkSumReport){
        const views = [];
        if(ty === 1) {
            views.push(
                <div className={styles.gSbox}>
                    <div className={`${styles.gSitem} ${styles.gSitemLeft}`}>
                        <div className={styles.gSitemLeftPaddingL}>
                        <div className={styles.gSitemLeftPaddingRtop}><span className={styles.gSspanTitle}>团队总人数：</span><span className={styles.gSspanContent}>{teamTotalUser.get('data') ? teamTotalUser.get('data') : 0}</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>充值总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('userRecharge') ? gStatement.get('userRecharge') : 0}</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>投注总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('bet') ? gStatement.get('bet') : 0 }</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>返点总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('rebate') ? gStatement.get('rebate') : 0}</span></div>
                        <div><span className={styles.gSspanTitle}>其他：</span><span className={styles.gSspanContent}>无</span></div>
                        </div>
                    </div>
                    <div className={`${styles.gSitem} ${styles.gSitemRight}`}>
                        <div className={styles.gSitemLeftPaddingR}>
                        <div className={styles.gSitemLeftPaddingRtop}><span className={styles.gSspanTitle}>时间范围内注册：</span><span className={styles.gSspanContent}>{gStatement.get('regTotal') ? gStatement.get('regTotal') : 0 }</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>提现总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('encashment') ? gStatement.get('encashment'): 0 }</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>中奖总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('bonus') ? gStatement.get('bonus') : 0}</span></div>
                        <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>活动总额：</span><span className={styles.gSspanContent}>¥ {gStatement.get('giftMoney') ? gStatement.get('giftMoney')  : 0 }</span></div>
                        <div><span className={styles.gSspanTitle}>实际盈亏：</span><span className={styles.gSspanContent}>¥ {gStatement.get('realProfit') ? gStatement.get('realProfit') : 0}</span></div>
                        </div>
                    </div>
                </div>
            );
        }else if(ty === 2) {
              const lotteryList=lottery.get('lottery') ? lottery.get('lottery') : null;
              const total=lottery.get('total') ? lottery.get('total') : 0;
              views.push(
                  <div className={styles.lotteryListBox}>
                      <div className={`${styles.lotteryListBoxFixe} ${styles.dcclear}`}>
                          {this._itmeDiv(lotteryList)}
                      </div>
                      <div className={`${styles.lotteryListBoxFixe} ${styles.dcclear} ${styles.lotteryListTop}`}>
              
                              <div className={styles.gSitemLeftPaddingRtopItem}>
                                  <span className={styles.gSspanTitle}>返点总额：</span>
                                  <span className={styles.gSspanContent}>
                                      {total && total.get('rebate') ? total.get('rebate') : 0}元
                                  </span>
                              </div>
              
                          <div className={styles.gSitemLeftPaddingRtopItem}>
                              <span className={styles.gSspanTitle}>活动总额：</span>
                              <span className={styles.gSspanContent}>
                                      {total && total.get('giftMoney') ? total.get('giftMoney') : 0}元
                                  </span>
                          </div>
              
                              <div className={styles.gSitemLeftPaddingRtopItem}>
                                  <span className={styles.gSspanTitle}>其他：</span>
                                  <span className={styles.gSspanContent}>
                                     无
                                  </span>
                              </div>
                              <div className={styles.gSitemLeftPaddingRtopItem}>
                                  <span className={styles.gSspanTitle}>彩票盈亏：</span>
                                  <span className={styles.gSspanContent}>
                                      {total && total.get('realProfit') ? total.get('realProfit') : 0}元
                                  </span>
                              </div>
                      </div>
                  </div>
              );
        }else if(ty === 3) {
          views.push(
              <div className={`${styles.gSbox} ${styles.gSboxHKPadding}`}>
                  <div className={`${styles.gSitem} ${styles.gSitemLeft}`}>
                      <div className={styles.gSitemLeftPaddingL}>
                          <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>投注：</span><span className={styles.gSspanContent}>¥ {hkSumReport ? hkSumReport.get('bet') : 0} 元</span></div>
                          <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>返点：</span><span className={styles.gSspanContent}>¥ {hkSumReport ? hkSumReport.get('rebate') : 0} 元</span></div>
                      </div>
                  </div>
                  <div className={`${styles.gSitem} ${styles.gSitemRight}`}>
                      <div className={styles.gSitemLeftPaddingR}>
                          <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>中奖：</span><span className={styles.gSspanContent}>¥ {hkSumReport ? hkSumReport.get('bonus') : 0} 元</span></div>
                          <div className={styles.gSitemLeftPaddingRtopItem}><span className={styles.gSspanTitle}>实际盈亏：</span><span className={styles.gSspanContent}>¥ {hkSumReport ? hkSumReport.get('realProfit') : 0 } 元</span></div>
                      </div>
                  </div>
              </div>
          );
        }
        return views;
    }
    _runS(obj){
        if(!obj) return;
    }
  render() {
    const sRrightType=this.state.sRrightType;//选项卡的切换type
    const gStatement=this.props.getGeneralStatement;//统计报表-总报表
    const teamTotalUser=this.props.getTeamTotalUser;//获取团队总人数
    const lotterySumReport=this.props.LotterySumReport;//获取团队彩票类
    const HkSumReport=this.props.getHkSumReport;// 获取团队香港彩总报表
    return (
        <div className={`${styles.angetContent} ${styles.gStatementContent}`}>
            <div className={styles.angetSearch}>
                <div className={styles.angetSearch2}>
                    选择日期&nbsp;
                    <DatePicker
                        selected={moment(this.state.dateTimeStart)}
                        onChange={(value) => {
                            const dateString = moment(value).format('YYYY-MM-DD');
                            this.setState({ dateTimeStart: dateString })
                        }}
                        className={styles.datePickerStyle}
                        maxDate={moment()}
                        dateFormat='YYYY-MM-DD'
                    />
                    &nbsp;到&nbsp;
                    <DatePicker
                        selected={moment(this.state.dateTimeEnd)}
                        onChange={(value) => {
                            const dateString = moment(value).format('YYYY-MM-DD');
                            this.setState({ dateTimeEnd: dateString })
                        }}
                        className={styles.datePickerStyle}
                        maxDate={moment()}
                        // minDate={this.state.dateTimeStart}
                        // disabled={this.state.dateTimeStart ? false : true}
                        dateFormat='YYYY-MM-DD'
                    />
                </div>
                <div className={styles.angetSearch3}
                     onClick={() => {
                         this.gStatement()
                     }}
                >搜 索</div>
            </div>
            <div className={styles.sRtabBoxDiv}>
                <div className={styles.sRtabBox}>
                    <div className={styles.sRtabBox1}>
                        <div className={sRrightType === 1 ? styles.nosRtabdiv : styles.sRtabdiv} onClick={() => {
                          this.setState({
                            sRrightType:1,
                            dateTimeStart: moment().format('YYYY-MM-DD'),
                            dateTimeEnd: moment().format('YYYY-MM-DD'),
                          })
                          AgentCenterAction.getTeamTotalUser({});
                          AgentCenterAction.getGeneralStatement(defalutTime);
                        }}><span className={styles.sRtabdivSapan}>总报表</span></div>
                        <div className={sRrightType === 2 ? styles.nosRtabdiv : styles.sRtabdiv} onClick={() => {
                          this.setState({
                            sRrightType:2,
                            dateTimeStart: moment().format('YYYY-MM-DD'),
                            dateTimeEnd: moment().format('YYYY-MM-DD'),
                          })
                          AgentCenterAction.getLotterySumReport(defalutTime);
                        }}><span className={styles.sRtabdivSapan}>彩票类</span></div>
                        <div className={sRrightType === 3 ? styles.nosRtabdiv : styles.sRtabdiv} onClick={() => {
                          this.setState({
                            sRrightType:3,
                            dateTimeStart: moment().format('YYYY-MM-DD'),
                            dateTimeEnd: moment().format('YYYY-MM-DD'),
                          })
                          AgentCenterAction.getHkSumReport(defalutTime);
                        }}><span className={styles.sRtabdivSapan}>香港彩</span></div>
                    </div>
                </div>
                <div className={styles.sRlistBox}>
                    {this.showContent(sRrightType,gStatement,teamTotalUser,lotterySumReport,HkSumReport)}
                </div>
            </div>
        </div>
    );
  }
}

export default StatisticalReport;
