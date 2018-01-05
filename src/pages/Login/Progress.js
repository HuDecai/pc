import React from 'react';
import * as styles from './style.css';
import { dispatch } from '../../store';

class Speed extends React.Component {
  render() {
    if (!this.props.timeSpeed) {
      return (
        <div
          className={styles.progress}
          style={{
            borderColor: this.props.borderColor || this.props.color,
          }}
        >
          <span
            className={styles.barUnfill}
            style={{
              width: `${this.props.percent}%`,
            }}
          >
            <span
              // className={styles.barFill}
              style={{
                backgroundColor: this.props.color,
              }}
            ></span>
          </span>
        </div>
      );
    } else {
      return (
        <div
          className={styles.progress}
          style={{
            borderColor: this.props.borderColor || this.props.color,
          }}
        >
          <span
            className={styles.barUnfill}
            style={{
              width: `${this.props.percent}%`,
            }}
          >
            <span
              className={styles.barFill}
              style={{
                backgroundColor: this.props.color,
              }}
            ></span>
          </span>
        </div>
      );
    }
  }
}

export default Speed;
