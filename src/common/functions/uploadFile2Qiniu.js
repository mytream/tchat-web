import Cookies from 'js-cookie'
import cache from '../cache'
import constants from '../constants'
import fetch from 'isomorphic-fetch'
import { message } from 'tezign-react-ui'

const OnReadyStateChange = 'OnReadyStateChange'.toLocaleLowerCase();

function upload2Qiniu(data, progressCallback, successCallback, errorCallback) {
  let sId = data.sId;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://up.qbox.me/', true);
  xhr.upload.addEventListener("progress", function(evt) {
    if (!evt.lengthComputable) return true;
    let res = _.pick(evt, ['loaded', 'total']);
    res.percent = Math.round(evt.loaded * 100 / evt.total);

    if(progressCallback){
      progressCallback(sId,res);
    }
  }, false);
  xhr[OnReadyStateChange] = function(response) {
    if (xhr.readyState == 4 ) {
      if (xhr.status == 200 && xhr.responseText != "") {
        var res = JSON.parse(xhr.responseText);

        successCallback(sId,res);
      } else {
        var error;
        if (xhr.responseText) error = JSON.parse(xhr.responseText);
        errorCallback(sId,error);
      }
    }
  };
  xhr.send(data.formData);
}

function uploadFile(data, progressCallback, successCallback, errorCallback){
  // 获取token
  /*cache.get(constants.QINIU_UPLOAD_TOKEN).then((res)=>{
    let {key, token} = res;
    data.formData.append('key', key);
    data.formData.append('token', token);
    upload2Qiniu(data, progressCallback, successCallback, errorCallback);
  },()=>{

  });*/

  let token = Cookies.get(constants.C_XTOKEN);
  let uid = Cookies.get(constants.C_XUID);
  fetch(constants.API.USER.QINIU_UPLOAD_TOKEN, {
    headers: {
      [constants.X_TOKEN]: token,
      [constants.X_USER_ID]: uid,
    }
  }).then((response)=>{
    // HTTP请求异常
    if (response.status !== 200) {
      throw response;
    }

    // 业务数据正常返回
    return response.json().then(function (res) {
      if(res.code !== '0'){
        message.error('网络异常, 请稍后再试');
        return;
      }

      let {key, token} = res.result;
      data.formData.append('key', key + getFileType(data.file.name));
      data.formData.append('token', token);
      upload2Qiniu(data, progressCallback, successCallback, errorCallback);

      cache.set(constants.QINIU_UPLOAD_TOKEN,{ key, token});
    }, function (err) {
      console.error(err);
      // message.error('网络异常, 请稍后再试');
      return err;
    })
  },(err)=>{
    console.error(err);
    // message.error('网络异常, 请稍后再试');
    return err;
  });
}

function getFileType(str) {
  let postfix = str.lastIndexOf('.');
  return str.substring(postfix);
}

export default uploadFile;