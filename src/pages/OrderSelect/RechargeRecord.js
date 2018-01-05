import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as OrderSelectAction from '../../actions/OrderSelectAction';
import * as RecordAction from '../../actions/RecordAction';
const styles = require('./styles.css');
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
const pageSize = 15;

class RechargeRecord extends React.PureComponent {

  constructor(props: Object) {
    super(props);
    this.state = {
        dateTimeStart: moment().format('YYYY-MM-DD 00:00:00'),
        dateTimeEnd: moment().format('YYYY-MM-DD 23:59:59'),
        pageNo: '',
        type:''
    };
  }
  componentWillMount() {
    this.getTeamList({ pageNo: 1 });
      OrderSelectAction.getBargainType({});
  }
  getTeamList(params) {
    // 获取搜索值
    const searchData = {
        dateTimeStart: this.state.dateTimeStart,
        dateTimeEnd: this.state.dateTimeEnd,
        pageNo:this.state.pageNo,
        pageSize: pageSize,
      ...params
    };
      RecordAction.getRechargeRecordList(searchData);
  }
    _chongzhi(ty){
      const view=[];
      switch (ty){
          case 1:
              view.push('在线支付');
              break
          case 2:
              view.push('网银转账');
              break
          case 3:
              view.push('微信支付');
              break
          case 4:
              view.push('支付宝');
              break
          case 5:
              view.push('支付宝转卡');
              break
          case 6:
              view.push('QQ钱包');
              break
      }
      return view;
}
    _sta(ty){
        const view=[];
        switch (ty){
            case 0:
                view.push('未支付');
                break
            case 1:
                view.push('支付成功');
                break
            case 1:
                view.push('支付失败');
                break
        }
        return view;
    }
  showTableData(list,page) {
    const view = [];
    if(list) {
      list.map((item, key) => {
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
              <div className={`${styles.div4} ${styles.colors}`}>{(key+1)+(page-1)*pageSize}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{this._chongzhi(item.get('type'))}</div>
              <div className={`${styles.rediv} ${styles.colors}`}>{item.get('billno')}</div>
              <div className={`${styles.rediv} ${styles.colors}`}>{moment(item.get('date')).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className={`${styles.div1} ${styles.teamDivTxt}`}>{item.get('money').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.colors}`}>{this._sta(item.get('status'))}</div>
              <div className={`${styles.div1} ${styles.teamDivTxt}`}>{item.get('money').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.clearborde}`}>{item.get('remark')}</div>
          </div>
        );
      })
    }
    return view;      
  }
  getJiaoyiType(type) {
    let name = '';
    if(type) {
      this.props.jiaoyiType.map((item) => {
        if(item.get('value') == type) {
          name = item.get('name');
          return;
        }
      })
    }
    return name;
  }
    showOption(options) {
        const view = [];
        if(options) {
            options.map((item, key) => {
                view.push(<option value={key} >{item}</option>)
            });
        }
        return view;
    }
  render() {

    const moneyDetailList = this.props.rechargeRecordList;
    if(!moneyDetailList){ return}
    const isFirstPage = moneyDetailList.get('firstPage'); //是否是第一页
    const isLastPage = moneyDetailList.get('lastPage'); //是否是最后一页
    const pages = moneyDetailList.get('pages'); // 共几页
    const total = moneyDetailList.get('total'); //共几条数据
    const pageNum = moneyDetailList.get('pageNum');
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
         <div className={styles.angetSearch}>
             <div className={styles.angetSearch2}>
                 选择日期&nbsp;
                 <DatePicker 
                    selected={moment(this.state.dateTimeStart)}
                    onChange={(value) => {
                      const dateString = moment(value).format('YYYY-MM-DD 00:00:00');
                        const dateStringEnd = moment(value).format('YYYY-MM-DD 23:59:59');
                      this.setState({ dateTimeStart: dateString,dateTimeEnd:dateStringEnd })
                    }}
                    className={styles.datePickerStyle}
                    maxDate={moment()}
                    minDate={disabledStartDate()}
                    dateFormat='YYYY-MM-DD'
                 />

             </div>
             <div className={styles.angetSearch3}
                onClick={() => {
                  this.getTeamList({pageNo: pageNum })
                }}
              >搜 索</div>
        </div>
         
         {/****列表展示*****/}
         <div>
           <div className={styles.angetTable}>
               <div className={styles.tableTitle}>
                   <div className={styles.div4}>序号</div>
                   <div className={styles.div1}>充值方式</div>
                   <div className={styles.rediv}>充值编号</div>
                   <div className={styles.rediv}>申请时间</div>
                   <div className={styles.div1}>充值金额</div>
                  <div className={styles.div1}>状态</div>
                   <div className={styles.div1}>到帐金额</div>
                  <div className={`${styles.div1} ${styles.clearborde}`}>备注</div>
               </div>
               {this.showTableData(this.props.rechargeRecordList.get('list'),pageNum)}
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
               <div className={pageNum !== 1 ? styles.pageBottom : styles.noPageBottom}
                 onClick={() => {
                   if(pageNum !== 1) {
                     this.getTeamList({pageNo: pageNum-1 })
                   }
                 }}
               >上一页</div>
               <div className={pages && pageNum !== pages ? styles.pageBottom : styles.noPageBottom}
                 onClick={() => {
                   if(pages && pageNum !== pages) {
                     this.getTeamList({pageNo: pageNum+1 })
                   }
                 }}
               >下一页</div>
               <div className={!isLastPage ? styles.pageBottom : styles.noPageBottom}
                   onClick={() => {
                     if(!isLastPage) {
                       this.getTeamList({pageNo: pages, pageSize: pageSize })
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
                       this.getTeamList({ pageNo: this.state.pageNo, pageSize: pageSize })
                     }
                   }}
               >跳转</div>
           </div>
         </div>
      </div>
    );
  }
}

export default RechargeRecord;
