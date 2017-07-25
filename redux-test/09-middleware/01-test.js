import configureStore from './store/configureStore'

// 引入需要使用到的action
import { getCurrentUser, updateUser } from './store/user/actions';

// 创建store
const store = configureStore();


// 对store.dispatch进行覆盖
function patchStoreToAddLogging(store) {
  let next = store.dispatch
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}
patchStoreToAddLogging(store);

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