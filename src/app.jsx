// import './common/antd-custom.less'
// import 'tezign-react-ui/dist/tezign-react-ui.css'
// import 'trc-icon/dist/index.css'
import './app.scss'

// import 'babel-polyfill'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import React from 'react'
import ReactDOM from 'react-dom'

// import Root from './containers/Root.jsx'

ReactDOM.render(
  <div>
    TChat Web
  </div>,
  document.querySelector('#rc-root')
);

//todo
//if (module.hot) module.hot.accept();