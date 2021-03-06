import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux';
import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

// Flux Standard Action.
// https://github.com/acdlite/flux-standard-action

//types
const TYPES = {
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  UPDATE_USER: 'UPDATE_USER',

  FETCH_USERS: 'FETCH_USERS',

  FETCH_MESSAGES: 'FETCH_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
};



// reducer 返回值 新的 state
const reducerUserInfo = handleActions({
  [TYPES.GET_CURRENT_USER](state, action){
    if(action.error){
      console.error(action.payload);
      return state;
    }

    return {
      id: action.payload,
      name: '小明',
      age: 18,
    };
  },
  [TYPES.UPDATE_USER](state, action){
    const newUserInfo = Object.assign({}, state, action.payload);
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
const reducerApp = combineReducers({
  userInfo: reducerUserInfo,
  users: reducerUsers,
  messages: reducerMessages,
});

// 创建store
const store = createStore(reducerApp);
// 监听store变化
store.subscribe(() => {
  console.log('------------------------------------------------------------------------------');
  console.log('current state', store.getState());
});


// 动态生成的action --> actionCreator
function getUserAction(userId) {
  return {
    type: TYPES.GET_CURRENT_USER,
    payload: userId,
  };
}
function updateUserAction(userInfo) {
  // 屏蔽掉 type 和 payload
  return createAction(TYPES.UPDATE_USER)(userInfo);
}

// dispatch action
// store.dispatch(getUserAction(22222222));
// store.dispatch(updateUserAction({
//   name: '吴亦凡',
//   age: 22,
// }));
// store.dispatch(getUserAction(555555555));
// store.dispatch(updateUserAction({
//   name: '赵丽颖',
//   age: 28,
// }));

const getUser = bindActionCreators(getUserAction, store.dispatch);
const updateUser = bindActionCreators(updateUserAction, store.dispatch);

getUser(22222222);
updateUser({
  name: '吴亦凡',
  age: 22,
});
getUser(555555555);
updateUser({
  name: '赵丽颖',
  age: 28,
});