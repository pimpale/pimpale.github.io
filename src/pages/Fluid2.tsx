import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import AsideCard from '../components/AsideCard';

import IncompressibleTorusFluidDemo from '../components/IncompressibleTorusFluidDemo';
import CoriolisTorusFluidDemo from '../components/CoriolisTorusFluidDemo';

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
        <IncompressibleTorusFluidDemo
          className="mx-auto"
          style={{maxWidth: "40em"}}
          xsize={600}
          ysize={200}
          torussize={400}
        />
      </AsideCard>

      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <CoriolisTorusFluidDemo
          className="mx-auto"
          style={{maxWidth: "40em"}}
          xsize={800}
          ysize={400}
          torussize={400}
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
