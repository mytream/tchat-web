import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import history from '../common/history'
import constants from '../common/constants'

import msgView from '../views/message.jsx'
import userView from '../views/users.jsx'
import meView from '../views/me.jsx'

// 启动websocket
// ws.open();

const Root = function(props) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={msgView} />
        <Route path="msg" component={msgView} />
        <Route path="user" component={userView} />
        <Route path="me" component={meView} />
      </Route>
    </Router>
  );
};

export default Root;

