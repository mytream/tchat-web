import React from 'react'
import { renderToString } from 'react-dom/server';

class Comp extends React.Component {
  render() {
    return (
      <div>hello</div>
    );
  }
}

const html = renderToString(<Comp />);

console.log('html', html);