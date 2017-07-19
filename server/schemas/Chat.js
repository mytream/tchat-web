/**
 * Created by mytream on 17/7/19.
 */
const Schema = require('mongoose').Schema;

const Chat = Schema({
  chatId: 5, //
  createTime: Date, // 聊天时间
  content: String, // 聊天内容
  type: Number, // 类型：1. 资源 2.文本
  url: String, // 资源路径
  isRead: Boolean, //是否已读
  fromMe: Boolean, //是否是我的信息
  senderId: Number, // 消息发送人ID
  receiverId: Number, // 消息接收人ID
});

