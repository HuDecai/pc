// 确认投注

import React from 'react';
import styles from './TableFirst.css';
import { chooseFiveLids } from './core/fanshuiData.js';

var tableScroll = null;

class TableFirst extends React.PureComponent {
  tableScroll = null;
  showTrData(type, data) {
    const views = [];
    if(type === 1) {
      views.push(
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
           <div>{data.get('group')? data.get('group') : ''}</div>
           <div>{data.get('andValue')?data.get('andValue'):''}</div>
        </div>
      )
    }else if(type === 2) {
      views.push(
        <div>{data.get('andValue')}</div>
      )
    }else if(type === 3) {
      views.push(
        <div>{data.get('singleAndDouble')}</div>
      )
    }
    return views;
  }

  componentWillUnmount() {
    clearInterval(this.tableScroll);
  }
  
  // 11选5 前加0
  showResult(result) {
    if(chooseFiveLids.indexOf(Number(this.props.lId)) !== -1) {
      const resArr = [];
      if(result){
        result.split(',').map((item) => {
          resArr.push(`0${item}`.substr(-2));
        })
      }
      return resArr.join(',');
    }
    return result;
  }
  render() {
    const showTableTitle = () => {
        const checkedID = this.props.checkedID;
        const views = [];
        if(checkedID === 1) {
          // 今日开奖
          let tdName = '';
          const currentType = this.props.currentType;
          if(currentType == 1) {
            tdName = '后三形态';
          }else if(currentType == 2) {
            tdName = '冠亚和值';
          }else if(currentType == 3) {
            tdName = '单双';
          }else if(currentType == 4) {
            tdName = '组合形态';
          }
          views.push(
            <div className={styles.pickTableHeader}>
              <div className={styles.table11}>期号(近10期)</div>
              <div className={styles.table12}>开奖号</div>
              <div className={styles.table13}>{tdName}</div>
           </div>
         )
       } else if(checkedID === 3 || checkedID === 4) {
         views.push(
           <div className={styles.pickTableHeader}>
             <div style={{ width: '110px', textAlign: 'center'}}>时间</div>
             <div style={{ width: '80px', textAlign: 'center'}}>投注</div>
             <div style={{ width: '80px', textAlign: 'center'}}>盈亏</div>
          </div>
        );
      } else if (checkedID === 2) {
        views.push(
          <div className={styles.pickTableHeader}>
            <div style={{ width: '90px', textAlign: 'center'}}>中奖者</div>
            <div style={{ width: '100px', textAlign: 'center'}}>彩种</div>
            <div style={{ width: '100px', textAlign: 'center'}}>奖金</div>
         </div>
        );
      }
       return views;
    }
    const showTableData = (dataSource) => {
      const checkedID = this.props.checkedID;
      const views = [];
      if(checkedID === 1) {
        let type = 0;
        const currentType = this.props.currentType;
        if(currentType == 1) {
          type = 1;
        }else if(currentType == 2) {
          type = 2;
        }else if(currentType == 3) {
          type = 3;
        }else if(currentType == 4) {
          type = 1;
        }
       if(dataSource) {
         dataSource.map((item, key) => {
           views.push(
             <div key={key} className={styles.pickTableTd}>
                <div className={styles.table11}>{item.get('expect')}</div>
                <div className={styles.table12}>{this.showResult(item.get('result'))}</div>
                <div className={styles.table13}>{this.showTrData(type, item)}</div>
             </div>
           );
         });
       }else {
         views.push(
           <div className={styles.pickTableTd}>
              <div className={styles.table1}>暂时没有记录！</div>
           </div>
         );
       }
      }else if(checkedID === 2) {
        const tablesView = [];
       if(dataSource) {
         dataSource.map((item, key) => {
           tablesView.push(
             <div key={key} className={styles.pickTableTd}>
                <div style={{ width: '90px', textAlign: 'left', paddingLeft: '30px'}}>{`${key+1}.${item.get('username')}`}</div>
                <div style={{ width: '100px', textAlign: 'center'}}>{item.get('name')}</div>
                <div style={{ width: '100px', textAlign: 'center'}}>{parseFloat(item.get('totalBonus')).toFixed(3)}元</div>
             </div>
           );
         });
         const that = this;
         $(function(){
                // 复制div1内容到div2
                $("#scrollTable2").html($("#scrollTable1").html());
                // 定时器
                if (!that.tableScroll) {
                  that.tableScroll = setInterval(scrolls,500);
                }
                //滚动函数
                function scrolls(){

                  // console.log($("#scrollTable").scrollTop());
                  // console.log($("#scrollTable").scrollTop);
                  // $("#scrollTable").scrollTop($("#scrollTable").scrollTop()+5);
                    if($("#scrollTable").scrollTop()>=$("#scrollTable2").height()){
                      console.log(
                        $("#scrollTable").scrollTop(),
                        $("#scrollTable1").height(),
                        $("#scrollTable2").height(),
                      )
                        $("#scrollTable").scrollTop($("#scrollTable").scrollTop()-$("#scrollTable1").height());
                    }else{
                      console.warn(
                        $("#scrollTable").scrollTop(),
                        $("#scrollTable1").height(),
                        $("#scrollTable2").height(),
                      )
                        $("#scrollTable").scrollTop($("#scrollTable").scrollTop()+5);
                    }
                }
                // 鼠标悬停停止
                $("#scrollTable").mouseover(function(){
                  // console.log('scrollTable mouseover');
                  //   clearInterval(tableScroll);
                });
                //鼠标离开继续
                $("#scrollTable").mouseout(function(){
                    // tableScroll = setInterval(scrolls,2000);
                });
            })
         return (
           <div>
               <div id="scrollTable" style={{ height: '550px', overflowY: 'hidden' }}>
                 <div id="oneDiv">
                      <div id="div1">
                          {tablesView}
                      </div>
                      <div id="div2">
                      </div>
                  </div>
                 <div id="scrollTable1">
                   {tablesView}
                 </div>
                 <div id="scrollTable2">
                 </div>
               </div>
           </div>
         )
       }else {
         views.push(
           <div className={styles.pickTableTd}>
              <div className={styles.tableTr3}>暂时没有记录！</div>
           </div>
         );
       }
      }else if(checkedID === 3) {
        // 本周盈亏
       if(dataSource) {
         dataSource.map((item, key) => {
           views.push(
             <div key={key} className={styles.pickTableTd}>
                <div style={{ width: '110px', textAlign: 'center'}}>{`${item.get('time')} ${item.get('weekStr')}`}</div>
                <div style={{ width: '80px', textAlign: 'center'}}>{item.get('bet').toFixed(3)}</div>
                <div style={{ width: '80px', textAlign: 'center'}}>{item.get('realProfit').toFixed(3)}</div>
             </div>
           );
         });
       }else {
         views.push(
           <div className={styles.pickTableTd}>
              <div className={styles.table3}>暂时没有记录！</div>
           </div>
         );
       }
      }else if(checkedID === 4) {
        // 上周盈亏
       if(dataSource) {
         dataSource.map((item, key) => {
           views.push(
             <div key={key} className={styles.pickTableTd}>
                 <div style={{ width: '110px', textAlign: 'center'}}>{`${item.get('time')} ${item.get('weekStr')}`}</div>
                 <div style={{ width: '80px', textAlign: 'center'}}>{item.get('bet').toFixed(3)}</div>
                 <div style={{ width: '80px', textAlign: 'center'}}>{item.get('realProfit').toFixed(3)}</div>
             </div>
           );
         });
       }else {
         views.push(
           <div className={styles.pickTableTd}>
              <div className={styles.table3}>暂时没有记录！</div>
           </div>
         );
       }
     }
      return views;
    }
    const heightData = this.props.checkedID === 3 || this.props.checkedID === 4 ? 115 : 130;
    return (
      <div>
        <div>
           {showTableTitle()}
        </div>
        {this.props.checkedID === 2 ? 
          <div style={{ height: '130px', overflow: 'hidden'}}>
             {showTableData(this.props.dataSource)}
          </div>: 
          <div style={{ height: `${heightData}`, overflow: 'scroll'}}>
             {showTableData(this.props.dataSource)}
          </div>}
      </div>
    );
  }
}

export default TableFirst;
