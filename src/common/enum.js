// 定义项目公用的枚举常量, 使用const关键字声明, 格式 SOMETHING_LIKE_THIS

const ENUM = {};

// 设计师
ENUM.DESIGNER = {};
// 入驻状态 -- 0:未审核 1:已通过 2:未通过 3:审核中 4:已激活
ENUM.DESIGNER.IS_CHECKED = {
  NOT_AUDITED: {code: 0, name: '未审核'},
  PASSED: {code: 1, name: '已通过'},
  NOT_PASSED: {code: 2, name: '未通过'},
  AUDITED: {code: 3, name: '已通过'},
  VALIDATED: {code: 4, name: '已激活'}
};


// 设备类型
ENUM.DEVICE_TYPE = {
  OTHER: {code: 0, name: 'OTHER'},
  ANDROID: {code: 1, name: 'ANDROID'},
  BLACKBERRY: {code: 2, name: 'BLACKBERRY'},
  IOS: {code: 3, name: 'IOS'},
  WINDOWS: {code: 4, name: 'WINDOWS'}
};

// 项目

// 行业类型
ENUM.INDUSTRY_TYPE = {
  INTERNET: {name: "互联网", code: 1001},
  CONSUMPTION: {name: "消费", code: 1002},
  CAR: {name: "汽车", code: 1003},
  WAR: {name: "军工", code: 1004},
  FINANCE: {name: "金融", code: 1005},
  EDUCATION: {name: "教育培训", code: 1006},
  ESTATE: {name: "房地产", code: 1007},
  LOGISTICS: {name: "物流", code: 1008},
  MEDICAL: {name: "医疗", code: 1009},
  MEDIA: {name: "传媒", code: 1010},
  SERVICE: {name: "服务", code: 1011},
  CONSULTING: {name: "咨询", code: 1012},
  GOVERNMENT: {name: "政府", code: 1013},
  AGRICULTURE: {name: "农林牧渔", code: 1014},
  OTHER: {name: "其他", code: 1015}
};
// 设计类型
ENUM.DESIGN_TYPE = {
  UI: {
    code: 'ui',
    name: 'UI/UX',
    desc: '网站、App 界面设计、图标设计等',
    children: {
      ICON: {code: "icon", key: 4004, short: "ICON", name: "ICON"},
      APP: {code: "app", key: 4001, short: "APP", name: "APP"},
      WEB: {code: "web", key: 4002, short: "WEB", name: "WEB"},
      HTML5: {code: "html5", key: 4003, short: "H5", name: "H5",}
    }
  },
  PM: {
    code: 'pm',
    name: '平面',
    desc: 'Logo 标识、名片、海报、企划书封面等',
    children: {
      LOGO: {code: "logo", key: 3002, short: 'LOGO', name: "Logo标识 (标识使用手册/Logo使用规范)"},
      USAGE: {code: "usage", key: 3004, short: "手册设计", name: "企业宣传手册/产品手册/平面广告"},
      POSTER: {code: "poster", key: 3005, short: "海报", name: "海报"},
      VI: {code: "vi", key: 3001, short: "VI", name: "VI应用 (名片、包装袋、环保袋、ppt模板、建筑标识)"},
      INFOGRAPHIC: {code: "infographic", key: 3008, short: "信息图", name: "Infographic/信息图"},
      COMMERCIAL: {code: "commercial", key: 3010, short: "电商", name: "电商"},
      PACKAGE: {code: "package", key: 3006, short: "包装", name: "包装"},
      BOOK: {code: "book", key: 3007, short: "书装/画册", name: "书装/画册"},
      WORD: {code: "word", key: 3003, short: "字体/字形", name: "字体/字形"},
      PPT: {code: "ppt", key: 3009, short: "PPT/演示", name: "PPT/演示"}
    }
  },
  CH: {
    code: 'ch',
    name: '插画',
    desc: '绘本、网页插画、广告插画、包装插画等',
    children: {
      PIC: {code: "pic", key: 5001, short: "绘本", name: "绘本"},
      APP: {code: "app", key: 5002, short: "APP/网页插画", name: "APP/网页插画"},
      AD: {code: "ad", key: 5003, short: "广告/包装插画", name: "广告/包装插画"},
      CHARACTER: {code: "character", key: 5004, short: "人物形象", name: "人物形象"},
      EMOJI: {code: "emoji", key: 5005, short: "表情包", name: "表情包"},
      OTHER: {code: "other", name: "其他"},
    }
  }
};
// 周期
ENUM.PERIOD = {
  LV1: {code: 1, name: '小于1周'},
  LV2: {code: 2, name: '1～2周'},
  LV3: {code: 3, name: '2～4周'},
  LV4: {code: 4, name: '1～2个月'},
  LV5: {code: 5, name: '2个月以上'},
  LV6: {code: 6, name: '不确定'}
};
// 预算
ENUM.BUDGET = {
  // LV1: {code: 1, name: '小于 10,000 元'},
  LV20: {code: 20, name: '小于 5,000 元'},
  LV1: {code: 1, name: '5,000 ~ 10,000 元'},
  LV2: {code: 2, name: '10,000 ~ 30,000 元'},
  LV3: {code: 3, name: '30,000 ~ 50,000 元'},
  LV4: {code: 4, name: '50,000 ~ 100,000 元'},
  LV5: {code: 5, name: '大于 100,000 元'},
  LV6: {code: 6, name: '自定义预算范围'},
  LV7: {code: 7, name: '固定预算'}
};
// 阶段
ENUM.STAGE = {
  LV1: {code: 1, name: '已有清晰的概念，就缺设计'},
  LV2: {code: 2, name: '概念比较模糊，需要设计师一起头脑风暴'},
  LV3: {code: 3, name: '还没有概念，需要设计师策划'}
};

