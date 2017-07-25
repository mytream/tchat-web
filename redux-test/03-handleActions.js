import { createStore } from 'redux';
import { createActions, handleActions, combineActions } from 'redux-actions'
import _ from 'lodash'

// createActions

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
// handleActions() 返回一个 reducer
const reducerUserInfo = handleActions({
  [TYPES.GET_CURRENT_USER](state, action){
    return {
      id: action.userId,
      name: '小明',
      age: 18,
    };
  },
  [TYPES.UPDATE_USER](state, action){
    const newUserInfo = Object.assign({}, state, action.userInfo);
    return newUserInfo;
  },
}, {});
const reducerUsers = handleActions({
  [TYPES.FETCH_USERS](state, action){
    return [{
      name: '小明',
      age: 18,
    },{
      name: '小红',
      age: 15,
    }];
  }
}, []);
const reducerMessages = handleActions({
  [TYPES.FETCH_MESSAGES](state, action){
    // todo:
    return [{
      name: '小明',
      age: 18,
    },{
      name: '小红',
      age: 15,
    }];
  },
  [TYPES.ADD_MESSAGE](state, action){
    const newMsgs = _.clone(state);
    newMsgs.push({
      name: '小强',
      age: 16,
    });
    return newMsgs;
  }
}, []);

// 创建store
const store = createStore(reducerApp);
// 监听store变化
store.subscribe(() => {
  console.log('------------------------------------------------------------------------------');
  console.log('current state', store.getState());
});

// dispatch action
store.dispatch({ type: TYPES.GET_CURRENT_USER, userId: 25}); //
store.dispatch({
  type: TYPES.UPDATE_USER,
  userInfo: {
    name: '新名字',
    age: 22,
  }
}); //

// store.dispatch({ type: TYPES.FETCH_USERS}); //
store.dispatch({ type: TYPES.FETCH_MESSAGES}); //