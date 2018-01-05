
import { connect } from 'react-redux';
import FindPassWord from './FindPassWord';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  isFetching: state.FindPassWordReducer.get('isFetching'),
  step: state.FindPassWordReducer.get('step'),
  passWordInfo: state.FindPassWordReducer.get('passWordInfo'),
});

export default connect(mapStateToProps)(FindPassWord);

