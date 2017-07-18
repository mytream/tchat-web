/**
 * Created by mytream on 16/8/17.
 */
import io from 'socket.io-client'
import Cookie from 'js-cookie'
import constants from './constants'
import Message from './../services/message'

let socket;
let service = {};

const {API_ORIGIN} = constants;

const MSG_TYPE = {
  ROOT_MSG: 'root_msg',
  FIRST_CONNECT: 'first_connect',
  GREETING: 'greeting',
  ON_GOING: 'on_going',
  USER_STATE: 'user_state', //用户的状态
};



var events = {};

// 建立ws链接
service.open = ()=>{
  if(socket) return;

  socket = io.connect(API_ORIGIN);


  socket.on(MSG_TYPE.FIRST_CONNECT,function (data) {
    console.log('first-connect: ' + data);

    // 获得用户ID
    var userId = Cookie.get(constants.C_XUID);

    // 查询出需要通知的用户ID列表
    Message.getCustomerList().then((customerIds)=>{
      socket.emit(MSG_TYPE.FIRST_CONNECT,{
        userId: userId,
        notifyIds: customerIds
      });
    })


  });

  socket.on(MSG_TYPE.GREETING, function (data) {
    console.log('validate-success: ' + data);
  });

  socket.on(MSG_TYPE.ROOT_MSG,function (data) {
    console.log('system msg: ' + data);
  });

  socket.on(MSG_TYPE.ON_GOING,function (data) {
    console.log('on going msg: \n');
    console.log(data);

    // 用KEY作为区分
    var key = data.code;

    for(var msgKey in events){
      if(msgKey.startsWith(key+'-')){
        service.trigger(msgKey,data.result);
      }
    }
  });


  socket.on('disconnect',(err)=>{
    console.log('disconnect ... ');
    console.error(err);
  });

};

service.emit = function (msg) {
  socket.emit(MSG_TYPE.USER_STATE,msg);
};

service.on = function (msgKey, handler) {
  if (!events[msgKey]) events[msgKey] = [];
  events[msgKey].push(handler);
};

service.remove = function (msgKey, handler) {
  if (!events[msgKey]){
    return;
  }

  var handlers = events[msgKey];
  for(var i in handlers){
    if(handlers[i] === handler){
      handlers.splice(i,1);
      break;
    }
  }
};

service.removeMsgKey = function (msgKey) {
  if (!events[msgKey]){
    return;
  }

  events[msgKey].length = 0;
};

service.onOnce = function (msgKey, handler) {
  if (!events[msgKey]) events[msgKey] = [];

  events[msgKey].length = 0;
  events[msgKey].push(handler);
};

service.trigger = function (msgKey, data) {
  let handlers = events[msgKey];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
};

export default service;