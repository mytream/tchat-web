import React, { Component, PureComponent }  from 'react'

class HelloWorld extends React.Component {

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {

    const { message } = this.props;

    return (
      <div
        className="color-primary"
      >
        hello {message}

        {/*<button onClick={}></button>*/}
      </div>
    );
  }
}

export default HelloWorld;