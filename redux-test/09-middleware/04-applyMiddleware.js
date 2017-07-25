import {createStore, applyMiddleware, combineReducers} from 'redux'

// 引入需要使用到的action
import { getCurrentUser, updateUser } from './store/user/actions';

import userInfoReducer from './store/user/reducer'
import usersReducer from './store/users/reducer'
import messagesReducer from './store/messages/reducer'
const reducers = combineReducers({
  userInfo: userInfoReducer,
  users: usersReducer,
  messages: messagesReducer,
});

function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}

// 创建store
let store = createStore(reducers, applyMiddleware(logger));

// dispatch action
store.dispatch(getCurrentUser(22222222));
store.dispatch(updateUser({
  name: '吴亦凡',
  age: 22,
}));
store.dispatch(getCurrentUser(555555555));
store.dispatch(updateUser({
  name: '赵丽颖',
  age: 28,
}));

// 参考 http://cn.redux.js.org/docs/advanced/Middleware.html