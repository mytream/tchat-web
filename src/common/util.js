import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import fetch from 'isomorphic-fetch'
import uuid from 'node-uuid'
import constants from './constants'
import { Modal, notification, message } from 'tezign-react-ui'
import Cookies from 'js-cookie'

const regUTC = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}[\-\+]{1}\d{2}\:\d{2}$/i;

const regAudioTypePostfix = /^(mp3|wav|ogg|wma|aac|ape|m4a)$/i;
const regImageTypePostfix = /^(jpg|jpeg|png|gif)$/i;
const regDocumentTypePostfix = /^(pdf|zip|rar|ppt|pptx|key)$/i;

const REG_IMAGE_FILE = /^.*\.(png|jpg|svg|jpeg|bmp|gif)$/;

const OnReadyStateChange = 'OnReadyStateChange'.toLocaleLowerCase();

const AA = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
const BB = ["","拾","佰","仟","万","亿","圆",""];
const CC = ["角", "分", "厘"];

const FILE_THUMBS = {};
FILE_THUMBS.defualt = require('../components/Project/images/file.png');
FILE_THUMBS.ai   = require('../components/Project/images/file-ai.png');
FILE_THUMBS.doc  = require('../components/Project/images/file-doc.png');
FILE_THUMBS.gif  = require('../components/Project/images/file-gif.png');
FILE_THUMBS.jpeg = require('../components/Project/images/file-jpeg.png');
FILE_THUMBS.jpg  = require('../components/Project/images/file-jpg.png');
FILE_THUMBS.page = require('../components/Project/images/file-page.png');
FILE_THUMBS.pdf  = require('../components/Project/images/file-pdf.png');
FILE_THUMBS.png  = require('../components/Project/images/file-png.png');
FILE_THUMBS.ps   = require('../components/Project/images/file-ps.png');
FILE_THUMBS.xls  = require('../components/Project/images/file-xls.png');

const AppLoaderInnerHTML = `
  <div class="loader-content">
    <div class="loader-inner">
      <div class="ant-spin ant-spin-spinning">
        <span class="ant-spin-dot"></span>
      </div>
      <div class="loader-text">正在处理中，请稍后</div>
    </div>
  </div>
`;

function getFileSizeStr (size) {
  let num = size / (1024 * 1024);
  return num + 'M';
}

function getFilePostfix (file) {
  let name = file.name;
  let index = name.lastIndexOf('.');
  if (index === -1) return '';
  return name.substring(index + 1);
}

function getFileThumb(file) {
  return FILE_THUMBS[getFilePostfix(file)] || FILE_THUMBS.defualt;
}

let meiqiaInited = false;
function initMeiqia() {
  if(meiqiaInited) {
    return;
  }

  (function(m, ei, q, i, a, j, s) {
    m[a] = m[a] || function() {
        (m[a].a = m[a].a || []).push(arguments)
      };
    j = ei.createElement(q),
      s = ei.getElementsByTagName(q)[0];
    j.async = true;
    j.charset = 'UTF-8';
    j.src = i + '?v=' + new Date().getUTCDate();
    s.parentNode.insertBefore(j, s);
  })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
  _MEIQIA('entId', '1198');
  // 在这里开启无按钮模式（常规情况下，需要紧跟在美洽嵌入代码之后）
  _MEIQIA('withoutBtn');

  meiqiaInited = true;
}

function getLink(link) {
  if (link.indexOf('://') !== -1) return link;
  return 'http://' + link;
}

const REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const REG_URL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
const REG_TEL = /^[\d\-\+]+$/;
const REG_PERCENT_INTEGER = /(^[0-9]\d?(\.\d{0,5})?$)|(^100(\.0{0,5})?$)/;
const REG_PHONE = /^\d{11}$/ ;

