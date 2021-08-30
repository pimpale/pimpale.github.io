import { ThreeDotsVertical } from 'react-bootstrap-icons'

import TerrainGenerationUrl from '../terraingeneration.html?url';
import GravityUrl from '../gravity.html?url';
import AchernarUrl from '../achernar.html?url';
import ResumeUrl from '../resume.html?url';
import ProjectsUrl from '../projects.html?url';

const Header = () =>
  <header className="pb-5">
    <nav className={"navbar navbar-expand-lg py-3 fixed-top bg-secondary"}>
      <div className="container d-flex">
        <a className="navbar-brand" href="/"><strong>Govind Pimpale</strong></a>
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
            <a href={ResumeUrl} className="nav-item nav-link"><strong>Resume</strong></a>
            <a href={ProjectsUrl} className="nav-item nav-link"><strong>Projects</strong></a>
          </div>
          {/*Right Aligned*/}
          <div className="navbar-nav ms-auto">
            <a href={TerrainGenerationUrl} className="nav-item nav-link"><strong>Terrain Generation</strong></a>
            <a href={GravityUrl} className="nav-item nav-link"><strong>Gravity</strong></a>
            <a href={AchernarUrl} className="nav-item nav-link"><strong>Achernar</strong></a>
          </div>
        </div>
      </div>
    </nav>
  </header>

export default Header;