// 业务类型
ENUM.BUSINESS_TYPE = {
  LV1: {code: 1, name: '品牌资产管理'},
  LV2: {code: 2, name: '新上产品宣传'},
  LV3: {code: 3, name: '现有产品宣传'},
  LV4: {code: 4, name: '社会化媒体宣传'},
  LV5: {code: 5, name: '促销物料宣传'},
  LV6: {code: 6, name: '其他'}
};
// 已有元素
ENUM.HAS_ELEMENT = {
  LV1: {code: 1, name: 'LOGO'},
  LV2: {code: 2, name: '核心创意'},
  LV3: {code: 3, name: 'SLOGAN'},
  LV4: {code: 4, name: '产品创意'},
  LV5: {code: 5, name: 'VI'},
  LV6: {code: 6, name: '其他'}
};
// 风格类型
ENUM.STYLE = {
  LV1: {code: 1, name: '极简'},
  LV2: {code: 2, name: '扁平'},
  LV3: {code: 3, name: '拟物'},
  LV4: {code: 4, name: '活泼'},
  LV5: {code: 5, name: '商业'},
  LV6: {code: 6, name: '磨砂'},
  LV7: {code: 7, name: 'Material Design'}
};
// 工作方式
ENUM.WORK_TYPE = {
  LV1: {code: 1, name: '设计师可以远程工作，不需要见面沟通'},
  LV2: {code: 2, name: '设计师可以远程工作，需要见面沟通'},
  LV3: {code: 3, name: '需要设计师每天驻场工作'}
};
//开始时间类型
ENUM.START_TYPE = {
  FLEXIBLE: {code: 1, name: '灵活（和设计师协调）'},
  IMMEDIATE: {code: 2, name: '需要马上开始'},
  CONCRETE: {code: 3, name: '有具体开始时间'}
};

