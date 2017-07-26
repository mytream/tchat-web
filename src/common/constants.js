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

constants.X_USER_ID = "x-user-id";

constants.COOKIE_DOMAIN = 'localhost';

// constants.API_ORIGIN = 'http://192.168.199.135:8080';
constants.API_ORIGIN = 'http://127.0.0.1:8080';

// 页面名称
constants.PAGES = {
  HOME: 'home',
  CHAT_LIST: 'chatList',

  MESSAGE: 'msg',
  USER: 'users',
  ME: 'me',
};

// 请求状态码
constants.HTTP_STATUS = {
  SUCCESS: '0',
  ERROR: '1',

  INVALID_TOKEN: '403',
  PERMISSION_DENIED: '404'
};

constants.MSG_CODE = {
  NOTES: '17001', // 留言
  COUNT: '1', // 消息数汇总
  TREND: '2', // 项目动态
  TREND_COUNT: '3', // 项目动态未读数
  NEWS: '4', // 站内信
  NEWS_COUNT: '5', //站内信未读数
  PROJECT_LOG: '6',//项目日志
  WECHAT_BIND_SUCCESS: '0', // 微信绑定成功
  WECHAT_HAS_BOUND: '14001',//微信账号已被绑定其他账号
  DESIGNER_COMMIT_CONTRACT: '16001',//站内信未读数
  DESIGNER_RESET_CONTRACT: '16002',//设计师重置了合同
  MESSAGE: '17001',//留言
  MESSAGE_COUNT: '17002',//留言推送未读数
  ON_LINE: '10001',//上线信息
  OFF_LINE: '10002',//下线信息
  USER_STATE: '10003',//用户状态
};




export default constants;
