import CoriolisTorusFluidDemo from '../components/CoriolisTorusFluidDemo';

function Error() {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
    }}>
      <CoriolisTorusFluidDemo
        className="mx-auto"
        xsize={400}
        ysize={400}
        torussize={400}
      />
    </div>
  )
}

import React from 'react';
import {createRoot} from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Error />
  </React.StrictMode>,
);