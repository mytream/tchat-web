import './Friends.scss'

import { ListView, SwipeAction, List } from 'antd-mobile'
import React from 'react'
import { Link } from 'react-router'
import {FaThumbTack} from 'react-icons/lib/fa'

import util from '../../common/util'

export default class ChatList extends React.Component {



  render() {

    let {chatList} = this.props;

    chatList = [{
      friendId: 100025,
      name: '周慕云',
      order: 1,
      deleted: false,
      unReadCount: 12,
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大22222水',
    }, {
      friendId: 7777,
      name: '韩申',
      order: 0,
      deleted: false,
      unReadCount: 0,
      createTime: Date.now(),
      content: '发送发大水范德萨发发大水发大水',
    }];

    for(let i=0;i<20;i++){
      chatList.push({
        friendId: i,
        name: '韩申',
        order: 0,
        deleted: false,
        unReadCount: 0,
        createTime: Date.now(),
        content: '发送发大水范德萨发发大水发大水',
      });
    }

    //
    return (
      <div className="chat-list-container pt-20">
        <h1 className="mt-100 ml-30 mr-30 mb-55 fz-72 fw-normal">对话</h1>
        <div className="">
          {chatList.map((chat, index) => {
            return (
              <Link
                key={index}
                to={`/chatList/${chat.friendId}`}>
                <SwipeAction
                  style={{ backgroundColor: '#fff' }}
                  autoClose
                  right={[
                    {
                      text: 'Cancel',
                      onPress: () => console.log('cancel'),
                      style: { backgroundColor: '#acdace', color: 'white' },
                    },
                    {
                      text: 'Delete',
                      onPress: () => console.log('delete'),
                      style: { backgroundColor: '#ff7f79', color: 'white' },
                    },
                  ]}
                  onOpen={() => console.log('global open')}
                  onClose={() => console.log('global close')}
                >
                  {this.renderChatItem(chat)}
                </SwipeAction>
              </Link>
            );
          })}
        </div>
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