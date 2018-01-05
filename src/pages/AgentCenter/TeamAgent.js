import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import {Input, Select } from 'antd';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import GeRenAgent from './GeRenAgent';
const styles = require('./styles.css');
import DatePicker from 'react-datepicker';
import Cookies from  'js-cookie';
import moment from 'moment';
const PageSize = 15;
var  _arr=[];
const defalutTime = {
    dateTimeStart: moment().format('YYYY-MM-DD'),
    dateTimeEnd: moment().format('YYYY-MM-DD'),
    username: Cookies.get('username'),
    pageSize:PageSize,
    pageNo: 1
}
class TeamAgent extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: Cookies.get('username'),
      userName: '',
      type: '',
      dateTimeStart: moment().format('YYYY-MM-DD'),
      dateTimeEnd: moment().format('YYYY-MM-DD'),
      pageNo: null,
      pageNum: 1,
      showType: 'team',
        uId:'',
        boll:false,
        sRrightType:1,
    };
  }

  componentWillMount() {
    // 获取团队列表
    this.getTeamList({ pageNo: 1 });
  }
  getTeamList(params) {
    // 获取搜索值1
    const searchData = {
      dateTimeStart: this.state.dateTimeStart,
      dateTimeEnd: this.state.dateTimeEnd,
        username:this.state.username,
      pageSize: PageSize,
        uId:this.state.uId,
      ...params
    };
    this.setState({ pageNum: searchData.pageNo });
    AgentCenterAction.getTeamList(searchData);
  }
  _userTxt(lowerNum,username,id){
      const view=[];
if(this.state.sRrightType==1){
view.push(lowerNum!=0?<div className={`${styles.teamDivtdbb} ${styles.coloreven}`} onClick={()=>{
    if($.inArray(id,_arr)==-1){
        _arr.push(id);
    }
    this.setState({ uId: id,boll:true,username:'' });
    this.getTeamList({ pageNo: 1 ,uId:id,username:''});
}}>{username}</div>:<div className={`${styles.teamDivtdbb}`}>{username}</div>)
}else if(this.state.sRrightType==2){
    view.push(lowerNum!=0?<div className={`${styles.teamDivtdbb} ${styles.coloreven} ${styles.teamDivtdbbhk}`} onClick={()=>{
        if($.inArray(id,_arr)==-1){
            _arr.push(id);
        }
        this.setState({ uId: id,boll:true,username:'' });
        this.getTeamList({ pageNo: 1 ,uId:id,username:''});
    }}>{username}</div>:<div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>{username}</div>)
}
return view;
  }
  showTableData(list) {
    const view = [];
    if(list) {
      let userRecharges = 0;
      let encashment = 0;
      let bet = 0;
      let bonus = 0;
      let rebate = 0;
      let giftMoney = 0;
      let realProfit = 0;
      let hkBet = 0;
      let hkBonus = 0;
      let hkRebate = 0;
      let _userRecharges=0;
        let _encashment=0;
        let _bet=0;
        let _bonus=0;
        let _rebate=0;
        let _giftMoney=0;
        let _realProfit=0;
        let _hkBet = 0;
        let _hkBonus = 0;
        let _hkRebate = 0;
        let _profit=0;
      list.map((item, key) => {
          _userRecharges =item.get('userRecharge')?item.get('userRecharge'):0;
          _encashment =item.get('encashment')?item.get('encashment'):0;
          _bet =item.get('bet')?item.get('bet'):0;
          _bonus =item.get('bonus')?item.get('bonus'):0;
          _rebate =item.get('rebate')?item.get('rebate'):0;
          _giftMoney =item.get('giftMoney')?item.get('giftMoney'):0;
          _realProfit =item.get('realProfit')?item.get('realProfit'):0;

          _hkBet =item.get('hkBet')?item.get('hkBet'):0;
          _hkBonus =item.get('hkBonus')?item.get('hkBonus'):0;
          _hkRebate =item.get('hkRebate')?item.get('hkRebate'):0;
          if(key>0){
              userRecharges = userRecharges + _userRecharges;
              encashment = encashment + _encashment;
              bet = bet + _bet;
              bonus = bonus + _bonus;
              rebate = rebate + _rebate;
              giftMoney = giftMoney + _giftMoney;
              realProfit = realProfit + _realProfit;

              hkBet = hkBet + _hkBet;
              hkBonus = hkBonus + _hkBonus;
              hkRebate = hkRebate + _hkRebate;
          }
          _profit= _hkBet-_hkBonus-_hkRebate;
        // hkBet = hkBet + item.get('hkBet');
        // hkBonus = hkBonus + item.get('hkBonus');
        // hkRebate = hkRebate + item.get('hkRebate');
          if(this.state.sRrightType==1){
              view.push(
                  <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
                      {this._userTxt(item.get('lowerNum'),item.get('username'),item.get('id'))}
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_userRecharges.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_encashment.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_bet}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_bonus.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_rebate.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{_giftMoney.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{_realProfit.toFixed(3)}</div>
                  </div>
              );
          }else if(this.state.sRrightType==2){
              view.push(
                  <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
                      {this._userTxt(item.get('lowerNum'),item.get('username'),item.get('id'))}
                      <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{_hkBet}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{_hkBonus.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{_hkRebate.toFixed(3)}&nbsp;</div>
                      <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN} ${styles.teamDivtdbbhk}`}>{_profit.toFixed(3)}</div>
                  </div>
              );
          }

      })
        const teamTotal = this.props.teamTotal;
      console.log(teamTotal)
        if(this.state.sRrightType==1){
            // 本页统计
            view.push(
                <div className={ styles.tabletr }>
                    <div className={styles.teamDivtdbb}>本页统计</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{userRecharges.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{encashment.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{bet.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{bonus.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{rebate.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{giftMoney.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{realProfit.toFixed(3)}</div>
                </div>
            );
            // 总统计

            teamTotal && view.push(
                <div className={ styles.tabletr }>
                    <div className={styles.teamDivtdbb}>总计统计</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('userRecharge')}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('encashment').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('bet').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('bonus').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('rebate').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{teamTotal.get('giftMoney').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{teamTotal.get('realProfit').toFixed(3)}</div>
                </div>
            );
        }else if(this.state.sRrightType==2){
            // 本页统计
            view.push(
                <div className={ styles.tabletr }>
                    <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>本页统计</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{hkBet.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{hkBonus.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{hkRebate.toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN} ${styles.teamDivtdbbhk}`}>{realProfit.toFixed(3)}</div>
                </div>
            );
            // 总统计
            teamTotal && view.push(
                <div className={ styles.tabletr }>
                    <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>总计统计</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{teamTotal.get('hkBet').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{teamTotal.get('hkBonus').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontright} ${styles.teamDivtdbbhk}`}>{teamTotal.get('hkRebate').toFixed(3)}&nbsp;</div>
                    <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN} ${styles.teamDivtdbbhk}`}>{teamTotal.get('realProfit').toFixed(3)}</div>
                </div>
            );
        }

    }else {
      view.push(<div className={styles.noData}>暂无数据</div>);
    }
    return view;
  }
  render() {
      const  teamList= this.props.teamList;
      const hasNextPage = teamList.get('hasNextPage'); //是否有下一页
      const hasPreviousPage = teamList.get('hasPreviousPage'); //是否有上一页
      const isFirstPage = teamList.get('isFirstPage'); //是否是第一页
      const isLastPage = teamList.get('isLastPage'); //是否是最后一页
      const pages = teamList.get('pages'); // 共几页
      const total = teamList.get('total'); //共几条数据
      const pageNum = teamList.get('pageNum');
      const views = [];
      const {boll}=this.state;
      const {sRrightType}=this.state;//选项卡的切换type
    const showTableData = (type) => {

      if(sRrightType == 1) {
        views.push(
          <div>

             {/****团队列表展示*****/}
             <div>
               <div className={styles.angetTable}>
                   <div className={styles.tableTitle}>
                      <div className={styles.teamDivtdbb}>用户名</div>
                      <div className={styles.teamDivtdbb}>充值</div>
                      <div className={styles.teamDivtdbb}>提现</div>
                      <div className={styles.teamDivtdbb}>投注</div>
                      <div className={styles.teamDivtdbb}>中奖</div>
                      <div className={styles.teamDivtdbb}>返点</div>
                      <div className={styles.teamDivtdbb}>活动</div>
                       {/*<div className={styles.teamDiv}>其他</div>*/}
                      <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbb} ${styles.teamDivBorderRN}`}>实际盈亏</div>
                      {/*<div className={styles.teamDiv}>香港彩投注</div>*/}
                      {/*<div className={styles.teamDiv}>香港彩中奖</div>*/}
                      {/*<div className={styles.teamDiv1}>香港彩返点</div>*/}
                   </div>
                   {this.showTableData(this.props.teamList.get('list'))}
               </div>


             </div>
          </div>
        );
      }else if(sRrightType == 2){
          views.push(
              <div>

                  {/****团队列表展示*****/}
                  <div>
                      <div className={styles.angetTable}>
                          <div className={styles.tableTitle}>
                              <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>用户名</div>
                              <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>香港彩投注</div>
                              <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>香港彩中奖</div>
                              <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk}`}>香港彩返点</div>
                              <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbbhk} ${styles.teamDivBorderRN}`}>实际盈亏</div>
                          </div>
                          {this.showTableData(this.props.teamList.get('list'))}
                      </div>


                  </div>
              </div>
          );
      }
      return views;
    }
    return (
      <div className={styles.angetContent}>
          <div className={styles.sRtabBoxDiv}>
              <div className={styles.angetSearch}>
                  <div className={styles.angetSearch1}>
                      用户名 <input onChange={(e) => this.setState({ username: e.target.value })} style={{ height: '25px', width: '173px', padding: '0 5px' }}/>
                  </div>
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
                          minDate={this.state.dateTimeStart}
                          disabled={this.state.dateTimeStart ? false : true}
                          dateFormat='YYYY-MM-DD'
                      />
                  </div>
                  <div className={styles.angetSearch3}
                       onClick={() => {
                           this.getTeamList({pageNo: pageNum })
                       }}
                  >搜 索</div>
                  {_arr.length>0&&<div className={styles.angetSearch3}
                                       onClick={() => {
                                           let _i=0;
                                           _arr.pop();
                                           for(var i=0;i<_arr.length;i++){
                                               _i=i;
                                           }
                                           if(_arr.length==0){
                                               this.getTeamList({ pageNo: 1 ,uId:'',username:Cookies.get('username')});
                                           }else{
                                               this.getTeamList({ pageNo: 1 ,uId:_arr[_i]});
                                           }

                                       }}
                  >返 回</div>}
              </div>
              <div className={styles.sRtabBoxDiv}>
              <div className={styles.sRtabBox}>
                  <div className={styles.sRtabBox1}>
                      <div className={sRrightType === 1 ? styles.nosRtabdiv : styles.sRtabdiv} onClick={() => {
                          this.setState({
                              sRrightType:1,
                              dateTimeStart: moment().format('YYYY-MM-DD'),
                              dateTimeEnd: moment().format('YYYY-MM-DD'),
                          });
                          console.log(_arr,'123456456');
                          _arr=[];
                          AgentCenterAction.getTeamList(defalutTime);
                      }}><span className={styles.sRtabdivSapan}>彩票类报表</span></div>
                      <div className={sRrightType === 2 ? styles.nosRtabdiv : styles.sRtabdiv} onClick={() => {
                          this.setState({
                              sRrightType:2,
                              dateTimeStart: moment().format('YYYY-MM-DD'),
                              dateTimeEnd: moment().format('YYYY-MM-DD'),
                          });
                          console.log(_arr,'123456456');
                          _arr=[];
                          AgentCenterAction.getTeamList(defalutTime);
                      }}><span className={styles.sRtabdivSapan}>香港彩报表</span></div>

                  </div>
              </div>
              </div>
              <div className={styles.sRlistBox}>
                  {showTableData()}
                  {/****用户列表分页*****/}
                  <div className={styles.pageBody}>
                      <div className={isFirstPage ? styles.noPageBottom : styles.pageBottom}
                           onClick={() => {
                               if(!isFirstPage) {
                                   this.getTeamList({pageNo: 1 })
                               }
                           }}
                      >首页</div>
                      <div className={hasPreviousPage ? styles.pageBottom : styles.noPageBottom}
                           onClick={() => {
                               if(hasPreviousPage) {
                                   this.getTeamList({pageNo: pageNum-1 })
                               }
                           }}
                      >上一页</div>
                      <div className={hasNextPage ? styles.pageBottom : styles.noPageBottom}
                           onClick={() => {
                               if(hasNextPage) {
                                   this.getTeamList({pageNo: pageNum+1 })
                               }
                           }}
                      >下一页</div>
                      <div className={!hasNextPage ? styles.noPageBottom : styles.pageBottom}
                           onClick={() => {
                               if(!hasNextPage) {
                                   this.getTeamList({pageNo: pages })
                               }
                           }}
                      >末页</div>
                      <div className={styles.pageText}>
                          第<span>{pageNum}</span>页 共<span>{total}</span>条 共<span>{pages}</span>页&nbsp;&nbsp;
                          到第 <input
                          style={{ width: '40px'}}
                          value={this.state.pageNo}
                          onChange={(e) => {
                              if(e.target.value <= pages) {
                                  this.setState({ pageNo: e.target.value });
                              }else{
                                  this.setState({ pageNo: 1 })}
                          }
                          }
                      /> 页
                      </div>
                      <div className={styles.pageBottom}
                           onClick={() => {
                               if(this.state.pageNo) {
                                   this.getTeamList({ pageNo: this.state.pageNo })
                               }
                           }}
                      >跳转</div>
                  </div>
              </div>
          </div>

          </div>
    );
  }
}

export default TeamAgent;
