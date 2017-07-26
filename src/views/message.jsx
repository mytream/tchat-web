import s from  './message.scss'

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { NavBar } from 'antd-mobile'

import MdChildCare from 'react-icons/lib/md/child-care'
import TiUser from 'react-icons/lib/ti/user'

import _ from 'lodash'
import moment from 'moment'

import history from '../common/history'
import cache from '../common/cache'
import constants from '../common/constants'
import SOCKET from '../common/socketio'

import Message from '../services/message'


class MessagePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      msgs: [],
    };

    this.handleSendMsg = this.handleSendMsg.bind(this);
    this.scrollMsgContaner = this.scrollMsgContaner.bind(this);
  }

  componentDidMount(){
    // 获取消息
    Message.fetchMessages().then(msgs => {
      // console.log(msgs);
      this.setState({
        msgs: msgs || [],
      }, this.scrollMsgContaner);
    }).catch(e => {
      console.error(e);
      // todo
    });

    // 当前用户ID
    cache.get(constants.X_USER_ID).then(userId => {
      this.currentUserId = userId;
    });

    // 监听消息
    SOCKET.onOnce(`${constants.MSG_CODE.MESSAGE}-msgs`, (newMsg) => {
      const { msgs } = this.state;
      msgs.push(newMsg);
      this.setState({ msgs }, this.scrollMsgContaner);
    });
  }

  scrollMsgContaner() {
    this.msgContainer.scrollTop = 20000;
  }

  handleSendMsg(e) {
    if(e.key !== 'Enter') return;

    console.log(this.state.search);
    Message.sendMessage({
      content: this.state.search,
      senderId: this.currentUserId, //消息发送人ID
    }).then(fMsg => {
      // this.state.msgs.push();
      this.setState({
        search: '',
      });
    }).catch(e => {
      console.error(e);
      // todo
    });
  }



  render() {
    return (
      <div className="display-flex message-container">
        {/*<NavBar*/}
          {/*mode="light"*/}
          {/*onLeftClick={() => {*/}
            {/*history.push('me');*/}
          {/*}}*/}
          {/*leftContent={*/}
            {/*<TiUser style={{fontSize: 60}} />*/}
          {/*}*/}
          {/*rightContent={*/}
            {/*<MdChildCare style={{fontSize: 60}} onClick={() => {*/}
              {/*history.push('user');*/}
            {/*} }/>*/}
          {/*}*/}
        {/*>*/}
          {/*聊天室*/}
        {/*</NavBar>*/}

        {this.renderMessages()}

        {this.renderMessageOpt()}
      </div>
    );
  }

  renderMessages() {
    const {msgs} = this.state;
    if(_.isEmpty(msgs)){
      return <div className="flex-1">暂无聊天内容</div>;
    }

    return (
      <div className="msg-container flex-1 pt-40 pb-10" ref={ref => {
        this.msgContainer = ref;
      }}>
        {msgs.map((msg, index) => {
          const {url, senderId, content, senderName, createTime} = msg;

          return (
            <div key={index} className="display-flex msg-item mb-20">
              {/* 头像 昵称 内容 */}
              <img src={url} alt=""/>
              <div className="ml-10 flex-1">
                <div className="display-flex flex-justify-content-between">
                  <span>{senderName}</span>
                  <span className="color-text-slight fz-20">{moment(createTime).format('MM-DD hh:MM:ss')}</span>
                </div>
                <div className="item-content mt-15">{content}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderMessageOpt() {
    return (
      <div>
        <input
          type="text" className="display-block"
          onKeyPress={this.handleSendMsg}
          value={this.state.search || ''}
          onChange={e => {
            this.setState({search: e.target.value});
          }}/>
      </div>
    );
  }
}

export default withStyles(s)(MessagePage);