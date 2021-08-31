const IndexUrl = '../index.html';

function Error() {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw"
    }}>
      <div className="my-auto mx-auto text-center">
        <h1>404 Error.</h1>
        <h5>Page Not Found</h5>
        <a href={IndexUrl}>Return Home</a>
      </div>
    </div>
  )
}

import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Error />
  </React.StrictMode>,
  document.getElementById('root')
);
