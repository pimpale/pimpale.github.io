import React from 'react';

import Header from './Header';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import 'popper.js/dist/popper';


function Footer() {
  return (
    <footer className="container-fluid py-1"><br />
      <p className="text-light">&copy; Govind Pimpale, MIT Licensed</p>
    </footer>
  )
}

class Layout extends React.Component {
  render() {
    return (
      <div className="text-light">
        <Header />
        <div className="content"> {this.props.children} </div>
        <Footer />
      </div>
    )
  }
}

export default Layout;
