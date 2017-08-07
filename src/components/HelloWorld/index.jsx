import React, { Component, PureComponent }  from 'react'

class HelloWorld extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      message: props.message
    };

    console.log('constructor');
  }

  echo = () => {
    // alert(this.state.message);
  };

  componentWillMount(){
    console.log('componentWillMount');

  }

  componentDidMount(){
    console.log('componentDidMount');
    console.log('input dom', this.refs.inputRef);
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    this.setState({
      message: nextProps.message
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate');

    // if(nextProps.message === this.state.message){
    //   return false;
    // }

    return true;
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');

  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }


  render() {

    console.log('render');

    let props = {
      style: {
        backgroundColor: 'red'
      }
    };

    const { message } = this.state;

    return (
      <div
        {...props}
        className="color-primary"
      >
        hello {message}

        <input type="text" ref="inputRef"/>


        <button onClick={() => {
          this.props.onClose('data');
        }}>Close</button>
      </div>
    );
  }
}

export default HelloWorld;