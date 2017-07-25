import {createStore, applyMiddleware, combineReducers} from 'redux'

import promiseMiddleware from 'redux-promise';

import loggerMiddleware from './middlewares/logger'
import vanillaPromiseMiddleware from './middlewares/vanillaPromise'

// 引入需要使用到的action
import { fetchMessages } from './store/messages/actions';

import userInfoReducer from './store/user/reducer'
import usersReducer from './store/users/reducer'
import messagesReducer from './store/messages/reducer'
const reducers = combineReducers({
  userInfo: userInfoReducer,
  users: usersReducer,
  messages: messagesReducer,
});

// 创建store
let store = createStore(
  reducers,
  applyMiddleware(
    loggerMiddleware,
    // promiseMiddleware,
    vanillaPromiseMiddleware,
  )
);

// dispatch action
store.dispatch(fetchMessages());

// 参考 http://cn.redux.js.org/docs/advanced/Middleware.html