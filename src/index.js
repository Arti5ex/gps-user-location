import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';
import Main from './components/main';
import './stylesheets/style.scss'

render(
  <Provider store={store}>
    <Main/>
  </Provider>, 
  document.getElementById('root')
);