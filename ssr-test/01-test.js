import React from 'react'
import { renderToString } from 'react-dom/server';


const html = renderToString(<div>hello</div>);

console.log('html', html);