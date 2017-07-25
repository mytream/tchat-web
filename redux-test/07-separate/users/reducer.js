import { handleActions } from 'redux-actions'

import { FETCH_USERS } from './actions'

export default handleActions({
  [FETCH_USERS](state, action){
    return [{
      name: '小明',
      age: 18,
    },{
      name: '小红',
      age: 15,
    }];
  }
}, [])