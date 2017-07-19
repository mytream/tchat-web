var friendInfo = {
  friends: [{
    friendId: 1,
    name: '小明', // 朋友昵称
    url: '', // 头像路径
    deleted: false, // 是否已删除
    order: 0, // 置顶顺序
    unReadCount: 5, // 消息未读数量
    lastChatTime: Date.now(), // 最新聊天时间
    lastChatContent: '发送发大水范德萨发发大水发大水', // 最新聊天内容
    chatList: [{
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
    }], // 聊天列表
  }],
  maxOrder: 0,
};