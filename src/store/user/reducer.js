import {handleActions} from 'redux-actions'

import {SET_CURRENT_USER, GET_CURRENT_USER, UPDATE_USER} from './actions'

export default handleActions({
  [SET_CURRENT_USER](state, action){
    if(action.error){
      console.error(action.payload);
      return state;
    }

    return action.payload;
  },
  [GET_CURRENT_USER](state, action){
    if(action.error){
      console.error(action.payload);
      return state;
    }

    return action.payload;
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