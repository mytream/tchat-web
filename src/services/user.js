import http from '../common/http'
import constants from '../common/constants'
import cache from '../common/cache'

export default {
  setCurrentUser(userInfo){
    return cache.get(constants.CACHE_KEYS.CURRENT_USER, userInfo);
  },
  getCurrentUser(){
    return cache.get(constants.CACHE_KEYS.CURRENT_USER);
  },
  updateUser(userInfo){
    return http.post(`${constants.API_ORIGIN}/user/update`, userInfo);
  },


  fetchUsers(){
    return http.get(`${constants.API_ORIGIN}/user/list`);
  },
};