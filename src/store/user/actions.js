import {createAction} from 'redux-actions'

import User from '../../services/user'

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export function setCurrentUser(userInfo) {
 return {
   type: SET_CURRENT_USER,
   payload: User.setCurrentUser(userInfo),
 };
}

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export function getCurrentUser() {
 return {
   type: GET_CURRENT_USER,
   payload: User.getCurrentUser(),
 };
}

export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(userInfo) {
 return createAction(
   UPDATE_USER
 )(
   User.updateUser(userInfo)
 );
}