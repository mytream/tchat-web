import React from 'react'
import { renderToString } from 'react-dom/server';

import Test1 from './components/Test1'

const html = renderToString(<Test1 />);

console.log('html', html);