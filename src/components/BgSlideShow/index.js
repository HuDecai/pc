import React from 'react';
import styles from './styles.css';

class BgSlideShow extends React.PureComponent {
  renderItem(index) {
    return (
      <li key={index} className={styles.bg}>
        <div
          style={{
            backgroundImage: `url(https://qufenqipublicrw.oss-cn-hangzhou.aliyuncs.com/fe/resume-${index+1}-bg.png)`,
            animationDelay: `${index*6}s`,
            width: '100%',
            height: '100%',
          }}
        />
      </li>
    )
  }
  render() {
    return (
      <ul className={styles.bgSlideShow}>
        {this.renderItem(0)}
        {this.renderItem(1)}
        {this.renderItem(2)}
      </ul>
    )
  }
}

export default BgSlideShow;
