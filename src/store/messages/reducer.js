import { handleActions } from 'redux-actions'

import {FETCH_MESSAGES, ADD_MESSAGE} from './actions'

export default handleActions({
  [FETCH_MESSAGES](state, action){
    if(action.error){
      console.error(action.payload);
      return state;
    }

    return action.payload;
  },
  [ADD_MESSAGE](state, action){
    const newMsgs = _.clone(state);
    newMsgs.push(action.payload);
    return newMsgs;
  }
}, []);