// 项目 - 管理状态 0-未生成项目管理信息，1-即将开始，2-进行中，3-待确认，4-项目完成，5－项目终止
ENUM.MANAGE_STATUS = {
  LV0: {code: 0, name: '未生成项目管理信息'},
  LV1: {code: 1, name: '即将开始'},
  LV2: {code: 2, name: '进行中'},
  LV3: {code: 3, name: '待确认'},
  LV4: {code: 4, name: '项目完成'},
  LV5: {code: 5, name: '项目终止'}
};

// 项目 - 失效状态
ENUM.EXPIRE_STATUS = {
  NO_QUOTE: {code: 1, name: '无人报价'},
  NO_PICK: {code: 2, name: '逾期未选人'},
};


// 提现 - 操作状态
ENUM.WITHDRAW_STATUS = {
  NO_HANDLE: {code: 0, name: '无人处理'},
  HANDLING: {code: 1, name: '正在处理'},
  HANDLE_SUCCESS: {code: 2, name: '处理成功'},
  HANDLE_REJECT: {code: 3, name: '处理拒绝'}
};
// 提现 - 类型
ENUM.WITHDRAW_TYPE = {
  ALIPAY: {code: 1, name: '支付宝'},
  BANK: {code: 2, name: '银行卡'},
  WECHAT: {code: 3, name: '微信'},
  CASH: {code: 4, name: '现金'},
};
// 支付类型 (平台上可能的交易支付类型)
ENUM.PAYMENT_TYPE = {
  UNKNOWN: {code: 1, name: '未知'},
  ALIPAY: {code: 2, name: '银行卡'},
  BANK: {code: 3, name: '银行卡'},
  EBANK: {code: 4, name: '企业网银'},
  CASH: {code: 1, name: '现金'},
  WALLET: {code: 2, name: '钱包转账'},
  CREDIT: {code: 3, name: '信用扣款'}
};
// 资金操作类型 (平台上所有可能产生交易的类型)
ENUM.WALLET_OPERATION_TYPE = {
  UNKNOWN: {code: 0, name: '未知'},
  TRUST_FUND: {code: 1, name: '托管'},
  WITHDRAW: {code: 2, name: '提现'},
  REFUND: {code: 3, name: '退款'},
  PROJECT_PAY: {code: 4, name: '项目打款'},
  PROJECT_PUBLISH: {code: 5, name: '发布项目'},
  PROJECT_SUSPEND: {code: 6, name: '项目终止'},
  SERVICE: {code: 7, name: '服务费'}
};


// 账单状态
ENUM.BILL_STATE = {
  APPLY: {code: 0, name: '提交开具发票申请'},
  PAID: {code: 1, name: '运费已支付'},
  CLOSED: {code: 2, name: '发票已关闭'}
};

// 设计师二进制权限
ENUM.DESIGNER_AUTHS = {
  WALLET: {code: 1, name: '钱包'},
  TALENT: {code: 2, name: '人才库'},
  CLUSTER: {code: 4, name: '群组'},
  BILL: {code: 8, name: '设计费发票'},
  BILL_OPTION: {code: 16, name: '设置过设计费发票'}
};

//人民币大写
ENUM.RMB_CAPITAL = {
  ZERO: {code: 0, name: '零'},
  ONE: {code: 1, name: '壹'},
  TOW: {code: 2, name: '贰'},
  THREE: {code: 3, name: '叁'},
  FOUR: {code: 4, name: '肆'},
  FIVE: {code: 5, name: '伍'},
  SIX: {code: 6, name: '陆'},
  SEVEN: {code: 7, name: '柒'},
  EIGHT: {code: 8, name: '捌'},
  NINE: {code: 9, name: '玖'},

  SHI: {code: 2001, name: '拾'},
  BAI: {code: 2002, name: '佰'},
  QIAN: {code: 2003, name: '仟'},
  WANG: {code: 2004, name: '万'},
  YI: {code: 2005, name: '亿'},

  YUAN: {code: 3001, name: '圆'},
  JIAO: {code: 3002, name: '角'},
  FEN: {code: 3003, name: '分'},
  LI: {code: 3004, name: '厘'},
};

