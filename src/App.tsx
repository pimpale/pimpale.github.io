import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
