import { handleActions } from 'redux-actions'

import {FETCH_MESSAGES, ADD_MESSAGE} from './actions'

export default handleActions({
  [FETCH_MESSAGES](state, action){
    // todo:
    return [{
      name: '小明',
      age: 18,
    },{
      name: '小红',
      age: 15,
    }];
  },
  [ADD_MESSAGE](state, action){
    const newMsgs = _.clone(state);
    newMsgs.push(action.payload);
    return newMsgs;
  }
}, []);