import './me.scss'

import React from 'react'
import { NavBar, Toast } from 'antd-mobile'
import User from '../services/user'

import history from '../common/history'

class test1Page extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      userInfo: {},
    };

    this.handleSaveUser = this.handleSaveUser.bind(this);
  }

  componentDidMount(){
    User.getCurrentUser().then(userInfo =>{
      this.setState({userInfo});
    })
  }

  handleSaveUser(){
    console.log('newUser', this.state.userInfo);
    User.updateUser(this.state.userInfo).then(() => {
      Toast.success('用户信息保存成功');
    }, err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="me-container">
        <NavBar
          mode="light"
          onLeftClick={() => {
            history.push('msg');
          }}
          leftContent="back"
        >
          我的
        </NavBar>

        {this.renderUserInfo()}
      </div>
    );
  }

  renderUserInfo(){
    const {userInfo} = this.state;
    const {name, url} = userInfo;

    return (
      <div>
        <input value={name || ''} onChange={e => {
          userInfo.name = e.target.value;
          this.setState({userInfo});
        }} />

        <input value={url || ''} onChange={e => {
          userInfo.url = e.target.value;
          this.setState({userInfo});
        }} />
        <button
          className="btn btn-primary"
          onClick={this.handleSaveUser}>
          确认修改
        </button>
      </div>
    );
  }
}

export default test1Page;