import './users.scss'

import React from 'react'
import { NavBar, Icon } from 'antd-mobile'

import history from '../common/history';
import User from '../services/user';


class test1Page extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    User.fetchUsers().then(users => {
      this.setState({ users });
    });
  }

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          onLeftClick={() => {
            history.push('msg');
          }}
          leftContent="back"
        >
          用户列表
        </NavBar>

        {this.renderUserList()}
      </div>
    );
  }

  renderUserList() {
    const { users } = this.state;

    return (
      <div className="users-container">
        {users.map(({ url, name }, index) => {
          return (
            <div key={index} className="user-item display-flex msg-item mb-20">
              {/* 头像 昵称 内容 */}
              <img src={url} alt=""/>
              <div className="ml-10 flex-1">
                <div className="display-flex flex-justify-content-between">
                  <span>{name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default test1Page;