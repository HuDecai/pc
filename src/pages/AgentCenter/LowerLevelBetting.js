import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as OrderSelectAction from '../../actions/OrderSelectAction';
import * as LotteryAction from '../../actions/LotteryAction';
import { push,replace } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
const styles = require('./styles.css');
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Checkbox ,Input ,Select,Form, Radio,notification,message} from 'antd';
const PageSize = 15;
const CheckboxGroup = Checkbox.Group;
var newWindow = null;
const Hview = [];
class LowerLevelBetting extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      expect: '',
        username: '',
      status: '',
      lId: '2',
        orderId:'',
        chaseNum: '', //是否追号
      betTimeStart: moment().format('YYYY-MM-DD'),
      betTimeEnd: moment().format('YYYY-MM-DD'),
        names:''
    };
  }
    componentWillMount() {
      const urlLength=window.location.hash.split('?')[1].split('&');
      if(urlLength.length>2){
        const  names=urlLength[2].split('=')[1];
        this.setState({names:names});
          this.getUserList({ pageNo: 1,username:names });
      }else{
          this.getUserList({ pageNo: 1});
      }

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
      if(this.state.lId!=15){
          // 获取搜索值
          const searchData = {
              username:this.state.username,
              expect: this.state.expect,
              status: this.state.status ? Number(this.state.status) : '',
              lId: this.state.lId ? Number(this.state.lId) : '',
              orderId: this.state.orderId ? this.state.orderId : '',
              isChase: this.state.isChase ? this.state.isChase : '',
              betTimeStart: this.state.betTimeStart,
              betTimeEnd: this.state.betTimeEnd,
              pageSize: PageSize,
              ...params
          };
          console.log(this.state.lId,0)
          OrderSelectAction.getCaiPiaoList(searchData);
      }else{
          // 获取搜索值
          const searchData = {
              lId: this.state.lId,
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

  }
    _allSelectClick(e){
        if(e.target.checked){
            this.setState({
                isAllChecked:true,
                isChase:"1"
            })
        }else{
            this.setState({
                isAllChecked:false,
                isChase:''
            })
        }
    }
    _chaseNum(str){
        return (str?'追号'+str+'期':'无');
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
                 onClick={() => this.showModal(item.get('id'), item.get('userChaseId'),item.get('username'),item.get('uId'))}
              >{item.get('id')}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{item.get('username')}</div>
              <div className={`${styles.teamDiv} ${styles.colors}`}>{item.get('lotteryName')}</div>
              <div className={`${styles.teamDiv} ${styles.colors}`}>{item.get('expect')}</div>
              <div className={`${styles.div1} ${styles.colors}`}>{moment(item.get('betTime')).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className={`${styles.div4} ${styles.colors}`}>{this._chaseNum(item.get('chaseNum'))}</div>
              <div className={`${styles.div4} ${styles.colors}`} style={{ color: `${color}`}}>{status}</div>
              <div className={`${styles.teamDiv} ${styles.teamDivTxt}`}>{item.get('totalMoney').toFixed(3)}&nbsp;</div>
              <div className={`${styles.teamDiv} ${styles.teamDivTxt}`}>{item.get('totalBonus').toFixed(3)}&nbsp;</div>
              <div className={`${styles.div2} ${styles.teamDivTxt}`}>{item.get('profit').toFixed(3)}&nbsp;</div>
          </div>
        );
      })
    }
    return view;
  }
    showTableDataHongKong(list) {
        const view = [];
        if(list) {
            list.map((item, key) => {
                view.push(
                    <div className={ key%2 ===0 ? styles.tabletrOne : styles.tabletr} key={key}>
                        <div className={`${styles.div1} ${styles.weight} ${styles.hkdiv1}`} style={{ color: '#2466d8'}}
                             onClick={() => this.showModal(item.get('id'), item.get('userChaseId'))}
                        >{item.get('id')}</div>
                        <div className={`${styles.teamDiv} ${styles.colors} ${styles.hkdiv2}`}>{item.get('detailName')}</div>
                        <div className={`${styles.teamDiv} ${styles.colors}`}>{item.get('expect')}</div>
                        <div className={`${styles.div1} ${styles.colors}`}>{moment(item.get('betTime')).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className={`${styles.div4} ${styles.colors}`}>{item.get('status')}</div>
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
    showModal = (id, userChaseId,username,uid) => {
        let left = (screen.width - 666) / 2;
        if(left < 0) left = 0;
        let top = (screen.height - 419) / 2;
        if(top < 0)top = 0;
        if (newWindow && !newWindow.closed) {
            if(username&&uid){
                newWindow.location.href = `/?#/order-info?id=${id}&userChaseId=${userChaseId}&username=${username}&uid=${uid}`;
            }else{
                newWindow.location.href = `/?#/order-info?id=${id}&userChaseId=${userChaseId}`;
            }

            newWindow.focus();
        } else {
            if(username&&uid){
                newWindow = window.open(`/?#/order-info?id=${id}&userChaseId=${userChaseId}&username=${username}&uid=${uid}`, "_blank", `height=419, width=666, top=${top}, left=${left}` );
            }else{
                newWindow = window.open(`/?#/order-info?id=${id}&userChaseId=${userChaseId}`, "_blank", `height=419, width=666, top=${top}, left=${left}` );
            }

            newWindow.focus();
            newWindow.onclose = () => {
                newWindow = null;
            };
        }
    }


  render() {
      const {names,lId}=this.state;
    const caiPiaoList =lId!=15? this.props.caiPiaoList:this.props.hongKongList;
    const hasNextPage = caiPiaoList.get('hasNextPage'); //是否有下一页
    const hasPreviousPage = caiPiaoList.get('hasPreviousPage'); //是否有上一页
    const isFirstPage = caiPiaoList.get('isFirstPage'); //是否是第一页
    const isLastPage = caiPiaoList.get('isLastPage'); //是否是最后一页
    const pages = caiPiaoList.get('pages'); // 共几页
    const total = caiPiaoList.get('total'); //共几条数据
    const pageNum = caiPiaoList.get('pageNum');

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
               {lId!=15&& <div className={styles.angetSearch2}>
                   用户名&nbsp;
                   <input onChange={(e) => this.setState({ username: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px' }}/>
               </div>}
               <div className={styles.angetSearch2}>
                   订单状态&nbsp;
                   <select className={styles.redSelect} onChange={(e) => this.setState({ status: e.target.value })} >
                       {this.showOption(this.props.orderStatus)}
                   </select>
               </div>

               <div className={styles.angetSearch2}>
                   彩种类型&nbsp;
                   <select className={styles.redSelect} onChange={(e) => this.setState({ lId: e.target.value })} >
                       {this.showOption(this.props.caiZhongList)}
                   </select>
               </div>
               <div className={styles.angetSearch2}>
                   {lId!=15?<span>订单编号</span>:<span>注单编号</span>}&nbsp;
                   <input onChange={(e) => this.setState({ orderId: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px' }}/>
               </div>
               <div className={styles.angetSearch2}>
                       {lId!=15?<span>订单期号</span>:<span>注单期号</span>}&nbsp;
                   <input onChange={(e) => this.setState({ expect: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px' }}/>
               </div>
               {/*<div className={styles.angetSearch2}>*/}
                   {/*是否追号&nbsp;*/}
                   {/*<select className={styles.redSelect} onChange={(e) => this.setState({ status: e.target.value })} >*/}
                       {/*<option value='' >全部</option>*/}
                       {/*<option value='1' >是</option>*/}
                       {/*<option value='2' >否</option>*/}
                   {/*</select>*/}
               {/*</div>*/}
           </div>
           <div className={styles.angetSearch}>
               {/*<div className={styles.angetSearch1}>*/}
                   {/*投注期号 <input onChange={(e) => this.setState({ expect: e.target.value })} style={{ height: '25px', width: '130px', padding: '0 5px' }}/>*/}
               {/*</div>*/}
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
               </div>
               {lId!=15&&
               <div className={styles.angetSearch2}>
                   <Checkbox onClick={(e)=>this._allSelectClick(e)} />
                   &nbsp;只显示追号单
               </div>}
               <div className={styles.angetSearch3}
                  onClick={() => {

                      dispatch(replace('/user-info?type=4&rightType=7'));
                      const urlLength=window.location.hash.split('?')[1].split('&');
                      if(urlLength.length>2){
                          this.getUserList({pageNo: pageNum,username:names  })
                      }else{
                          this.getUserList({pageNo: pageNum,username:this.state.username  })
                      }

                  }}
                >搜 索</div>
           </div>
        </div>
          {lId==15&&
          <div>
              {/****用户列表展示*****/}
              <div>
                  <div className={styles.angetTable}>
                      <div className={styles.tableTitle}>
                          <div className={`${styles.div1} ${styles.hkdiv1}`}>注单编号</div>
                          <div className={`${styles.teamDiv} ${styles.hkdiv2}`}>玩法内容</div>
                          <div className={`${styles.teamDiv} ${styles.hkdiv13}`}>订单期号</div>
                          <div className={`${styles.div1} ${styles.hkdiv4}`}>订单时间</div>
                          <div className={`${styles.div4} ${styles.hkdiv5}`}>订单状态</div>
                          <div className={`${styles.teamDiv} ${styles.hkdiv6}`}>投注金额</div>
                          <div className={`${styles.teamDiv} ${styles.hkdiv7}`}>中奖金额</div>
                          <div className={`${styles.div1} ${styles.sjykwidth}`}>实际盈亏</div>
                      </div>
                      {this.showTableDataHongKong(this.props.hongKongList.get('list'))}
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
          }
          {lId!=15&&
          <div>
              {/****用户列表展示*****/}
              <div>
                  <div className={styles.angetTable}>
                      <div className={styles.tableTitle}>
                          <div className={styles.div1}>订单编号</div>
                          <div className={styles.div1}>用户名</div>
                          <div className={styles.teamDiv}>彩种名称</div>
                          <div className={styles.teamDiv}>订单期号</div>
                          <div className={styles.div1}>订单时间</div>
                          <div className={styles.div4}>追号状态</div>
                          <div className={styles.div4}>订单状态</div>
                          <div className={styles.teamDiv}>投注金额</div>
                          <div className={styles.teamDiv}>中奖金额</div>
                          <div className={styles.div2}>实际盈亏</div>
                      </div>
                      {this.showTableData(this.props.caiPiaoList.get('list'))}
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
          }

      </div>
    );
  }
}

export default LowerLevelBetting;
