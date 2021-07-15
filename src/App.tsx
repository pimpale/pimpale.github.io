import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Achernar from './pages/Achernar';
import TerrainGeneration from './pages/TerrainGeneration';
import Resume from './pages/Resume';
import Error from './pages/Error';

// Bootstrap CSS & JS
import './styles/style.scss';
import 'bootstrap/dist/js/bootstrap';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/achernar" exact component={Achernar} />
        <Route path="/terraingeneration" exact component={TerrainGeneration} />
        <Route path="/resume" exact component={Resume} />
        <Route path="/" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
