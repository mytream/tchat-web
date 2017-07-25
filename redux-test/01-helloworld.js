import { createStore } from 'redux';

//types
const TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

// reducer
function counter(state = 8, action) {
  switch (action.type){
    case TYPES.INCREMENT:
      return state + 1;
    case TYPES.DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

// 创建store
const store = createStore(counter);
// 监听store变化
store.subscribe(() => {
  console.log('current state', store.getState());
});

// dispatch action
store.dispatch({ type: TYPES.INCREMENT}); // 9
store.dispatch({ type: TYPES.INCREMENT}); // 10
store.dispatch({ type: TYPES.DECREMENT}); // 9
store.dispatch({ type: 'test'}); // 9