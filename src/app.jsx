import './app.scss'

// import 'babel-polyfill'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// import Root from './containers/Root.jsx'
import Test1 from './views/test1.jsx'

// import HelloWorld from './components/HelloWorld/index.jsx'

// import SOCKET from './common/socketio';

// 启用websocket
// SOCKET.open();


ReactDOM.render(
  <Test1 />,
  document.querySelector('#rc-root')
);

//todo
//if (module.hot) module.hot.accept();

// // 引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)
// if(!window.Promise) {
//   document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
// // }