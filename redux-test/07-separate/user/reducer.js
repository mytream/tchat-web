import {handleActions} from 'redux-actions'

import {GET_CURRENT_USER, UPDATE_USER} from './actions'

export default handleActions({
  [GET_CURRENT_USER](state, action){
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
  [UPDATE_USER](state, action){
    if(action.error){
      console.error(action.payload);
      return state;
    }

    const newUserInfo = Object.assign({}, state, action.payload);
    return newUserInfo;
  },
},{

});