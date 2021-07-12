import React from 'react';
import Header from './Header';

function Footer() {
  return (
    <footer className="container-fluid py-1"><br />
      <p>&copy; Govind Pimpale, MIT Licensed</p>
    </footer>
  )
}


const Layout: React.FunctionComponent<{}> = props =>
  <div className="content">
    <Header />
    {props.children}
    <Footer />
  </div>

export default Layout;
