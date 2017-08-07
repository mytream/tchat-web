import React, { Component, PureComponent }  from 'react'
import ReactDOM from 'react-dom'

export default  class Modal extends React.Component {

  componentWillMount() {
    let bodyEle = document.body;
    this.container = document.createElement('div');
    bodyEle.appendChild(this.container);
  }

  componentDidMount() {
    this.renderModal();
  }

  componentDidUpdate() {
    this.renderModal();
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.container);
  }


  render() {
    return null;
  }

  renderModal() {
    ReactDOM.render(
      <div style={{
        display: this.props.visible ? 'block': 'none'
      }}>
        Modal
      </div>,
      this.container
    );
  }
}