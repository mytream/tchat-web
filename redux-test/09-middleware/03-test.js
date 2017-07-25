import configureStore from './store/configureStore'

// 引入需要使用到的action
import { getCurrentUser, updateUser } from './store/user/actions';

// 创建store
let store = configureStore();


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

function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  );

  return Object.assign({}, store, { dispatch });
}

store = applyMiddleware(store, [logger]);

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