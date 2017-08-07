import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import configureStore from '../store/configureStore'

import history from '../common/history'

import test1View from '../views/test1.jsx'
import msgView from '../views/message.jsx'
import userView from '../views/users.jsx'
import meView from '../views/me.jsx'

const store = configureStore();

const Root = function(props) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/">
          <IndexRoute component={msgView} />
          <Route path="test1" component={test1View} />
          <Route path="msg" component={msgView} />
          <Route path="user" component={userView} />
          <Route path="me" component={meView} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;

