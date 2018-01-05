import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as OrderSelectAction from '../../actions/OrderSelectAction';
import * as LotteryAction from '../../actions/LotteryAction';
const styles = require('./styles.css');
import moment from 'moment';
import DatePicker from 'react-datepicker';
const PageSize = 15;

var newWindow2 = null;

class HongKongOrder extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      expect: '',
      status: '',
      lId: '',
        orderId:'',
      isChase: '', //是否追号
      betTimeStart: moment().format('YYYY-MM-DD'),
      betTimeEnd: moment().format('YYYY-MM-DD'),
    };
  }
  componentWillMount() {
    this.getUserList({ pageNo: 1 });
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={item.get('value')} key={key}>{item.get('name')}</option>)
      });
    }
    return view;
  }
  getUserList(params) {
    // 获取搜索值
    const searchData = {
      lId: 15,
        orderId: this.state.orderId ? this.state.orderId : '',
      expect: this.state.expect,
      status: this.state.status ? Number(this.state.status) : '',
      isChase: this.state.isChase ? Number(this.state.isChase) : '',
      betTimeStart: this.state.betTimeStart,
      betTimeEnd: this.state.betTimeEnd,
      pageSize: PageSize,
      ...params
    };
    OrderSelectAction.getHongKongList(searchData);
  }
  showTableData(list) {
    const view = [];
    if(list) {
      list.map((item, key) => {
        const status = item.get('status');
        let color = '';
        if(status == '未中奖') {
          color = 'green';
        }else if(status == '已中奖') {
          color = 'red';
        }
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
              <div className={`${styles.div1} ${styles.weight}`} style={{ color: '#2466d8'}}
                 onClick={() => this.showModal(item.get('id'), item.get('userChaseId'))}
              >{item.get('id')}</div>
              <div className={`${styles.teamDiv} ${styles.colors}`}>{item.get('detailName')}</div>
              <div className={`${styles.teamDiv} ${styles.colors}`}>{item.get('expect')}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{moment(item.get('betTime')).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className={`${styles.div4} ${styles.colors}`} style={{ color: `${color}`}}>{status}</div>
              <div className={`${styles.teamDiv} ${styles.teamDivTxt}`}>{item.get('totalMoney').toFixed(3)}&nbsp;</div>
              <div className={`${styles.teamDiv} ${styles.teamDivTxt}`}>{item.get('totalBonus').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.sjykwidth} ${styles.teamDivTxt}`}>{item.get('profit').toFixed(3)}&nbsp;</div>
          </div>
        );
      })
    }
    return view;
  }

  // 投注详情
  showModal = (id, userChaseId) => {
    let left = (screen.width - 666) / 2;
    if(left < 0) left = 0;
    let top = (screen.height - 419) / 2;
    if(top < 0)top = 0;
    if (newWindow2 && !newWindow2.closed) {
      newWindow2.location.href = `/?#/order-info?id=${id}&userChaseId=${userChaseId}`;
      newWindow2.focus();
    } else {
      newWindow2 = window.open(`/?#/order-info?id=${id}&userChaseId=${userChaseId}`, "_blank", `height=419, width=666, top=${top}, left=${left}` );
      newWindow2.focus();
      newWindow2.onclose = () => {
        newWindow2 = null;
      };
    }
  }
  render() {
    const hongKongList = this.props.hongKongList;
    const hasNextPage = hongKongList.get('hasNextPage'); //是否有下一页
    const hasPreviousPage = hongKongList.get('hasPreviousPage'); //是否有上一页
    const isFirstPage = hongKongList.get('isFirstPage'); //是否是第一页
    const isLastPage = hongKongList.get('isLastPage'); //是否是最后一页
    const pages = hongKongList.get('pages'); // 共几页
    const total = hongKongList.get('total'); //共几条数据
    const pageNum = hongKongList.get('pageNum');
    const disabledStartDate = () => {
      const day = moment().format('DD');
      if (day >= 15) {
            // 本月
            return moment().format('YYYY-MM-01');
      }else {
          return moment().subtract(1, 'months').format('YYYY-MM-01');
      }
    };
    return (
      <div className={styles.angetContent}>
        {/****用户列表搜索*****/}
        <div>
           <div className={styles.angetSearch}>
               {/*<div className={styles.angetSearch2}>*/}
                   {/*是否追号&nbsp;*/}
                   {/*<select className={styles.redSelect} onChange={(e) => this.setState({ status: e.target.value })} >*/}
                       {/*<option value='' >全部</option>*/}
                       {/*<option value='1' >是</option>*/}
                       {/*<option value='2' >否</option>*/}
                   {/*</select>*/}
               {/*</div>*/}
               <div className={styles.angetSearch2}>
                   订单状态&nbsp;
                   <select className={styles.redSelect} onChange={(e) => this.setState({ status: e.target.value })}>
                       {this.showOption(this.props.orderStatus)}
                   </select>
               </div>
               <div className={styles.angetSearch1}>
                   注单期号 <input onChange={(e) => this.setState({ expect: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px'}} />
               </div>
               <div className={styles.angetSearch1}>
                   注单编号 <input onChange={(e) => this.setState({ orderId: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px'}} />
               </div>
           </div>
           <div className={styles.angetSearch}>
               <div className={styles.angetSearch2}>
                   选择日期&nbsp;
                   <DatePicker
                      selected={moment(this.state.betTimeStart)}
                      onChange={(value) => {
                        const dateString = moment(value).format('YYYY-MM-DD');
                        this.setState({ betTimeStart: dateString })
                      }}
                      className={styles.datePickerStyle}
                      maxDate={moment()}
                      minDate={disabledStartDate()}
                      dateFormat='YYYY-MM-DD'
                   />
                   &nbsp;到&nbsp;
                   <DatePicker
                      selected={moment(this.state.betTimeEnd)}
                       onChange={(value) => {
                         const dateString = moment(value).format('YYYY-MM-DD');
                         this.setState({ betTimeEnd: dateString })
                       }}
                      className={styles.datePickerStyle}
                      maxDate={moment()}
                      minDate={this.state.betTimeStart}
                      disabled={this.state.betTimeStart ? false : true}
                      dateFormat='YYYY-MM-DD'
                   />
                   <div className={styles.angetSearch3}
                      style={{ marginLeft: '20px'}}
                      onClick={() => {
                        this.getUserList({pageNo: pageNum })
                      }}
                    >搜 索</div>
               </div>

           </div>
        </div>

         {/****用户列表展示*****/}
         <div>
           <div className={styles.angetTable}>
             <div className={styles.tableTitle}>
                 <div className={styles.div1}>注单编号</div>
                 <div className={styles.teamDiv}>玩法内容</div>
                 <div className={styles.teamDiv}>订单期号</div>
                 <div className={styles.div1}>订单时间</div>
                 <div className={styles.div4}>订单状态</div>
                 <div className={styles.teamDiv}>投注金额</div>
                 <div className={styles.teamDiv}>中奖金额</div>
                 {/*<div className={styles.div4}>追号状态</div>*/}
                 {/*<div className={styles.div4}>退水</div>*/}
                 <div className={`${styles.div1} ${styles.sjykwidth}`}>实际盈亏</div>
             </div>
               {this.showTableData(this.props.hongKongList.get('list'))}
           </div>

           {/****用户列表分页*****/}
           <div className={styles.pageBody}>
               <div className={isFirstPage ? styles.noPageBottom : styles.pageBottom}
                  onClick={() => {
                    if(!isFirstPage) {
                      this.getUserList({pageNo: 1 })
                    }
                  }}
               >首页</div>
               <div className={hasPreviousPage ? styles.pageBottom : styles.noPageBottom}
                 onClick={() => {
                   if(hasPreviousPage) {
                     this.getUserList({pageNo: pageNum-1 })
                   }
                 }}
               >上一页</div>
               <div className={hasNextPage ? styles.pageBottom : styles.noPageBottom}
                 onClick={() => {
                   if(hasNextPage) {
                     this.getUserList({pageNo: pageNum+1 })
                   }
                 }}
               >下一页</div>
               <div className={hasNextPage ? styles.pageBottom : styles.noPageBottom}
                   onClick={() => {
                     if(hasNextPage) {
                       this.getUserList({pageNo: pages })
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
                       this.getUserList({ pageNo: this.state.pageNo })
                     }
                   }}
               >跳转</div>
           </div>
         </div>
      </div>
    );
  }
}

export default HongKongOrder;
