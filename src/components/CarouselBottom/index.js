import React, { PropTypes } from 'react';
import { Modal } from 'antd';
import Immutable from 'immutable';
const styles = require('./style.css');
const notice = require('../../assets/images/notice.png');
import * as UserAction from '../../actions/UserAction';

var newWindow = null;
class CarouselBottom extends React.PureComponent {
  static propTypes = {
    noticeList: PropTypes.instanceOf(Immutable.List),
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      content: '',
        time:''
    };
  }
  componentWillMount() {
    if(this.props.isShowNotice && this.props.noticeList.toJS().length) {
        console.log(this.props.noticeList.toJS()[0].time)
      this.setState({
        visible: true,
        title: this.props.noticeList.toJS()[0].title,
        content: this.props.noticeList.toJS()[1].content,
          time:this.props.noticeList.toJS()[0].time
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.noticeList.toJS().length) {
      if(nextProps.isShowNotice) {
        this.setState({
          visible: true,
          title: nextProps.noticeList.toJS()[0].title,
            content: nextProps.noticeList.toJS()[1].content,
            time:nextProps.noticeList.toJS()[0].time
        })
      }
    }
  }
  render() {
    const showNotic = (noticeList) => {
      const views = [];
      if(noticeList.toJS().length) {
        noticeList.map((item, key) => {
          views.push(
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <li onClick={() => {
              this.setState({ content: item.get('content'), visible: true, title: item.get('title'),time:item.get('time') });
            }} key={key} >
               {item.get('time')} {item.get('title')}
            </li>
            <span
             style={{ color: '#E6482E'}}
             onClick={(e) => {
                 let left = (screen.width - 1118) / 2;
                 if(left < 0) left = 0;
                 let top = (screen.height - 760) / 2;
                 if(top < 0)top = 0;
                 /* TODO: 邮箱Icon 要能跳转，此处补充 */
                 if (newWindow && !newWindow.closed) {
                     newWindow.location.href = '/?#/user-info?type=1&rigthType=4';
                     newWindow.focus();

                     // newWindow.location.href = '';
                 } else {
                     newWindow = window.open('/?#/user-info?type=1&rigthType=4', "newWindow", `height=760, width=1118, top=${top}, left=${left}` );
                     newWindow.focus();

                     newWindow.onclose = () => {
                         newWindow = null;
                     };
                 }
               e.stopPropagation();
              // window.open('/?#/user-info?type=1&rigthType=4', "_blank")
             }}
             > [所有公告]</span>
             </div>
          );
        })
      }
      return views;
    }
    return (
      <div className={styles.carouselBottom}>
        <div className={styles.container}>
          <img src={notice} />
          <div className={styles.litBox}>
              <ul>
                 {showNotic(this.props.noticeList)}
              </ul>
          </div>
        </div>
        <Modal
          width={'660px'}
          visible={this.state.visible}
          footer={null}
          maskClosable={false}
          onCancel={() => {
            this.setState({ visible: false, content: '', title: '',time:'' });
            UserAction.changeNotice({ isShowNotice: false });
          }}
          style={{ marginTop: '10vh' }}
        >
          <div style={{ height: '460px', padding: '20px',position:'relative'}}>
              <div className={styles.modalTitles}><div className={styles.modalTitle}>{this.state.title}</div></div>
              <div className={styles.modalLine}/><div className={styles.sysDtile}>尊敬的会员，您好：</div>
              <div className={styles.dModalCOntent}><div className={styles.modalContent} dangerouslySetInnerHTML={{__html: this.state.content}}></div></div>
              <div className={styles.dFooter}>
                <p>亿合客服部</p><p>{this.state.time}</p>
              </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CarouselBottom;
