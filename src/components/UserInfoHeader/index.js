import React from 'react';
import styles from './style.css';

const UserInfoHeader = (props) => {
  return (
    <div className={styles.UserInfoHeader}>
      <div className={styles.info}>
        <img className={styles.avatar} src={props.avatar || 'https://qufenqipublicrw.oss-cn-hangzhou.aliyuncs.com/fe/empty-avatar.png'} />
        <span className={styles.username}>{props.name || '用户名'}</span>
      </div>
    </div>
  );
}

export default UserInfoHeader;
