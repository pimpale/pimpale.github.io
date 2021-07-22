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
      <header className="pb-5">
        <nav style={navStyle} className={"navbar navbar-expand-lg py-3 fixed-top" + (this.state.scroll === 0 ? "" : " bg-secondary")}>
          <div className="container d-flex">
            <Link className="navbar-brand" to="/"><strong>Govind Pimpale</strong></Link>
            {/*Collapsible Button*/}
            <button type="button" className="navbar-toggler"
              data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            >
              <ThreeDotsVertical className="text-body" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/*Left Aligned*/}
              <div className="navbar-nav">
                <Link to="/resume" className="nav-item nav-link"><strong>Resume</strong></Link>
                <Link to="/projects" className="nav-item nav-link"><strong>Projects</strong></Link>
              </div>
              {/*Right Aligned*/}
              <div className="navbar-nav ms-auto">
                <Link to="/terraingeneration" className="nav-item nav-link"><strong>Terrain Generation</strong></Link>
                <Link to="/gravity" className="nav-item nav-link"><strong>Gravity</strong></Link>
                <Link to="/achernar" className="nav-item nav-link"><strong>Achernar</strong></Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
