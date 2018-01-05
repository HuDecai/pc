import React, { PropTypes } from 'react';
import * as LotteryAction from '../../../actions/LotteryAction';
import * as NewLotteryAction from '../../../actions/NewLotteryAction';
import TeMa from './TeMa';
import TwoSides from './TwoSides';
import Weishu from './Weishu';
import Immutable from 'immutable';
import styles from './styles.css';

export default class NewLotteryHongLan extends React.PureComponent {
  renderMenu() {
    const listPlayCate = this.props.currentLotteryType.get('listPlayKind');
    const currentPlayCate = this.props.selectPlayInfo.get('playKind');
    const views = [];
    listPlayCate && listPlayCate.forEach((item, index) => {
      const isSelect = currentPlayCate && currentPlayCate.get('id') === item.get('id');
      views.push(
        <div
          key={item.get('id')}
          className={isSelect ?  styles.checkedCard : styles.noCard}
          onClick={() => {
            LotteryAction.setHongKongMenu(item);
            NewLotteryAction.xiaZhuNumber({numbers: []});
          }}
        >
          {item.get('name')}
        </div>
      );
    });
    return views;
  }
  render() {
    const showPlayContent = () => {
      const views = [];
      if(this.props.selectPlayInfo.get('playKind').get('name') == '单号') {
        views.push(<TeMa hongKongTeMa={this.props.hongKongTeMa} touzhuDetail={this.props.touzhuDetail} />);
      }else if(this.props.selectPlayInfo.get('playKind').get('name') == '两面') {
        views.push(<TwoSides hongKongTwoSide={this.props.hongKongTwoSide} touzhuDetail={this.props.touzhuDetail} />);
      }else if(this.props.selectPlayInfo.get('playKind').get('name') == '一肖/尾数') {
        views.push(
          <Weishu 
             hongKongWeishu={this.props.hongKongWeishu} 
             touzhuDetail={this.props.touzhuDetail} 
             zodiac={this.props.zodiac}
             weiZodiac={this.props.weiZodiac}
          />
        );
      }
      return views;
    }
    return (
      <div>
          <div className={styles.cards}>
             {this.renderMenu()}
          </div>
          <div className={styles.playContent}>
             {showPlayContent()}
          </div>
      </div>
    );
  }
}
