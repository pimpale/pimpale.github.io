import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import AsideCard from '../components/AsideCard';

import WebGL2SetupDemo from '../components/WebGL2SetupDemo';
import WebGL2HeatEqnDemo from '../components/WebGL2HeatEqnDemo';
import WebGL2FluidAdvectionDemo from '../components/WebGL2FluidAdvectionDemo';
import WebGL2IncompressibleFluidDemo from '../components/WebGL2IncompressibleFluidDemo';

const Fluid2 = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Overview">
      <p>
        Our goals are to:
      </p>
      <ul>
        <li>Map the fluid simulation onto a torus.</li>
        <li>Make the fluid simulation 3D.</li>
      </ul>
    </Section>
    <Section id="fluid2-unmapped-torus" name="Incompressible Fluid on a Torus">
      <p>
        Incompressible
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2SetupDemo
          className="mx-auto"
          style={{display: "block"}}
          width={400}
          height={400}
        />
      </AsideCard>
    </Section>

    <Section id="webgl2-incompressible" name="Incompressible Fluid with WebGL2">
      <p>
        Now, we'll approach the heat equation
      </p>
      <AsideCard title="Fluid Advection" id="fluid-advection-demo">
        <WebGL2IncompressibleFluidDemo 
          className="mx-auto"
          style={{maxWidth: "40em"}}
          size={400}
        />
      </AsideCard>
    </Section>


    <Section id="sources" name="Sources">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>

import ReactDOM from 'react-dom';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Fluid2 />
  </React.StrictMode>,
  document.getElementById('root')
);
