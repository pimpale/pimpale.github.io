import { Link } from 'react-router-dom';
import { ThreeDotsVertical } from 'react-bootstrap-icons'

const Header = () =>
  <header className="pb-5">
    <nav className={"navbar navbar-expand-lg py-3 fixed-top bg-secondary"}>
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

export default Header;
