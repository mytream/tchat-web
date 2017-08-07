import { createStore, combineReducers } from 'redux';
import _ from 'lodash';
import { createAction, handleActions }  from 'redux-actions'

// actions 的 types
// {type: juti值, 参数}
const TYPES = {
  FETCH_MESSAGES: 'FETCH_MESSAGES',
  SEND_MESSAGES: 'SEND_MESSAGES',

  FETCH_USERS: 'FETCH_USERS',
};


// reducers
const initState = {
  messages: [],
  users: [],
};

const reducerMessages = handleActions({
  [TYPES.FETCH_MESSAGES](state, action) {
    return [
      { name: 'xiaoming', content: '你好啊'},
      { name: 'xiaohong', content: '我很好', }
    ];
  },
  [TYPES.SEND_MESSAGES](state, action) {
    let newMessage = _.clone(state);
    newMessage.push(action.message);
    return newMessage;
  },
}, []);

const reducerUsers = handleActions({
  [TYPES.FETCH_USERS](state, action){
    return [
      { name: 'xiaoming', age: 18},
      { name: 'xiaohong', age: 19, }
    ];
  }
}, []);

const reducers = combineReducers({
  messages: reducerMessages,
  users: reducerUsers,
});

// store
const store = createStore(reducers);
store.subscribe(() => {
  console.log('current state', store.getState());
});

// action creator
function createFetchMessages() {
  return createAction(TYPES.FETCH_MESSAGES)();
}
function createSendMessage(message) {
  return createAction(TYPES.SEND_MESSAGES)(message);
}
function createFetchUsers() {
  return createAction(TYPES.FETCH_USERS)();
}


// dispatch
store.dispatch(createFetchMessages()); //
store.dispatch(createSendMessage({name: '小米2', content: '吼吼2'})); //
store.dispatch(createSendMessage({name: '小米3', content: '吼吼2'})); //
store.dispatch(createSendMessage({name: '小米4', content: '吼吼2'})); //
store.dispatch(createSendMessage({name: '小米5', content: '吼吼2'})); //
store.dispatch(createSendMessage({name: '小米6', content: '吼吼2'})); //
store.dispatch(createFetchUsers()); //