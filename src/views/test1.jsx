import './test1.scss'

import React from 'react'

import HelloWorld from '../components/HelloWorld/index.jsx'
import HelloWorld2 from '../components/HelloWorld2/index.jsx'
import Modal from '../components/Modal.jsx'

class test1Page extends React.Component {

  height = 1000;

  state = {
    message: '你好',
  };

  constructor(props) {
    super(props);

    this.height;
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidMount(){
    console.log('HelloWorld', this.helloWorldRef.echo());
  }



  changeMessage = () => {
    this.setState({
      // message: '你好' + Date.now()
      message: '你好'
    }, function () {
      console.log('set state ok');
    });

    // this.state.message = '放大发大水';
  };

  render() {
    return (
      <div>
        <HelloWorld
          message={this.state.message}
          onClose={(data)=>{
            console.log('onClose', data);
          }}
          ref={(ref) => {
            this.helloWorldRef = ref;
          }}
        />
        <HelloWorld2 message={this.state.message}/>

        <Modal visible={this.state.mVisible}/>

        <button onClick={this.changeMessage}>changeMessage</button>
        <button onClick={() => {
          this.setState({
            mVisible: !this.state.mVisible
          });
        }}>toggle</button>
      </div>
    );
  }
}

export default test1Page;