// 性别
ENUM.SEX_LIST = [{code: 1, name: '男'}, {code: 2, name: '女'}];
ENUM.SEX = {
  MALE: {code: 1, name: '男'},
  FEMALE: {code: 2, name: '女'}
};

// 特赞小提示枚举
ENUM.TEZIGN_TIP = {
  PUBLISH_FEE: 'publish_fee',
  TYPE_SELECT: 'type_select',
  TARGET_USER: 'target_user',
  BUDGET_TIME: 'budget_time',
  ATTACHMENT_ADDON: 'attachment_addon',
  COMPANY_INFO: 'company_info',
  PAY_INFO: 'pay_info',
  PAY_SUCCESS: 'pay_success'
};


// 通用错误码
ENUM.HTTP_CODE = {
  BAD_REQUEST: {code: 400, name: "非法参数"},
  NOT_FOUND: {code: 404, name: "该服务接口不存在"},
  SUCCESS: {code: 200, name: "请求成功"},
  EXCEPTION: {code: 500, name: "服务器异常"}
};
ENUM.RESULT_CODE = {
  BAD_REQUEST: {code: "-2", name: "您请求的参数不正确"},
  NOT_FOUND: {code: "-1", name: "该服务接口不存在"},
  SUCCESS: {code: "0", name: "请求成功"},
  EXCEPTION: {code: "1", name: "服务接口发生异常"},
  FORBIDDEN_OPERATION: {code: "2", name: "没有权限访问该接口"},
  NOT_BE_DESIGNER: {code: "3", name: "只有设计师才能访问该接口"},
  NOT_BE_CUSTOMER: {code: "4", name: "只有客户才能访问该接口"},
  ILLEGAL_USER: {code: "5", name: "这是一个非法的用户"},
  ILLEGAL_PROJECT: {code: "6", name: "这是一个非法的项目"}
};
ENUM.COMMON_CODE = {
  DATA_ERROR:{
    code:'DATA-ERROR',
    name: '数据解析异常'
  },
  FETCH_ERROR:{
    code: 'FETCH-ERROR',
    name: '请求异常'
  }
};

// 支付中心 - 支付类型
ENUM.PAY_URL_TYPE = {
  PUBLISH: 1,
  BILL: 2,
  CREDIT: 3,
  TRUSTEESHIP: 4
};


ENUM.PROJECT_TYPE_OPTIONS = {
  uiData: {
    type: [
      {code: "icon", name: "ICON", icon: "icon-tz-icon", activeIcon: "icon-tz-icon-hover"},
      {code: "app", name: "APP", icon: "icon-tz-app", activeIcon: "icon-tz-app-hover"},
      {code: "web", name: "WEB", icon: "icon-tz-ui", activeIcon: "icon-tz-ui-hover"},
      {code: "html5", name: "H5", icon: "icon-tz-h5", activeIcon: "icon-tz-h5-hover"}
    ],
    content: [
      {code: "page", name: "页面设计"},
      {code: "home",  name: "首页设计"},
      {code: "subject", name: "产品／活动等专题页设计"},
      {code: "other", name: "其他"}
    ],
    num: [
      '10 页以内',
      '10～30 页',
      '30～50 页',
      '50 页以上'
    ]
  },
  pmData: {
    content: [
      {code: "logo", key: 3002, short: 'LOGO', name: "Logo标识（标识使用手册/Logo使用规范）"},
      {code: "usage", key: 3004, short: "手册设计", name: "企业宣传手册/产品手册/平面广告"},
      {code: "poster", key: 3005, short: "海报", name: "海报"},
      {code: "vi", key: 3001, short: "VI", name: "VI应用（名片、包装袋、环保袋、ppt模板、建筑标识）"},
      {code: "infographic", key: 3008, short: "信息图", name: "Infographic/信息图"},
      {code: "commercial", key: 3010, short: "电商", name: "电商"},
      {code: "package", key: 3006, short: "包装", name: "包装"},
      {code: "book", key: 3007, short: "书装/画册", name: "书装/画册"},
      {code: "word", key: 3003, short: "字体/字形", name: "字体/字形"},
      {code: "ppt", key: 3009, short: "PPT/演示", name: "PPT/演示"},
      {code: "other", name: "其他"}
    ],
    num: [

    ]
  },
  chData: {
    content: [
      {code: "pic", key: 5001, name: "绘本"},
      {code: "app", key: 5002, name: "APP/网页插画"},
      {code: "ad", key: 5003, name: "广告/包装插画"},
      {code: "character", key: 5004, name: "人物形象"},
      {code: "emoji", key: 5005, name: "表情包"},
      {code: "other", name: "其他"}
    ],
    num: [
      '5 页以内',
      '5～10 页',
      '10 页以上'
    ]
  }
};
for(let key in ENUM.PROJECT_TYPE_OPTIONS){
  let typeObj  = ENUM.PROJECT_TYPE_OPTIONS[key];
  let {content} = typeObj;
  const children = {};
  content.forEach(c => children[c.code] = c);
  typeObj.children = children;
}



