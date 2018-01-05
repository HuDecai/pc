import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as RecordAction from '../../actions/RecordAction';
const styles = require('./styles.css');
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
const pageSize = 15;

class WithdrawalsRecord extends React.PureComponent {

  constructor(props: Object) {
    super(props);
    this.state = {
      dateTimeStart: moment().format('YYYY-MM-DD'),
       dateTimeEnd: moment().format('YYYY-MM-DD'),
      pageNo: 1,
    };
  }
  componentWillMount() {
    this.getTeamList({ pageNo: 1 });

  }
  getTeamList(params) {
    // 获取搜索值
    const searchData = {
      dateTimeStart: this.state.dateTimeStart,
       dateTimeEnd:this.state.dateTimeStart,
        pageSize: pageSize,
      ...params
    };
      RecordAction.getWithdrawalsRecordList(searchData);
  }
  showTableData(list,page) {
    const view = [];
    console.log(page)
    if(list) {
      list.map((item, key) => {
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
              <div className={`${styles.div1} ${styles.colors}`}>{(key+1)+(page-1)*pageSize}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{item.get('getTime')}</div>
              <div className={`${styles.div5} ${styles.colors}`}>{item.get('money').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.colors}`}>{item.get('status')}</div>
              <div className={`${styles.divMax} ${styles.colors}`}>{item.get('reason')}</div>
          </div>
        );
      })
    }
    return view;      
  }


  render() {

    const withdrawalsRecordList = this.props.withdrawalsRecordList;
    const firstPage = withdrawalsRecordList.get('firstPage'); //是否是第一页
    const lastPage = withdrawalsRecordList.get('lastPage'); //是否是最后一页
    const pages = withdrawalsRecordList.get('pages'); // 共几页
    const total = withdrawalsRecordList.get('total'); //共几条数据
    const pageNum = withdrawalsRecordList.get('pageNum');
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
                      const dateString = moment(value).format('YYYY-MM-DD');
                      this.setState({ dateTimeStart: dateString })
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
                   <div className={styles.div1}>序号</div>
                   <div className={styles.div1}>申请时间</div>
                   <div className={styles.div5}>提现金额</div>
                  <div className={styles.div1}>状态</div>
                  <div className={styles.divMax}>备注</div>
               </div>
               {this.showTableData(this.props.withdrawalsRecordList.get('list'),pageNum)}
           </div>
           
           {/****用户列表分页*****/}
           <div className={styles.pageBody}>
               <div className={(pageNum-firstPage)!=0&&pageNum!=1? styles.pageBottom : styles.noPageBottom}
                  onClick={() => {
                      if((pageNum-firstPage)!=0&&pageNum!=1) {
                          this.getTeamList({
                              pageNo: 1
                          })
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
               <div className={(pageNum-lastPage)!=0&&lastPage!=0 ? styles.pageBottom : styles.noPageBottom}
                   onClick={() => {
if((pageNum-lastPage)!=0&&lastPage!=0 ){
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

                          if(e.target.value > 0&&e.target.value<=pages) {
                            this.setState({ pageNo: e.target.value });
                          }else{
                              this.setState({ pageNo: 1 })} 
                          }
                        }
                      /> 页
               </div>
               <div className={pages>1?styles.pageBottom:styles.noPageBottom}
                   onClick={() => {
                     if(pages>1) {
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

export default WithdrawalsRecord;
