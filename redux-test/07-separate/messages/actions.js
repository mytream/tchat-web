import {createAction} from 'redux-actions'

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export function fetchMessages() {
  return createAction(
    FETCH_MESSAGES,
  );
}

export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(message) {
  return createAction(
    ADD_MESSAGE,
    message,
  );
}


