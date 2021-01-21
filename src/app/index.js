import './index.scss';

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Router from 'router';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Router} />
    </BrowserRouter>
  );
};

export default App;
