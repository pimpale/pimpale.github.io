import React from 'react';
import ReactDOM from 'react-dom';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

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
    </Section>
  </>
}</ArticleLayout>

ReactDOM.render(
  <React.StrictMode>
    <GravityPage />
  </React.StrictMode>,
  document.getElementById('root')
);
