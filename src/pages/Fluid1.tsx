import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';
import HrefLink from '../components/HrefLink';

import AsideCard from '../components/AsideCard';

import WebGL2SetupDemo from '../components/WebGL2SetupDemo';

const Fluid1 = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Overview">
      <p>
        Our goals are to:
      </p>
      <ul>
        <li>demonstrate how use WebGL2 to accelerate computations.</li>
        <li>learn how to use the Navier-Stokes equations to simulate fluids.</li>
        <li>provide working code to simulate 2D incompressible flow.</li>
      </ul>
    </Section>
    <Section id="webgl2-setup" name="Setting up WebGL2">
      <p>
        First, we'll need to set up WebGL2.
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2SetupDemo
          className="mx-auto"
          width={400}
          height{400}
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
    <Fluid1 />
  </React.StrictMode>,
  document.getElementById('root')
);
