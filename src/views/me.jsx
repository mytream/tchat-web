import './me.scss'

import React from 'react'
import { connect } from 'react-redux'
import { NavBar, Toast } from 'antd-mobile'
import User from '../services/user'


import { getCurrentUser, setCurrentUser, updateUser } from '../store/user/actions';


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
    this.props.dispatch(getCurrentUser());
    // User.getCurrentUser().then(userInfo =>{
    //   this.setState({userInfo});
    // })
  }

  handleSaveUser(){
    console.log('newUser', this.state.userInfo);
    // User.updateUser(this.state.userInfo).then(() => {
    //   Toast.success('用户信息保存成功');
    // }, err => {
    //   console.error(err);
    // });
    this.props.dispatch(updateUser(this.props.userInfo)).then(() => {
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
    const {userInfo} = this.props;
    const {name, url} = userInfo;

    return (
      <div>
        <input value={name || ''} onChange={e => {
          userInfo.name = e.target.value;
          // this.setState({userInfo});
          this.forceUpdate();
        }} />

        <input value={url || ''} onChange={e => {
          userInfo.url = e.target.value;
          // this.setState({userInfo});
          this.forceUpdate();
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

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(test1Page);