import './app.scss'

import { Router, Route } from 'react-router'

// import 'babel-polyfill'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root.jsx'
import Home from './views/home.jsx'
import Test1 from './views/test1.jsx'

import history from './common/history'

ReactDOM.render(
  <Root />,
  document.querySelector('#rc-root')
);

// 新建一个组件让其在 Inbox 内部渲染
class Message extends React.Component {
  render() {
    return <h3>Message id ${this.props.params.id}</h3>
  }
}

class About extends React.Component {

  render() {
    return <h3>About</h3>
  }
}

class Test extends React.Component {
  componentDidMount() {
    // 来自于路径 `/inbox/messages/:id`
    const id = this.props.params.id

    fetchMessage(id, function (err, message) {
      this.setState({ message: message })
    })
  }

  render() {
    return <h3>About</h3>
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {/* 渲染这个 child 路由组件 */}
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
}

// ReactDOM.render((
//   <Router history={history}>
//     <Route path="/">
//       <Route path="home" component={Home} />
//       <Route path="about" component={About} />
//       <Route path="test" component={Test} />
//       <Route path="test1" component={Test1} />
//       <Route path="inbox" component={Inbox}>
//         {/* 添加一个路由，嵌套进我们想要嵌套的 UI 里 */}
//         <Route path="messages/:id" component={Message} />
//       </Route>
//     </Route>
//   </Router>
// ), document.querySelector('#rc-root'))

//todo
//if (module.hot) module.hot.accept();

// 引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)
if(!window.Promise) {
  document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
}