import configureStore from './configureStore'

// 引入需要使用到的action
import { getCurrentUser, updateUser } from './user/actions';

// 创建store
const store = configureStore();
// 监听store变化
store.subscribe(() => {
  console.log('------------------------------------------------------------------------------');
  console.log('current state', store.getState());
});

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