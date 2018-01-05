
import { connect } from 'react-redux';
import Login from './Login';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.UserReducer.get('errMsg'),
  isFetching: state.UserReducer.get('isFetching'),
  userInfo: state.UserReducer.get('userInfo'),
  timeSpeed: state.UserReducer.get('timeSpeed'),
  domainList: state.UserReducer.get('domainList'),
});

export default connect(mapStateToProps)(Login);