import React from 'react';
import * as styles from './styles.css';
import CaiPiaoOrder from './CaipiaoOrder';
import HongkongOrder from './HongkongOrder';
import MoneyDetails from './MoneyDetails';
import RechargeRecord from './RechargeRecord';
import WithdrawalsRecord from './WithdrawalsRecord';
import Loading from '../../core/decorators/Loading';

// 加loading
@Loading(props => props.isFetching)
class OrderSelect extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      rightType1: this.props.rightType,  // 1是彩票订单  2 是香港彩订单 3 资金明细
    };
  }
  componentWillMount() {
    // 获取type值
  }
  render() {
    const rightType1 = this.state.rightType1;
    const rightType2 = this.state.rightType2;
    const showContent = (rightType1) => {
      const views = [];
      if(rightType1 === 1) {
        views.push(
          <CaiPiaoOrder 
             caiPiaoList={this.props.caiPiaoList}
             orderStatus={this.props.orderStatus}
             caiZhongList={this.props.caiZhongList}
             orderInfo={this.props.orderInfo}
          />
        );
      }else if(rightType1 === 2) {
        views.push(
          <HongkongOrder 
             hongKongList={this.props.hongKongList}
             caiZhongList={this.props.caiZhongList}
             orderStatus={this.props.orderStatus}
             orderInfo={this.props.orderInfo}
          />
        );
      }else if(rightType1 === 3) {
        views.push(
          <MoneyDetails
             moneyDetailList={this.props.moneyDetailList}
             jiaoyiType={this.props.jiaoyiType}
             bargainType={this.props.bargainType}
          />
        );
      }else if(rightType1 === 4) {
          views.push(
              <RechargeRecord
                  rechargeRecordList={this.props.rechargeRecordList}
              />
          );
      }else if(rightType1 === 5) {
          views.push(
              <WithdrawalsRecord
                  withdrawalsRecordList={this.props.withdrawalsRecordList}
              />
          );
      }
      return views;
    }
    return (
      <div className={styles.angetBody}>
         <div className={styles.angetTop}>
             <div className={styles.angetTitle}>
                 <div className={styles.angetTitleLeft}>
                    <div className={rightType1 === 1 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.setState({ rightType1: 1 })}>彩票订单</div>
                    <div className={rightType1 === 2 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.setState({ rightType1: 2 })}>香港彩订单</div>
                     <div className={rightType1 === 3 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.setState({ rightType1: 3 })}>资金明细</div>
                     <div className={rightType1 === 4 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.setState({ rightType1: 4 })}>充值记录</div>
                     <div className={rightType1 === 5 ? styles.onAngetTitleLeftCard : styles.angetTitleLeftCard} onClick={() => this.setState({ rightType1: 5 })}>提现记录</div>
                 </div>
             </div>
             {showContent(this.state.rightType1)}
         </div>
         <div className={styles.angetBottom} />
      </div>
    );
  }
}
export default OrderSelect;
