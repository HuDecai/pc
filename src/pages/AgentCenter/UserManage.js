import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import * as UserAction from '../../actions/UserAction';
import UpdateFandian from './UpdateFandian';
import GenRenManage from './GenRenManage';
const styles = require('./styles.css');
import moment from 'moment';
import { push,replace } from 'react-router-redux';
import { dispatch } from '../../store';
import * as changFandian from './common/changFandian';
const PageSize = 15;

class UserManage extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      username: '',
      status: '',
      pageNo: 1,
      pageNum: 1, // 上级页数
      type: '全部', // 全部 or 下级
      parentId: '',
      item: Immutable.Map({}),
      higherRebate: '',
      hkRebate: '',
      searchData: {},
        isAll:'false'
    };
  }
  componentWillMount() {
    // 获取用户列表
    this.getUserList({pageNo: 1, pageSize: PageSize });
    const higherRebate = this.props.userInfo.rebate;
    const hkRebate = this.props.userInfo.hkRebate;
    this.setState({ higherRebate, hkRebate });
  }
  getUserList(params) {
    // 获取搜索值
    const searchData = {
      type: this.state.status ? Number(this.state.status) : '',
        isAll:this.state.isAll,
      username: this.state.username,
      ...params
    };
    this.setState({ pageNum: searchData.pageNo, searchData });
    AgentCenterAction.getUserList(searchData);
  }
  showTableData(list) {
    const view = [];
    if(list) {
      list.map((item, key) => {
        view.push(
          <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
             <div className={`${styles.div2} ${styles.textleft}`}
                 onClick={() => {
                   if(this.state.type == '全部') {
                     this.setState({ type: '下级', parentId: item.get('id'), higherRebate: item.get('rebate'), hkRebate: item.get('hk_water') });
                   }
                 }}
             >
                &nbsp;{item.get('username')}
             </div>
              <div className={`${styles.div5} ${styles.colorooo}`}>{changFandian.changeFandianFlot(item.get('rebate')).toFixed(1)}</div>
              {/*<div className={styles.div5}>{item.get('hk_water')}</div>*/}
              <div className={`${styles.div5} ${styles.moneyright} ${styles.colorooo}`}>{item.get('leftMoney').toFixed(3)}&nbsp;</div>
              <div className={styles.div6}>{moment(item.get('created_at')).format('YYYY-MM-DD')}</div>
              <div className={styles.divBorderNone}>{moment(item.get('updated_at')).format('YYYY-MM-DD hh:mm:ss')}</div>
             <div className={`${styles.div2} ${styles.textleft}`} >&nbsp;{item.get('parentUserName')}</div>
             {/*<div className={styles.div2}>{item.get('parentUserName')}</div>*/}
             <div className={styles.div7}>{item.get('lowCount')}</div>
             {/*<div className={styles.div7} style={{ color: '#4bbe2e'}}>{item.get('lowCount')}</div>*/}
             {/*<div className={styles.div8}>{item.get('online') === 1 ? '在线' : '离线'}</div>*/}
             {/*<div className={styles.div9}>{item.get('status') === 1 ? '正常' : '锁定'}</div>*/}
             <div className={styles.divBorder} style={{ color: '#4bbe2e', display: 'flex', justifyContent: 'center'}}>

                 <div style={{ cursor: 'pointer' }}
                      onClick={() => {
                          this.setState({ visible: true, item: item, lowerRebate: item.get('rebate'), lowerHkRebate: item.get('hk_water')});
                          // 修改返点列表
                          AgentCenterAction.updateCaipiaoFandian({rebate: this.state.higherRebate, lowerRebate: item.get('rebate') });
                          AgentCenterAction.updateHongKongFandian({hkRebate: this.state.hkRebate, lowerHkRebate: item.get('hk_water')})
                      }}
                 >
                     编辑
                 </div>
                 <div style={{ cursor: 'pointer' }}
                      onClick={() => {
                          const  userUrl='/user-info?type=4&rightType=7&name='+item.get('username');
                        UserAction.changeType({ type: 4, rightType: 7 });
                        dispatch(replace(userUrl));
                      }}
                 >订单</div>
                 <div style={{ cursor: 'pointer' }}
                   onClick={() => {
                     UserAction.changeType({ type: 4, rightType: 8 });
                     dispatch(replace('/user-info?type=4&rightType=8'));
                   }}
                 >账变</div>
                 {/*<div style={{ margin: '0 5px', cursor: 'pointer' }}*/}
                   {/*onClick={() => {*/}
                     {/*UserAction.changeType({ type: 3, rightType: 1 });*/}
                     {/*dispatch(replace('/user-info?type=3&rightType=1'));*/}
                   {/*}}*/}
                 {/*>订单</div>*/}
                 <div style={{ cursor: 'pointer' }}
                      onClick={() => {
                         UserAction.changeType({ type: 4, rightType: 4 });
                         dispatch(replace('/user-info?type=4&rightType=4'));
                      }}
                 >团队余额</div>
             </div>
          </div>
        );
      })
    }else{
      view.push(<div className={styles.noData}>暂无数据</div>);
    }
    return view;
  }
  render() {
    const userList = this.props.userList;
    const hasNextPage = userList.get('hasNextPage'); //是否有下一页
    const hasPreviousPage = userList.get('hasPreviousPage'); //是否有上一页
    const isFirstPage = userList.get('isFirstPage'); //是否是第一页
    const isLastPage = userList.get('isLastPage'); //是否是最后一页
    const pages = userList.get('pages'); // 共几页
    const total = userList.get('total'); //共几条数据
    const pageNum = userList.get('pageNum') || this.state.pageNo;
    const showTable = () => {
      const views = [];
      if(this.state.type == '全部') {
        views.push(
          <div className={styles.angetContent}>
            {/****用户列表搜索*****/}
             <div className={styles.angetSearch}>
                 <div className={styles.angetSearch1}>
                     用户名 <input onChange={(e) => this.setState({ username: e.target.value })} style={{ height: '25px', width: '173px', padding: '0 5px' }}/>
                 </div>
                 <div className={styles.angetSearch2}>
                     用户类型&nbsp;
                     <select className={styles.redSelect} onChange={(e) => this.setState({ isAll: e.target.value })}>
                         <option value='false' >直属下级</option>
                         <option value="true" >全部下级</option>
                         {/*<option value='1' >直属代理</option>*/}
                     </select>
                 </div>
                 <div className={styles.angetSearch3}
                    onClick={() => {
                      this.getUserList({pageNo: pageNum, pageSize: PageSize })
                    }}
                  >搜 索</div>
             </div>

             {/****用户列表展示*****/}
             <div>
               <div className={styles.angetTable}>
                   <div className={styles.tableTitle}>
                      <div className={styles.div2}>用户名</div>
                       <div className={styles.div5}>奖金</div>
                       {/*<div className={styles.div5}>其他</div>*/}
                       <div className={styles.div5}>余额</div>
                       <div className={styles.div6}>注册时间</div>
                      <div className={styles.divBorderNone}>最近登入时间</div>
                      <div className={styles.div2}>代理</div>
                      {/*<div className={styles.div4}>香港彩</div>*/}
                      {/*<div className={styles.div8}>在线</div>*/}
                      {/*<div className={styles.div9}>状态</div>*/}
                       <div className={styles.div7}>团队</div>
                      <div className={styles.divBorder}>操作</div>
                   </div>
                   {this.showTableData(this.props.userList.get('list'))}
               </div>

               {/****用户列表分页*****/}
               <div className={styles.pageBody}>
                   <div className={isFirstPage ? styles.noPageBottom : styles.pageBottom}
                      onClick={() => {
                        if(!isFirstPage) {
                          this.getUserList({pageNo: 1, pageSize: PageSize })
                        }
                      }}
                   >首页</div>
                   <div className={hasPreviousPage ? styles.pageBottom : styles.noPageBottom}
                     onClick={() => {
                       if(hasPreviousPage) {
                         this.getUserList({pageNo: pageNum-1, pageSize: PageSize })
                       }
                     }}
                   >上一页</div>
                   <div className={hasNextPage ? styles.pageBottom : styles.noPageBottom}
                     onClick={() => {
                       if(hasNextPage) {
                         this.getUserList({pageNo: pageNum+1, pageSize: PageSize })
                       }
                     }}
                   >下一页</div>
                   <div className={isLastPage ? styles.noPageBottom : styles.pageBottom}
                       onClick={() => {
                         if(!isLastPage) {
                           this.getUserList({pageNo: pages, pageSize: PageSize })
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
                           this.getUserList({ pageNo: this.state.pageNo, pageSize: PageSize })
                         }
                       }}
                   >跳转</div>
               </div>
             </div>
             <UpdateFandian
                visible={this.state.visible}
                item={this.state.item}
                changeAction={()=> this.setState({ visible: false })}
                caiPiaoFandian={this.props.caiPiaoFandian}
                hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}
                searchData={this.state.searchData}
             />
          </div>
        );
      }else {
        views.push(
          <GenRenManage
             caiPiaoFandian={this.props.caiPiaoFandian}
             hongKongCaiPiaoFandian={this.props.hongKongCaiPiaoFandian}
             parentId={this.state.parentId}
             higherRebate={this.state.higherRebate}
             userList={this.props.userList}
             hkRebate={this.state.hkRebate}
             pageNum={this.state.pageNum}
             cancelAction={(pageNum) => {
               this.setState({ parentId: '', higherRebate: '', hkRebate: '', type: '全部'});
               this.getUserList({ pageNo: pageNum, pageSize: PageSize })
             }}
          />
        );
      }
      return views;
    }
    return (
      <div>{showTable()}</div>
    );
  }
}

export default UserManage;
