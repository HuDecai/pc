// 确认投注

import React from 'react';
import styles from './styles.css';

var tableScroll = null;

class TableShow extends React.PureComponent {
  tableScroll = null;
  showTrData(tema, zodiac) {
    const views = [];
    if(tema && zodiac) {
      views.push(
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
           <div>+{`0${tema}`.substr(-2)}</div>
           <div>{zodiac}</div>
        </div>
      )
    }
    return views;
  }
  getNumber(number){
    return `0${number}`.substr(-2);
  }
  showPingma(result) {
    return result.map(item => this.getNumber(item.split('-')[0])).join(',');
  }
  componentWillUnmount() {
    clearInterval(this.tableScroll);
  }
  render() {
    const showTableTitle = () => {
      const checkedID = this.props.checkedID;
      const views = [];
      if(checkedID == 1) {
        views.push(
          <div className={styles.pickTableHeader}>
            <div className={styles.table11}>期号(近10期)</div>
            <div className={styles.table12}>平码</div>
            <div className={styles.table13}>特码</div>
         </div>
       );
     }else if(checkedID == 2) {
       views.push(
         <div className={styles.pickTableHeader}>
           <div style={{ width: '90px', textAlign: 'center'}}>中奖者</div>
           <div style={{ width: '100px', textAlign: 'center'}}>彩种</div>
           <div style={{ width: '100px', textAlign: 'center'}}>奖金</div>
        </div>
       );
     }else if(checkedID === 5) {
       views.push(
         <div className={styles.pickTableHeader}>
           <div style={{ width: '110px', textAlign: 'center'}}>时间</div>
           <div style={{ width: '90px', textAlign: 'center'}}>投注</div>
           <div style={{ width: '90px', textAlign: 'center'}}>盈亏</div>
        </div>
      );
     }
      return views;
    }
    const showTableData = (dataSource) => {
      const checkedID = this.props.checkedID;
      const views = [];
       // 今日开奖
      if(checkedID === 1) {
       if(dataSource) {
         dataSource.map((item, key) => {
           const numbers = item.get('result').split(',');
           const tema = numbers.pop();
           views.push(
             <div key={key} className={styles.pickTableTd}>
                <div className={styles.table11}>{item.get('expect')}</div>
                <div className={styles.table12}>{this.showPingma(numbers)}</div>
                <div className={styles.table13}>{`+${tema.split('-').join(' ')}`}</div>
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
      }
      
      // 中奖排行榜
      if(checkedID === 2) {
         const tablesView = [];
         if(dataSource) {
           dataSource.map((item, key) => {
             tablesView.push(
               <div key={key} className={styles.pickTableTd}>
                  <div style={{ width: '90px', textAlign: 'left', paddingLeft: '30px'}}>{`${key+1}.${item.get('username')}`}</div>
                  <div style={{ width: '100px', textAlign: 'center'}}>六合彩</div>
                  <div style={{ width: '100px', textAlign: 'center'}}>{Number(item.get('totalBonus')).toFixed(3)}元</div>
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
                   <div id="scrollTable" style={{ height: '400px', overflowY: 'hidden' }}>
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
      }else if(checkedID === 5) {
         // 香港彩的本周盈亏
        if(dataSource) {
          dataSource.map((item, key) => {
            views.push(
              <div key={key} className={styles.pickTableTd}>
                  <div style={{ width: '120px', textAlign: 'center'}}>{`${item.get('time')} ${item.get('weekStr')}`}</div>
                  <div style={{ width: '90px', textAlign: 'center'}}>{item.get('hkbet') ? item.get('hkbet') : 0}</div>
                  <div style={{ width: '90px', textAlign: 'center'}}>{item.get('hkbonus') ? (item.get('hkbonus')-item.get('hkrebate')-item.get('hkbet')).toFixed(3) : 0}</div>
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
      const heightData = this.props.checkedID === 5 ? 155 : 138;
    return (
      <div>
        <div>
           {showTableTitle()}
        </div>
        {this.props.checkedID == 2 ? 
          <div style={{ height: '138px', overflow: 'hidden' }}>
           {showTableData(this.props.dataSource)}
          </div> : 
          <div style={{ height: `${heightData}`, overflow: 'scroll'}}>
             {showTableData(this.props.dataSource)}
          </div>
        }
      </div>
    );
  }
}

export default TableShow;
