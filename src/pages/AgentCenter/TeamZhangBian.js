import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import DatePicker from 'react-datepicker';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
const styles = require('./styles.css');
import moment from 'moment';
const PageSize = 15;

class TeamZhangBian extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      type: '',
      range: 2,
      dateTimeStart: moment().format('YYYY-MM-DD'),
      dateTimeEnd: moment().format('YYYY-MM-DD'),
      pageNo: null,
    };
  }
  componentWillMount() {
    this.getTeamList({pageNo: 1 });
  }
  getTeamList(params) {
    // 获取搜索值
    const searchData = {
      username: this.state.username,
      type: this.state.type ? Number(this.state.type) : '',
      range: this.state.range ? Number(this.state.range) : '',
      dateTimeStart: this.state.dateTimeStart,
      dateTimeEnd: this.state.dateTimeStart,
      pageSize: PageSize,
      ...params
    };
    AgentCenterAction.getTeamZhangBianList(searchData);
  }
  getJiaoyiType(type,ty) {
    let name = '';
    if(type) {
        ty.map((item,key) => {
        if(key == type) {
          name = item;
          return;
        }
      })
    }
    return name;
  }
  showTableData(list,ty) {
    const view = [];
    if(list) {
      list.map((item, key) => {
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
              <div className={styles.div1}>{item.get('idStr')}</div>
              <div className={styles.div5}>{item.get('username')}</div>
              <div className={styles.div1}>{item.get('datetime')}</div>
              <div className={styles.div5}>{item.get('typeStr')}</div>
              <div className={`${styles.div1} ${styles.colorooo}`}>{item.get('shouMoney').toFixed(3)}</div>
              <div className={`${styles.div1} ${styles.colorooo}`}>{item.get('zhiMoney').toFixed(3)}</div>
              {/*<div className={styles.div1}>{item.get('debtBefore').toFixed(3)}</div>*/}
              <div className={`${styles.div1} ${styles.colorooo}`}>{item.get('practical').toFixed(3)}</div>
              <div className={styles.div11}>{item.get('digest')}</div>
          </div>
        );
      })
    }else {
      view.push(<div className={styles.noData}>暂无数据</div>);
    }
    return view;
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={key}>{item}</option>)
      });
    }
    return view;
  }
  render() {
    const zhangbianList = this.props.zhangbianList;
    const  bargainType= this.props.jiaoyiType;
      if(!bargainType) return;
    const isFirstPage = zhangbianList.get('firstPage'); //是否是第一页
    const isLastPage = zhangbianList.get('lastPage'); //是否是最后一页
    const pages = zhangbianList.get('pages'); // 共几页
    const total = zhangbianList.get('totalSize'); //共几条数据
    const pageNum = zhangbianList.get('page');
    return (
      <div className={styles.angetContent}>
        {/****用户列表搜索*****/}
         <div className={styles.angetSearch}>
             <div className={styles.angetSearch1}>
                 用户名 <input onChange={(e) => this.setState({ username: e.target.value })} style={{ height: '25px', width: '173px', padding: '0 5px' }} />
             </div>
             {/*<div className={styles.angetSearch2}>*/}
                 {/*范围&nbsp;*/}
                 {/*<select className={styles.redSelect} onChange={(e) => this.setState({ range: e.target.value })} value={this.state.range} >*/}
                     {/*<option value='0'>直属下级</option>*/}
                     {/*<option value='1'>所有下级</option>*/}
                     {/*<option value='2'>自己</option>*/}
                 {/*</select>*/}
             {/*</div>*/}
             <div className={styles.angetSearch2}>
                 交易类型&nbsp;
                 <select className={styles.redSelect} onChange={(e) => this.setState({ type: e.target.value })}>
                     <option value="">全部</option>
                     {this.showOption(bargainType)}
                 </select>
             </div>
             <div className={styles.angetSearch2}>
             交易时间&nbsp;
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
             <div className={styles.angetSearch3}
                  style={{ marginLeft: '20px'}}
                  onClick={() => {
                      this.getTeamList({pageNo: pageNum })
                  }}
             >搜 索</div>
             </div>
        </div>
         {/*<div className={styles.angetSearch}>*/}
             {/*<div className={styles.angetSearch2}>*/}
                 {/*交易时间&nbsp;*/}
                 {/*<DatePicker*/}
                    {/*selected={moment(this.state.dateTimeStart)}*/}
                    {/*onChange={(value) => {*/}
                      {/*const dateString = moment(value).format('YYYY-MM-DD');*/}
                      {/*this.setState({ dateTimeStart: dateString })*/}
                    {/*}}*/}
                    {/*className={styles.datePickerStyle}*/}
                    {/*maxDate={moment()}*/}
                    {/*dateFormat='YYYY-MM-DD'*/}
                 {/*/>*/}
                 {/*&nbsp;到&nbsp;*/}
                 {/*<DatePicker*/}
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
             {/*</div>*/}
             {/*<div className={styles.angetSearch3}*/}
                {/*style={{ marginLeft: '20px'}}*/}
                {/*onClick={() => {*/}
                  {/*this.getTeamList({pageNo: pageNum })*/}
                {/*}}*/}
              {/*>搜 索</div>*/}
        {/*</div>*/}
         {/****列表展示*****/}
         <div>
           <div className={styles.angetTable}>
               <div className={styles.tableTitle}>
                  <div className={styles.div1}>帐变编号</div>
                  <div className={styles.div5}>用户名</div>
                   <div className={styles.div1}>帐变时间</div>
                  <div className={styles.div5}>交易类型</div>
                   <div className={styles.div1}>收入</div>
                   <div className={styles.div1}>支出</div>
                  <div className={styles.div1}>余额</div>
                  <div className={styles.div11}>备注</div>
               </div>
               {this.showTableData(this.props.zhangbianList.get('results'),bargainType)}
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

export default TeamZhangBian;
