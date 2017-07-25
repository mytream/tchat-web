import constants from '../common/constants'
import http from '../common/http'

export default {
  fetchMessages(){
    return http.get(`${constants.API_ORIGIN}/message/list`);
  },
  sendMessage(msg){
    return http.post(`${constants.API_ORIGIN}/message/send`, msg);
  }
};