import React from 'react';
import { dispatch } from '../../store';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';

class NoMatch extends React.Component {
  componentWillMount() {
    console.warn(this.props.isLogin)
    if(this.props.isLogin) {
      dispatch(replace('/home-page'))
    } else {
      dispatch(replace('/Login'));
    }
  }
  render() {
    return <div />;
  }
}

export default connect((state) => ({
  isLogin: state.UserReducer.get('isLogin'),
}))(NoMatch);
