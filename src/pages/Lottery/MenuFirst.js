import React from 'react';
import styles from './MenuFirst.css';

class MenuFirst extends React.PureComponent {
  renderMenu() {
    const views = [];
    this.props.listPlayCate && this.props.listPlayCate.forEach((item, index) => {
      const currentLotteryFirstMenu = this.props.currentLotteryFirstMenu;
      const isSelect = currentLotteryFirstMenu && currentLotteryFirstMenu.get('id') === item.get('id');
      views.push(
        <div
          key={item.get('id')}
          className={isSelect ? styles.menuFirstItemSelect : styles.menuFirstItem}
          onClick={() => this.props.setCurrentLotteryFirstMenu(item)}
        >
          {item.get('name')}
        </div>
      );
    });
    return views;
  }
  render() {
    return (
      <div className={styles.menuFirst}>
        {this.renderMenu()}
      </div>
    );
  }
}

export default MenuFirst;
