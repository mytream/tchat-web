import { createStore, combineReducers, applyMiddleware} from 'redux'

// import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import userInfoReducer from './user/reducer'
import usersReducer from './users/reducer'
import messagesReducer from './messages/reducer'

const reducers = combineReducers({
  userInfo: userInfoReducer,
  users: usersReducer,
  messages: messagesReducer,
});

export default function () {
  return createStore(
    reducers,
    applyMiddleware(
      // thunk,
      promiseMiddleware
    ),
  );
}
