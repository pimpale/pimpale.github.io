import React  from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons'

interface HeaderProps {
}

interface HeaderState {
  scroll: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props:HeaderProps) {
    super(props);
    this.state ={
      scroll: 0,
    };
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    this.setState({
      scroll: scrolled,
    })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  render() {
    const navStyle = {
      transitionDuration: "0.4s"
    };
    const textColor = {
      bac
    };
    return (
      <header>
        <nav style={navStyle} className={ "navbar navbar-expand-lg py-3 fixed-top" + (this.state.scroll === 0 ? "" : " bg-secondary")}>
          <div className="container">
            <a className="navbar-brand font-weight-bold" href="/#intro">Govind Pimpale</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <ThreeDotsVertical className="text-light" />
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
}

export default Header;
