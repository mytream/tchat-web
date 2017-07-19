import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import history from '../common/history'
import constants from '../common/constants'

import homeView from '../views/home.jsx'
import chatListView from '../views/chat/list.jsx'
import test1View from '../views/test1.jsx'

// 启动websocket
// ws.open();

const Root = function(props) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={homeView} />
        <Route path={constants.PAGES.HOME} component={homeView} />
        <Route path={`${constants.PAGES.CHAT_LIST}/:friendId`} component={chatListView} />
        <Route path="test1" component={test1View} />
        <Route path="inbox" component={Inbox}>
          {/* 添加一个路由，嵌套进我们想要嵌套的 UI 里 */}
          <Route path="messages/:id" component={Message} />
        </Route>
      </Route>
    </Router>
  );
};

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

function NotFound() {
  return (<div>404</div>);
}

// 判断用户是否登录
function checkUser(nextState, replace, callback) {
  return true;
}

export default Root;

