import React from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons'

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import 'popper.js/dist/popper';

function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg py-3 fixed-top">
        <div className="container">
          <a className="navbar-brand font-weight-bold" href="index.html">Govind Pimpale</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <ThreeDotsVertical className="text-light"/>
          </button>
          <div className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
              <a className="nav-item nav-link font-weight-bold" href="/#about">About</a>
              <a className="nav-item nav-link font-weight-bold" href="https://github.com/pimpale/pimpale.github.io">Source</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
      <div className="bg-dark text-light">
        <Header />
        <div className="content"> {this.props.children} </div>
        <Footer />
      </div>
    )
  }
}

export default Layout;
