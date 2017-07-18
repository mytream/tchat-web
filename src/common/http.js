import fetch from 'isomorphic-fetch';
import utils from '../common/util';
import Cookies from 'js-cookie'
import _ from 'lodash';
import constants from './constants'
import ENUM from './enum'
import {message} from 'tezign-react-ui'

let events = {
  [ENUM.HTTP_CODE.BAD_REQUEST.code]: [(err)=> {
    showGlobalTip(ENUM.HTTP_CODE.BAD_REQUEST.name);
  }],
  [ENUM.HTTP_CODE.NOT_FOUND.code]: [(err)=> {
    showGlobalTip(ENUM.HTTP_CODE.NOT_FOUND.name);
  }],
  [ENUM.HTTP_CODE.EXCEPTION.code]: [(err)=> {
    showGlobalTip(ENUM.HTTP_CODE.EXCEPTION.name);
  }],
  [ENUM.RESULT_CODE.BAD_REQUEST.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.BAD_REQUEST.name);
  }],
  [ENUM.RESULT_CODE.NOT_FOUND.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.NOT_FOUND.name);
  }],
  [ENUM.RESULT_CODE.EXCEPTION.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.EXCEPTION.name);
  }],
  [ENUM.RESULT_CODE.FORBIDDEN_OPERATION.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.FORBIDDEN_OPERATION.name);
  }],
  [ENUM.RESULT_CODE.NOT_BE_DESIGNER.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.NOT_BE_DESIGNER.name);
  }],
  [ENUM.RESULT_CODE.NOT_BE_CUSTOMER.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.NOT_BE_CUSTOMER.name);
  }],
  [ENUM.RESULT_CODE.ILLEGAL_USER.code]: [(err)=> {
    showGlobalTip(ENUM.ILLEGAL_USER.BAD_REQUEST.name);
  }],
  [ENUM.RESULT_CODE.BAD_REQUEST.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.BAD_REQUEST.name);
  }],
  [ENUM.RESULT_CODE.ILLEGAL_PROJECT.code]: [(err)=> {
    showGlobalTip(ENUM.RESULT_CODE.ILLEGAL_PROJECT.name);
  }],
  [ENUM.COMMON_CODE.DATA_ERROR.code]: [(err)=> {
    showGlobalTip(ENUM.COMMON_CODE.DATA_ERROR.name);
  }],
  [ENUM.COMMON_CODE.FETCH_ERROR.code]: [(err)=> {
    showGlobalTip(ENUM.COMMON_CODE.FETCH_ERROR.name);
  }]
};

function showGlobalTip(msg) {
  // message.error(msg);
}

function http(url, options) {
  //info 由于使用公用的 login 页面 此项目不会调用 login 接口 && url.indexOf('/login') !== -1
  let token = Cookies.get(constants.C_XTOKEN);
  let uid = Cookies.get(constants.C_XUID);
  if (!(token && uid) && url.indexOf('/login') === -1) {
    console.log(`没有获取token的请求`, url);
    let err = {status: 401, message: '用户 token 过期'};
    http.trigger(401, err);
    return Promise.reject(err);
  }

  options.headers[constants.X_TOKEN] = token;
  options.headers[constants.X_USER_ID] = uid;

  return fetch(url, options).then(function (response) {
    // HTTP请求异常
    if (response.status !== ENUM.HTTP_CODE.SUCCESS.code) {

      //收集JS错误日志
      // var loggerUrl = constants.API_ORIGIN + "/slog/web";
      // var parameters = {
      //   options: escape(JSON.stringify(options)),
      //   response: escape(JSON.parse(response)),
      //   parent_url: escape(document.location.href),
      //   project_name: escape('tezign-web-designer'),
      //   agent: escape(navigator.userAgent),
      //   date: escape(new Date())
      // };
      // /** Send error to server */
      // http.post(loggerUrl, parameters);

      http.trigger(response.status);
      throw response;
    }

    // 业务数据正常返回
    return response.json().then(function (res) {
      // 业务逻辑
      if (res.code !== ENUM.RESULT_CODE.SUCCESS.code) {
        http.trigger(res.code);
        throw res;
      }

      return res.result;
    }, function (err) {
      http.trigger(ENUM.COMMON_CODE.DATA_ERROR.code);
      throw err;
    })
  }, function (err) {
    http.trigger(ENUM.COMMON_CODE.FETCH_ERROR.code);
    throw err;
  })
}

http.defaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

http.get = function (url, options) {
  options = options || {};
  options.method = "GET";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.post = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "POST";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.put = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "PUT";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.patch = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "PATCH";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.delete = function (url, options) {
  options = options || {};
  options.method = "DELETE";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.on = function (name, handler) {
  if (!events[name]) events[name] = [];
  events[name].push(handler);
};

http.trigger = function (name, data) {
  let handlers = events[name];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
};

// 特殊请求
http.postForm = function (url, data, options) {
  options = options || {};
  options.body = utils.json2Form(data);
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  options.method = "POST";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};
//
const OnReadyStateChange = 'OnReadyStateChange'.toLocaleLowerCase();

http.uploadFormData = function (url, formData) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    let token = Cookies.get(constants.C_XTOKEN);
    let uid = Cookies.get(constants.C_XUID);
    xhr.open('POST', url, true);
    xhr.setRequestHeader(constants.X_TOKEN, token);
    xhr.setRequestHeader(constants.X_USER_ID, uid);
    xhr[OnReadyStateChange] = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && xhr.responseText != "") {
          var res = JSON.parse(xhr.responseText);
          if (res.code !== '0') {
            reject();
          } else {
            resolve(res.result);
          }
        } else {
          var error;
          if (xhr.responseText) error = JSON.parse(xhr.responseText);
          reject(error);
        }
      }
    };
    xhr.send(formData);
  });
};

export default http;