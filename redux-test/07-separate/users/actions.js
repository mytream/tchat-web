import {createAction} from 'redux-actions'

export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers() {
 return createAction(
   GET_CURRENT_USER,
 );
}
