import constants from '../constants'
import http from '../http'

const OnReadyStateChange = 'OnReadyStateChange'.toLocaleLowerCase();

function upload2Qiniu(data, progressCallback, successCallback, errorCallback) {
  let sId = data.sId;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://up.qbox.me/', true);
  xhr.upload.addEventListener("progress", function (evt) {
    if (!evt.lengthComputable) return true;
    let res = _.pick(evt, ['loaded', 'total']);
    res.percent = Math.round(evt.loaded * 100 / evt.total);
    if (progressCallback) {
      progressCallback(sId, res);
    }
  }, false);
  xhr[OnReadyStateChange] = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 && xhr.responseText != "") {
        let res = JSON.parse(xhr.responseText);
        let _data = {
          resourceList: [{
            name: data.file.name,
            path: res.key,
            size: data.file.size,
            type: data.file.type
          }]
        };
        http.put(constants.API_ORIGIN + `/user/qiniu/file/add`, _data).then(res => {
          let file = res.resourceList[0];
          file.sId = sId;
          file.thunderUrl = file.thunder;
          successCallback(sId, file);
        }, err => {
          errorCallback(sId, err);
        });
      } else {
        let error;
        if (xhr.responseText) error = JSON.parse(xhr.responseText);
        errorCallback(sId, error);
      }
    }
  };
  xhr.send(data.formData);
}

function getUploadFeed() {
  return http.get(constants.API.USER.QINIU_UPLOAD_TOKEN);
}

function getFileType(str) {
  let postfix = str.lastIndexOf('.');
  return str.substring(postfix);
}

function uploadFile(data, progressCallback, successCallback, errorCallback) {
  getUploadFeed().then(res => {
    let { key, token } = res;
    data.formData.append('key', key + getFileType(data.file.name));
    data.formData.append('token', token);
    upload2Qiniu(data, progressCallback, successCallback, errorCallback);
  })

}

export default uploadFile;