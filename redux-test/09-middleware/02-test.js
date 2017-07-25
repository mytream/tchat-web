import configureStore from './store/configureStore'

// 引入需要使用到的action
import { getCurrentUser, updateUser } from './store/user/actions';

// 创建store
const store = configureStore();


function logger(store) {
  let next = store.dispatch

  // 我们之前的做法:
  // store.dispatch = function dispatchAndLog(action) {...}

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

// 一个可以将实际的 monkeypatching 应用到 store.dispatch 中的辅助方法
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  )
}

applyMiddlewareByMonkeypatching(store, [logger]);


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