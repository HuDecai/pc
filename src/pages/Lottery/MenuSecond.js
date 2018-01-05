import React from 'react';
import styles from './MenuSecond.css';
import Immutable from 'immutable';

class MenuSecond extends React.PureComponent {
  renderListPlayKind() {
    const views = [];
    this.props.currentLotteryFirstMenu && this.props.listPlayKind &&
    this.props.listPlayKind.filter(item => {
      return (
        item.get('playCateId') === this.props.currentLotteryFirstMenu.get('id')
      );
    }).forEach((item, index) => {
      const selectPlayKind = this.props.selectPlayInfo && this.props.selectPlayInfo.get('playKind');
      const isSelect = selectPlayKind &&  selectPlayKind.get('id') === item.get('id');
      const lId = Number(this.props.lId);
      let menuSecondItemSelect = styles.menuSecondItemSelect;
      let menuSecondItem = styles.menuSecondItem;
      if([2,5,13,14,19,20,24].indexOf(lId) !== -1) {
        menuSecondItemSelect = styles.menuSecondItemSelect;
      }else if([4,25].indexOf(lId) !== -1) {
        menuSecondItemSelect = styles.menuSecondItemSelect1;
      }else if([7,9,10,26].indexOf(lId) !== -1) {
        menuSecondItemSelect = styles.menuSecondItemSelect2;
      }else if([11,12].indexOf(lId) !== -1) {
        menuSecondItemSelect = styles.menuSecondItemSelect3;
      }
      if (this.props.currentLotteryFirstMenu.get('id') === 102 && [2,5,13,14,19,20,24].indexOf(lId) !== -1) {
        menuSecondItemSelect = styles.menuSecondItemSelect4;
        menuSecondItem = styles.menuSecondItem4;
      }
      views.push(
        <div
          key={item.get('id')}
          className={isSelect ? menuSecondItemSelect : menuSecondItem}
          onClick={() => this.props.changePlayKind(Immutable.fromJS({
            playKind: item,
            playCate: this.props.currentLotteryFirstMenu,
          }))}
        >
          {item.get('name')}
        </div>
      );
    });
    return views;
  }
  render() {
    return (
      <div className={styles.menuSecond}>
        <div>玩法：</div>
        {this.renderListPlayKind()}
      </div>
    );
  }
}

export default MenuSecond;
