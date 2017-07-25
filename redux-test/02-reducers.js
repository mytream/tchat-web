import { createStore } from 'redux';

//types
const TYPES = {
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  UPDATE_USER: 'UPDATE_USER',

  FETCH_USERS: 'FETCH_USERS',

  FETCH_MESSAGES: 'FETCH_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
};

// reducer 返回值 新的 state
const initialState = {
  userInfo: {}, // 当前用户
  users: [], // 所有用户
  messages: [], //所有聊天信息
};
function reducerApp(state = initialState, action) {
  return {
    userInfo: reducerUserInfo(state.userInfo, action),
    users: reducerUsers(state.users, action),
    messages: reducerMessages(state.messages, action),
  };
}
function reducerUserInfo(userInfo, action) {
  switch (action.type){
    case TYPES.GET_CURRENT_USER:
      // todo:
      return {
        name: '小明',
        age: 18,
      };
    case TYPES.UPDATE_USER:
      // todo:
      return userInfo;
    default:
      return userInfo;
  }
}
function reducerUsers(users, action) {
  switch (action.type){
    case TYPES.FETCH_USERS:
      // todo:
      return [{
        name: '小明',
        age: 18,
      },{
        name: '小红',
        age: 15,
      }];
    default:
      return users;
  }
}
function reducerMessages(messages, action) {
  switch (action.type){
    case TYPES.FETCH_MESSAGES:
      // todo:
      return [{
        content: '你好',
        senderId: 25,
      }];
    case TYPES.ADD_MESSAGE:
      // todo:
      return messages;
    default:
      return messages;
  }
}

// 创建store
const store = createStore(reducerApp);
// 监听store变化
store.subscribe(() => {
  console.log('current state', store.getState());
});

// dispatch action
store.dispatch({ type: TYPES.GET_CURRENT_USER, userId: 25}); //
store.dispatch({ type: TYPES.FETCH_USERS}); //
store.dispatch({ type: TYPES.FETCH_USERS}); //