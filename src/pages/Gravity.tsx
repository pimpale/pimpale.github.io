import React from 'react';
import ReactDOM from 'react-dom';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';


import WebGL2GravityDemo from '../components/WebGL2GravityDemo';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const GravityPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section name="Spacewar" id="spacewar">
      <p>
        <HrefLink href="https://github.com/pimpale/spacewar" />
      </p>
      <p>
        <HrefLink href="https://github.com/pimpale/GravitySimulator" />
      </p>
      <AsideCard title="Canvas Setup" id="canvas-setup-demo">
        <WebGL2GravityDemo
          className="mx-auto"
          style={{maxWidth: "50em"}}
          size={512}
        />
      </AsideCard>

    </Section>
  </>
}</ArticleLayout>

ReactDOM.render(
  <React.StrictMode>
    <GravityPage />
  </React.StrictMode>,
  document.getElementById('root')
);
