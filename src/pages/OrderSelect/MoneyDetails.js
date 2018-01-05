import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as OrderSelectAction from '../../actions/OrderSelectAction';
const styles = require('./styles.css');
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
const PageSize = 15;

class MoneyDetails extends React.PureComponent {

  constructor(props: Object) {
    super(props);
    this.state = {
      dateTimeStart: moment().format('YYYY-MM-DD'),
       dateTimeEnd: moment().format('YYYY-MM-DD'),
      pageNo: null,
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
       dateTimeEnd:this.state.dateTimeStart,
      pageSize: PageSize,
      range: 2,
        type:this.state.type?this.state.type:'',
      ...params
    };
    OrderSelectAction.getMoneyDetailList(searchData);
  }
  showTableData(list) {
    const view = [];
    if(list) {
      list.map((item, key) => {
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
              {/*<div className={styles.div1}>{item.get('username')}</div>*/}
              <div className={`${styles.div1} ${styles.colors}`}>{item.get('idStr')}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{item.get('datetime')}</div>
              <div className={`${styles.div5} ${styles.colors}`}>{item.get('typeStr')}</div>
              <div className={`${styles.div1} ${styles.teamDivTxt}`}>{item.get('shouMoney').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.teamDivTxt}`}>{item.get('zhiMoney').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div1} ${styles.teamDivTxt}`}>{item.get('debtAfter').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div11} ${styles.colors}`}>{item.get('digest')}</div>
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

        const {bargainType}=this.props;
      if (!bargainType){
          return false
      }
    const moneyDetailList = this.props.moneyDetailList;
    const isFirstPage = moneyDetailList.get('firstPage'); //是否是第一页
    const isLastPage = moneyDetailList.get('lastPage'); //是否是最后一页
    const pages = moneyDetailList.get('pages'); // 共几页
    const total = moneyDetailList.get('totalSize'); //共几条数据
    const pageNum = moneyDetailList.get('page');
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
                 交易类型&nbsp;
                 <select className={styles.redSelect} onChange={(e) => this.setState({ type: e.target.value })} >
                     <option value="">全部</option>
                     {this.showOption(bargainType)}
                 </select>
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
                    minDate={disabledStartDate()}
                    dateFormat='YYYY-MM-DD'
                 />
                 {/*&nbsp;到&nbsp;*/}
                 {/*<DatePicker */}
                     {/*selected={moment(this.state.dateTimeEnd)}*/}
                     {/*onChange={(value) => {*/}
                       {/*const dateString = moment(value).format('YYYY-MM-DD');*/}
                       {/*this.setState({ dateTimeEnd: dateString })*/}
                     {/*}}*/}
                    {/*className={styles.datePickerStyle}*/}
                    {/*maxDate={moment()}*/}
                    {/*minDate={this.state.dateTimeStart}*/}
                    {/*disabled={this.state.dateTimeStart ? false : true}*/}
                    {/*dateFormat='YYYY-MM-DD'*/}
                 {/*/>*/}
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
                   <div className={styles.div1}>帐变编号</div>
                   <div className={styles.div1}>帐变时间</div>
                   <div className={styles.div5}>交易类型</div>
                   <div className={styles.div1}>收入</div>
                   <div className={styles.div1}>支出</div>
                  <div className={styles.div1}>余额</div>
                  <div className={styles.div11}>备注</div>
                   {/*<div className={styles.div1}>游戏账号</div>*/}
               </div>
               {this.showTableData(this.props.moneyDetailList.get('results'))}
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
                       this.getTeamList({pageNo: pages, pageSize: PageSize })
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
                       this.getTeamList({ pageNo: this.state.pageNo, pageSize: PageSize })
                     }
                   }}
               >跳转</div>
           </div>
         </div>
      </div>
    );
  }
}

export default MoneyDetails;
