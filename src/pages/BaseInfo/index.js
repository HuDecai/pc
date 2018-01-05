/**
 * Created by hwh on 2017/10/22.
 */
import { connect } from 'react-redux';
import BaseInfo from './BaseInfo';

export const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.BaseInfoReducer.get('errMsg'),
  isFetching: state.BaseInfoReducer.get('isFetching'),
  baseInfo: state.BaseInfoReducer.get('baseInfo'),
  timeSpeed: state.BaseInfoReducer.get('timeSpeed'),
  questionInfo: state.BaseInfoReducer.get('questionInfo'),
  bankCardList:state.BaseInfoReducer.get('bankCardList'),
  msgList:state.BaseInfoReducer.get('msgList'),
  pageSize:state.BaseInfoReducer.get('pageSize'),
  provinceAndCity:state.BaseInfoReducer.get('provinceAndCity'),
  underlings:state.BaseInfoReducer.get('underlings')
});

export default connect(mapStateToProps)(BaseInfo);
