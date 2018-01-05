
import { connect } from 'react-redux';
import Register from './Register';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.UserReducer.get('errMsg'),
  isFetching: state.UserReducer.get('isFetching'),
  VCode: state.UserReducer.get('VCode'),
  fandianTuiguangLink: state.AgentCenterReducer.get('fandianTuiguangLink'),
  wuFandianTuiguangLink: state.AgentCenterReducer.get('wuFandianTuiguangLink'),
});

export default connect(mapStateToProps)(Register);