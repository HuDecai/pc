// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { dispatch } from './store';


class RootContainer extends React.PureComponent {
  // componentWillMount() {
  //   console.warn('cwm')
  //   // console.warn(window.location.href, window.location.search);
  //   // try {
  //   //   if (window.location.search) {
  //   //     // console.log(window.location.search);
  //   //     dispatch(replace(window.location.search.slice(1)));
  //   //   } else if (this.props.location.pathname === '/') {
  //       // dispatch(replace('/login'))
  //   //   }
  //   // } catch(e) {
  //   // }
  // }
  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.location.pathname === '/') {
        dispatch(replace('/login'))
      }
    } catch(e) {
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default RootContainer;
