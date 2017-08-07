import {createAction} from 'redux-actions'

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export function fetchMessages() {
  return {
    type: FETCH_MESSAGES,
    payload: Promise.resolve([{
      name: '小明',
      age: 18,
    },{
      name: '小红',
      age: 15,
    }])
  }
}

export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(message) {
  return createAction(ADD_MESSAGE)(message);
}


