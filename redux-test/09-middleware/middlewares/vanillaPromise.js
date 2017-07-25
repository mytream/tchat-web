/**
 * Created by mytream on 17/7/25.
 */
import { isFSA } from 'flux-standard-action';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    if(!isPromise(action.payload)){
      return next(action);
    }

    action.payload.then(
      result => dispatch({ ...action, payload: result }),
      error => {
        dispatch({ ...action, payload: error, error: true });
        return Promise.reject(error);
      }
    );
  };
}