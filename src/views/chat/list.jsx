import './list.scss'

import { NavBar, SwipeAction, List } from 'antd-mobile'
import React from 'react'
import { Link } from 'react-router'
import {FaThumbTack} from 'react-icons/lib/fa'

import util from '../../common/util'
import constants from '../../common/constants'
import history from '../../common/history'

export default class ChatList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      chat: {},
    };
  }

  render() {

    let {chatList} = this.props;

    chatList = [{
      name: '周慕云',
      order: 1,
      deleted: false,
      unReadCount: 12,
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大22222水',
    }, {
      name: '韩申',
      order: 0,
      deleted: false,
      unReadCount: 0,
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大水',
    }];

    for(let i=0;i<20;i++){
      chatList.push({
        name: '韩申',
        order: 0,
        deleted: false,
        unReadCount: 0,
        createTime: Date.now(),
        content: '发送发大水范德萨发发大水发大水',
      });
    }

    // tod:
    this.state.chatList = [{
      chatId: 5, //
      type: 1, // 类型：1. 资源 2.文本
      url: '', //资源路径
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大水',
      isRead: true, //是否已读
      fromMe: false, //是否是我的信息
    },{
      chatId: 5, //
      type: 1, // 类型：1. 资源 2.文本
      url: '', //资源路径
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大水',
      isRead: true, //是否已读
      fromMe: false, //是否是我的信息
    }]; // 聊天列表;

    //
    return (
      <div className="chat-detail-container">
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => history.push(constants.PAGES.HOME)}
        >NavBar</NavBar>
      </div>
    );
  }

  renderChatItem(chat){
    const {name, order, deleted, content, unReadCount, createTime} = chat;

    return (
      <div className="display-flex border-top pl-30 pr-30 pt-40 pb-40">
        <div className="position-relative">
          <img
            className=""
            width={120} height={120}
            src={require('../../common/images/tips1.png')} alt="头像" />
          <div className="pin-icon-wrap position-absolute">
            <FaThumbTack className="pin-icon"/>
          </div>
        </div>
        <div className="flex-1 ml-30 pt-10 overflow-hidden">
          <div className="lh-none fz-36 lsp-2">{name}</div>
          <div className="mt-30 lh-none fz-32 color-text-slight lsp-1 text-ellipsis">{content}</div>
        </div>
        <div className="chat-opt text-right">
          <div className="mt-10 fz-24 lh-none color-text-slight">{util.fromNow(createTime)}</div>
          <div className="chat-opt-count mt-35">{unReadCount}</div>
        </div>
      </div>
    );
  }
}