import {createAction} from 'redux-actions'

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export function getCurrentUser(userId) {
 return {
   type: GET_CURRENT_USER,
   payload: userId,
 };
}

export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(userInfo) {
 return createAction(UPDATE_USER)(userInfo);
}