let pkg = require('json!../../package.json');

// 定义项目公用的常量, 使用const关键字声明, 格式 SOMETHING_LIKE_THIS`
const constants = {
  VERSION: pkg.VERSION,
  CACHE_KEYS: {
    CURRENT_USER: 'userInfo',
    PROJECT_LOCATION_LIST: 'project_location_list',
    PROJECT_LOCATION_TREE: 'project_location_tree',
    DESIGNER_ENTERING_TAB_COMPANY: 'designer_entering_tab_company_'
  },
  TITLE: '管理系统',
  USER_REFRESH_INTERVAL: 1000 * 60 * 60,
  PATH: window.location.origin + '/'
};

constants.COOKIE_DOMAIN = '.tezign.com';
if(__DEV_MODEL__){
  constants.COOKIE_DOMAIN = '192.168.199.135';
}


if (__DEV__) {
  constants.API_ORIGIN = 'http://123.56.93.88:8080';
}
if (__QA__) {
  constants.API_ORIGIN = 'https://service.tezign.com';
}
if (__YZ__) {
  constants.API_ORIGIN = 'https://service.tezign.com';
}
if (__DEMO__) {
  constants.API_ORIGIN = 'https://service.tezign.com';
}
if (__PROD__) {
  constants.API_ORIGIN = 'https://service.tezign.com';
}

// 页面名称
constants.PAGES = {
  HOME: 'home',
  CHAT_LIST: 'chatList',
};

// 请求状态码
constants.HTTP_STATUS = {
  SUCCESS: '0',
  ERROR: '1',

  INVALID_TOKEN: '403',
  PERMISSION_DENIED: '404'
};




export default constants;
