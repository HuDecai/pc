import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import {Input, Select } from 'antd';
import DatePicker from 'react-datepicker';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
import moment from 'moment';
const PageSize = 15;

class GenRenAgent extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: '',
      dateTimeStart: moment().format('YYYY-MM-DD'),
      dateTimeEnd: moment().format('YYYY-MM-DD'),
      pageNo: null,
        uId:this.props.uId,
    };
  }
  componentWillMount() {
    // 获取团队列表
    this.getTeamList({pageNo: 1 });
  }
  getTeamList(params) {
    // 获取搜索值2
    const searchData = {
      dateTimeStart: this.state.dateTimeStart,
      dateTimeEnd: this.state.dateTimeEnd,
      pageSize: PageSize,
        uId:this.props.uId,
      ...params
    };
    AgentCenterAction.getGenRenList(searchData);
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
      list.map((item, key) => {
        userRecharges = userRecharges + item.get('userRecharge');
        encashment = encashment + item.get('encashment');
        bet = bet + item.get('bet');
        bonus = bonus + item.get('bonus');
        rebate = rebate + item.get('rebate');
        giftMoney = giftMoney + item.get('giftMoney');
        realProfit = realProfit + item.get('realProfit');
        hkBet = hkBet + item.get('hkBet');
        hkBonus = hkBonus + item.get('hkBonus');
        hkRebate = hkRebate + item.get('hkRebate');
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
             <div className={`${styles.genRenDiv}`}>{item.get('username')}</div>
             {/*<div className={styles.genRenDiv}>{item.get('time')}</div>*/}
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('userRecharge').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('encashment').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('bet').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('bonus').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('rebate').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{item.get('giftMoney').toFixed(3)}&nbsp;</div>
             <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{item.get('realProfit').toFixed(3)}</div>
             {/*<div className={styles.genRenDiv}>{item.get('hkBet').toFixed(3)}</div>*/}
             {/*<div className={styles.genRenDiv}>{item.get('hkBonus').toFixed(3)}</div>*/}
             {/*<div className={styles.teamDiv1}>{item.get('hkRebate').toFixed(3)}</div>*/}
          </div>
        );
      })
      
      // 本页统计
      view.push(
        <div className={ styles.tabletr }>
           <div className={styles.genRenDiv}>本页统计</div>
           {/*<div className={styles.genRenDiv}>{'-'}</div>*/}
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{userRecharges.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{encashment.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{bet.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{bonus.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{rebate.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{giftMoney.toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{realProfit.toFixed(3)}</div>
           {/*<div className={styles.genRenDiv}>{hkBet.toFixed(3)}</div>*/}
           {/*<div className={styles.genRenDiv}>{hkBonus.toFixed(3)}</div>*/}
           {/*<div className={styles.teamDiv1}>{hkRebate.toFixed(3)}</div>*/}
        </div>
      );
      // 总统计
      const genRenTotal = this.props.genRenTotal;
      genRenTotal && view.push(
        <div className={ styles.tabletr }>
           <div className={styles.genRenDiv}>总计统计</div>
           {/*<div className={styles.genRenDiv}>{'-'}</div>*/}
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('userRecharge').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('encashment').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('bet').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('bonus').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('rebate').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontright}`}>{genRenTotal.get('giftMoney').toFixed(3)}&nbsp;</div>
           <div className={`${styles.teamDivtdbb} ${styles.fontrcolor} ${styles.teamDivBorderRN}`}>{genRenTotal.get('realProfit').toFixed(3)}</div>
           {/*<div className={styles.genRenDiv}>{genRenTotal.get('hkBet').toFixed(3)}</div>*/}
           {/*<div className={styles.genRenDiv}>{genRenTotal.get('hkBonus').toFixed(3)}</div>*/}
           {/*<div className={styles.teamDiv1}>{genRenTotal.get('hkRebate').toFixed(3)}</div>*/}
        </div>
      );
    }else{
      view.push(<div className={styles.noData}>暂无数据</div>);
    }
    return view;      
  }
  render() {
    const  genRenList= this.props.teamTotal;
    const hasNextPage = genRenList.get('hasNextPage'); //是否有下一页
    const hasPreviousPage = genRenList.get('hasPreviousPage'); //是否有上一页
    const isFirstPage = genRenList.get('isFirstPage'); //是否是第一页
    const isLastPage = genRenList.get('isLastPage'); //是否是最后一页
    const pages = genRenList.get('pages'); // 共几页
    const total = genRenList.get('total'); //共几条数据
    const pageNum = genRenList.get('pageNum');
    return (
      <div className={styles.angetContent}>
        {/****用户列表搜索*****/}
           <div className={styles.angetSearch}>
               {/*<div className={styles.angetSearch2}>*/}
                   {/*类型&nbsp;*/}
                   {/*<select onChange={(e) => this.setState({ type: e.target.value })}>*/}
                       {/*<option value='' >全部</option>*/}
                       {/*<option value='1' >彩票</option>*/}
                       {/*<option value='2' >香港彩</option>*/}
                   {/*</select>*/}
               {/*</div>*/}
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
                <div className={styles.angetSearch3}
                   onClick={() => {
                     this.props.cancelAction(this.props.pageNum);
                   }}
                 >返 回</div>
           </div>
         
         {/****团队列表展示*****/}
         <div>
           <div className={styles.angetTable}>
               <div className={styles.tableTitle}>
                  <div className={styles.genRenDiv}>用户名</div>
                  {/*<div className={styles.genRenDiv}>时间</div>*/}
                  <div className={styles.teamDivtdbb}>充值</div>
                  <div className={styles.teamDivtdbb}>提现</div>
                  <div className={styles.teamDivtdbb}>投注</div>
                  <div className={styles.teamDivtdbb}>中奖</div>
                  <div className={styles.teamDivtdbb}>返点</div>
                  <div className={styles.teamDivtdbb}>活动</div>
                  <div className={`${styles.teamDivtdbb} ${styles.teamDivtdbb} ${styles.teamDivBorderRN}`}>实际盈亏</div>
                  {/*<div className={styles.genRenDiv}>香港彩投注</div>*/}
                  {/*<div className={styles.genRenDiv}>香港彩中奖</div>*/}
                  {/*<div className={styles.teamDiv1}>香港彩返点</div>*/}
               </div>
               {this.showTableData(this.props.genRenList.get('list'))}
           </div>
           
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
               <div className={isLastPage ? styles.noPageBottom : styles.pageBottom}
                   onClick={() => {
                     if(!isLastPage) {
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
    );
  }
}

export default GenRenAgent;
