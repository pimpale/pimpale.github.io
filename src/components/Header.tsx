import React from 'react';
import { Link } from 'react-router-dom';
import { ThreeDotsVertical } from 'react-bootstrap-icons'

interface HeaderProps {
}

interface HeaderState {
  scroll: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
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
    return (
      <header>
        <nav style={navStyle} className={"navbar navbar-expand-lg py-3 fixed-top" + (this.state.scroll === 0 ? "" : " bg-secondary")}>
          <div className="container">
            <Link className="navbar-brand" to="/"><strong>Govind Pimpale</strong></Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <ThreeDotsVertical className="text-light" />
            </button>
            <div className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <div className="navbar-nav ml-auto">
                <Link to="/achernar" className="nav-item nav-link"  ><strong>Achernar</strong></Link>
                <Link to="/compugenesis" className="nav-item nav-link"  ><strong>Compugenesis</strong></Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