const LOCAL_TIME_OFFSET = moment().utcOffset() * 60 * 1000;
const BJ_TIME_OFFSET = 8 * 60 * 60 * 1000; // +8:00
const DLT_TIME_OFFSET = BJ_TIME_OFFSET - LOCAL_TIME_OFFSET;

export default {
  REG_EMAIL,
  REG_URL,
  REG_TEL,
  REG_PERCENT_INTEGER,
  REG_PHONE,
  REG_HANS: /^[\u4e00-\u9fa5]$/,
  REG_EMOJI: /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/,
  REG_ID_CARD: /(^\d{15}$)|(^\d{17}[0-9Xx]{1}$)/,
  REG_INT: /^[\d]+$/,
  REG_NUMBER: /^-?[\d\.]+$/,
  REG_IMAGE_TYPE_POSTFIX: regImageTypePostfix,
  getLink,
  if (condition, propositionComponent, oppositionComponent) {
    if (condition) {
      return propositionComponent;
    } else {
      return oppositionComponent;
    }
  },
  tryPromise(promise, times) {
    console.log('try promise');
    times = times || 0;
    if (times <= 0) return promise();
    times --;
    return promise().catch(() => this.tryPromise(promise, times));
  },
  getFilePostfix,
  getFileThumb,
  chooseFile(options) {
    var root = this;
    return new Promise(function (resolve, reject) {
      options = options || {};
      var element = document.createElement('input');
      element.type = 'file';
      element.style.display = 'none';
      if (_.isString(options.accept)) element.accept = options.accept;
      document.body.appendChild(element);
      element.click();
      element.onchange = function () {
        var originFile = element.files[0];
        var file = originFile;
        //var file = _.pick(originFile, ['name', 'type', 'size']);
        let checkAcceptResult;
        if (_.isString(options.accept)) {
          checkAcceptResult = root.checkFileAccept(file, options.accept);
        } else if (_.isFunction(options.accept)) {
          checkAcceptResult = options.accept(file);
        }
        if (!checkAcceptResult) {
          return reject({message: options.acceptMessage || '文件类型错误'});
        }
        if (options.maxsize && file.size > options.maxsize) {
          return reject({message: options.maxsizeMessage || '文件大小不能超过' + getFileSizeStr(options.maxsize)});
        }
        //file.blob = originFile;
        file.url = URL.createObjectURL(originFile);
        resolve(file);
        document.body.removeChild(element);
      }
    });
  },
  removeFileTarget(file) {
    if (file._target) document.body.removeChild(file._target);
  },

  upload(url, data, progressCallback, successCallback, errorCallback) {
    let sId = data.sId;
    let token = Cookies.get(constants.C_XTOKEN);
    let uid = Cookies.get(constants.C_XUID);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader(constants.X_TOKEN, token);
    xhr.setRequestHeader(constants.X_USER_ID, uid);
    xhr.upload.addEventListener("progress", function(evt) {
      if (!evt.lengthComputable) return true;
      let res = _.pick(evt, ['loaded', 'total']);
      res.percent = Math.round(evt.loaded * 100 / evt.total);

      progressCallback(sId,res);
    }, false);
    xhr[OnReadyStateChange] = function(response) {
      if (xhr.readyState == 4 ) {
        if (xhr.status == 200 && xhr.responseText != "") {
          var res = JSON.parse(xhr.responseText);

          if(res.code !== '0'){
            errorCallback(sId,res);
            return;
          }

          successCallback(sId,res.result[0]);
        } else {
          var error;
          if (xhr.responseText) error = JSON.parse(xhr.responseText);
          errorCallback(sId,error);
        }
      }
    };
    xhr.send(data.formData);
  },

  uploadFileToQiniu(file, callback, shouldLoadFileInfo) {
    file.key = '';
    let filePostfix = getFilePostfix(file);
    if (regImageTypePostfix.test(filePostfix)) {
      file.key += 'images/';
    } else if (regAudioTypePostfix.test(filePostfix)) {
      file.key += 'audios/';
    }
    file.key += (uuid.v4() + '.' + filePostfix);
    var formData = new FormData();
    formData.append('token', constants.qiniu.upToken);
    formData.append('file', file.blob);
    formData.append('key', file.key);
    var root = this;
    this.upload(constants.qiniu.upApi, formData, (progress) => {
      file.uploading = true;
      file.uploaded = progress.loaded;
      file.uploadedPercent = progress.percent;
      callback(undefined, file);
    }, (res) => {
      file.url = constants.qiniu.bucket + file.key;
      file.uploading = false;
      if (shouldLoadFileInfo) {
        root.loadFileInfoFromQiniu(file).then(info => {
          file = _.assign(info, file);
          callback(undefined, file);
        }, error => {
          callback({message: '获取文件详细信息失败'}, file);
        });
      } else {
        callback(undefined, file);
      }
    }, (error) => {
      callback({message: error}, file);
    });
  },

  loadFileInfoFromQiniu (file) {
    var url;
    var isAudio = false;
    let filePostfix = getFilePostfix(file);
    if (regImageTypePostfix.test(filePostfix)) {
      url = file.url + '?imageInfo';
    } else if (regAudioTypePostfix.test(filePostfix)) {
      url = file.url + '?avinfo';
      isAudio = true;
    }
    if (!url) return Promise.reject();
    return fetch(url).then(function (response) {
      if (response.status !== 200) {
        var err = new Error(response.responseText);
        err.status = response.status;
        throw err;
      }
      return response.json().then(function (res) {
        if (isAudio) {
          var duration = _.get(res, 'format.duration');
          res.duration = duration;
        }
        return res;
      }, function () {
        var err = new Error('数据解析异常');
        err.status = 'DATA-ERROR';
        throw err;
      })
    }, function (error) {
      error.status = 'FETCH-ERROR';
      throw error;
    })
  },

  handleAction(type, initialState, success, error) {
    return function (state = initialState, action) {
      if (action.type !== type) return state;
      if (action.error) {
        if (error) return error(state, action.payload);
        return state;
      }
      if (success) return success(state, action.payload);
      return action.payload;
    }
  },
  getActionErrorAndNotice(action, title) {
    let {error, payload} = action;
    if (error) {
      message.error(title);
      return payload;
    }
    return undefined;
  },
  cloneReactChildrenWithProps(children, props) {
    return React.Children.map(children, (element) => React.cloneElement(element, props));
  },
  jsonProxy(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    var params = this.parseObjectToUrlParams(data);
    if (url.indexOf('?') > -1) {
      url += '&' + "callback=jsonProxyCallback";
    } else {
      url += '?' + "callback=jsonProxyCallback";
    }
    if (params) url += '&' + params;
    var script = document.createElement("script");
    script.src = url;
    script.onerror = function () {
      document.head.removeChild(script);
      error({status: 404, message: '网络异常'});
    };
    window.jsonProxyCallback = function (res) {
      document.head.removeChild(script);
      if (res.status !== 0) return error({status: res.status, message: res.message});
      success(res.data);
    };
    document.head.appendChild(script);
  },
  loadJs: function (url) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.src = url;
      script.onerror = function () {
        document.head.removeChild(script);
        reject({status: 404, message: '网络异常'});
      };
      script.onload = resolve;
      document.head.appendChild(script);
    });
  },
  parseObjectToUrlParams: function (obj) {
    var str = '';
    _.forEach(obj, function (value, key) {
      if (value === undefined || value === null) return;
      str += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value)
    });
    return str.substring(1);
  },
  parseUrlParamsToObject: function (url) {
    var arr = url.split('&');
    var result = {};
    arr.forEach((item) => {
      var items = item.split('=');
      result[items[0]] = items[1];
    });
    return result;
  },
  each:function(list,callback,n){
    var len = list.length,
        i = 0;
    for(; i < len; i++){
      if(n && i === n) break;
      callback && callback(list[i],i);
    }
  },
  isUTCString(str) {
    return regUTC.test(str);
  },
  createAjax() {
    var ajax = {};
    if (window.XMLHttpRequest) {
      ajax = new XMLHttpRequest();
    } else {
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return ajax;
  },
  checkFileAccept(file, accept) {
    if (!accept) return true;
    if (!file) return false;
    let postfix = getFilePostfix(file);
    let index = accept.lastIndexOf('/');
    let acceptPostfix = accept.substring(index + 1);
    if (acceptPostfix !== '*') return acceptPostfix === postfix;
    let acceptPrefix = accept.substring(0, index);
    if (acceptPrefix === 'image') {
      return regImageTypePostfix.test(postfix)
    } else if (acceptPrefix === 'audio') {
      return regAudioTypePostfix.test(postfix);
    } else if (acceptPrefix === 'application') {
      return regDocumentTypePostfix.test(postfix);
    } else {
      //todo 添加更多类型检测
      return true;
    }
  },
  convertArrayToTree(array, rule = {id: 'id', parentId: 'parentId'}) {
    var tree = [];
    var {id , parentId} = rule;
    var obj;
    _.map(array, (item) => obj[item[id]] = item);
    _.map(array, (item) => {
      let parent = obj[item[parentId]];
      if (!parent) return tree.push[item];
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    });
    return tree;
  },
  noop() {},
  //2016-04-18T06:38:46.000Z" => "2016/04/18 06:38"
  formatApiDateTime(DateTime){
    var date = DateTime.slice(0,10),
        time = DateTime.slice(11,16);
    return date.replace(/-/g,"/") + " " + time;
  },
  eqWith(obj1, obj2, keys) {
    return keys.every((key) => obj1[key] === obj2[key]);
  },
  diffWith(obj1, obj2, keys) {
    return keys.some((key) => obj1[key] !== obj2[key]);
  },
  convertCanvasToBlob(canvas, type, quality) {
    var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
      len = binStr.length,
      arr = new Uint8Array(len);
    for (var i=0; i<len; i++ ) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob( [arr], {type: type || 'image/png'} );
  },
  _loaderCount: 0,
  _initLoader() {
    if (this.$appLoader) return true;
    let div = document.createElement('div');
    div.className = 'app-loader';
    document.body.appendChild(div);
    div.innerHTML = AppLoaderInnerHTML;
    this.$appLoader = div;
    this.$appLoaderText = div.querySelector('.loader-text');
  },
  showLoader(text) {
    this._initLoader();
    this._loaderCount ++;
    this.$appLoaderText.innerText = text || '正在处理中，请稍后';
    this.$appLoaderText.innerText = '';
    this.$appLoader.className += ' active';
  },
  hideLoader() {
    this._initLoader();
    this._loaderCount --;
    if (this._loaderCount < 0) this._loaderCount = 0;
    if (this._loaderCount === 0) this.$appLoader.className = 'app-loader';
  },
  createClassName(obj) {
    let result = '';
    _.each(obj, (value, key) => {
      if (value) result += ' ' + key;
    });
    return result;
  },
  createTimeoutFunction (func, timeout, thisOrg) {
    let _t;
    return function() {
      var args = arguments;
      return new Promise(function (resolve, reject) {
        clearTimeout(_t);
        _t = setTimeout(function () {
          var res = func.apply(thisOrg || this, args);
          if(res && res.then) {
            res.then(resolve, reject);
          }
        }, timeout);
      });
    }
  },
  // {aaa:'bbb'} => a=bbb
  json2Form(a) {
    var s = [], rbracket = /\[\]$/,
      isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      }, add = function (k, v) {
        v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
      }, buildParams = function (prefix, obj) {
        var i, len, key;

        if (prefix) {
          if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
              if (rbracket.test(prefix)) {
                add(prefix, obj[i]);
              } else {
                buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
              }
            }
          } else if (obj && String(obj) === '[object Object]') {
            for (key in obj) {
              buildParams(prefix + '[' + key + ']', obj[key]);
            }
          } else {
            add(prefix, obj);
          }
        } else if (isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            add(obj[i].name, obj[i].value);
          }
        } else {
          for (key in obj) {
            buildParams(key, obj[key]);
          }
        }
        return s;
      };

    return buildParams('', a).join('&').replace(/%20/g, '+');
  },
  // Date obj --> string
  dateFormat(dateObj, format){
    format = format || '';
  },
  formatDateStr(str, format) {
    if (!(str && format)) return '';
    let year = str.substring(0, 4);
    let month = str.substring(5, 7);
    let day = str.substring(8, 10);
    let hour = str.substring(11, 13);
    let minute = str.substring(14, 16);
    let second = str.substring(17, 19);
    return format.replace('YYYY', year)
      .replace('Y', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('hh', hour)
      .replace('mm', minute)
      .replace('ss', second);
  },
  formatPrice(number) {
    // 保留两位有效小数
    if (!this.REG_NUMBER.test(number)) return '';
    number = number.toString();
    let result = '';
    let arr = number.split('.');
    let str = arr[0];
    let l = str.length;
    let times = l % 3;
    if (times !== 0) times = 3 - times;
    _.times(times, () => {str = ' ' + str});
    l = str.length;
    let count = l / 3;
    let i = 0;
    for (i; i < count;) {
      result += ',' + str.substring(i * 3, ++i * 3);
    }
    result = result.substring(times + 1);
    if (arr[1]) {
      result += ('.' + arr[1])
    }
    else{
      result += ('.00')
    }
    return result;
  },
  formatPriceToChinese(num) {
    if (!_.isNumber(num)) return '';
    var a = (""+ num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for(var i=a[0].length-1; i>=0; i--){
      switch(k){
        case 0 :
          re = BB[7] + re;
          break;
        case 4 :
          if(!new RegExp("0{4}\\d{"+ (a[0].length-i-1) +"}$").test(a[0]))
            re = BB[4] + re;
          break;
        case 8 :
          re = BB[5] + re;
          BB[7] = BB[5];
          k = 0;
          break;
      }
      if(k%4 == 2 && a[0].charAt(i)=="0" && a[0].charAt(i+2) != "0")
        re = AA[0] + re;
      if(a[0].charAt(i) != 0)
        re = AA[a[0].charAt(i)] + BB[k%4] + re;
      k++;
    }
    if(a.length>1){
      re += BB[6];
      for(var i=0; i<a[1].length; i++){
        re += AA[a[1].charAt(i)] + CC[i];
        if(i==2)
          break;
      }
      if(a[1].charAt(0)=="0" && a[1].charAt(1)=="0"){
        re+="圆整";
      }
    }else{
      re+="圆整";
    }
    return re;
  },
  // download url
  downloadUrl(url,filename){
    var a = document.createElement('a');
    fetch(url).then(res => res.blob().then(blob => {
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename || (Date.now()+'');
      a.click();
      window.URL.revokeObjectURL(url);
    }))
  },

  // meiqia operation
  initMeiqia(){
    initMeiqia();
  },
  showMeiqia(){
    if(!meiqiaInited){
      initMeiqia();
    }
    _MEIQIA('showPanel');
  },
  hideMeiqia(){
    _MEIQIA('hidePanel');
  },

  fromNow(time){
    var nowDate = Date.now();
    let interval = Math.round((nowDate-time)/(1000*60));
    if(interval < 5){
      return `刚刚`;
    }
    if(interval < 60){
      return `${interval}分钟之前`;
    }
    if(interval >= 60 && interval < 120){
      return `1小时之前`;
    }
    if(interval >= 120 && interval < 180){
      return `2小时之前`;
    }
    var targetMoment = moment(time);
    var nowMoment = moment();
    var [nowYear,nowMonth,nowDay] = [nowMoment.year(),nowMoment.month(),nowMoment.date()];
    var targetYear = targetMoment.year();
    var targetMonth = targetMoment.month();
    var targetDay = targetMoment.date();
    // 一年之前
    if(targetYear < nowYear){
      return targetMoment.format('YYYY.MM.DD HH:mm');
    }
    // 昨天之前 - 一年之间
    if(targetMonth < nowMonth || targetDay < nowDay-1){
      return `${targetMoment.format('MM.DD HH:mm')}`;
    }
    // 昨天
    if(targetDay === nowDay - 1){
      return `昨天 ${targetMoment.format('HH:mm')}`;
    }

    // 今天上午(6-12)/今天下午(12-18)/今天晚上(18-24)/今天凌晨(0-6)  xx:xx
    var targetHour = targetMoment.hour();
    var firstStr;
    if(targetHour >=0 && targetHour < 6){
      firstStr = '今天凌晨';
    }
    if(targetHour >=6 && targetHour < 12){
      firstStr = '今天上午';
    }
    if(targetHour >=12 && targetHour < 18){
      firstStr = '今天下午';
    }
    if(targetHour >=18 && targetHour < 24){
      firstStr = '今天晚上';
    }
    return `${firstStr} ${targetMoment.format('HH:mm')}`;
  },

  isImg(filename){
    return REG_IMAGE_FILE.test(filename);
  },

  createTimeoutFunction (func, timeout, thisOrg) {
    let _t;
    return function() {
      var args = arguments;
      return new Promise(function (resolve, reject) {
        clearTimeout(_t);
        _t = setTimeout(function () {
          var res = func.apply(thisOrg || this, args);
          if(res && res.then) {
            res.then(resolve, reject);
          }
        }, timeout);
      });
    }
  },

  escapeHtml(str){
    str = (str || '').trim();
    let words = str.replace(/<[^>]+>/g,"").replace(/&nbsp;/g, '');

    return words;
  },
  escapeHtmlStyle(str){
    str = (str || '').trim();
    let words = str.replace(/style=\".*\"/g, "");

    return words;
  },
  // 对description添加换行、超链接的支持（作品、作品集、设计师报价）
  getFormattedDescription(desc){
    if(!desc && typeof desc !== 'string'){
      return desc;
    }

    const REG_URL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.@?^=%&amp:\/~+#-]*[\w@?^=%&amp\/~+#-])?/g;
    const REG_HTTP = /^(http|https|ftp).*/;

    return desc.replace(REG_URL,function (match) {
      let beforeMath = match;
      if(!REG_HTTP.test(match)){
        match = 'http://' + match;
      }
      return `<a href=\"${match}\" target=\"_blank\">${beforeMath}</a>`;
    }).replace(/\n/g,'<br/>');

  },
  // 将desc转换成包含br的plain html，和ContentEditable相关
  getHtmlFromDescription(desc){
    if(desc){
      // return desc.replace(/\n/g,'<br/>');
      return desc.replace('<br/>',/\n/g);
    }
    else{
      return desc
    }
  },

  localTime2bjTime(localTime) {
    return localTime + DLT_TIME_OFFSET;
  },

  bjTime2LocalTime(bjTime) {
    return bjTime - DLT_TIME_OFFSET;
  },

  // 获取字符串长度，中文2，非中文1
  getStringLength(str){
    if(!str) return 0;

    let length = 0,
      regHans = this.REG_HANS;
    for(let char of str){
      length += regHans.test(char) ? 2 : 1;
    }

    return length;
  },

  // 获取指定时间的时间戳
  getTime(day){
    let re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(day);
    return new Date(re[1],(re[2]||1)-1,re[3]||1,re[4]||0,re[5]||0,re[6]||0).getTime();
  }

};
