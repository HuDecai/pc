import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as styles from './styles.css';
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import { Form, Input, Button, Checkbox } from 'antd';
import * as LotteryAction from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/NewLotteryAction';
import Loading from '../../core/decorators/Loading';
import moment from 'moment';
import { shishicaiLongHu, PK10LongHu, dingdanshuan} from '../Lottery/core/fanshuiData.js';

const FormItem = Form.Item;

class OrderInfo extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      backBetList: [],
      secondsElapsed: 0,
      lId: 0,
    };
  }
  componentWillMount() {
    // 获取期数和倒计时
    const lId = this.getLid(this.props.orderInfo);
    if(lId) {
      LotteryAction.getLotteryExpect({ lId });
    }
    if(lId == 15){
      HKBetAction.hongKongPeiLv();
    }
    this.setState({
      backBetList: [],
      secondsElapsed: Number(this.props.currentLotteryExpect.get('time')),
      lId,
    });
    this._localtionParm(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.backBetClose) {
      this.setState({
        backBetList: [],
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
      LotteryAction.updateBackBetClose({ backBetClose: false, });
    }
    if(this.props.location.search !== nextProps.location.search) {
      this._localtionParm(nextProps);
    }
    if(this.props.orderInfo !== nextProps.orderInfo) {
      const lId = this.getLid(nextProps.orderInfo);
      if(lId) {
        LotteryAction.getLotteryExpect({ lId });
        this.setState({ lId });
      }
      if(lId == 15){
        HKBetAction.hongKongPeiLv();
      }
    }
    if(this.props.currentLotteryExpect.get('time') !== nextProps.currentLotteryExpect.get('time')) {
      
      this.setState({
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
    }
    if (this.props.currentLotteryExpect !== nextProps.currentLotteryExpect) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    const expect = this.props.currentLotteryExpect;
    if(this.state.secondsElapsed > 0) {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed - 1
      }));
    } else if(this.state.secondsElapsed === 0 && expect.get('openExpect')) {
      // 倒计时到0的时候请求下一期
      LotteryAction.getLotteryExpect({ lId: this.state.lId });
    }
  }
  _localtionParm(obj){
      const urlname = obj.location.search.split('=')[3];

      if(urlname==undefined){
          const id = obj.location.search.split('=')[1].split('&')[0];
          const userChaseId = obj.location.search.split('=')[2];
          if(userChaseId === 'null') {
              LotteryAction.getUserOrderInfo({ id });
          } else {
              LotteryAction.getUserAddList({ id: userChaseId });
          }
      }else{
          console.log(2)
          const idr = obj.location.search.split('=')[1].split('&')[0];
          const uids = obj.location.search.split('&')[3].split('=')[1];
          const uidId = obj.location.search.split('&')[1].split('=')[1];
          if(uidId === 'null') {
              LotteryAction.getUserOrderInfo({ id:idr,uId:uids });
          } else {
              LotteryAction.getUserAddList({ id: uidId ,uId:uids});
          }
      }
  }
  getLid(orderInfo) {
    let lId = 0;
    if(orderInfo.get('lId')) {
      lId = orderInfo.get('lId');
    }else if(orderInfo.get('userbetRecordDetailList') && orderInfo.get('userbetRecordDetailList').toJS().length) {
      lId = orderInfo.get('userbetRecordDetailList').toJS()[0].lId;
    }
    return lId;
  }
  chooseBackList(isChecked, index) {
    const backBetList = this.state.backBetList;
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    const listArr = [];
    if(isChecked) {
      // 选中
      if(list) {
        list.map((item, key) => {
          if(key >= index) {
            if(item.get('status') != '用户撤单') {
              listArr.push(item.get('id'));
            }
          }
        })
      }
    } else {
      // 取消
      if(list) {
        list.map((item, key) => {
          if(key > index) {
            listArr.push(item.get('id'));
          }
        })
      }
    }
    this.setState({
      backBetList: [...listArr]
    });
  }
  checkedBackBetList () {
    const backBetList = this.state.backBetList;
    if(backBetList.length) {
      return true;
    }
    return false;
  }
  renderTable(list) {
    const expect = this.props.currentLotteryExpect.get('openExpect');
    const view = [];
    list.map((item, index) => {
      let status = item.get('status');
      // if(item.get('expect') == expect) {
      //   status = '等待开奖';
      // }
      view.push(
        <tr key={index} className={styles.OrderDetailsTr}>
          <td width="103">{item.get('expect')}</td>
          <td width="125">{item.get('result')}</td>
          <td width="63">{status}</td>
          <td width="57">{item.get('beishu')}</td>
          <td width="100">￥{item.get('totalMoney').toFixed(3)}</td>
          <td width="100">￥{item.get('totalBonus').toFixed(3)}</td>
          <td width="32">
           {status !== '未开奖' || item.get('expect') < expect ? <div /> :
            <Checkbox
              onChange={(e) => {
                this.chooseBackList(e.target.checked, index)
              }}
              checked={this.state.backBetList.indexOf(item.get('id'))===-1?false:true}
            />}
          </td>
        </tr>
      );
    });
    return view;
  }
  getTouZhuInfo() {
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    let num = 0;
    let beishu = 0;
    let fandianjine = 0;
    let profit = 0;
    if(list) {
      list.map((item) => {
        num = num + item.get('num');
        beishu = beishu + item.get('beishu');
        fandianjine = fandianjine + item.get('mode')*item.get('totalMoney')/100;
        profit = profit + item.get('profit');
      })
    }
    return [num, beishu, fandianjine, profit];
  }
  render() {
    const singleMoney = {'2': '元', '0.2': '角', '0.02': '分'};
    const showOrderDetail = (detail, playKindId) => {
      let number = detail;
      // 龙虎
      if(shishicaiLongHu.indexOf(Number(playKindId)) !== -1 || PK10LongHu.indexOf(Number(playKindId)) !== -1) {
        let numbers = number && number.split('-');
        numbers = numbers && numbers.map(number => {
          if (number == '1') {
            return '龙';
          } else if (number == '2') {
            return '虎';
          } else if (number == '3') {
            return '和';
          }
        });
        number = numbers && numbers.join('-');
      }
      // 订单双
      if(playKindId == dingdanshuan) {
        let numbers = detail && detail.split('-');
        numbers = numbers && numbers.map(number => {
          if (number == '1') {
            return '0单5双';
          } else if (number == '2') {
            return '1单4双';
          } else if (number == '3') {
            return '2单3双';
          } else if (number == '4') {
            return '3单2双';
          } else if (number == '5') {
            return '4单1双';
          } else if (number == '6') {
            return '5单0双';
          }
        });
        number = numbers && numbers.join('-');
      }
      if(playKindId == 601 || playKindId == 600 || playKindId == 602) {
        number = this.props.hongKongPeiLv && this.props.hongKongPeiLv.map(item => {
            if(item.get('id') == number) {
              if(playKindId == 601 || playKindId == 602) {
                  return item.get('name');
              } else {
                return `特码${number}`;
              }
            
            }
        })
      }
      return number;
    }
    const showContent = () => {
      const views = [];
      // 没有追号
      if(this.props.orderInfo.get('userChaseId') === null) {
        views.push(
          <div>
          <div className={styles.lotteryContent}>
            <div>订单编号：{this.props.orderInfo.get('id')}</div>
            <div>奖金模式：{this.props.orderInfo.get('bonusType')}</div>
            <div>玩法名称：{this.props.orderInfo.get('playKindName')}</div>
            <div>投注模式：{this.props.orderInfo.get('lId') == 15 ? '元': singleMoney[this.props.orderInfo.get('singleMoney')]}</div>
            <div>投注期号：{this.props.orderInfo.get('expect')}</div>
            <div>投注时间：{this.props.orderInfo.get('time') || this.props.orderInfo.get('betTime') ? moment(this.props.orderInfo.get('time') || this.props.orderInfo.get('betTime')).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            <div>合计注数：{this.props.orderInfo.get('num')}</div>
            <div>投注倍数：{this.props.orderInfo.get('beishu')}</div>
            <div>投注金额：{this.props.orderInfo.get('totalMoney') && this.props.orderInfo.get('totalMoney').toFixed(3)}</div>
            <div>返点金额：{(this.props.orderInfo.get('mode')*this.props.orderInfo.get('totalMoney')/100).toFixed(3)}</div>
            <div>订单状态：{this.props.orderInfo.get('status')}</div>
            <div>开奖号码：{this.props.orderInfo.get('result')}</div>
            <div>中奖金额：{this.props.orderInfo.get('totalBonus').toFixed(3)}</div>
            <div>实际盈亏：{this.props.orderInfo.get('profit') && this.props.orderInfo.get('profit').toFixed(3)}</div>
          </div>
          <div className={styles.lotteryDetails}>
            <div className={styles.lotteryDetailsTitle}>
              投注内容
            </div>
            <div className={styles.lotteryDetailsContent}>
              {showOrderDetail(this.props.orderInfo.get('detail'), this.props.orderInfo.get('playKindId'))}
            </div>
          </div>
          <div className={styles.revokeFooter} style={this.props.orderInfo.get('userChaseId') === null ? {top: 5} : {}}>
            {this.props.orderInfo.get('expect') == this.props.currentLotteryExpect.get('openExpect') ? 
            <div
              onClick={() => {
                LotteryAction.addBackBet1(
                  {id: this.props.orderInfo.get('id')},
                  {id: this.props.orderInfo.get('id')},
                );
                this.setState({ backBetList: [] });
              }}
              className={ styles.revokeButton}
            >撤&nbsp;销</div> : <div /> }
          </div>
          </div>
        );
      }
      // 有追号
      if(this.props.orderInfo.get('userChaseId') !== null) {
        views.push(
          <div>
          <div className={styles.lotteryContent}>
            <div>订单编号：{this.props.orderInfo.get('id')}</div>
            <div>奖金模式：{this.props.orderInfo.get('bonusType')}</div>
            <div>玩法名称：{this.props.orderInfo.get('playKindName')}</div>
            <div>投注模式：{this.props.orderInfo.get('userbetRecordDetailList') ? singleMoney[this.props.orderInfo.get('userbetRecordDetailList').toJS()[0].singleMoney] : ''}</div>
            <div>投注期号：{this.props.orderInfo.get('expect')}</div>
            <div>投注时间：{this.props.orderInfo.get('time') ?  moment(this.props.orderInfo.get('time')).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            <div>合计注数：{this.getTouZhuInfo()[0]}</div>
            <div>投注倍数：{this.getTouZhuInfo()[1]}</div>
            <div>投注金额：{this.props.orderInfo.get('total') && this.props.orderInfo.get('total').toFixed(3)}</div>
            <div>返点金额：{this.getTouZhuInfo()[2].toFixed(3)}</div>
            <div>中奖金额：{this.props.orderInfo.get('awardMoney') && this.props.orderInfo.get('awardMoney').toFixed(3)}</div>
            <div>实际盈亏：{this.getTouZhuInfo()[3].toFixed(3)}</div>
            <div>追号期数：{this.props.orderInfo.get('userbetRecordDetailList') ? this.props.orderInfo.get('userbetRecordDetailList').count() : 0}</div>
            <div>完成期数：{this.props.orderInfo.get('finish')}</div>
            <div>追号状态：{this.props.orderInfo.get('status')}</div>
            <div>中奖停止：{this.props.orderInfo.get('winEnd') == '中奖停止' ? '是' : '否'}</div>
          </div>
          <div className={styles.lotteryDetails}>
            <div className={styles.lotteryDetailsTitle}>
              投注内容
            </div>
            <div className={styles.lotteryDetailsContent}>
              {showOrderDetail(this.props.orderInfo.get('detail'), this.props.orderInfo.get('playKindId'))}
            </div>
          </div>
          {this.props.orderInfo.get('userbetRecordDetailList') ?
          <div className={`${styles.lotteryDetails} ${styles.lotteryDetailsTable}`}>
            <table cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th width="103">追号期号</th>
                  <th width="125">开奖</th>
                  <th width="63">订单状态</th>
                  <th width="57">投注倍数</th>
                  <th width="90">购买金额</th>
                  <th width="87">中奖金额</th>
                  <th width="32">操作</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable(this.props.orderInfo.get('userbetRecordDetailList'))}
              </tbody>
            </table>
          </div> : ''}
          <div className={styles.revokeFooter}>
            <div
              onClick={() => {
                if(this.checkedBackBetList()) {
                  LotteryAction.addBackBet(
                    this.state.backBetList,
                    {userChaseId: this.props.location.search.split('=')[2]}
                  );
                  this.setState({ backBetList: [] });
                }
              }}
              className={ this.checkedBackBetList() ? styles.revokeButton : styles.disRevokeButton }
            >撤&nbsp;销</div>
          </div>
          </div>
        );
      }
      return views;
    }
    return (
      <div className={styles.bodyComponent}>
        <div className={styles.orderDetals}>
            <div className={styles.orderHeader}>
              {this.props.orderInfo.get('lotteryName')}---订单详情
            </div>
            <div style={{ minHeight: '320px' }}>
              {showContent()}
            </div>
        </div>
      </div>
    );
  }
}

export default OrderInfo;