ENUM.PROJECT_STYLE_OPTIONS = [
  {code: 1, name: '极简', cover: require('./images/tag_minimal.png')},
  {code: 2, name: '扁平', cover: require('./images/tag_bianping.png')},
  {code: 3, name: '拟物', cover: require('./images/tag_niwu.png')},
  {code: 4, name: '活泼', cover: require('./images/tag_huopo.png')},
  {code: 5, name: '商业', cover: require('./images/tag_shangwu.png')},
  {code: 6, name: '磨砂', cover: require('./images/tag_blur.png')},
  {code: 7, name: 'Material Design', cover: require('./images/tag_materialdesign.png')}
];

ENUM.SKILL_FIELDS_OPTIONS = [
  {code: '1', name: '日化用品'},
  {code: '2', name: '快消'},
  {code: '3', name: '医疗'},
  {code: '4', name: '互联网'},
  {code: '5', name: '家居建材'},
  {code: '6', name: '教育'},
  {code: '7', name: '传媒'},
  {code: '8', name: '服装'},
  {code: '9', name: '机构组织'},
  {code: '10', name: '旅游'},
  {code: '11', name: '母婴'},
  {code: '12', name: '3C数码'},
  {code: '13', name: '金融'},
  {code: '14', name: '汽车'},
  {code: '15', name: '奢侈品'}
];

// 普通项目推送预算范围
ENUM.LOWEST_COMMON = [{
  code: '20',
  message: '0'
},{
  code: '1',
  message: '5,000'
},{
  code: '2',
  message: '10,000'
},{
  code: '3',
  message: '30,000'
},{
  code: '4',
  message: '500,000'
},{
  code: '5',
  message: '100,000'
},];
// 动画项目推送预算范围
ENUM.LOWEST_ANIMATION = [{
  code: '10',
  message: '0'
},{
  code: '11',
  message: '20,000'
},{
  code: '12',
  message: '40,000'
},{
  code: '13',
  message: '60,000'
},{
  code: '14',
  message: '100,000'
},{
  code: '15',
  message: '200,000'
},];


// 设计师企业状态
ENUM.COMPANY_CHECKED = {
  NOT_CHECKED: 0,
  PASSED: 1,
  NOT_PASSED: 2,
  CHECKING: 3
};

// 发票税点
ENUM.BILL_TYPES = [{
  code: 1,
  type: '普通',
  message: '3%',
},{
  code: 2,
  type: '普通',
  message: '6%',
},{
  code: 3,
  type: '专用',
  message: '3%',
},{
  code: 4,
  type: '专用',
  message: '6%',
},];

