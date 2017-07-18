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


// 请求状态码
constants.HTTP_STATUS = {
  SUCCESS: '0',
  ERROR: '1',

  INVALID_TOKEN: '403',
  PERMISSION_DENIED: '404'
};

// 客户首次使用2.0标志
constants.CUSTOMER_FIRST_ENTER = 'customer_first_enter';
constants.DESIGNER_FIRST_ENTER = 'designer_first_enter';
constants.DESIGNER_PROJECT_CREDIT_KNOWN = 'designer_project_credit_known';
constants.DESIGNER_PROJECT_BILL_KNOWN = 'designer_project_bill_known';
constants.DESIGNER_QUOTE_SUCCESS_KNOWN = 'designer_quote_success_known';

//是否mock数据
let MOCK_FLAGS = {
  USER: false,
  PROJECT:false,
  MESSAGE: false,
  WALLET: false
};

constants.ORDER_PAY_LINK = constants.API_ORIGIN + '/paydo';
constants.BILL_PAY_LINK = constants.API_ORIGIN + '/paybill';
constants.API = {
  USER: {
    LOGIN: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + '/user/login',
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + '/user',
    FETCH_PROFILE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + '/user/profile',
    OPPOSITE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/opposite`,

    UPDATE_NEW_USER: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/updateNewUser`,
    UPLOAD_AVATAR: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/avatar`,
    CHECK_PHONE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/phone`,
    BIND_PHONE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/boundPhone`,
    CHECK_MAIL: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/email`,
    BOUNDE_MAIL: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/boundEmail`,
    CHANGE_PASSWORD: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/pwd`,
    SETTING: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/setting`,
    SETDESIGN: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/designer`,
    USER_QRCODE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/qrcode`,
    GETUSER: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user`,
    USER_NOTICE_INFO: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/notice/getInfo`, // 特赞公告

    EMAIL: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/email`,
    TICKET: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/ticket`,
    CAPTCHA_URL: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/file/captcha`,
    PHONE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/phone`,
    PHONE_VERIFY_CODE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/phone`,
    CUSTOMER: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/customer`,
    DESIGNER: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/designer`,
    WECHAT_QRCODE: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/wechat/qrcode`,
    WECHAT_UNBIND: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/wechat/unbind`,
    WECHAT_BIND: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/wechat/bind`,

    // 七牛获取TOKEN路径
    QINIU_UPLOAD_TOKEN: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/qiniu/getUploadToken`,
  },
  PROJECT: {
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/designer/getList',
    DELETE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/delete',
    COPY: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/copy',
    INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/designer/getInfo',
    DRAFT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/saveDraft',
    PUBLISH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/submit',
    ORDER: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order',
    ORDER_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order/getInfo',
    CANCEL_ORDER: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order/cancel',
    COUPON_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/coupon/couponInfo',
    UPLOAD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/upload',
    LOCATION: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/location/getList'
  },
  CUS_PROJECT: {
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/getList',
    DELETE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/delete',
    COPY: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/copy',
    INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/cus/getInfo',
    DRAFT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/saveDraft',
    PUBLISH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/submit',
    ORDER: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order',
    ORDER_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order/getInfo',
    CANCEL_ORDER: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/order/cancel',
    COUPON_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/coupon/couponInfo',
    UPLOAD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/upload',
    LOCATION: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/location/getList'
  },
  BILL: {
    DETAIL: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/bill/getDetail',
    INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/bill/getInfo',
    CREATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/bill/createBill',
    UPDATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/project/bill/updateBill'
  },
  QUOTE: {
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/getQuoteByProjectId',
    FETCH_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/getQuoteByProjectIdUserId',
    CONFIRM: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/confirm',
    SAVE_DRAFT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/saveDraft',
    SUBMIT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/submit',
    SET_CANDIDATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/setCandidate',
    CANCEL_CANDIDATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/cancelCandidate',
    FETCH_PORTFOLIO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/portfolio',
    FETCH_COMMENTS: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/choosing/getReviewList'
  },
  PORTFOLIO: {
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/portfolio',
    FETCH_PORTFOLIO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/portfolio',
    ASSET: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/portfolio/resource',
    ASSET_ADD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/portfolio/resource/add'
  },
  CONTRACT: {
    FETCH_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/info',
    CONFIRM: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/confirm',
    SUBMIT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/submit',
    UPDATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0',
    FETCH_ORDER_INFO: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/order',
    DOWNLOAD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/download',
    DOWNLOAD_ORDER: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/order/download',
    DOWNLOAD_CUSTODY_AGREEMENT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/agreement/download',

    TICKET: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/ticket',
    INIT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/init',
    RESET: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/reset',
    SAVE_DRAFT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/init',
    ADD_TASK: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/task',
    UPDATE_TASK: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/task',
    DELETE_TASK: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/task',
    ADD_CONTENT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/createContent',
    UPDATE_CONTENT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/updateContent',
    DELETE_CONTENT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/deleteContent',

    CONSTRAINT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/constraint/pay',
  },
  DELIVERY: {
    FETCH: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/list',
    FETCH_PLAN_FILE_LIST: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/file/cardFileList',
    FILE_DOWNLOAD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/file/fileDownload',
    FILE_BATCH_DOWNLOAD: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/file/fileBatchDownload',
    SUBMIT_PLAN: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/submitWork',
    CONFIRM_PLAN: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/confirmWork',
    STOP_PROJECT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/stopProject',
    STOP_PROJECT_REJECT: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/stopProjectReject',
    STOP_PROJECT_PASS: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/stopProjectPass',

    // 删除上传的文件
    DELETE_FILE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/file/delete',
    UPLOAD_FILE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/delivery/file/upload',
  },
  MESSAGE: {
    TRENDS:{
      UNREAD_COUNT:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/trends/unreadCount',
      FETCH:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/trends',
      READ_ALL:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/trends/readAll',
      READ:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/trends/read'
    },
    NEWS:{
      UNREAD_COUNT:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/news/unreadCount',
      FETCH:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/news',
      READ_ALL:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/news/readAll',
      READ:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/news/read'
    },

    CUSTOMER_LIST:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/designer/getCustomerIdList',
    DESIGNER_LIST:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/customer/getDesignerIdList'
  },
  NOTE_LOG:{
    NOTES2LOGS:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/notes2logs',
    NOTES:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/notes',
    LOGS:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/logs',
    FILES:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/files',
    READ_ALL:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/notes/readAll',
    ADD:constants.API_ORIGIN + (MOCK_FLAGS.MESSAGE ? '/mock':'') + '/message/notes/add'
  },
  WALLET:{
    INFO:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/getInfo',
    DESINGERINFO:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/designerAllProjIncome',
    DETAIL:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/getDetail',
    DESIGNER_INFO:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/designerAllProjIncome',
    DESIGNER_CUSTODY:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '',
    DESIGNER_INCOME:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '',
    DESIGNER_UNRECEIVED:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/designerUncollectedProject',
    DESIGNER_RECEIVED:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/designerCollectedProject',
    CLIENT_CUSTODY:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '',
    CLIENT_CREDIT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/customerCredit',
    CLIENT_CREDIT_NUM:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/customerCreditNum',


    TRUSTEESHIP:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/pay/trusteeship',
    WITHDRAW_SUBMIT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/submit',
    WITHDRAW_INFO:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/getWithdrawInfo',
    WITHDRAW_LIST:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/getWithdrawList',
    CLIENT_REMAIN_MONEY:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/customerRemainProjPrice',
    CUSTOMER_REMAIN_INFO:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/getCustomerRemainInfo',
    DESIGNER_DEAL:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/getDesignerRemainInfo',
    ACCOUNT_LIST:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/getAccountList',
    ACCOUNT_COMPANY_LIST:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/company/account/list',
    DELETE_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/deleteAccount',
    DELETE_COMPANY_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/company/account/delete',
    ADD_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/addAccount',
    ADD_COMPANY_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/company/account/add',
    UPDATE_COMPANY_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/company/account/update',
    UPDATE_ACCOUNT:constants.API_ORIGIN + (MOCK_FLAGS.WALLET ? '/mock':'') + '/wallet/withdraw/updateAccount'
  },
  REVIEW: {
    CREATE: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/create',
    REPLY: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/reply/create',
    GET_CUSTOMER_REVIEW: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/receiveReview',
    GET_DESIGNER_REVIEW: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/get',
    SELF_LIST: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/selfList',
    WAIT_LIST: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/waitList',
    RECEIVE_LIST: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/receiveList',
    MARK_DETAIL: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/getMarkDetail',
    MARK: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/evaluation/getMark',
  },
  TICKETS: {
    GET_LIST: constants.API_ORIGIN + (MOCK_FLAGS.PROJECT ? '/mock':'') + '/contract/v2.0/ticket'
  },
  GROUP: {
    GET_APPLYING_GROUP: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/cluster/designer?applying=true`,
    GET_ADDED_GROUP: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/cluster/designer?applying=false`,
    QUIT_GROUP: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/cluster/quit?cluster_id=`,
    APPLY_GROUP: constants.API_ORIGIN + (MOCK_FLAGS.USER ? '/mock':'') + `/user/cluster/apply?cluster_id=`
  }
};

// 企业客户权限KEY
// 所有权限
constants.AUTH_LIST = [
  'member_view',                      //查看企业成员
  'member_add',                       //添加企业成员
  'member_to_admin',                  //将成员设为管理员
  'project_view',                     //查看项目
  'project_detail_view',              //查看项目详情
  'project_quote_view',               //查看项目报价
  'project_contract_view',            //查看项目合同
  'project_process_view',             //查看项目进度
  'project_talk_view',                //查看与设计师的对话
  'project_publish',                  //发布项目
  'project_designer_select',          //选择设计师
  'project_fund_custody',             //资金托管
  'project_plan_confirm',             //确认阶段完成
  'project_plan_stop',                //终止项目
  'project_designer_review',          //评价设计师
  'project_notice',                   //接收项目通知
  'project_designer_words',           //给设计师留言
  'project_leading_appoint',          //指定项目负责人
  'cluster_view',                     //查看群组
  'cluster_create',                   //创建群组
  'cluster_remove',                   //移除群组
  'cluster_edit',                     //编辑群组信息
  'cluster_designer_add',             //添加设计师
  'cluster_designer_remove',          //移除设计师
  'finance_trade_view',               //查看交易记录
  'finance_withdraw',                 //提现
  'account_material_view',            //查看企业资料
  'account_material_edit',            //修改企业资料
  'account_logo_edit',                 //修改企业LOGO,

  // 企业客户相关
  'account_customer_delete',//删除客户公司
  'account_brand_delete',//删除客户品牌
  'account_contacts_delete'//删除客户联系人
];

// 项目相关权限
constants.AUTH_LIST_PROJECT = [
  'project_view',                     //查看项目
  'project_detail_view',              //查看项目详情
  'project_quote_view',               //查看项目报价
  'project_contract_view',            //查看项目合同
  'project_process_view',             //查看项目进度
  'project_talk_view',                //查看与设计师的对话
  'project_publish',                  //发布项目
  'project_designer_select',          //选择设计师
  'project_fund_custody',             //资金托管
  'project_plan_confirm',             //确认阶段完成
  'project_plan_stop',                //终止项目
  'project_designer_review',          //评价设计师
  'project_notice',                   //接收项目通知
  'project_designer_words',           //给设计师留言
  'project_leading_appoint'           //指定项目负责人
];

// 群组相关权限
constants.AUTH_LIST_CLUSTER = [
  'cluster_view',                     //查看群组
  'cluster_create',                   //创建群组
  'cluster_remove',                   //移除群组
  'cluster_edit',                     //编辑群组信息
  'cluster_designer_add',             //添加设计师
  'cluster_designer_remove'           //移除设计师
];


// 用户验证信息KEY值
constants.X_USER_ID = "X-User-Id";
constants.X_TOKEN = "X-Token";
constants.C_XTOKEN = "xtoken";
constants.C_XUID = "xuid";
constants.C_XCID = "xcid";
constants.C_XDID = "xdid";

constants.COMPANY_PROJECT_LIST_STATUS = {
  '11':{
    firstTip:'还剩{leftTime}截止报价',
    link:'/projects/create',
    secondTip: '还剩{leftTime}截止报价'
  },
  '22':{
    firstTip:'你已提交报价',
    link:'/projects/create',
    secondTip: '请耐心等待客户的回应'
  },
  '23':{
    firstTip:'项目失效',
    link:'',// 选择设计师页
    secondTip: '您的报价未被选中'
  },
  '24':{
    firstTip:'项目失效',
    link:'',// 选择设计师页
    secondTip: '您报价的项目已失效'
  },
  '41':{
    firstTip:'对接成功',
    link:'',// 选择设计师页
    secondTip: '请根据项目内容完成设计'
  },
  '71':{
    icon: 'status-1-1',
    firstTip:'项目已失效',
    link:'', // 项目详情页
    secondTip: '无人报价'
  }

};
// 项目列表中各阶段状态及其
constants.PROJECT_LIST_STUATUS = {
  '11':{
    icon: 'status-1',
    firstTip:'还剩{leftTime}截止报价',
    link:'/projects/create',
    secondTip: '还剩{leftTime}截止报价'
  },
  '22':{
    icon: 'status-2',
    firstTip:'你已提交报价',
    link:'/projects/create',
    secondTip: '请耐心等待客户的回应'
  },
  '23':{
    icon: 'status-2',
    firstTip:'项目失效',
    link:'',// 选择设计师页
    secondTip: '您的报价未被选中'
  },
  '24':{
    icon: 'status-2',
    firstTip:'项目失效',
    link:'',// 选择设计师页
    secondTip: '您报价的项目已失效'
  },
  '30':{
    icon: 'status-3',
    firstTip:'合同待创建',
    link:'', // 详情页?选择设计师页?
    secondTip: '对接成功，请尽快创建合同'
  },
  '31':{
    icon: 'status-3',
    firstTip:'合同创建中',
    link:'', // 详情页?选择设计师页?
    secondTip: '编辑后请提交给客户'
  },
  '32':{
    icon: 'status-3',
    firstTip:'合同已提交',
    link:'', // 合同审阅页
    secondTip: '合同已提交，正等待客户确认'
  },
  '33':{
    icon: 'status-3',
    firstTip:'合同已确认',
    link:'', // 资金托管页
    secondTip: '客户完成资金托管后，你可开始工作'
  },
  '41':{
    icon: 'status-4',
    firstTip:'{project.plan.planName}进行中',
    link:'', // 阶段管理页
    secondTip: '客户申请终止项目'
  },
  '42':{
    icon: 'status-4',
    firstTip:'{project.plan.planName}待确认',
    link:'', // 阶段管理页
    secondTip: '客户申请终止项目'
  },
  '43':{
    icon: 'status-4',
    firstTip:'{project.plan.planName}待确认',
    link:'', // 阶段管理页
    secondTip: '正等待客户确认本阶段作品'
  },
  '44':{
    icon: 'status-4',
    firstTip:'{project.plan.planName}进行中',
    link:'', // 阶段管理页
    secondTip: '待提交本阶段作品'
  },
  '45':{
    icon: 'status-4',
    firstTip:'项目阶段未开始',
    link:'', // 阶段管理页
  },
  '51':{
    icon: 'status-5-1',
    firstTip:'项目完结',
    link:'', // 项目评价页
    secondTip: '等待你的评价'
  },
  '52':{
    icon: 'status-5-1',
    firstTip:'项目完结',
    link:'', // 项目评价页
    secondTip: '完成评价后可查看{review.otherName}对你的评价'
  },
  '53':{
    icon: 'status-5-2',
    firstTip:'项目完结',
    link:'', // 项目评价页
    secondTip: '你已评价，正等待{review.otherName}对你的评价'
  },
  '54':{
    icon: 'status-5-2',
    firstTip:'项目完结',
    link:'', // 项目评价页
    secondTip: '{review.otherName}对你已评价'
  },
  '61':{
    icon: 'status-5-1',
    firstTip:'项目终止',
    link:'', // 项目评价页
    secondTip: '等待你的评价'
  },
  '62':{
    icon: 'status-5-1',
    firstTip:'项目终止',
    link:'', // 项目评价页
    secondTip: '完成评价后可查看{review.otherName}对你的评价'
  },
  '63':{
    icon: 'status-5-2',
    firstTip:'项目终止',
    link:'', // 项目评价页
    secondTip: '你已评价，正等待{review.otherName}对你的评价'
  },
  '64':{
    icon: 'status-5-2',
    firstTip:'项目终止',
    link:'', // 项目评价页
    secondTip: '{review.otherName}对你已评价'
  },
  '71':{
    icon: 'status-1-1',
    firstTip:'项目已失效',
    link:'', // 项目详情页
    secondTip: '无人报价'
  },
  '72':{
    icon: 'status-1-1',
    firstTip:'项目已失效',
    link:'', // 项目详情页
    secondTip: '逾期未选人'
  },
  '73':{
    icon: 'status-1-1',
    firstTip:'项目已失效',
    link:'', // 项目详情页
  }
};

// WebSocket消息类型(使用code标识)
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

// 支付结果标志
constants.PAY_RESULT_FLAG = {
  KEY: 'pay_result_flag',
  SUCCESS: 1,
  FAIL: 2
};

// 七牛上传标志
constants.QINIU_UPLOAD_TOKEN = 'qiniu_upload_token';
constants.QINIU_DOMAIN = 'https://file.tezign.com/';

// 特赞公告是否已读表示
constants.TEZIGN_NOTICE_FLAG = 'noticeShow_';


export default constants;
