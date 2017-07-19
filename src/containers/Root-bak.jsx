import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import http from '../common/http'
import util from '../common/util'
import constants from '../common/constants'
import storage from '../common/storage'
import User from '../services/user'
import ws from '../common/socketio'
import cache from '../common/cache'
import history from '../common/history'

import loginView from '../views/login'
import homeView from '../views/home/home'
import projectView from '../views/project'
import businessProjectView from '../views/project/business'
import projectsView from '../views/projects'
import payDoResultView from '../views/pay/payresult'
import walletView from '../views/wallet'
import accountProfileView from '../views/account/profile'
import accountSettingView from '../views/account/setting'
import designerProfilePushView from '../views/designer/push'
import ticketsView from '../views/tickets'
import portfolioView from '../views/portfolio/portfolio'
import groupView from '../views/account/group'
import notFoundView from '../views/404.jsx'
import designerEnteringView from '../views/designer/entering'
import designerAgreementView from '../views/docs/desingerAgreement'
import designerUpdateEnterPriseView from '../views/account/updateEnterprise'


//dictation grammar word

const store = configureStore();

http.on(401, function (error) {
  cache.clear().then(() => {
    location.href = '/user/#/login';
  });
});

// 启动websocket
ws.open();

// 初始化美洽客服
setTimeout(()=>{
  util.initMeiqia();
},2000);

//收集JS错误日志
if(!__DEV__){
  window.onerror = function(errorMessage, url, line, colno, error) {
    const loggerUrl = constants.API_ORIGIN + "/slog/web";
    const parameters = {
      des: escape(errorMessage),
      url: escape(url),
      line: escape(line),
      colno: escape(colno),
      error: escape(error),
      parent_url: escape(document.location.href),
      project_name: escape('tezign-web-designer'),
      agent: escape(navigator.userAgent),
      date: escape(new Date())
    };

    /** Send error to server */
    http.post(loggerUrl, parameters);
  };
}

const Root = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/">
          <Route path="login" components={loginView}/>
          <Route path="docs/designerAgreementView" component={designerAgreementView}/>
          <Route path="home" onEnter={checkUser} components={homeView}/>
          <Route path="projects" onEnter={checkUser} components={projectsView}/>
          <Route path="projects/:projectId" onEnter={checkUser} components={projectView}/>
          <Route path="business/projects/:projectId" onEnter={checkUser} components={businessProjectView}/>
          <Route path="paydoresult/:type" onEnter={checkUser} components={payDoResultView} />
          <Route path="payment" onEnter={checkUser} components={walletView} />
          <Route path="portfolio" components={portfolioView} />
          <Route path="account/profile" onEnter={checkUser} components={accountProfileView} />
          <Route path="account/setting" onEnter={checkUser} components={accountSettingView} />
          <Route path="designer/profile/push" onEnter={checkUser} components={designerProfilePushView} />
          <Route path="tickets" onEnter={checkUser} components={ticketsView} />
          <Route path="account/group" onEnter={checkUser} components={groupView} />
          <Route path="entering" onEnter={checkUser} component={designerEnteringView}/>
          <Route path="account/updateEnterprise" onEnter={checkUser} components={designerUpdateEnterPriseView} />
          <IndexRedirect to="home"/>
        </Route>
        <Route path="*" component={notFoundView}/>
      </Router>
    </Provider>
  );
};

let _hasFetch;
function getUser() {
  let user = storage.get(constants.CACHE_KEYS.CURRENT_USER);
  if (!user) return Promise.reject();
  if (_hasFetch) return Promise.resolve(user);
  return User.fetch().then(user => {
    _hasFetch = true;
    return user;
  }, () => {
    return user;
  });
}

function checkUser(nextState, replace, callback) {
  getUser().then(user => {
    let { base, designer } = user;
    let { email, verify_email, account_type, verify_phone, is_customer, is_company } = base;
    if ((email && verify_email === 0) && verify_phone !== 1) {
      location.href = '/user/#/validEmail';
      return false;
    }
    if (is_company === 2) {
      location.href = 'https://pro.tezign.com';
      return false;
    } else if (is_customer === '2') {
      //企业客户
      if (account_type === '1') {
        location.href = '/client.html';
        return false;
      } else {
        location.href = '/client/';
        return false;
      }
    } else if (designer.is_checked !== 4) {
      if (nextState.location.pathname !== '/entering') replace('/entering');
      return callback();
    }
    callback();
  }, () => {
    location.href = '/user/#/login';
  });
}

export default Root