// 每周承接项目时间
ENUM.WEEK_PROJECT_TIME_LIST = [{
  code: 1,
  message: '10 小时以下'
},{
  code: 2,
  message: '10-40 小时'
},{
  code: 3,
  message: '40 小时以上'
},{
  code: 4,
  message: '随时'
}];
// 个人设计师 - 每周承接项目时间
ENUM.WEEK_PROJECT_TIME_LIST = [{
  code: 1,
  message: '10 小时以下'
},{
  code: 2,
  message: '10-40 小时'
},{
  code: 3,
  message: '40 小时以上'
},{
  code: 4,
  message: '随时'
}];

// 个人设计师 - 工作现状
ENUM.WORK_STATUS = [{
  code: 4,
  message: '我是工作室／公司负责人'
},{
  code: 2,
  message: '我是自由职业者'
},{
  code: 1,
  message: '我有全职工作'
},{
  code: 3,
  message: '我是在校生'
}];
// 个人设计师 - 服务过的最大项目规模
ENUM.PROJECT_SERVED_SCALES = [{
  code: 1,
  message: '5 万以下'
},{
  code: 2,
  message: '5-10 万'
},{
  code: 3,
  message: '10-30 万'
},{
  code: 4,
  message: '30 万以上'
}];
// 企业设计师 - 服务过的最大项目规模
ENUM.COMPANY_PROJECT_SERVED_SCALES = [{
  code: 1,
  message: '十万级以下'
},{
  code: 2,
  message: '十万级'
},{
  code: 3,
  message: '百万级'
},{
  code: 4,
  message: '百万级以上'
}];
// 个人设计师 - 工作经验
ENUM.DESIGN_WORK_EXPERIENCE = [{
  code: 1,
  message: '1 年'
},{
  code: 2,
  message: '2 年'
},{
  code: 3,
  message: '3 年'
},{
  code: 4,
  message: '4 年'
},{
  code: 5,
  message: '5 年及以上'
}];

// 设计师 - 合作过的知名品牌数量
ENUM.PROJECT_COOPERATED_NUMS = [{
  code: 1,
  message: '1 家'
},{
  code: 2,
  message: '2 家'
},{
  code: 3,
  message: '3 家'
},{
  code: 4,
  message: '4 家'
},{
  code: 5,
  message: '5 家及以上'
}];

// 是否需要项目预付款
ENUM.NEED_PREORDER_OPTIONS = [{
  key: 1,
  label: '一般不需要',
},{
  key: 2,
  label: '部分类型项目需要',
},{
  key: 3,
  label: '全部项目都需要',
}];

// 最长账期范围
ENUM.BILL_LENGTH_OPTIONS = [{
  key: 1,
  label: '30 天',
},{
  key: 2,
  label: '60 天',
},{
  key: 3,
  label: '90 天',
},{
  key: 4,
  label: '暂不接受账期',
}];

// 公司规模
ENUM.COMPANY_SCALE = [
  {
    code: 1,
    message: '10 人内'
  },
  {
    code: 2,
    message: '10-29 人'
  },
  {
    code: 3,
    message: '30-49 人'
  },
  {
    code: 4,
    message: '50-100 人'
  },
  {
    code: 5,
    message: '100 人以上'
  }
];

let date = new Date();
const YEAR_ESTABLISHED = [];
for(let i=date.getFullYear(); i>=1900; i--) {
  YEAR_ESTABLISHED.push(i);
}
ENUM.YEAR_ESTABLISHED = YEAR_ESTABLISHED;

ENUM.LANGUAGE_LEVEL = [
  {
    code: 1,
    message: '基础'
  },
  {
    code: 3,
    message: '良好'
  },
  {
    code: 2,
    message: '流利'
  },
];

ENUM.DEVELOPER_ABILITY = {
  YES: 1,
  NO: 0
};



export default ENUM;