/**
 * Created by mytream on 17/7/19.
 */
const Schema = require('../common/mongoose').Schema;

const Friend = Schema({
  friendId: Number,
  name: String, // 朋友昵称
  url: String, // 头像路径
  deleted: Boolean, // 是否已删除
  order: Number, // 置顶顺序
  // unReadCount: Number, // 消息未读数量
  // lastChatTime: Date, // 最新聊天时间
  // lastChatContent: String, // 最新聊天内容
});

module.exports = Friend;